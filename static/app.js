const elements = {
    title: document.getElementById('main-title'),
    pageTitle: document.getElementById('page-title'),
    backBtn: document.getElementById('back-btn'),
    rulesDialog: document.getElementById('rules-dialog'),
    rulesAccept: document.getElementById('rules-accept'),
    languageSelect: document.getElementById('language-select'),
    loader: document.getElementById('loader'),
    albumsContainer: document.getElementById('albums-container'),
    photosContainer: document.getElementById('photos-container'),
    accountName: document.getElementById('account-name'),
    accountEmail: document.getElementById('account-email'),
    accountAvatar: document.getElementById('account-avatar'),
    accountGuestIcon: document.getElementById('account-guest-icon'),
    accountToggle: document.getElementById('account-toggle'),
    accountMenu: document.getElementById('account-menu'),
    themeToggle: document.getElementById('theme-toggle'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),
    lightboxCounter: document.getElementById('lightbox-counter')
};

const translations = {
    fr: {
        language: 'Choisir la langue',
        defaultGalleryTitle: 'Galerie Photos',
        account: 'Compte',
        guest: 'Invité',
        accountMenuOpen: 'Ouvrir le menu du compte',
        accountMenuClose: 'Fermer le menu du compte',
        profileUnavailable: 'Profil indisponible',
        backAlbums: '← Retour aux albums',
        loadingMemories: 'Chargement des souvenirs...',
        themeToLight: 'Activer le thème clair',
        themeToDark: 'Activer le thème sombre',
        rulesEyebrow: 'Un espace privé',
        rulesTitle: 'Avant de découvrir les souvenirs',
        rulesIntroPrefix: 'Cet espace a été créé pour partager nos souvenirs en toute intimité,',
        rulesIntroEmphasis: 'sans intermédiaire commercial ni stockage sur des serveurs tiers',
        rulesSocialNetworks: "Héberger ses photos sur les réseaux sociaux (Facebook, Instagram, WhatsApp, Snapchat, etc.), c'est confier sa vie privée à des entreprises qui les analysent, les monétisent et s'en servent pour entraîner leurs intelligences artificielles.",
        rulesLocalStorage: 'Ici, tout reste à la maison, directement sur notre propre matériel.',
        rulesNoticeTitle: 'Merci de respecter cette règle :',
        rulesNoticeText: 'Ne téléchargez pas les photos pour les réexpédier ou les publier sur les réseaux sociaux ou des applications de messagerie.',
        rulesAccept: 'J’accepte les règles et je continue',
        lightboxClose: 'Fermer',
        photoPrevious: 'Photo précédente',
        photoNext: 'Photo suivante',
        photoPreview: 'Aperçu de la photo',
        requestError: 'Erreur : {status}'
    },
    en: {
        language: 'Choose language',
        defaultGalleryTitle: 'Photo Gallery',
        account: 'Account',
        guest: 'Guest',
        accountMenuOpen: 'Open account menu',
        accountMenuClose: 'Close account menu',
        profileUnavailable: 'Profile unavailable',
        backAlbums: '← Back to albums',
        loadingMemories: 'Loading memories...',
        themeToLight: 'Switch to light theme',
        themeToDark: 'Switch to dark theme',
        rulesEyebrow: 'A private space',
        rulesTitle: 'Before exploring the memories',
        rulesIntroPrefix: 'This space was created to share our memories in privacy,',
        rulesIntroEmphasis: 'without commercial intermediaries or storage on third-party servers',
        rulesSocialNetworks: 'Hosting photos on social networks (Facebook, Instagram, WhatsApp, Snapchat, etc.) means entrusting your privacy to companies that analyze and monetize them, and use them to train their artificial intelligence.',
        rulesLocalStorage: 'Here, everything stays at home, on our own hardware.',
        rulesNoticeTitle: 'Please respect this important rule:',
        rulesNoticeText: 'Do not download photos to forward them or post them on social networks or messaging apps.',
        rulesAccept: 'I agree to the rules and continue',
        lightboxClose: 'Close',
        photoPrevious: 'Previous photo',
        photoNext: 'Next photo',
        photoPreview: 'Photo preview',
        requestError: 'Error: {status}'
    },
    es: {
        language: 'Elegir idioma',
        defaultGalleryTitle: 'Galería de fotos',
        account: 'Cuenta',
        guest: 'Invitado',
        accountMenuOpen: 'Abrir menú de cuenta',
        accountMenuClose: 'Cerrar menú de cuenta',
        profileUnavailable: 'Perfil no disponible',
        backAlbums: '← Volver a los álbumes',
        loadingMemories: 'Cargando recuerdos...',
        themeToLight: 'Activar tema claro',
        themeToDark: 'Activar tema oscuro',
        rulesEyebrow: 'Un espacio privado',
        rulesTitle: 'Antes de descubrir los recuerdos',
        rulesIntroPrefix: 'Este espacio se creó para compartir nuestros recuerdos en privado,',
        rulesIntroEmphasis: 'sin intermediarios comerciales ni almacenamiento en servidores de terceros',
        rulesSocialNetworks: 'Alojar fotos en redes sociales (Facebook, Instagram, WhatsApp, Snapchat, etc.) significa confiar tu privacidad a empresas que las analizan, las monetizan y las utilizan para entrenar sus inteligencias artificiales.',
        rulesLocalStorage: 'Aquí, todo se queda en casa, directamente en nuestro propio equipo.',
        rulesNoticeTitle: 'Por favor, respeta esta regla importante:',
        rulesNoticeText: 'No descargues las fotos para reenviarlas ni publicarlas en redes sociales o aplicaciones de mensajería.',
        rulesAccept: 'Acepto las reglas y continuar',
        lightboxClose: 'Cerrar',
        photoPrevious: 'Foto anterior',
        photoNext: 'Foto siguiente',
        photoPreview: 'Vista previa de la foto',
        requestError: 'Error: {status}'
    },
    de: {
        language: 'Sprache auswählen',
        defaultGalleryTitle: 'Fotogalerie',
        account: 'Konto',
        guest: 'Gast',
        accountMenuOpen: 'Kontomenü öffnen',
        accountMenuClose: 'Kontomenü schließen',
        profileUnavailable: 'Profil nicht verfügbar',
        backAlbums: '← Zurück zu den Alben',
        loadingMemories: 'Erinnerungen werden geladen...',
        themeToLight: 'Helles Design aktivieren',
        themeToDark: 'Dunkles Design aktivieren',
        rulesEyebrow: 'Ein privater Bereich',
        rulesTitle: 'Bevor du die Erinnerungen entdeckst',
        rulesIntroPrefix: 'Dieser Bereich wurde geschaffen, um unsere Erinnerungen privat zu teilen,',
        rulesIntroEmphasis: 'ohne kommerzielle Vermittler und ohne Speicherung auf Servern Dritter',
        rulesSocialNetworks: 'Wer Fotos in sozialen Netzwerken (Facebook, Instagram, WhatsApp, Snapchat usw.) speichert, vertraut seine Privatsphäre Unternehmen an, die die Fotos analysieren, vermarkten und zum Trainieren ihrer künstlichen Intelligenz verwenden.',
        rulesLocalStorage: 'Hier bleibt alles zu Hause, direkt auf unserer eigenen Hardware.',
        rulesNoticeTitle: 'Bitte beachte diese wichtige Regel:',
        rulesNoticeText: 'Lade Fotos nicht herunter, um sie weiterzuleiten oder in sozialen Netzwerken oder Messenger-Apps zu veröffentlichen.',
        rulesAccept: 'Ich stimme den Regeln zu und fahre fort',
        lightboxClose: 'Schließen',
        photoPrevious: 'Vorheriges Foto',
        photoNext: 'Nächstes Foto',
        photoPreview: 'Fotovorschau',
        requestError: 'Fehler: {status}'
    },
    pt: {
        language: 'Escolher idioma',
        defaultGalleryTitle: 'Galeria de fotografias',
        account: 'Conta',
        guest: 'Visitante',
        accountMenuOpen: 'Abrir menu da conta',
        accountMenuClose: 'Fechar menu da conta',
        profileUnavailable: 'Perfil indisponível',
        backAlbums: '← Voltar aos álbuns',
        loadingMemories: 'A carregar as memórias...',
        themeToLight: 'Ativar tema claro',
        themeToDark: 'Ativar tema escuro',
        rulesEyebrow: 'Um espaço privado',
        rulesTitle: 'Antes de descobrir as memórias',
        rulesIntroPrefix: 'Este espaço foi criado para partilhar as nossas memórias com privacidade,',
        rulesIntroEmphasis: 'sem intermediários comerciais nem armazenamento em servidores de terceiros',
        rulesSocialNetworks: 'Alojar fotografias nas redes sociais (Facebook, Instagram, WhatsApp, Snapchat, etc.) significa confiar a sua privacidade a empresas que as analisam, rentabilizam e utilizam para treinar as suas inteligências artificiais.',
        rulesLocalStorage: 'Aqui, tudo fica em casa, diretamente no nosso próprio equipamento.',
        rulesNoticeTitle: 'Por favor, respeite esta regra importante:',
        rulesNoticeText: 'Não descarregue fotografias para as reencaminhar ou publicar nas redes sociais ou em aplicações de mensagens.',
        rulesAccept: 'Aceito as regras e quero continuar',
        lightboxClose: 'Fechar',
        photoPrevious: 'Fotografia anterior',
        photoNext: 'Fotografia seguinte',
        photoPreview: 'Pré-visualização da fotografia',
        requestError: 'Erro: {status}'
    }
};

