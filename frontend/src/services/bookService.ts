import type { BookItem, GoogleBooksResponse } from "../interfaces/googleBooks";
import { retryWithBackoff } from "../utils/retryUtils";
import { googleBooksCircuitBreaker } from "../utils/circuitBreaker";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

async function fetchWithRetryAndCircuitBreaker<T>(
  fetchFn: () => Promise<Response>,
  errorContext: string
): Promise<T> {
  return await googleBooksCircuitBreaker.execute(async () => {
    return await retryWithBackoff(async () => {
      const response = await fetchFn();
      
      if (!response.ok) {
        throw new Error(
          `${errorContext}: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    });
  });
}

export const searchBooks = async (query: string): Promise<BookItem[]> => {
  try {
    const data = await fetchWithRetryAndCircuitBreaker<GoogleBooksResponse>(
      () => fetch(
        `${API_BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=20`
      ),
      "Error searching books"
    );
    
    return data.items || [];
  } catch (error) {
    console.error("Error al buscar libros:", error);
    throw error;
  }
};

export const getBestsellers = async (): Promise<BookItem[]> => {
  try {
    const data = await fetchWithRetryAndCircuitBreaker<GoogleBooksResponse>(
      () => fetch(
        `${API_BASE_URL}?q=subject:fiction&orderBy=relevance&key=${API_KEY}&maxResults=10`
      ),
      "Error fetching bestsellers"
    );
    
    return data.items || [];
  } catch (error) {
    console.error("Error al obtener bestsellers:", error);
    throw error;
  }
};