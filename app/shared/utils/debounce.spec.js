import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce.js';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

describe('debounce', () => {
    it('no ejecuta la función inmediatamente', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();

        expect(fn).not.toHaveBeenCalled();
    });

    it('ejecuta la función tras el delay', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledOnce();
    });

    it('solo ejecuta una vez si se llama varias veces antes del delay', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        debounced();
        debounced();
        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledOnce();
    });

    it('reinicia el timer con cada llamada', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        vi.advanceTimersByTime(50);
        debounced();
        vi.advanceTimersByTime(50);

        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);

        expect(fn).toHaveBeenCalledOnce();
    });

    it('pasa los argumentos correctamente a la función original', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 50);

        debounced('hello', 42);
        vi.advanceTimersByTime(50);

        expect(fn).toHaveBeenCalledWith('hello', 42);
    });

    it('usa los argumentos de la última llamada', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced('first');
        debounced('second');
        debounced('last');
        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledWith('last');
    });
});