const LANGUAGE_STORAGE_KEY = 'syno-photo-proxy-language';
let currentLanguage = 'fr';
let currentUser = null;
let userLoadFailed = false;
let galleryTitle = 'Galerie Photos';
let hasCustomGalleryTitle = false;
let currentAlbumName = null;
const RULES_ACCEPTED_KEY = 'syno-photo-proxy-rules-accepted';
const THEME_STORAGE_KEY = 'syno-photo-proxy-theme';
let lightboxPhotos = [];
let currentPhotoIndex = 0;
let touchStart = null;

try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && Object.hasOwn(translations, savedLanguage)) {
        currentLanguage = savedLanguage;
    } else {
        const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
        const browserLanguage = browserLanguages
            .map(language => language.toLowerCase().split('-')[0])
            .find(language => Object.hasOwn(translations, language));
        if (browserLanguage) currentLanguage = browserLanguage;
    }
} catch (error) {
    console.error('Impossible de charger la langue enregistrée.', error);
}

function translate(key, values = {}) {
    let text = translations[currentLanguage][key] || translations.fr[key];
    for (const [name, value] of Object.entries(values)) {
        text = text.replaceAll(`{${name}}`, value);
    }
    return text;
}

function updateAccountDisplay() {
    if (userLoadFailed) {
        elements.accountName.textContent = translate('profileUnavailable');
        elements.accountAvatar.textContent = '!';
        elements.accountAvatar.classList.remove('hidden');
        elements.accountGuestIcon.classList.add('hidden');
        return;
    }

    if (!currentUser?.authenticated) {
        elements.accountName.textContent = translate('guest');
        elements.accountAvatar.classList.add('hidden');
        elements.accountGuestIcon.classList.remove('hidden');
        elements.accountEmail.textContent = '';
        elements.accountEmail.classList.add('hidden');
        return;
    }

    const displayName = currentUser.name || currentUser.username || currentUser.email || 'Utilisateur';
    elements.accountName.textContent = displayName;
    elements.accountAvatar.textContent = displayName.trim().charAt(0).toLocaleUpperCase(currentLanguage);
    elements.accountAvatar.classList.remove('hidden');
    elements.accountGuestIcon.classList.add('hidden');
    if (currentUser.email) {
        elements.accountEmail.textContent = currentUser.email;
        elements.accountEmail.classList.remove('hidden');
    } else {
        elements.accountEmail.textContent = '';
        elements.accountEmail.classList.add('hidden');
    }
}

