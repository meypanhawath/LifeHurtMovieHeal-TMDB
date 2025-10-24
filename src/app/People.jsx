
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTMDB } from '../hooks/useTMDB';

const People = () => {
  const [category, setCategory] = useState('popular');
  const navigate = useNavigate();
  
  const { data: people, loading, error, IMAGE_BASE_URL } = useTMDB(`/person/${category}`);

  const categories = [
    { key: 'popular', label: 'Popular' },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">
            People
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {people?.results?.map((person) => (
            <div 
              key={person.id} 
              className="group text-center cursor-pointer"
              onClick={() => navigate(`/person/${person.id}`)}
            >
              <div className="relative mb-4">
                <img
                  src={person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : '/placeholder-person.jpg'}
                  alt={person.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-gray-600 group-hover:border-red-500"
                />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{person.name}</h3>
              <p className="text-gray-400 text-xs">{person.known_for_department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;