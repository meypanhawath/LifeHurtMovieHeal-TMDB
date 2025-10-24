
import React, { useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import ImageGallery from './ImageGallery';
import VideoPlayer from './VideoPlayer';

const EnhancedMovieModal = ({ item, type, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: details } = useTMDB(`/${type}/${item.id}`);
  const { data: images } = useTMDB(`/${type}/${item.id}/images`);
  const { data: videos } = useTMDB(`/${type}/${item.id}/videos`);

  const title = type === 'movie' ? item.title : item.name;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'media', label: 'Media' },
    { id: 'details', label: 'Details' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75"
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
                <span>{item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}</span>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-700">
            <div className="flex space-x-8 px-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{item.overview}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {details?.genres?.map(genre => (
                        <span key={genre.id} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">Details</h3>
                    <div className="space-y-2 text-gray-300">
                      <div>Status: {details?.status}</div>
                      <div>Language: {details?.original_language?.toUpperCase()}</div>
                      <div>Runtime: {details?.runtime || details?.episode_run_time?.[0]} min</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <VideoPlayer videos={videos?.results} />
                <ImageGallery 
                  images={images?.backdrops || []} 
                  title={title}
                />
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-3">Production</h3>
                  <div className="space-y-3">
                    {details?.production_companies?.map(company => (
                      <div key={company.id} className="flex items-center space-x-3">
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                            alt={company.name}
                            className="w-8 h-8 object-contain"
                          />
                        )}
                        <span className="text-gray-300">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Statistics</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>Budget: ${details?.budget?.toLocaleString()}</div>
                    <div>Revenue: ${details?.revenue?.toLocaleString()}</div>
                    <div>Vote Count: {details?.vote_count?.toLocaleString()}</div>
                    <div>Popularity: {details?.popularity?.toFixed(0)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMovieModal;