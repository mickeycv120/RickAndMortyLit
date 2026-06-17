const STORAGE_KEY = 'rickmorty_favorites';
const CHANGE_EVENT = 'favorites-changed';

class FavoritesStore {
    constructor() {
        this._ids = this._load();
    }

    _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return new Set(raw ? JSON.parse(raw) : []);
        } catch {
            return new Set();
        }
    }

    _persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...this._ids]));
        } catch (error) {
            if (error?.name === 'QuotaExceededError') {
                try {
                    localStorage.removeItem(STORAGE_KEY);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this._ids]));
                } catch {
                    console.warn('[FavoritesStore] No se pudo persistir favoritos: almacenamiento lleno.');
                }
            } else {
                console.warn('[FavoritesStore] localStorage no disponible. Los favoritos no se guardarán entre sesiones.');
            }
        }
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
    }

    toggle(id) {
        if (this._ids.has(id)) {
            this._ids.delete(id);
        } else {
            this._ids.add(id);
        }
        this._persist();
    }

    isFavorite(id) {
        return this._ids.has(id);
    }

    getAll() {
        return [...this._ids];
    }

    get count() {
        return this._ids.size;
    }
}

export const favoritesStore = new FavoritesStore();
export { CHANGE_EVENT as FAVORITES_CHANGED_EVENT };
