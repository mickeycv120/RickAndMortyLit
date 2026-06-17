import { httpClient } from '../../../core/http/http-client.js';

export function getCharacters(page = 1, name = '') {
    const params = { page };
    if (name) params.name = name;
    return httpClient.get('/character', { params });
}

export function getCharactersByIds(ids) {
    if (!ids.length) return Promise.resolve([]);
    return httpClient.get(`/character/${ids.join(',')}`);
}
