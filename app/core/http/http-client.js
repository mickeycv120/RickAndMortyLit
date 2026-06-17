import axios from 'axios';
import { MESSAGES } from '../constants/app.constants.js';
import { RICK_AND_MORTY_API_URL } from '../config/api.config.js';

export const httpClient = axios.create({
    baseURL: RICK_AND_MORTY_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(MESSAGES.FETCH_ERROR, error);
        return Promise.reject(error);
    }
);
