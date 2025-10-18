import { restClient } from '@polygon.io/client-js';

// Global polygon client instance
let polygonClient: ReturnType<typeof restClient> | null = null;

/**
 * Initialize the Polygon client with API key from localStorage
 */
export const initializePolygonClient = (): boolean => {
    const apiKey = localStorage.getItem('polygonKey');

    if (!apiKey) {
        console.warn('Polygon API key not found in localStorage');
        polygonClient = null;
        return false;
    }

    try {
        polygonClient = restClient(apiKey);
        console.log('Polygon client initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize Polygon client:', error);
        polygonClient = null;
        return false;
    }
};

/**
 * Get the global Polygon client instance
 */
export const getPolygonClient = () => {
    if (!polygonClient) {
        console.warn('Polygon client not initialized. Call initializePolygonClient() first.');
    }
    return polygonClient;
};

/**
 * Re-initialize the Polygon client (useful after updating API key)
 */
export const reinitializePolygonClient = (): boolean => {
    return initializePolygonClient();
};

// Make it globally accessible
declare global {
    interface Window {
        polygonClient: ReturnType<typeof restClient> | null;
    }
}

// Initialize on module load
if (typeof window !== 'undefined') {
    initializePolygonClient();
    window.polygonClient = polygonClient;
}

export { polygonClient };
