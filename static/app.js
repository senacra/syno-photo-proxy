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
    lightboxVideo: document.getElementById('lightbox-video'),
    lightboxVideoError: document.getElementById('lightbox-video-error'),
    lightboxInfo: document.getElementById('lightbox-info'),
    metadataList: document.getElementById('metadata-list'),
    metadataEmpty: document.getElementById('metadata-empty'),
    photoMap: document.getElementById('photo-map'),
    mapError: document.getElementById('map-error'),
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
        videoPlayer: 'Lecteur vidéo',
        videoUnsupported: 'Cette vidéo ne peut pas être lue. Son format ou son codec n’est peut-être pas compatible avec votre navigateur.',
        photoPreview: 'Aperçu de la photo',
        photoDetails: 'Informations sur la photo',
        photoInfoShow: 'Afficher les informations de la photo',
        photoInfoHide: 'Masquer les informations de la photo',
        metadataUnavailable: 'Aucune métadonnée disponible pour cette photo.',
        photoDate: 'Date',
        photoCamera: 'Appareil photo',
        photoLens: 'Objectif',
        photoAperture: 'Ouverture',
        photoExposure: 'Exposition',
        photoIso: 'ISO',
        photoFocalLength: 'Longueur focale',
        photoResolution: 'Dimensions',
        photoLocation: 'Position GPS',
        photoMap: 'Carte indiquant la position de la photo',
        mapUnavailable: 'La carte n’a pas pu être chargée.',
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
        videoPlayer: 'Video player',
        videoUnsupported: 'This video cannot be played. Its format or codec may not be supported by your browser.',
        photoPreview: 'Photo preview',
        photoDetails: 'Photo details',
        photoInfoShow: 'Show photo details',
        photoInfoHide: 'Hide photo details',
        metadataUnavailable: 'No metadata is available for this photo.',
        photoDate: 'Date',
        photoCamera: 'Camera',
        photoLens: 'Lens',
        photoAperture: 'Aperture',
        photoExposure: 'Exposure',
        photoIso: 'ISO',
        photoFocalLength: 'Focal length',
        photoResolution: 'Dimensions',
        photoLocation: 'GPS location',
        photoMap: 'Map showing the photo location',
        mapUnavailable: 'The map could not be loaded.',
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
        videoPlayer: 'Reproductor de vídeo',
        videoUnsupported: 'No se puede reproducir este vídeo. Es posible que tu navegador no admita su formato o códec.',
        photoPreview: 'Vista previa de la foto',
        photoDetails: 'Información de la foto',
        photoInfoShow: 'Mostrar información de la foto',
        photoInfoHide: 'Ocultar información de la foto',
        metadataUnavailable: 'No hay metadatos disponibles para esta foto.',
        photoDate: 'Fecha',
        photoCamera: 'Cámara',
        photoLens: 'Objetivo',
        photoAperture: 'Apertura',
        photoExposure: 'Exposición',
        photoIso: 'ISO',
        photoFocalLength: 'Distancia focal',
        photoResolution: 'Dimensiones',
        photoLocation: 'Ubicación GPS',
        photoMap: 'Mapa con la ubicación de la foto',
        mapUnavailable: 'No se pudo cargar el mapa.',
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
        videoPlayer: 'Videoplayer',
        videoUnsupported: 'Dieses Video kann nicht wiedergegeben werden. Dein Browser unterstützt möglicherweise das Format oder den Codec nicht.',
        photoPreview: 'Fotovorschau',
        photoDetails: 'Fotoinformationen',
        photoInfoShow: 'Fotoinformationen anzeigen',
        photoInfoHide: 'Fotoinformationen ausblenden',
        metadataUnavailable: 'Für dieses Foto sind keine Metadaten verfügbar.',
        photoDate: 'Datum',
        photoCamera: 'Kamera',
        photoLens: 'Objektiv',
        photoAperture: 'Blende',
        photoExposure: 'Belichtung',
        photoIso: 'ISO',
        photoFocalLength: 'Brennweite',
        photoResolution: 'Abmessungen',
        photoLocation: 'GPS-Position',
        photoMap: 'Karte mit dem Standort des Fotos',
        mapUnavailable: 'Die Karte konnte nicht geladen werden.',
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
        videoPlayer: 'Leitor de vídeo',
        videoUnsupported: 'Não é possível reproduzir este vídeo. O formato ou codec pode não ser suportado pelo seu navegador.',
        photoPreview: 'Pré-visualização da fotografia',
        photoDetails: 'Informações da fotografia',
        photoInfoShow: 'Mostrar informações da fotografia',
        photoInfoHide: 'Ocultar informações da fotografia',
        metadataUnavailable: 'Não existem metadados disponíveis para esta fotografia.',
        photoDate: 'Data',
        photoCamera: 'Câmara',
        photoLens: 'Objetiva',
        photoAperture: 'Abertura',
        photoExposure: 'Exposição',
        photoIso: 'ISO',
        photoFocalLength: 'Distância focal',
        photoResolution: 'Dimensões',
        photoLocation: 'Localização GPS',
        photoMap: 'Mapa com a localização da fotografia',
        mapUnavailable: 'Não foi possível carregar o mapa.',
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
let photoMap = null;
let photoMapMarker = null;
let leafletLoadPromise = null;
let photoMapEnabled = false;

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
    const metadataIsOpen = elements.lightboxInfo.getAttribute('aria-expanded') === 'true';
    elements.lightboxInfo.setAttribute(
        'aria-label',
        translate(metadataIsOpen ? 'photoInfoHide' : 'photoInfoShow')
    );

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
        if (!res.ok) throw new Error(`Erreur lors du chargement de la configuration : ${res.status}`);
        const data = await res.json();
        if (typeof data.photo_map_enabled !== 'boolean') {
            throw new Error('La configuration du serveur ne précise pas si la carte est activée.');
        }
        photoMapEnabled = data.photo_map_enabled;
        if (data.title) {
            hasCustomGalleryTitle = data.title !== 'Galerie Photos';
            galleryTitle = hasCustomGalleryTitle ? data.title : translate('defaultGalleryTitle');
            updateGalleryTitles();
        }
    } catch (e) {
        photoMapEnabled = false;
        console.error('Impossible de charger la configuration de la galerie.', e);
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
        const isVideo = isVideoItem(photo);
        
        const paramsSm = new URLSearchParams({ cache_key: cacheKey, size: 'sm', album_id: albumId });
        const paramsXl = new URLSearchParams({ cache_key: cacheKey, size: 'xl', album_id: albumId });
        const videoParams = new URLSearchParams({ cache_key: cacheKey, album_id: albumId });
        if (photo.owner_user_id !== undefined && photo.owner_user_id !== null) {
            videoParams.set('owner_user_id', String(photo.owner_user_id));
        }
        
        const imgUrl = `/api/images/${photo.id}?${paramsSm.toString()}`;
        const highResUrl = `/api/images/${photo.id}?${paramsXl.toString()}`;
        const photoIndex = lightboxPhotos.length;
        lightboxPhotos.push({
            url: highResUrl,
            videoUrl: `/api/videos/${photo.id}?${videoParams.toString()}`,
            isVideo,
            alt: photo.filename || translate('photoPreview'),
            metadata: photo
        });
        
        const card = document.createElement('div');
        card.className = isVideo ? 'card video-card' : 'card';
        card.onclick = () => openLightbox(photoIndex);
        card.innerHTML = `<div class="card-img-wrapper"><img src="${imgUrl}" loading="lazy" alt="${photo.filename || translate('photoPreview')}">${isVideo ? '<span class="video-play-indicator" aria-hidden="true">▶</span>' : ''}</div>`;
        card.querySelector('img').draggable = false;
        elements.photosContainer.appendChild(card);
    });
}

