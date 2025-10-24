
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ item, type = 'movie', imageBaseUrl }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const title = type === 'movie' ? item.title : item.name;
  const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item, type);
    }
  };

  const handleCardClick = () => {
    navigate(`/${type}/${item.id}`);
  };

  return (
    <div 
      className="group relative bg-transparent rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.poster_path ? `${imageBaseUrl}${item.poster_path}` : '/placeholder-image.jpg'}
          alt={title}
          className="w-full aspect-[2/3] object-cover group-hover:brightness-50 transition-all duration-300"
        />
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            favorite 
              ? 'bg-red-600 text-white' 
              : 'bg-black bg-opacity-50 text-white hover:bg-opacity-75'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
        </button>
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center">
              <span>⭐ {item.vote_average?.toFixed(1)}</span>
            </div>
            <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'TBA'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;