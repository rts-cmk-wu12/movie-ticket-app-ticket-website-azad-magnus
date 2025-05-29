export const BASE_URL = (() => {
    if (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
        return 'http://localhost:3000/';
    }
    return 'https://cinema-ticket-movie-app-ac19c5c824a7.herokuapp.com/';
})();

export function getApiUrl(endpoint) {
    return `${BASE_URL}${endpoint}`;
}