function applyLanguage() {
    document.documentElement.lang = currentLanguage;
    elements.languageSelect.value = currentLanguage;
    elements.languageSelect.setAttribute('aria-label', translate('language'));
    elements.languageSelect.title = translate('language');

    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
    });

    if (!hasCustomGalleryTitle) galleryTitle = translate('defaultGalleryTitle');
    updateGalleryTitles();
    updateThemeToggle();
    updateAccountDisplay();
    elements.accountToggle.setAttribute(
        'aria-label',
        translate(elements.accountMenu.classList.contains('hidden') ? 'accountMenuOpen' : 'accountMenuClose')
    );
    if (!elements.lightbox.classList.contains('hidden')) updateLightboxPhoto();
}

function updateGalleryTitles() {
    elements.title.textContent = currentAlbumName || galleryTitle;
    elements.pageTitle.textContent = currentAlbumName
        ? `${currentAlbumName} - ${galleryTitle}`
        : galleryTitle;
}

elements.languageSelect.value = currentLanguage;
applyLanguage();
elements.languageSelect.addEventListener('change', () => {
    currentLanguage = elements.languageSelect.value;
    applyLanguage();
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch (error) {
        console.error('Impossible de mémoriser la langue choisie.', error);
    }
});

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

function getActiveTheme() {
    return document.documentElement.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function updateThemeToggle() {
    const activeTheme = getActiveTheme();
    elements.themeToggle.setAttribute('aria-pressed', String(activeTheme === 'dark'));
    const label = translate(activeTheme === 'dark' ? 'themeToLight' : 'themeToDark');
    elements.themeToggle.setAttribute('aria-label', label);
    elements.themeToggle.title = label;
}

try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
        document.documentElement.dataset.theme = savedTheme;
    }
} catch (error) {
    console.error('Impossible de charger le thème enregistré.', error);
}
updateThemeToggle();

