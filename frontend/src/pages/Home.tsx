import { useEffect, useState } from 'react';
import heroVideo from '../assets/hero-video.mp4';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import BookCarousel from '../components/BookCarousel';
import type { BookItem } from '../interfaces/googleBooks';
import { getBestsellers, searchBooks } from '../services/bookService';

function Home() {
  const [bestsellers, setBestsellers] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBestsellers = async () => {
    setLoading(true);
    try {
      const books = await getBestsellers();
      setBestsellers(books);
    } catch (error) {
      console.error('Failed to load bestsellers:', error);
      setBestsellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBestsellers();
  }, []);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    try {
      const results = await searchBooks(query);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto max-w-none object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              WELCOME TO REEDO
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 drop-shadow-md font-light">
              Search Over 100 Million Titles
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Bestselling Books
            </h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">Loading bestsellers...</p>
            </div>
          ) : bestsellers.length > 0 ? (
            <BookCarousel books={bestsellers} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600">No books available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
