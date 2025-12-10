import { Song } from "../types";
import { API_ENDPOINTS } from "../config/api";

export async function getSongs() {
    try {
        const response = await fetch(API_ENDPOINTS.songs, {
            headers: {
                accept: "application/json",
            },
        });
        
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) {
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        // SongResource::collection returns {data: [...]}
        return result.data || result;
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error(
                `Cannot connect to API at ${API_ENDPOINTS.songs}. ` +
                `Please check: 1) XAMPP Apache is running, 2) Test URL in browser: ` +
                `http://react-backend.test/react-from-scratch-api/api/test or ` +
                `http://react-backend.test/api/test`
            );
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to fetch songs. Please check if the API server is running.");
    }
}

export async function toggleLikedStatus(id: Song["id"]) {
    const response = await fetch(API_ENDPOINTS.songLike(id), {
        method: "PATCH",
        headers: {
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    const result = await response.json();
    // SongResource returns the song directly, not wrapped
    return result.data || result;
}

export async function createSong(formData: FormData) {
    const response = await fetch(API_ENDPOINTS.songs, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json",
            // Don't set Content-Type for FormData - browser sets it automatically with boundary
        },
    });
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }
    const result = await response.json();
    // SongResource returns the song wrapped in 'data' key
    // Format: {"data": {"id": 8, "name": "...", ...}}
    return result.data || result;
}
