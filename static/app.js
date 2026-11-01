const elements = {
    title: document.getElementById('main-title'),
    pageTitle: document.getElementById('page-title'),
    backBtn: document.getElementById('back-btn'),
    rulesDialog: document.getElementById('rules-dialog'),
    rulesAccept: document.getElementById('rules-accept'),
    loader: document.getElementById('loader'),
    albumsContainer: document.getElementById('albums-container'),
    photosContainer: document.getElementById('photos-container'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),
    lightboxCounter: document.getElementById('lightbox-counter')
};

let galleryTitle = "Galerie Photos";
const RULES_ACCEPTED_KEY = 'syno-photo-proxy-rules-accepted';
let lightboxPhotos = [];
let currentPhotoIndex = 0;
let touchStart = null;

let rulesAccepted = false;
try {
    rulesAccepted = localStorage.getItem(RULES_ACCEPTED_KEY) === 'true';
} catch (error) {
    console.error('Impossible de vérifier l’acceptation des règles.', error);
}

if (!rulesAccepted) {
    elements.rulesDialog.showModal();
}

elements.rulesDialog.addEventListener('cancel', event => event.preventDefault());
elements.rulesAccept.onclick = () => {
    try {
        localStorage.setItem(RULES_ACCEPTED_KEY, 'true');
    } catch (error) {
        console.error('Impossible de mémoriser l’acceptation des règles.', error);
    }
    elements.rulesDialog.close();
};

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
    elements.title.textContent = albumName;
    if (elements.pageTitle) elements.pageTitle.textContent = `${albumName} - ${galleryTitle}`;
    elements.photosContainer.innerHTML = '';

    const photos = await fetchAPI(`/api/albums/${albumId}`);
    lightboxPhotos = [];
    
    photos.forEach(photo => {
        const cacheKey = photo.additional?.thumbnail?.cache_key || '';
        
        const paramsSm = new URLSearchParams({ cache_key: cacheKey, size: 'sm', album_id: albumId });
        const paramsXl = new URLSearchParams({ cache_key: cacheKey, size: 'xl', album_id: albumId });
        
        const imgUrl = `/api/images/${photo.id}?${paramsSm.toString()}`;
        const highResUrl = `/api/images/${photo.id}?${paramsXl.toString()}`;
        const photoIndex = lightboxPhotos.length;
        lightboxPhotos.push({ url: highResUrl, alt: photo.filename || 'Photo' });
        
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openLightbox(photoIndex);
        card.innerHTML = `<div class="card-img-wrapper"><img src="${imgUrl}" loading="lazy" alt="${photo.filename}"></div>`;
        elements.photosContainer.appendChild(card);
    });
}

function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxPhoto();
    elements.lightbox.classList.remove('hidden');
}

function updateLightboxPhoto() {
    const photo = lightboxPhotos[currentPhotoIndex];
    if (!photo) return;

    elements.lightboxImg.src = photo.url;
    elements.lightboxImg.alt = photo.alt;
    elements.lightboxPrev.disabled = currentPhotoIndex === 0;
    elements.lightboxNext.disabled = currentPhotoIndex === lightboxPhotos.length - 1;
    elements.lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${lightboxPhotos.length}`;
}

function showPreviousPhoto() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex -= 1;
        updateLightboxPhoto();
    }
}

function showNextPhoto() {
    if (currentPhotoIndex < lightboxPhotos.length - 1) {
        currentPhotoIndex += 1;
        updateLightboxPhoto();
    }
}

function closeLightbox() {
    elements.lightbox.classList.add('hidden');
    elements.lightboxImg.src = '';
}

elements.lightboxClose.onclick = () => {
    closeLightbox();
};
elements.lightboxPrev.onclick = showPreviousPhoto;
elements.lightboxNext.onclick = showNextPhoto;

elements.lightbox.addEventListener('pointerdown', event => {
    if (event.target === elements.lightboxImg && event.pointerType === 'touch') {
        touchStart = { x: event.clientX, y: event.clientY };
    }
});

elements.lightbox.addEventListener('pointerup', event => {
    if (!touchStart) return;
    const deltaX = event.clientX - touchStart.x;
    const deltaY = event.clientY - touchStart.y;
    touchStart = null;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) showNextPhoto();
        else showPreviousPhoto();
    }
});

elements.lightbox.addEventListener('pointercancel', () => {
    touchStart = null;
});

document.addEventListener('keydown', event => {
    if (elements.lightbox.classList.contains('hidden')) return;
    if (event.key === 'ArrowLeft') showPreviousPhoto();
    else if (event.key === 'ArrowRight') showNextPhoto();
    else if (event.key === 'Escape') closeLightbox();
});

elements.backBtn.onclick = loadAlbums;

loadConfig().then(() => loadAlbums());