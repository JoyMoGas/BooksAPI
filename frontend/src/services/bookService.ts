import type { BookItem, GoogleBooksResponse } from "../interfaces/googleBooks";

const API_KEY = "AIzaSyDrKYSvOe_871BKn5ffk1sNDLzV98VrqHI";
const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string): Promise<BookItem[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=20`);
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: GoogleBooksResponse = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error al buscar libros:", error);
        return [];
    }
}

export const getBestsellers = async (): Promise<BookItem[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}?q=subject:fiction&orderBy=relevance&key=${API_KEY}&maxResults=10`);
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: GoogleBooksResponse = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error al obtener bestsellers:", error);
        return [];
    }
}