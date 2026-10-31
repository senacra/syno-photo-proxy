# Synology Photos BFF Proxy 📸

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A lightweight web service based on a **BFF (Backend-For-Frontend)** architecture to securely expose specific photo albums from a Synology NAS on the internet, without directly exposing the NAS itself.

---

## 🛡️ Security & Architecture

* **Total Isolation:** The Synology NAS hosting your photos remains completely isolated from the web. Only this proxy service (FastAPI) is publicly accessible.
* **Restricted Account & Reverse Engineering:** Uses a dedicated local account with minimal permissions. The system cleverly handles album sharing (including albums shared with the account without it being the initial creator) using opaque memory-mapped IDs (`secure_xxx`) and seamless passphrase management.
* **Optimized Streaming:** Images and thumbnails are streamed on-the-fly from the NAS to the client with HTTP cache headers (`Cache-Control`) to reduce bandwidth and server load.

---

## 📂 Project Structure

``` text
├── main.py              # FastAPI backend, routing, and static file serving
├── synology_client.py   # Synology API wrapper (Auth, Albums, Items, Stream)
├── requirements.txt     # Python dependencies
├── .env                 # Environment configuration (ignored in git)
└── static/              # Frontend static files
    ├── index.html       # Main HTML gallery interface
    ├── style.css        # Modern responsive CSS (GitHub alert style & light/dark mode)
    └── app.js           # Frontend logic (API fetch, grid rendering, lightbox)
```

---

## 🛠️ Tech Stack

* **Backend:** Python 3.10+, [FastAPI](https://fastapi.tiangolo.com/), `httpx` (asynchronous HTTP client for DSM API), `pydantic-settings`.
* **Frontend:** HTML5, CSS3 (Vanilla with native `light-dark()` support), Vanilla JavaScript.

---

## ⚙️ Configuration & Setup

### 1. Environment Variables
Create a `.env` file in the root directory of the project (see `.env_EXAMPLE`):

``` env
nas_url=https://192.168.1.100:5001
nas_user=my_minimal_user
nas_pass=my_secure_password
allowed_albums=1,2,42
gallery_title=Our Family Memories
```

### 2. Install Dependencies
``` bash
pip install -r requirements.txt
```

### 3. Run the Development Server
``` bash
uvicorn main:app --reload --port 8000
```
Open your browser and navigate to `http://localhost:8000`.

---

## 📄 Main API Endpoints

* `GET /api/config` : Retrieves general configuration (e.g., gallery title).
* `GET /api/albums` : Lists authorized albums masked by secure IDs.
* `GET /api/albums/{album_id}` : Returns the list of photos for a specific album.
* `GET /api/images/{item_id}` : Proxy route to securely stream thumbnails and images from the Synology NAS.

---

## 📌 Roadmap (TodoList)

- [ ] **Docker Containerization:** Create an optimized `Dockerfile` and `docker-compose.yml` to simplify deployment on a server or a Synology NAS (via Container Manager).
- [ ] **User Management & External Authentication:** Implement an authentication layer (support for an authentication reverse proxy like Authelia / Authentik or OIDC integration) to restrict gallery access.
- [ ] **Internationalization (i18n):** Add multi-language support directly into the frontend interface.
- [ ] **UI / UX Improvements:** 
  - Add a slideshow mode in the Lightbox.
  - Enable selective or batch downloading of images.
  - Enhance transitions and mobile ergonomics.

---

## 📝 License
This project is licensed under the MIT License.