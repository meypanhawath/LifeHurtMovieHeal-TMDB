// components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTMDB } from '../hooks/useTMDB';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const { data: results, loading } = useTMDB('/search/multi', { query }, query.length > 2);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/tv/${item.id}`);
    } else if (item.media_type === 'person') {
      navigate(`/person/${item.id}`);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search movies, TV shows..."
          className="w-64 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-12 left-0 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="text-white font-semibold text-sm">Search Results</span>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-white text-sm"
            >
              Close
            </button>
          </div>
          
          {loading && (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          )}
          
          {results?.results?.slice(0, 8).map((item) => (
            <div 
              key={`${item.media_type}-${item.id}`} 
              className="p-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors"
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.poster_path || item.profile_path 
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`
                    : '/placeholder.jpg'
                  }
                  alt={item.title || item.name}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">
                    {item.title || item.name}
                  </h4>
                  <p className="text-gray-400 text-xs capitalize">
                    {item.media_type} • {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'N/A'}
                  </p>
                  {item.media_type === 'movie' && item.release_date && (
                    <p className="text-gray-500 text-xs">
                      {new Date(item.release_date).getFullYear()}
                    </p>
                  )}
                  {item.media_type === 'tv' && item.first_air_date && (
                    <p className="text-gray-500 text-xs">
                      {new Date(item.first_air_date).getFullYear()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {results?.results?.length === 0 && !loading && (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;