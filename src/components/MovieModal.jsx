
import React from 'react';

const MovieModal = ({ item, type, onClose }) => {
  if (!item) return null;

  const title = type === 'movie' ? item.title : item.name;
  const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="h-96 bg-gradient-to-r from-purple-900 to-red-900 relative">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
              <div className="flex items-center space-x-4 text-white">
                <span>⭐ {item.vote_average?.toFixed(1)}</span>
                <span>{releaseDate?.split('-')[0]}</span>
                <span>{item.runtime || item.episode_run_time?.[0]} min</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-300 mb-6">{item.overview}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Details</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>Status: {item.status}</div>
                  <div>Language: {item.original_language}</div>
                  <div>Budget: ${item.budget?.toLocaleString()}</div>
                  <div>Revenue: ${item.revenue?.toLocaleString()}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {item.genres?.map(genre => (
                    <span key={genre.id} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;