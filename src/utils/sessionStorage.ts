// Session storage utilities for managing modal display state

const SESSION_KEYS = {
    APP_DOWNLOAD_MODAL_SHOWN: 'pocketfriend_app_download_modal_shown',
};

export const hasShownAppDownloadModal = (): boolean => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_KEYS.APP_DOWNLOAD_MODAL_SHOWN) === 'true';
};

export const markAppDownloadModalAsShown = (): void => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(SESSION_KEYS.APP_DOWNLOAD_MODAL_SHOWN, 'true');
};

export const resetAppDownloadModalState = (): void => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SESSION_KEYS.APP_DOWNLOAD_MODAL_SHOWN);
};
