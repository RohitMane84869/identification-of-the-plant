import { PlantInfo } from '../types';

// The URL for the local Python backend server.
const API_URL = 'http://127.0.0.1:5000/predict';

/**
 * Sends an image file to the local backend for identification.
 * @param imageFile The image file to identify.
 * @returns A promise that resolves to the plant information.
 */
export async function identifyPlant(imageFile: File): Promise<PlantInfo> {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = `Server error: ${response.status} ${response.statusText}`;
            try {
                // Try to parse a specific error message from the backend
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                // Response was not JSON, stick with the status text
            }
            throw new Error(errorMessage);
        }

        const data: PlantInfo = await response.json();
        return data;

    } catch (error) {
        console.error("Error identifying plant:", error);
        if (error instanceof Error) {
             // Provide a helpful message if the server isn't running
             if (error.message.includes('Failed to fetch')) {
                throw new Error('Connection failed. Please ensure the local backend server is running.');
            }
            throw new Error(`Failed to identify plant: ${error.message}`);
        }
        throw new Error("An unknown error occurred during plant identification.");
    }
}
