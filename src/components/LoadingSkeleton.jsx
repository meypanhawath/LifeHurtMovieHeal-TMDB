
import React from 'react';

export const MovieCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-800 rounded-lg aspect-[2/3] mb-2"></div>
    <div className="h-4 bg-gray-800 rounded mb-2"></div>
    <div className="h-3 bg-gray-800 rounded w-3/4"></div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="animate-pulse h-96 bg-gray-800 mb-12"></div>
);

export const SectionSkeleton = () => (
  <div className="mb-12">
    <div className="h-8 bg-gray-800 rounded w-48 mb-6"></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  </div>
);