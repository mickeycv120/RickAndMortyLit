import axios from 'axios';
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
        console.error('Error fetching data:', error);
        return Promise.reject(error);
    }
);
