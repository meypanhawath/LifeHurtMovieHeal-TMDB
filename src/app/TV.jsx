
import React, { useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MovieCard from '../components/MovieCard';

const TV = () => {
  const [category, setCategory] = useState('popular');
  
  const { data: tvShows, loading, error, IMAGE_BASE_URL } = useTMDB(`/tv/${category}`);

  const categories = [
    { key: 'popular', label: 'Popular' },
    { key: 'on_the_air', label: 'On Air' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'airing_today', label: 'Airing Today' }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">
            Healing TV Shows
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-full transition-all ${
                  category === cat.key
                    ? 'bg-red-600 text-white border border-red-400'
                    : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 py-8">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tvShows?.results?.map((show) => (
            <MovieCard
              key={show.id}
              item={show}
              type="tv"
              imageBaseUrl={IMAGE_BASE_URL}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TV;