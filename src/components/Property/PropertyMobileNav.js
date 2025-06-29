"use client"
import React from 'react';
import { Phone, MessageCircle, Heart, Share2 } from 'lucide-react';

const PropertyMobileNav = ({ property, onContact, onFavorite, isFavorite }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Price Display */}
        <div className="flex-1">
          <div className="text-lg font-bold text-green-600">
            ₹{(property?.price?.amount / 10000000).toFixed(1)} Cr
          </div>
          <div className="text-xs text-gray-500">
            ₹{property?.price?.perSqFt?.toLocaleString()}/sq ft
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onFavorite}
            className={`p-3 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-50 text-red-500' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={onContact}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
          </button>
          
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMobileNav; 