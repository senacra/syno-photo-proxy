from fastapi import FastAPI, HTTPException
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
    return {"title": settings.gallery_title}

# Bien garder à la fin :)
os.makedirs("static", exist_ok=True)
app.mount("/", StaticFiles(directory="static", html=True), name="static")