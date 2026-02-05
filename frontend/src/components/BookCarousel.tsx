import { useRef } from 'react';
import type { BookItem } from '../interfaces/googleBooks';
import BookCard from './BookCard';
import Icon from './icons/Icon';

interface BookCarouselProps {
  books: BookItem[];
}

function BookCarousel({ books }: BookCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 -ml-4"
        aria-label="Scroll left"
      >
        <Icon name="chevronLeft" size="lg" color="#0F766E" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 -mr-4"
        aria-label="Scroll right"
      >
        <Icon name="chevronRight" size="lg" color="#0F766E" />
      </button>
    </div>
  );
}

export default BookCarousel;
