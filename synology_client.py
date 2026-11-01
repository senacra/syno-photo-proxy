import httpx
import uuid
from typing import List, Optional

class SynologyPhotosAPI:
    def __init__(self, base_url: str, username: str, password: str):
        self.base_url = base_url.rstrip("/")
        self.username = username
        self.password = password
        self.client = httpx.AsyncClient(verify=False) # Désactiver verify si HTTPS local auto-signé
        self.sid = None
        
        # Dictionnaire secret en mémoire : { "secure_abc123": "vraie_passphrase_secrete" }
        self.album_passphrase_map = {}

    async def login(self):
        url = f"{self.base_url}/webapi/auth.cgi"
        params = {
            "api": "SYNO.API.Auth",
            "version": "3",
            "method": "login",
            "account": self.username,
            "passwd": self.password,
            "format": "cookie"
        }
        response = await self.client.get(url, params=params)
        data = response.json()
        if data.get("success"):
            self.sid = data["data"]["sid"]
            self.client.cookies.set("id", self.sid)
        else:
            raise Exception(f"Échec de l'authentification Synology: {data}")

    async def _request(self, api: str, method: str, version: int = 1, **kwargs):
        """Fonction utilitaire pour envoyer les requêtes au NAS"""
        if not self.sid:
            await self.login()
            
        url = f"{self.base_url}/webapi/entry.cgi"
        params = {
            "api": api,
            "version": str(version),
            "method": method,
            **kwargs
        }
        
        response = await self.client.get(url, params=params)
        return response.json()

    async def get_albums(self, allowed_ids: Optional[List[str]] = None) -> List[dict]:
        if not self.sid:
            await self.login()
        url = f"{self.base_url}/webapi/entry.cgi"
        
        # 1. Albums normaux
        params_owned = {
            "api": "SYNO.Foto.Browse.Album",
            "version": "1",
            "method": "list",
            "limit": 100,
            "additional": '["thumbnail"]'
        }
        response_owned = await self.client.get(url, params=params_owned)
        albums_owned = response_owned.json().get("data", {}).get("list", [])
        
        # 2. Albums partagés
        params_shared = {
            "api": "SYNO.Foto.Sharing.Misc",
            "version": "2",
            "method": "list_shared_with_me_album",
            "offset": 0,
            "limit": 50,
            "additional": '["sharing_info","thumbnail","access_permission"]',
            "sort_by": "share_modify_time",
            "sort_direction": "desc"
        }
        response_shared = await self.client.get(url, params=params_shared)
        albums_shared = response_shared.json().get("data", {}).get("list", [])
        
        albums = albums_owned + albums_shared
        
        if allowed_ids and allowed_ids[0] != "":
            albums = [a for a in albums if str(a["id"]) in allowed_ids]
            
        # SÉCURISATION : On masque la passphrase et on attribue un ID opaque
        for a in albums:
            if "passphrase" in a:
                real_passphrase = a["passphrase"]
                safe_id = f"secure_{uuid.uuid4().hex[:8]}"
                
                # Enregistrement secret côté serveur
                self.album_passphrase_map[safe_id] = real_passphrase
                
                # Remplacement pour le client
                a["id"] = safe_id
                a.pop("passphrase", None)
            
        return albums

    async def get_album_items(self, safe_album_id: str) -> list:
        kwargs = {
            "offset": 0,
            "limit": 500,
            "additional": '["thumbnail"]' 
        }
        
        # Récupération de la passphrase via l'ID sécurisé
        real_passphrase = self.album_passphrase_map.get(safe_album_id)
        
        if real_passphrase:
            kwargs["passphrase"] = real_passphrase
            # Déverrouillage de la permission sur le NAS
            await self._request(
                api="SYNO.Foto.Sharing.Passphrase",
                method="get_permission",
                version=1,
                passphrase=real_passphrase,
                exclude_public="false"
            )
        elif str(safe_album_id).isdigit():
            kwargs["album_id"] = int(safe_album_id)
        else:
            raise Exception("Identifiant d'album invalide ou non autorisé")
            
        data = await self._request("SYNO.Foto.Browse.Item", "list", version=1, **kwargs)
        if data.get("success"):
            return data.get("data", {}).get("list", [])
        
        print(f"-> ERREUR SYNOLOGY get_album_items : {data}")
        return []

    async def stream_image(self, item_id: str, cache_key: str, size: str = "sm", album_id: str = None):
        url = f"{self.base_url}/webapi/entry.cgi"
        
        params = {
            "api": "SYNO.Foto.Thumbnail",
            "version": "1",
            "method": "get",
            "id": int(item_id),
            "cache_key": cache_key,
            "type": "unit",
            "size": size # sm, m, xl
        }
        
        # Traduction de l'ID sécurisé en vraie passphrase en interne
        real_passphrase = self.album_passphrase_map.get(album_id)
        if real_passphrase:
            params["passphrase"] = real_passphrase
            
        request = self.client.build_request("GET", url, params=params)
        return await self.client.send(request, stream=True)

    async def close(self):
        await self.client.aclose()