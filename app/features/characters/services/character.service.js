import { RICK_AND_MORTY_API_URL } from "../../../core/config/api.config";
import axios from "axios";

export async function getCharacters(page = 1) {
    try {
        const response = await axios.get(`${RICK_AND_MORTY_API_URL}/character?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}