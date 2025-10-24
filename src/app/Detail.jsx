
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTMDB } from '../hooks/useTMDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faStar, 
  faClock, 
  faCalendar,
  faPlay,
  faHeart,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../hooks/useFavorites';

const Detail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const { data: item, loading, error } = useTMDB(`/${type}/${id}`);
  const { data: credits } = useTMDB(`/${type}/${id}/credits`);
  const { data: similar } = useTMDB(`/${type}/${id}/similar`);
  const { data: videos } = useTMDB(`/${type}/${id}/videos`);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(item?.id);

  // Get the first trailer from videos
  const trailer = videos?.results?.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatchTrailer = () => {
    if (trailer) {
      setShowTrailer(true);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-8">
          <h2 className="text-2xl md:text-3xl text-white mb-6">Content not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg hover:bg-red-700 text-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const title = type === 'movie' ? item.title : item.name;
  const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
  const runtime = type === 'movie' ? item.runtime : item.episode_run_time?.[0];

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item, type);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition-colors mb-6 md:mb-8 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 md:mr-3" />
          Back to Browse
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center pt-8 md:pt-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-end">
              {/* Poster - Hidden on mobile, shown on medium+ */}
              <div className="hidden md:flex lg:col-span-1 justify-center lg:justify-start">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={title}
                  className="w-48 lg:w-64 xl:w-80 rounded-2xl shadow-2xl border-4 border-white/10"
                />
              </div>
              
              {/* Info */}
              <div className="lg:col-span-2 text-white space-y-4 md:space-y-6 lg:space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mb-4">
                    <div className="flex items-center bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2 text-sm md:text-base lg:text-xl" />
                      <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                        {item.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    
                    {runtime && (
                      <div className="flex items-center text-gray-300">
                        <FontAwesomeIcon icon={faClock} className="mr-2 text-sm md:text-base" />
                        <span className="text-base md:text-lg">{runtime} min</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-300">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2 text-sm md:text-base" />
                      <span className="text-base md:text-lg">
                        {new Date(releaseDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {item.genres?.map(genre => (
                    <span 
                      key={genre.id}
                      className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="max-w-3xl">
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
                    {item.overview}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4">
                  <button 
                    onClick={handleWatchTrailer}
                    disabled={!trailer}
                    className={`${
                      trailer 
                        ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                        : 'bg-gray-600 cursor-not-allowed'
                    } text-white px-6 py-3 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center transition-all hover:scale-105`}
                  >
                    <FontAwesomeIcon icon={faPlay} className="mr-2 md:mr-3 text-base md:text-xl" />
                    {trailer ? 'Watch Trailer' : 'No Trailer Available'}
                  </button>
                  
                  <button
                    onClick={handleFavoriteClick}
                    className={`border-2 px-6 py-3 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-lg font-semibold text-base md:text-lg flex items-center justify-center transition-all hover:scale-105 ${
                      favorite 
                        ? 'border-red-600 text-red-600 bg-red-600/10' 
                        : 'border-gray-400 text-gray-400 hover:border-white hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-2 md:mr-3 text-base md:text-xl" />
                    {favorite ? 'Remove' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white text-lg bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-10"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={`${title} Trailer`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16 space-y-12 md:space-y-16 lg:space-y-20">
        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <section className="py-32">
            <h2 className="text-3xl font-bold text-white mb-8">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {credits.cast.slice(0, 12).map(person => (
                <div key={person.id} className="text-center">
                  <img
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                      : '/placeholder-person.jpg'
                    }
                    alt={person.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-3"
                  />
                  <h3 className="text-white font-semibold text-sm">{person.name}</h3>
                  <p className="text-gray-400 text-xs">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Content */}
        {similar?.results && similar.results.length > 0 && (
          <section className="py-32">
            <h2 className="text-3xl font-bold text-white mb-8">
              Similar {type === 'movie' ? 'Movies' : 'TV Shows'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similar.results.slice(0, 12).map(similarItem => (
                <div 
                  key={similarItem.id}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate(`/${type}/${similarItem.id}`)}
                >
                  <img
                    src={similarItem.poster_path 
                      ? `https://image.tmdb.org/t/p/w300${similarItem.poster_path}`
                      : '/placeholder-image.jpg'
                    }
                    alt={type === 'movie' ? similarItem.title : similarItem.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-white text-sm font-medium line-clamp-2">
                    {type === 'movie' ? similarItem.title : similarItem.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Info Section */}
        <section className="bg-gray-900 rounded-xl md:rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Additional Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-4 text-lg">Status</h3>
              <p className="text-gray-300 text-sm md:text-base">{item.status}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-4 text-lg">Original Language</h3>
              <p className="text-gray-300 text-sm md:text-base">{item.original_language?.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-4 text-lg">Budget</h3>
              <p className="text-gray-300 text-sm md:text-base">
                {item.budget ? `$${item.budget.toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 md:mb-4 text-lg">Revenue</h3>
              <p className="text-gray-300 text-sm md:text-base">
                {item.revenue ? `$${item.revenue.toLocaleString()}` : 'N/A'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;