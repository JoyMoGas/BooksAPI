import { useState } from 'react';
import Icon from './icons/Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" size="lg" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Title or Author"
            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-700 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Cargando...' : 'Search'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
