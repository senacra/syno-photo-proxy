const elements = {
    title: document.getElementById('main-title'),
    pageTitle: document.getElementById('page-title'),
    backBtn: document.getElementById('back-btn'),
    loader: document.getElementById('loader'),
    albumsContainer: document.getElementById('albums-container'),
    photosContainer: document.getElementById('photos-container'),
    welcomeBanner: document.getElementById('welcome-banner'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close')
};

let galleryTitle = "Galerie Photos";

async function loadConfig() {
    try {
        const res = await fetch('/api/config');
        const data = await res.json();
        if (data.title) {
            galleryTitle = data.title;
            elements.title.textContent = galleryTitle;
            if (elements.pageTitle) elements.pageTitle.textContent = galleryTitle;
        }
    } catch (e) {
        elements.title.textContent = galleryTitle;
    }
}

async function fetchAPI(url) {
    elements.loader.classList.remove('hidden');
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erreur: ${res.status}`);
        const data = await res.json();
        return data.items || data; 
    } catch (err) {
        alert(err.message);
        return [];
    } finally {
        elements.loader.classList.add('hidden');
    }
}

async function loadAlbums() {
    elements.albumsContainer.classList.remove('hidden');
    elements.photosContainer.classList.add('hidden');
    elements.backBtn.classList.add('hidden');
    if (elements.welcomeBanner) elements.welcomeBanner.classList.remove('hidden');
    elements.title.textContent = galleryTitle;
    if (elements.pageTitle) elements.pageTitle.textContent = galleryTitle;
    elements.albumsContainer.innerHTML = '';

    const albums = await fetchAPI('/api/albums');
    
    albums.forEach(album => {
        const cacheKey = album.additional?.thumbnail?.cache_key || '';
        const albumId = album.id;
        
        let thumbHtml = `<div class="card-img-wrapper" style="color:var(--text-secondary);">📁</div>`;
        const coverId = album.additional?.thumbnail?.unit_id || album.cover_id;
        
        if (coverId && cacheKey) {
            const thumbUrl = `/api/images/${coverId}?cache_key=${cacheKey}&size=sm&album_id=${albumId}`;
            thumbHtml = `<div class="card-img-wrapper"><img src="${thumbUrl}" loading="lazy" alt="${album.name}"></div>`;
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => loadPhotos(album.id, album.name);
        card.innerHTML = `
            ${thumbHtml}
            <div class="card-title">${album.name}</div>
        `;
        elements.albumsContainer.appendChild(card);
    });
}

async function loadPhotos(albumId, albumName) {
    elements.albumsContainer.classList.add('hidden');
    elements.photosContainer.classList.remove('hidden');
    elements.backBtn.classList.remove('hidden');
    if (elements.welcomeBanner) elements.welcomeBanner.classList.add('hidden'); // Masque le texte d'accueil dans l'album
    elements.title.textContent = albumName;
    if (elements.pageTitle) elements.pageTitle.textContent = `${albumName} - ${galleryTitle}`;
    elements.photosContainer.innerHTML = '';

    const photos = await fetchAPI(`/api/albums/${albumId}`);
    
    photos.forEach(photo => {
        const cacheKey = photo.additional?.thumbnail?.cache_key || '';
        
        const paramsSm = new URLSearchParams({ cache_key: cacheKey, size: 'sm', album_id: albumId });
        const paramsXl = new URLSearchParams({ cache_key: cacheKey, size: 'xl', album_id: albumId });
        
        const imgUrl = `/api/images/${photo.id}?${paramsSm.toString()}`;
        const highResUrl = `/api/images/${photo.id}?${paramsXl.toString()}`;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openLightbox(highResUrl);
        card.innerHTML = `<div class="card-img-wrapper"><img src="${imgUrl}" loading="lazy" alt="${photo.filename}"></div>`;
        elements.photosContainer.appendChild(card);
    });
}

function openLightbox(url) {
    elements.lightboxImg.src = url;
    elements.lightbox.classList.remove('hidden');
}

elements.lightboxClose.onclick = () => {
    elements.lightbox.classList.add('hidden');
    elements.lightboxImg.src = '';
};

elements.backBtn.onclick = loadAlbums;

loadConfig().then(() => loadAlbums());