from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic_settings import BaseSettings, SettingsConfigDict
from contextlib import asynccontextmanager
import os

from synology_client import SynologyPhotosAPI

class Settings(BaseSettings):
    nas_url: str
    nas_user: str
    nas_pass: str
    allowed_albums: str = ""
    gallery_title: str = "Galerie Photos"
    photo_map_enabled: bool = False
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
syno_client = SynologyPhotosAPI(settings.nas_url, settings.nas_user, settings.nas_pass)
allowed_albums_list = [x.strip() for x in settings.allowed_albums.split(",")]

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
    try:
        response = await syno_client.stream_image(item_id, cache_key, size, album_id)
    except Exception as e:
        raise HTTPException(status_code=403, detail=str(e))
        
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Image introuvable")
    
    headers = {
        "Cache-Control": "public, max-age=86400",
        "Content-Type": response.headers.get("Content-Type", "image/jpeg")
    }
    
    async def stream_generator():
        async for chunk in response.aiter_bytes():
            yield chunk
            
    return StreamingResponse(stream_generator(), headers=headers)
    
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