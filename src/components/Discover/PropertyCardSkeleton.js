import React from 'react';

const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        
        {/* Location skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        
        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        
        {/* Details skeleton */}
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-14"></div>
        </div>
        
        {/* Features skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-2 bg-gray-200 rounded w-12"></div>
          <div className="h-2 bg-gray-200 rounded w-16"></div>
          <div className="h-2 bg-gray-200 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton; 