function isVideoItem(item) {
    if (typeof item?.type === 'string' && item.type.toLowerCase() === 'video') return true;
    if (typeof item?.media_type === 'string' && item.media_type.toLowerCase() === 'video') return true;
    return /\.(?:3gp|avi|m4v|mkv|mov|mp4|mpeg|mpg|ogv|webm)$/i.test(item?.filename || '');
}

function openLightbox(index) {
    currentPhotoIndex = index;
    setPhotoMetadataOpen(false);
    updateLightboxPhoto();
    elements.lightbox.classList.remove('hidden');
}

function getValue(object, names) {
    if (!object || typeof object !== 'object') return undefined;
    const entries = new Map(Object.entries(object).map(([key, value]) => [key.toLowerCase().replaceAll(/[_\s-]/g, ''), value]));
    for (const name of names) {
        const value = entries.get(name.toLowerCase().replaceAll(/[_\s-]/g, ''));
        if (value !== undefined && value !== null && value !== '') return value;
    }
    return undefined;
}

function parseExifNumber(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
        const fraction = value.match(/^\s*(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
        if (fraction) return Number(fraction[1]) / Number(fraction[2]);
        const number = Number(value);
        return Number.isFinite(number) ? number : null;
    }
    if (Array.isArray(value) && value.length === 2) {
        const numerator = parseExifNumber(value[0]);
        const denominator = parseExifNumber(value[1]);
        return numerator !== null && denominator ? numerator / denominator : null;
    }
    if (value && typeof value === 'object') {
        const numerator = getValue(value, ['numerator', 'num']);
        const denominator = getValue(value, ['denominator', 'den']);
        if (numerator !== undefined && denominator !== undefined) {
            const parsedNumerator = parseExifNumber(numerator);
            const parsedDenominator = parseExifNumber(denominator);
            return parsedNumerator !== null && parsedDenominator ? parsedNumerator / parsedDenominator : null;
        }
    }
    return null;
}

function parseCoordinate(value, reference, isLatitude) {
    let coordinate;
    if (Array.isArray(value) && value.length >= 3) {
        const degrees = parseExifNumber(value[0]);
        const minutes = parseExifNumber(value[1]);
        const seconds = parseExifNumber(value[2]);
        if (degrees === null || minutes === null || seconds === null) return null;
        coordinate = Math.abs(degrees) + minutes / 60 + seconds / 3600;
        if (degrees < 0) coordinate *= -1;
    } else {
        coordinate = parseExifNumber(value);
    }
    if (coordinate === null) return null;

    const direction = typeof reference === 'string' ? reference.trim().toUpperCase() : '';
    if (direction === 'S' || direction === 'W') coordinate = -Math.abs(coordinate);
    if (direction === 'N' || direction === 'E') coordinate = Math.abs(coordinate);
    const max = isLatitude ? 90 : 180;
    return Math.abs(coordinate) <= max ? coordinate : null;
}

function getPhotoGps(photo) {
    if (!photo || typeof photo !== 'object') return null;
    const additional = photo.additional || {};
    const exif = additional.exif || photo.exif || {};
    const gps = additional.gps || exif.gps || photo.gps || {};
    const latitudeValue = getValue(gps, ['latitude', 'lat', 'gpslatitude']) ??
        getValue(exif, ['gpslatitude', 'latitude']);
    const longitudeValue = getValue(gps, ['longitude', 'lon', 'lng', 'gpslongitude']) ??
        getValue(exif, ['gpslongitude', 'longitude']);
    const latitudeReference = getValue(gps, ['latitude_ref', 'lat_ref', 'gpslatituderef']) ??
        getValue(exif, ['gpslatituderef', 'latitude_ref']);
    const longitudeReference = getValue(gps, ['longitude_ref', 'lon_ref', 'gpslongituderef']) ??
        getValue(exif, ['gpslongituderef', 'longitude_ref']);
    const latitude = parseCoordinate(latitudeValue, latitudeReference, true);
    const longitude = parseCoordinate(longitudeValue, longitudeReference, false);

    return latitude === null || longitude === null ? null : { latitude, longitude };
}

function formatPhotoDate(value) {
    if (value === undefined) return null;
    let date;
    if (typeof value === 'number' || /^\d+(?:\.\d+)?$/.test(String(value))) {
        const timestamp = Number(value);
        date = new Date(timestamp < 100000000000 ? timestamp * 1000 : timestamp);
    } else {
        const normalized = String(value).replace(
            /^(\d{4}):(\d{2}):(\d{2})/,
            '$1-$2-$3'
        );
        date = new Date(normalized);
    }
    return Number.isNaN(date.getTime())
        ? String(value)
        : new Intl.DateTimeFormat(currentLanguage, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function formatPhotoResolution(value) {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && value.length >= 2) return `${value[0]} × ${value[1]}`;
    const width = getValue(value, ['width', 'w']);
    const height = getValue(value, ['height', 'h']);
    return width && height ? `${width} × ${height}` : null;
}

function formatExifValue(value) {
    if (typeof value === 'number' || typeof value === 'string') return value;
    if (Array.isArray(value) && value.length === 2) {
        const number = parseExifNumber(value);
        return number === null ? null : number;
    }
    if (value && typeof value === 'object') {
        const number = parseExifNumber(value);
        if (number !== null) return number;
        return getValue(value, ['value', 'description']);
    }
    return null;
}

function buildPhotoMetadata(photo) {
    const additional = photo.additional || {};
    const exif = additional.exif || photo.exif || {};
    const resolution = additional.resolution || photo.resolution;
    const gps = getPhotoGps(photo);
    const address = additional.address || photo.address || {};
    const approximateGps = gps ? roundPhotoCoordinates(gps) : null;
    const location = photoMapEnabled
        ? approximateGps
            ? `${approximateGps.latitude.toFixed(1)}, ${approximateGps.longitude.toFixed(1)}`
            : [getValue(address, ['city']), getValue(address, ['state', 'region']), getValue(address, ['country'])]
                .filter(Boolean)
                .join(', ')
        : null;
    const date = getValue(exif, ['datetimeoriginal', 'date_time_original', 'datetime', 'date_time']) ??
        getValue(photo, ['time', 'date', 'created_time']);
    const dimensions = formatPhotoResolution(resolution) ||
        formatPhotoResolution(getValue(exif, ['resolution', 'dimensions']));

    return {
        gps: photoMapEnabled ? gps : null,
        rows: [
            ['photoDate', formatPhotoDate(date)],
            ['photoCamera', formatExifValue(getValue(exif, ['camera', 'camera_model', 'model']))],
            ['photoLens', formatExifValue(getValue(exif, ['lens', 'lens_model']))],
            ['photoAperture', formatExifValue(getValue(exif, ['aperture', 'f_number', 'fnumber']))],
            ['photoExposure', formatExifValue(getValue(exif, ['exposure_time', 'exposuretime', 'exposure']))],
            ['photoIso', formatExifValue(getValue(exif, ['iso', 'isospeedratings']))],
            ['photoFocalLength', formatExifValue(getValue(exif, ['focal_length', 'focallength']))],
            ['photoResolution', dimensions],
            ['photoLocation', location]
        ].filter(([, value]) => value !== undefined && value !== null && value !== '')
    };
}

function roundPhotoCoordinates(gps) {
    const roundToTenth = coordinate => {
        const rounded = Math.round(coordinate * 10) / 10;
        return Object.is(rounded, -0) ? 0 : rounded;
    };
    return {
        latitude: roundToTenth(gps.latitude),
        longitude: roundToTenth(gps.longitude)
    };
}

function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (leafletLoadPromise) return leafletLoadPromise;

    leafletLoadPromise = new Promise((resolve, reject) => {
        let loadedAssets = 0;
        const assetLoaded = () => {
            loadedAssets += 1;
            if (loadedAssets === 2) resolve();
        };
        const assetFailed = () => reject(new Error('Impossible de charger les ressources de la carte Leaflet.'));
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        stylesheet.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        stylesheet.crossOrigin = 'anonymous';
        stylesheet.onload = assetLoaded;
        stylesheet.onerror = assetFailed;
        document.head.appendChild(stylesheet);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = 'anonymous';
        script.onload = assetLoaded;
        script.onerror = assetFailed;
        document.head.appendChild(script);
    }).catch(error => {
        leafletLoadPromise = null;
        throw error;
    });

    return leafletLoadPromise;
}

function updatePhotoMap(gps, isVisible) {
    elements.mapError.classList.add('hidden');
    if (!gps || !photoMapEnabled) {
        elements.photoMap.classList.add('hidden');
        photoMap?.remove();
        photoMap = null;
        photoMapMarker = null;
        return;
    }

    if (!isVisible) {
        elements.photoMap.classList.add('hidden');
        return;
    }

    elements.photoMap.classList.remove('hidden');
    loadLeaflet().then(() => {
        const currentPhotoGps = getPhotoGps(lightboxPhotos[currentPhotoIndex]?.metadata);
        if (elements.lightbox.classList.contains('hidden') ||
            !photoMapEnabled ||
            (window.matchMedia('(max-width: 760px)').matches &&
                !elements.lightbox.classList.contains('metadata-open')) ||
            !currentPhotoGps ||
            currentPhotoGps.latitude !== gps.latitude ||
            currentPhotoGps.longitude !== gps.longitude) return;

        const approximateGps = roundPhotoCoordinates(gps);
        if (!photoMap) {
            photoMap = window.L.map(elements.photoMap, { scrollWheelZoom: false, dragging: true })
                .setView([approximateGps.latitude, approximateGps.longitude], 8);
            const tileLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(photoMap);
            tileLayer.on('tileerror', () => elements.mapError.classList.remove('hidden'));
            photoMapMarker = window.L.marker([gps.latitude, gps.longitude]).addTo(photoMap);
        } else {
            photoMap.setView([approximateGps.latitude, approximateGps.longitude], 8);
            photoMapMarker.setLatLng([gps.latitude, gps.longitude]);
        }
        requestAnimationFrame(() => photoMap?.invalidateSize());
    }).catch(error => {
        const currentPhotoGps = getPhotoGps(lightboxPhotos[currentPhotoIndex]?.metadata);
        if (!photoMapEnabled ||
            elements.lightbox.classList.contains('hidden') ||
            (window.matchMedia('(max-width: 760px)').matches &&
                !elements.lightbox.classList.contains('metadata-open')) ||
            !currentPhotoGps ||
            currentPhotoGps.latitude !== gps.latitude ||
            currentPhotoGps.longitude !== gps.longitude) return;
        console.error('Impossible de charger la carte de la photo.', error);
        elements.photoMap.classList.add('hidden');
        elements.mapError.classList.remove('hidden');
    });
}

function renderPhotoMetadata(photo) {
    const metadata = buildPhotoMetadata(photo);
    elements.metadataList.replaceChildren();
    for (const [labelKey, value] of metadata.rows) {
        const label = document.createElement('dt');
        label.textContent = translate(labelKey);
        const description = document.createElement('dd');
        description.textContent = String(value);
        elements.metadataList.append(label, description);
    }
    elements.metadataEmpty.classList.toggle('hidden', metadata.rows.length > 0);
    const metadataVisible = !window.matchMedia('(max-width: 760px)').matches ||
        elements.lightbox.classList.contains('metadata-open');
    updatePhotoMap(metadata.gps, metadataVisible);
}

function updateLightboxPhoto() {
    const photo = lightboxPhotos[currentPhotoIndex];
    if (!photo) return;

    elements.lightboxVideo.pause();
    elements.lightboxVideo.removeAttribute('src');
    elements.lightboxVideo.load();
    elements.lightboxVideoError.classList.add('hidden');
    elements.lightboxVideo.classList.toggle('hidden', !photo.isVideo);
    elements.lightboxImg.classList.toggle('hidden', photo.isVideo);
    if (photo.isVideo) {
        elements.lightboxVideo.src = photo.videoUrl;
        elements.lightboxVideo.load();
    } else {
        elements.lightboxImg.src = photo.url;
        elements.lightboxImg.alt = photo.alt;
    }
    renderPhotoMetadata(photo.metadata);
    elements.lightboxPrev.disabled = currentPhotoIndex === 0;
    elements.lightboxNext.disabled = currentPhotoIndex === lightboxPhotos.length - 1;
    const numberFormatter = new Intl.NumberFormat(currentLanguage);
    elements.lightboxCounter.textContent = `${numberFormatter.format(currentPhotoIndex + 1)} / ${numberFormatter.format(lightboxPhotos.length)}`;
}

function setPhotoMetadataOpen(isOpen) {
    elements.lightbox.classList.toggle('metadata-open', isOpen);
    elements.lightboxInfo.setAttribute('aria-expanded', String(isOpen));
    elements.lightboxInfo.setAttribute(
        'aria-label',
        translate(isOpen ? 'photoInfoHide' : 'photoInfoShow')
    );

    if (window.matchMedia('(max-width: 760px)').matches) {
        updatePhotoMap(getPhotoGps(lightboxPhotos[currentPhotoIndex]?.metadata), isOpen);
    }
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
    elements.lightboxVideo.pause();
    elements.lightboxVideo.removeAttribute('src');
    elements.lightboxVideo.load();
    setPhotoMetadataOpen(false);
    photoMap?.remove();
    photoMap = null;
    photoMapMarker = null;
}

elements.lightboxClose.onclick = () => {
    closeLightbox();
};
elements.lightboxInfo.onclick = () => {
    const isOpen = elements.lightboxInfo.getAttribute('aria-expanded') === 'true';
    setPhotoMetadataOpen(!isOpen);
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

elements.photosContainer.addEventListener('contextmenu', event => {
    if (event.target instanceof Element && event.target.closest('img')) {
        event.preventDefault();
    }
});
elements.photosContainer.addEventListener('dragstart', event => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
});
elements.lightboxImg.addEventListener('contextmenu', event => event.preventDefault());
elements.lightboxImg.addEventListener('dragstart', event => event.preventDefault());
elements.lightboxVideo.addEventListener('error', () => {
    const photo = lightboxPhotos[currentPhotoIndex];
    if (!photo?.isVideo || elements.lightboxVideo.getAttribute('src') !== photo.videoUrl) return;
    elements.lightboxVideoError.classList.remove('hidden');
});
elements.lightboxVideo.addEventListener('loadeddata', () => {
    const photo = lightboxPhotos[currentPhotoIndex];
    if (!photo?.isVideo || elements.lightboxVideo.getAttribute('src') !== photo.videoUrl) return;
    elements.lightboxVideoError.classList.add('hidden');
});
elements.lightboxVideo.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (elements.lightbox.classList.contains('hidden')) return;
    if (event.target === elements.lightboxVideo && ['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    if (event.key === 'ArrowLeft') showPreviousPhoto();
    else if (event.key === 'ArrowRight') showNextPhoto();
    else if (event.key === 'Escape') closeLightbox();
});

elements.backBtn.onclick = loadAlbums;

loadUser();
loadConfig().then(() => loadAlbums());