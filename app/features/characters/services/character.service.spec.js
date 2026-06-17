import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters, getCharactersByIds } from './character.service.js';

vi.mock('../../../core/http/http-client.js', () => ({
    httpClient: {
        get: vi.fn(),
    },
}));

import { httpClient } from '../../../core/http/http-client.js';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('getCharacters', () => {
    it('llama a /character con la página indicada', async () => {
        httpClient.get.mockResolvedValue({ results: [], info: {} });

        await getCharacters(3);

        expect(httpClient.get).toHaveBeenCalledWith('/character', { params: { page: 3 } });
    });

    it('incluye el parámetro name cuando se proporciona', async () => {
        httpClient.get.mockResolvedValue({ results: [], info: {} });

        await getCharacters(1, 'rick');

        expect(httpClient.get).toHaveBeenCalledWith('/character', {
            params: { page: 1, name: 'rick' },
        });
    });

    it('no incluye name en los params cuando está vacío', async () => {
        httpClient.get.mockResolvedValue({ results: [], info: {} });

        await getCharacters(1, '');

        const callArgs = httpClient.get.mock.calls[0][1];

        expect(callArgs.params).not.toHaveProperty('name');
    });

    it('usa página 1 por defecto', async () => {
        httpClient.get.mockResolvedValue({ results: [], info: {} });

        await getCharacters();

        expect(httpClient.get).toHaveBeenCalledWith('/character', { params: { page: 1 } });
    });

    it('devuelve la respuesta del cliente HTTP', async () => {
        const mockResponse = { results: [{ id: 1 }], info: { pages: 5 } };
        httpClient.get.mockResolvedValue(mockResponse);

        const result = await getCharacters(1);

        expect(result).toEqual(mockResponse);
    });

    it('propagua el error cuando el cliente falla', async () => {
        httpClient.get.mockRejectedValue(new Error('Network error'));

        await expect(getCharacters(1)).rejects.toThrow('Network error');
    });
});

describe('getCharactersByIds', () => {
    it('devuelve un array vacío sin llamar a la API cuando ids está vacío', async () => {
        const result = await getCharactersByIds([]);

        expect(result).toEqual([]);
        expect(httpClient.get).not.toHaveBeenCalled();
    });

    it('llama a la API con los ids unidos por comas', async () => {
        httpClient.get.mockResolvedValue([]);

        await getCharactersByIds([1, 2, 3]);

        expect(httpClient.get).toHaveBeenCalledWith('/character/1,2,3');
    });

    it('funciona con un único id', async () => {
        httpClient.get.mockResolvedValue({ id: 7 });

        await getCharactersByIds([7]);

        expect(httpClient.get).toHaveBeenCalledWith('/character/7');
    });

    it('devuelve la respuesta del cliente HTTP', async () => {
        const mockChars = [{ id: 1 }, { id: 2 }];
        httpClient.get.mockResolvedValue(mockChars);

        const result = await getCharactersByIds([1, 2]);

        expect(result).toEqual(mockChars);
    });
});
