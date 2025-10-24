// app/PersonDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTMDB } from '../hooks/useTMDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faStar, 
  faFilm,
  faTv
} from '@fortawesome/free-solid-svg-icons';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: person, loading, error } = useTMDB(`/person/${id}`);
  const { data: movieCredits } = useTMDB(`/person/${id}/movie_credits`);
  const { data: tvCredits } = useTMDB(`/person/${id}/tv_credits`);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl md:text-3xl text-white mb-6">Person not found</h2>
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

  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition-colors mb-6 md:mb-8 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 md:mr-3" />
          Back to People
        </button>
      </div>

      {/* Person Header */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Person Photo */}
          <div className="md:col-span-1 flex justify-center">
            <img
              src={person.profile_path 
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : '/placeholder-person.jpg'
              }
              alt={person.name}
              className="w-64 h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
          
          {/* Person Info */}
          <div className="md:col-span-2 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{person.name}</h1>
            
            <div className="space-y-4">
              {person.birthday && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">Birthday</h3>
                  <p className="text-xl">{new Date(person.birthday).toLocaleDateString()}</p>
                </div>
              )}
              
              {person.place_of_birth && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">Place of Birth</h3>
                  <p className="text-xl">{person.place_of_birth}</p>
                </div>
              )}
              
              {person.known_for_department && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">Known For</h3>
                  <p className="text-xl">{person.known_for_department}</p>
                </div>
              )}
              
              {person.biography && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Biography</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {person.biography.length > 500 
                      ? `${person.biography.substring(0, 500)}...` 
                      : person.biography
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Credits */}
      {movieCredits?.cast && movieCredits.cast.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <FontAwesomeIcon icon={faFilm} className="mr-3 text-red-600" />
            Movie Credits
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movieCredits.cast.slice(0, 12).map(movie => (
              <div 
                key={movie.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : '/placeholder-image.jpg'
                  }
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                />
                <h3 className="text-white text-sm font-medium line-clamp-2">{movie.title}</h3>
                <p className="text-gray-400 text-xs">{movie.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TV Credits */}
      {tvCredits?.cast && tvCredits.cast.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <FontAwesomeIcon icon={faTv} className="mr-3 text-red-600" />
            TV Credits
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tvCredits.cast.slice(0, 12).map(tvShow => (
              <div 
                key={tvShow.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/tv/${tvShow.id}`)}
              >
                <img
                  src={tvShow.poster_path 
                    ? `https://image.tmdb.org/t/p/w300${tvShow.poster_path}`
                    : '/placeholder-image.jpg'
                  }
                  alt={tvShow.name}
                  className="w-full aspect-[2/3] object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                />
                <h3 className="text-white text-sm font-medium line-clamp-2">{tvShow.name}</h3>
                <p className="text-gray-400 text-xs">{tvShow.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;