
import React from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { data: trending, loading: trendingLoading, IMAGE_BASE_URL } = useTMDB('/trending/all/week');
  const { data: movies, loading: moviesLoading } = useTMDB('/movie/popular');
  const { data: tvShows, loading: tvLoading } = useTMDB('/tv/popular');

  const Section = ({ title, data, loading }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.results?.slice(0, 12).map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              type={item.media_type || 'movie'}
              imageBaseUrl={IMAGE_BASE_URL}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="pt-20">
      <div className="relative h-96 bg-gradient-to-r from-black via-black/80 to-black/60 mb-12">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white mb-4">
              Life Hurts, Movies Heal
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Your sanctuary for cinematic healing
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Start Healing
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Section title="Trending Now" data={trending} loading={trendingLoading} />
        <Section title="Popular Movies" data={movies} loading={moviesLoading} />
        <Section title="Popular TV Shows" data={tvShows} loading={tvLoading} />
      </div> 
    </div>
  );
};

export default Home;