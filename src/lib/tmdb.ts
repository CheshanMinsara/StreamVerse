import { Media, MediaResult, PaginatedResponse } from "./types";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY || "7a1625001f055f0542ebcbff45e85868";
const IMAGE_URL = "https://image.tmdb.org/t/p/";

async function fetchFromTMDB<T>(endpoint: string, cache: RequestCache = 'force-cache'): Promise<T> {
    const url = `${API_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({})); // Catch if response is not JSON
        console.error(`Failed to fetch from TMDB: ${response.statusText}`, errorDetails);
        throw new Error(`Failed to fetch from TMDB: ${response.statusText}`);
    }
    return response.json();
}

export async function getTrending(timeWindow: 'day' | 'week' = 'week'): Promise<MediaResult[]> {
    const data = await fetchFromTMDB<PaginatedResponse<MediaResult>>(`trending/all/${timeWindow}`);
    return data.results;
}

export async function getPopularMovies(page: number = 1): Promise<PaginatedResponse<MediaResult>> {
    const data = await fetchFromTMDB<PaginatedResponse<MediaResult>>(`movie/popular?page=${page}`);
    return { ...data, results: data.results.map(item => ({...item, media_type: 'movie'}))};
}

export async function getPopularTvShows(page: number = 1): Promise<PaginatedResponse<MediaResult>> {
    const data = await fetchFromTMDB<PaginatedResponse<MediaResult>>(`tv/popular?page=${page}`);
    return { ...data, results: data.results.map(item => ({...item, media_type: 'tv'}))};
}

export async function searchMedia(query: string, page: number = 1): Promise<PaginatedResponse<MediaResult>> {
    // append_to_response to get release dates for TV shows in search results
    const data = await fetchFromTMDB<PaginatedResponse<MediaResult>>(`search/multi?query=${encodeURIComponent(query)}&page=${page}`);
    const filteredResults = data.results.filter(
        (item) => (item.media_type === "movie" || item.media_type === "tv") && item.poster_path
    );
    return { ...data, results: filteredResults };
}

export async function getMediaDetails(id: string, type: 'movie' | 'tv'): Promise<Media> {
    const endpoint = `${type}/${id}?append_to_response=credits,videos`;
    return fetchFromTMDB<Media>(endpoint);
}


export function getImageUrl(path: string | null | undefined, size: string = 'w500'): string {
    if (!path) return '/placeholder.svg';
    return `${IMAGE_URL}${size}${path}`;
}
