export interface GoogleBooksResponse {
    items: BookItem[];
    totalItems: number;
}

export interface BookItem {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        pageCount?: number;
        categories?: string[];
        averageRating?: number;
        ratingsCount?: number;
        imageLinks?: {
            smallThumbnail: string;
            thumbnail: string;
        };
        previewLink: string;
    };
    saleInfo?: {
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
        retailPrice?: {
            amount: number;
            currencyCode: string;
        };
    };
}
