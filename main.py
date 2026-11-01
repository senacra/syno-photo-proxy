from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from contextlib import asynccontextmanager
import httpx
import json
import logging
import os

from synology_client import SynologyPhotosAPI
from media_cache import ImageCache

class Settings(BaseSettings):
    nas_url: str
    nas_user: str
    nas_pass: str
    allowed_albums: str = ""
    gallery_title: str = "Galerie Photos"
    photo_map_enabled: bool = False
    image_cache_dir: str = "cache/images"
    image_cache_max_size_mb: int = Field(default=512, gt=0)
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
syno_client = SynologyPhotosAPI(settings.nas_url, settings.nas_user, settings.nas_pass)
image_cache = ImageCache(settings.image_cache_dir, settings.image_cache_max_size_mb * 1024 * 1024)
allowed_albums_list = [x.strip() for x in settings.allowed_albums.split(",")]
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await syno_client.login()
    yield
    await syno_client.close()

app = FastAPI(lifespan=lifespan)

LOCATION_METADATA_KEYS = {
    "address",
    "coordinates",
    "geocoding",
    "geocodingid",
    "latitude",
    "latituderef",
    "lat",
    "location",
    "longitude",
    "longituderef",
    "lon",
    "lng",
    "position",
}

def strip_photo_location_metadata(value):
    if isinstance(value, dict):
        return {
            key: strip_photo_location_metadata(item)
            for key, item in value.items()
            if key.lower().replace("_", "").replace("-", "") not in LOCATION_METADATA_KEYS
            and not key.lower().startswith("gps")
        }
    if isinstance(value, list):
        return [strip_photo_location_metadata(item) for item in value]
    return value

@app.get("/api/albums")
async def get_albums():
    try:
        return await syno_client.get_albums(allowed_albums_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/albums/{album_id}")
async def get_album(album_id: str):
    try:
        items = await syno_client.get_album_items(album_id)
        if not settings.photo_map_enabled:
            items = [strip_photo_location_metadata(item) for item in items]
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=403, detail=str(e))

@app.get("/api/images/{item_id}")
async def get_image(item_id: str, cache_key: str, size: str = "sm", album_id: str = None):
    cacheable = size == "sm"
    cache_lock = None
    image_cache_key = None
    if cacheable:
        cache_scope = syno_client.get_image_cache_scope(album_id)
        image_cache_key = "\0".join((settings.nas_url, cache_scope, item_id, cache_key, size))
        cache_lock = await image_cache.lock_for(image_cache_key)
        await cache_lock.acquire()
        cached_image = await image_cache.get(image_cache_key)
        if cached_image:
            cache_path, content_type = cached_image
            cache_lock.release()
            return FileResponse(
                cache_path,
                media_type=content_type,
                headers={"Cache-Control": "public, max-age=86400", "X-Image-Cache": "HIT"},
            )

    try:
        response = await syno_client.stream_image(item_id, cache_key, size, album_id)
    except Exception as e:
        if cache_lock and cache_lock.locked():
            cache_lock.release()
        raise HTTPException(status_code=403, detail=str(e))
        
    if response.status_code != 200:
        await response.aclose()
        if cache_lock and cache_lock.locked():
            cache_lock.release()
        raise HTTPException(status_code=response.status_code, detail="Image introuvable")
    
    headers = {
        "Cache-Control": "public, max-age=86400",
        "Content-Type": response.headers.get("Content-Type", "image/jpeg")
    }
    
    async def stream_generator():
        cached_content = bytearray() if cacheable else None
        content_type = response.headers.get("Content-Type", "image/jpeg")
        stream_completed = False
        try:
            async for chunk in response.aiter_bytes():
                if cached_content is not None:
                    if len(cached_content) + len(chunk) <= image_cache.max_entry_bytes:
                        cached_content.extend(chunk)
                    else:
                        cached_content = None
                yield chunk
            stream_completed = True
        finally:
            try:
                await response.aclose()
            finally:
                try:
                    if stream_completed and cached_content is not None and image_cache_key:
                        await image_cache.store(image_cache_key, cached_content, content_type)
                except OSError:
                    logger.warning("Unable to write the thumbnail cache entry.", exc_info=True)
                finally:
                    if cache_lock and cache_lock.locked():
                        cache_lock.release()
            
    if cacheable:
        headers["X-Image-Cache"] = "MISS"
    return StreamingResponse(stream_generator(), headers=headers)

@app.get("/api/videos/{item_id}")
async def get_video(
    item_id: str,
    request: Request,
    cache_key: str,
    album_id: str = None,
    owner_user_id: str = None,
):
    if not cache_key:
        raise HTTPException(status_code=400, detail="Clé de cache de vidéo manquante")

    try:
        response = await syno_client.stream_video(
            item_id,
            cache_key,
            album_id,
            request.headers.get("range"),
            owner_user_id,
        )
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail="Identifiant de vidéo invalide")
    except (httpx.HTTPError, RuntimeError) as error:
        raise HTTPException(status_code=502, detail=str(error))

    content_type = response.headers.get("Content-Type", "")
    if response.status_code in (200, 206) and "application/json" in content_type.lower():
        try:
            body = await response.aread()
        finally:
            await response.aclose()
        try:
            details = json.loads(body)
        except (json.JSONDecodeError, UnicodeDecodeError):
            details = {}
        error = details.get("error", {})
        error_code = error.get("code") if isinstance(error, dict) else None
        detail = (
            f"Synology could not provide this video (API error {error_code})."
            if error_code
            else "Synology returned an invalid video response."
        )
        raise HTTPException(status_code=502, detail=detail)

    if response.status_code not in (200, 206, 416):
        await response.aclose()
        raise HTTPException(status_code=response.status_code, detail="Vidéo introuvable")

    headers = {
        "Cache-Control": "public, max-age=86400",
        "Content-Disposition": "inline",
    }
    for header in (
        "Content-Length",
        "Content-Range",
        "Accept-Ranges",
        "Content-Encoding",
        "ETag",
        "Last-Modified",
    ):
        if header in response.headers:
            headers[header] = response.headers[header]

    async def stream_generator():
        try:
            async for chunk in response.aiter_raw():
                yield chunk
        finally:
            await response.aclose()

    return StreamingResponse(
        stream_generator(),
        status_code=response.status_code,
        media_type=content_type or "video/mp4",
        headers=headers,
    )
    
@app.get("/api/config")
async def get_config():
    return {
        "title": settings.gallery_title,
        "photo_map_enabled": settings.photo_map_enabled,
    }

@app.get("/api/user")
async def get_user(request: Request):
    headers = request.headers
    username = headers.get("x-forwarded-preferred-username") or headers.get("x-forwarded-user")
    email = headers.get("x-forwarded-email")

    return {
        "authenticated": bool(username or email),
        "name": username,
        "username": username,
        "email": email,
    }

# Bien garder à la fin :)
os.makedirs("static", exist_ok=True)
app.mount("/", StaticFiles(directory="static", html=True), name="static")