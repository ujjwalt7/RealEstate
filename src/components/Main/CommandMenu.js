"use client"
import { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoLocationOutline, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Mascot from "./Mascot";

function CommandMenu({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();

  // Load suggested locations from database
  useEffect(() => {
    const loadSuggestedLocations = () => {
      // Use default Indian cities as suggested locations
      setSuggestedLocations([
        "Mumbai, Maharashtra",
        "Delhi, Delhi",
        "Bangalore, Karnataka",
        "Chennai, Tamil Nadu",
        "Hyderabad, Telangana",
        "Pune, Maharashtra",
        "Kolkata, West Bengal",
        "Ahmedabad, Gujarat"
      ]);
    };

    if (isOpen) {
      loadSuggestedLocations();
    }
  }, [isOpen]);

  // Focus input when menu opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchQuery("");
      setSearchResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      const totalItems = searchResults.length + suggestedLocations.length;
      const maxIndex = totalItems - 1;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < maxIndex ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : maxIndex
          );
          break;
        case "Enter":
          e.preventDefault();
          const allItems = [...searchResults, ...suggestedLocations];
          if (allItems[selectedIndex]) {
            handleLocationSelect(allItems[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, suggestedLocations, selectedIndex, onClose]);

  // Search locations using OpenStreetMap API
  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search for locations using OpenStreetMap API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1&countrycodes=in`
      );
      const data = await response.json();
      
      const results = data.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type,
        city: item.address?.city || item.address?.town || item.address?.village || '',
        state: item.address?.state || '',
        country: item.address?.country || '',
        isLocation: true
      }));
      
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchLocations(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
    
    // Navigate to search page with location coordinates
    if (typeof location === 'string') {
      // This is a suggested location from database, we need to geocode it
      router.push(`/search?q=${encodeURIComponent(location)}&type=location`);
    } else {
      // This is a location from OpenStreetMap with coordinates
      router.push(`/search?q=${encodeURIComponent(location.name)}&type=location&lat=${location.lat}&lon=${location.lon}`);
    }
    onClose();
  };

  const displayItems = searchResults.length > 0 ? searchResults : suggestedLocations;
  const isSearching = searchQuery.trim() !== "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Command Menu */}
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl mx-4 bg-white rounded-xl border border-borderDark border-b-4 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="w-10 h-10 flex items-center justify-center mr-3">
            <Mascot />
          </div>
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location..."
              className="w-full outline-none text-lg font-medium text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accentYellow mx-auto"></div>
              <p className="mt-2 text-gray-500">Searching locations...</p>
            </div>
          ) : (
            <div className="py-2">
              {displayItems.length === 0 && isSearching ? (
                <div className="p-8 text-center text-gray-500">
                  No locations found for "{searchQuery}"
                </div>
              ) : (
                displayItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const isLocationObject = typeof item === 'object' && item.isLocation;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(item)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        isSelected ? 'bg-accentYellow/20' : ''
                      }`}
                    >
                      <IoLocationOutline className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 font-medium truncate">
                          {isLocationObject ? item.name : item}
                        </div>
                        {isLocationObject && (
                          <div className="text-sm text-gray-500">
                            {item.city && item.state ? `${item.city}, ${item.state}` : item.type}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 bg-accentYellow rounded-full flex-shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <div className="flex items-center gap-2">
              <IoSearchOutline className="w-4 h-4" />
              <span>Powered by OpenStreetMap</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CommandMenu; 