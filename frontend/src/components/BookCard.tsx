import type { BookItem } from '../interfaces/googleBooks';
import Icon from './icons/Icon';

interface BookCardProps {
  book: BookItem;
}

function BookCard({ book }: BookCardProps) {
  const { volumeInfo, saleInfo } = book;
  const imageUrl = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;
  const author = volumeInfo.authors?.[0] || 'Unknown Author';
  const rating = volumeInfo.averageRating || 0;
  const price = saleInfo?.retailPrice?.amount || saleInfo?.listPrice?.amount || 50.00;
  const currency = saleInfo?.retailPrice?.currencyCode || saleInfo?.listPrice?.currencyCode || 'EGP';

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size="sm"
          color={i < fullStars ? '#FCD34D' : '#D1D5DB'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="shrink-0 w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="relative aspect-2/3 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={volumeInfo.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 min-h-10">
          {volumeInfo.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{author}</p>
        <div className="flex items-center gap-1 mb-3">
          {renderStars()}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-teal-700">
            {price.toFixed(2)} {currency}
          </span>
          <button className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200">
            <Icon name="cart" size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
