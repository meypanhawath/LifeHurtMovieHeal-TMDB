
import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Healing Collection</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💖</div>
            <h2 className="text-2xl text-white mb-4">No favorites yet</h2>
            <p className="text-gray-400">Start adding movies and shows that heal your soul</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="relative group">
                <MovieCard
                  item={item}
                  type={item.media_type}
                  imageBaseUrl="https://image.tmdb.org/t/p/w500"
                />
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;