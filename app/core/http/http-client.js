import axios from 'axios';
import { MESSAGES, RETRY } from '../constants/app.constants.js';
import { RICK_AND_MORTY_API_URL } from '../config/api.config.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const httpClient = axios.create({
    baseURL: RICK_AND_MORTY_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const config = error.config;

        if (!config) {
            console.error(MESSAGES.FETCH_ERROR, error);
            return Promise.reject(error);
        }

        config._retryCount = config._retryCount ?? 0;

        const isNetworkError = !error.response;
        const isRateLimited = error.response?.status === 429;

        if ((isNetworkError || isRateLimited) && config._retryCount < RETRY.MAX_RETRIES) {
            config._retryCount++;
            const delay = RETRY.BASE_DELAY_MS * Math.pow(2, config._retryCount - 1);
            await sleep(delay);
            return httpClient(config);
        }

        console.error(MESSAGES.FETCH_ERROR, error);
        return Promise.reject(error);
    }
);
