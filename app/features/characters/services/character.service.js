import { httpClient } from '../../../core/http/http-client.js';

export function getCharacters(page = 1) {
    return httpClient.get('/character', { params: { page } });
}
