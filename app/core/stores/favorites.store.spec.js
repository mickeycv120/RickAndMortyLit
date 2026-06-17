import { describe, it, expect, beforeEach, vi } from 'vitest';
import { favoritesStore, FAVORITES_CHANGED_EVENT } from './favorites.store.js';

beforeEach(() => {
    localStorage.clear();
    favoritesStore._ids.clear();
});

describe('FavoritesStore - toggle', () => {
    it('añade un id que no era favorito', () => {
        favoritesStore.toggle(1);

        expect(favoritesStore.isFavorite(1)).toBe(true);
    });

    it('elimina un id que ya era favorito', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(1);

        expect(favoritesStore.isFavorite(1)).toBe(false);
    });

    it('dispara el evento de cambio al añadir', () => {
        const handler = vi.fn();
        window.addEventListener(FAVORITES_CHANGED_EVENT, handler);

        favoritesStore.toggle(1);

        expect(handler).toHaveBeenCalledOnce();
        window.removeEventListener(FAVORITES_CHANGED_EVENT, handler);
    });

    it('dispara el evento de cambio al eliminar', () => {
        favoritesStore.toggle(1);

        const handler = vi.fn();
        window.addEventListener(FAVORITES_CHANGED_EVENT, handler);

        favoritesStore.toggle(1);

        expect(handler).toHaveBeenCalledOnce();
        window.removeEventListener(FAVORITES_CHANGED_EVENT, handler);
    });

    it('persiste los favoritos en localStorage', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(2);

        const stored = JSON.parse(localStorage.getItem('rickmorty_favorites'));

        expect(stored).toContain(1);
        expect(stored).toContain(2);
    });
});

describe('FavoritesStore - isFavorite', () => {
    it('devuelve false para un id que no es favorito', () => {
        expect(favoritesStore.isFavorite(99)).toBe(false);
    });

    it('devuelve true para un id que sí es favorito', () => {
        favoritesStore.toggle(5);

        expect(favoritesStore.isFavorite(5)).toBe(true);
    });
});

describe('FavoritesStore - getAll', () => {
    it('devuelve un array vacío cuando no hay favoritos', () => {
        expect(favoritesStore.getAll()).toEqual([]);
    });

    it('devuelve todos los ids añadidos', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(2);
        favoritesStore.toggle(3);

        expect(favoritesStore.getAll()).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(favoritesStore.getAll()).toHaveLength(3);
    });

    it('no incluye ids que fueron eliminados', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(2);
        favoritesStore.toggle(1);

        const all = favoritesStore.getAll();

        expect(all).not.toContain(1);
        expect(all).toContain(2);
    });
});

describe('FavoritesStore - count', () => {
    it('devuelve 0 cuando no hay favoritos', () => {
        expect(favoritesStore.count).toBe(0);
    });

    it('incrementa al añadir favoritos', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(2);

        expect(favoritesStore.count).toBe(2);
    });

    it('decrementa al eliminar un favorito', () => {
        favoritesStore.toggle(1);
        favoritesStore.toggle(1);

        expect(favoritesStore.count).toBe(0);
    });
});