elements.themeToggle.onclick = () => {
    const nextTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    updateThemeToggle();
    try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
        console.error('Impossible de mémoriser le thème choisi.', error);
    }
};

elements.accountToggle.onclick = () => {
    const isExpanded = elements.accountToggle.getAttribute('aria-expanded') === 'true';
    elements.accountToggle.setAttribute('aria-expanded', String(!isExpanded));
    elements.accountMenu.classList.toggle('hidden', isExpanded);
    elements.accountToggle.setAttribute('aria-label', translate(isExpanded ? 'accountMenuOpen' : 'accountMenuClose'));
};

document.addEventListener('click', event => {
    if (!elements.accountMenu.classList.contains('hidden') &&
        !elements.accountMenu.contains(event.target) &&
        !elements.accountToggle.contains(event.target)) {
        elements.accountMenu.classList.add('hidden');
        elements.accountToggle.setAttribute('aria-expanded', 'false');
        elements.accountToggle.setAttribute('aria-label', translate('accountMenuOpen'));
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !elements.accountMenu.classList.contains('hidden')) {
        elements.accountMenu.classList.add('hidden');
        elements.accountToggle.setAttribute('aria-expanded', 'false');
        elements.accountToggle.setAttribute('aria-label', translate('accountMenuOpen'));
        elements.accountToggle.focus();
    }
});

async function loadUser() {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error(`Erreur lors du chargement du compte : ${response.status}`);
        currentUser = await response.json();
        updateAccountDisplay();
    } catch (error) {
        console.error('Impossible de charger les informations du compte.', error);
        userLoadFailed = true;
        updateAccountDisplay();
    }
}

async function loadConfig() {
    try {
        const res = await fetch('/api/config');
        const data = await res.json();
        if (data.title) {
            hasCustomGalleryTitle = data.title !== 'Galerie Photos';
            galleryTitle = hasCustomGalleryTitle ? data.title : translate('defaultGalleryTitle');
            updateGalleryTitles();
        }
    } catch (e) {
        elements.title.textContent = galleryTitle;
    }
}

async function fetchAPI(url) {
    elements.loader.classList.remove('hidden');
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(translate('requestError', { status: res.status }));
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
    currentAlbumName = null;
    elements.albumsContainer.classList.remove('hidden');
    elements.photosContainer.classList.add('hidden');
    elements.backBtn.classList.add('hidden');
    updateGalleryTitles();
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
    currentAlbumName = albumName;
    elements.albumsContainer.classList.add('hidden');
    elements.photosContainer.classList.remove('hidden');
    elements.backBtn.classList.remove('hidden');
    updateGalleryTitles();
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
        lightboxPhotos.push({ url: highResUrl, alt: photo.filename || translate('photoPreview') });
        
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
    const numberFormatter = new Intl.NumberFormat(currentLanguage);
    elements.lightboxCounter.textContent = `${numberFormatter.format(currentPhotoIndex + 1)} / ${numberFormatter.format(lightboxPhotos.length)}`;
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

loadUser();
loadConfig().then(() => loadAlbums());