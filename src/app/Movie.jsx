
import React, { useState, useMemo } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MovieCard from '../components/MovieCard';

const Movie = () => {
  const [category, setCategory] = useState('popular');
  const [mood, setMood] = useState('all');
  
  const { data: movies, loading, error, IMAGE_BASE_URL } = useTMDB(`/movie/${category}`);

  const categories = [
    { key: 'popular', label: 'Popular' },
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' }
  ];

  const moodFilters = [
    { key: 'all', label: 'All Movies' },
    { key: 'comfort', label: 'Comfort Films' },
    { key: 'inspiring', label: 'Inspiring Stories' },
    { key: 'heartwarming', label: 'Heartwarming' },
    { key: 'therapeutic', label: 'Therapeutic' }
  ];

  // Actual filtering logic based on mood
  const filteredMovies = useMemo(() => {
    if (!movies?.results) return [];
    
    if (mood === 'all') return movies.results;

    // Define genre IDs for each mood (you can customize these)
    const moodGenres = {
      comfort: [35, 10751, 10749], // Comedy, Family, Romance
      inspiring: [18, 36, 99], // Drama, History, Documentary
      heartwarming: [10751, 10749, 18], // Family, Romance, Drama
      therapeutic: [14, 16, 18] // Fantasy, Animation, Drama
    };

    const genreIds = moodGenres[mood] || [];
    
    return movies.results.filter(movie => 
      movie.genre_ids && movie.genre_ids.some(id => genreIds.includes(id))
    );
  }, [movies, mood]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">
            Healing Movies
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setCategory(cat.key);
                  setMood('all'); // Reset mood when changing category
                }}
                className={`px-4 py-2 rounded-full transition-all text-sm ${
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

        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Filter by Mood</h2>
          <div className="flex flex-wrap gap-2">
            {moodFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setMood(filter.key)}
                className={`px-4 py-2 rounded-full transition-all text-sm ${
                  mood === filter.key
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {mood !== 'all' && (
            <p className="text-gray-400 text-sm mt-3">
              Showing {filteredMovies.length} {mood.toLowerCase()} movies
            </p>
          )}
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

        {!loading && filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found for this mood filter.</p>
            <button
              onClick={() => setMood('all')}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Show All Movies
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              item={movie}
              type="movie"
              imageBaseUrl={IMAGE_BASE_URL}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;