"use client"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose, IoOptionsOutline, IoLocationOutline, IoResizeOutline, IoCashOutline, IoTimeOutline, IoStarOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const propertyTypes = [
  { id: "residential", label: "Residential", color: "bg-blue-100 text-blue-800", icon: "🏠" },
  { id: "commercial", label: "Commercial", color: "bg-green-100 text-green-800", icon: "🏢" },
  { id: "industrial", label: "Industrial", color: "bg-orange-100 text-orange-800", icon: "🏭" },
  { id: "agricultural", label: "Agricultural", color: "bg-yellow-100 text-yellow-800", icon: "🌾" },
  { id: "mixed", label: "Mixed Use", color: "bg-purple-100 text-purple-800", icon: "🏘️" },
  { id: "recreational", label: "Recreational", color: "bg-pink-100 text-pink-800", icon: "🎯" }
];

const features = [
  "Water Connection", "Electricity", "Road Access", "Security", "High Traffic",
  "Zoning Approved", "Utilities Ready", "Parking", "Rail Access", "Highway Proximity",
  "Heavy Machinery", "Storage", "Mountain Views", "Desert Landscape", "Privacy",
  "Solar Ready", "Fiber Internet", "Modern Infrastructure", "Collaboration Spaces",
  "Green Building", "Historic District", "Mature Trees", "Walking Distance", "Cultural Hub",
  "Public Transport", "Schools Nearby", "Shopping Centers", "Hospitals", "Airport Access"
];

const propertyStatus = [
  { id: "available", label: "Available", color: "bg-green-100 text-green-800" },
  { id: "under-review", label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
  { id: "reserved", label: "Reserved", color: "bg-orange-100 text-orange-800" },
  { id: "sold", label: "Sold", color: "bg-gray-100 text-gray-800" }
];

const timeToClose = [
  { id: "immediate", label: "Immediate", color: "bg-red-100 text-red-800" },
  { id: "30-days", label: "30 Days", color: "bg-orange-100 text-orange-800" },
  { id: "60-days", label: "60 Days", color: "bg-yellow-100 text-yellow-800" },
  { id: "90-days", label: "90 Days", color: "bg-blue-100 text-blue-800" },
  { id: "flexible", label: "Flexible", color: "bg-green-100 text-green-800" }
];

function FilterPanel({ filters, setFilters, onClose, isOpen }) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [localFilters, setLocalFilters] = useState(filters);
  const modalRef = useRef(null);

  // Sync localFilters with filters when modal opens
  useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [isOpen, filters]);

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // All handlers now update localFilters
  const handlePropertyTypeToggle = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type]
    }));
  };
  const handleFeatureToggle = (feature) => {
    setLocalFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };
  const handleStatusToggle = (status) => {
    setLocalFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };
  const handleTimeToCloseToggle = (time) => {
    setLocalFilters(prev => ({
      ...prev,
      timeToClose: prev.timeToClose.includes(time)
        ? prev.timeToClose.filter(t => t !== time)
        : [...prev.timeToClose, time]
    }));
  };
  const clearAllFilters = () => {
    setLocalFilters({
      priceRange: [0, 5000000],
      propertyType: [],
      sizeRange: [0, 20],
      location: "",
      features: [],
      status: [],
      timeToClose: [],
      minParking: 0,
      maxParking: 20,
      hasUtilities: false,
      hasRoadAccess: false,
      hasSecurity: false,
      sortBy: "price-asc"
    });
  };

  // activeFiltersCount logic should use localFilters
  const activeFiltersCount = [
    localFilters.propertyType.length,
    localFilters.features.length,
    localFilters.status.length,
    localFilters.timeToClose.length,
    localFilters.location ? 1 : 0,
    localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 5000000 ? 1 : 0,
    localFilters.sizeRange[0] > 0 || localFilters.sizeRange[1] < 20 ? 1 : 0,
    localFilters.minParking > 0 || localFilters.maxParking < 20 ? 1 : 0,
    localFilters.hasUtilities || localFilters.hasRoadAccess || localFilters.hasSecurity ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* Modal content */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl mx-4 bg-white rounded-xl border border-borderDark border-b-4 shadow-2xl overflow-y-auto max-h-[90vh] p-0 md:p-0"
        style={{
          width: '100%',
          maxWidth: '32rem',
          margin: '0 auto',
          borderRadius: '1rem',
        }}
      >
        {/* Filter Header */}
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accentYellow rounded-lg flex items-center justify-center">
                <IoOptionsOutline className="w-4 h-4 lg:w-5 lg:h-5 text-borderDark" />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <p className="text-xs lg:text-sm text-gray-600">Refine your property search</p>
              </div>
              {/* activeFiltersCount logic should use localFilters */}
              {(() => {
                const activeFiltersCount = [
                  localFilters.propertyType.length,
                  localFilters.features.length,
                  localFilters.status.length,
                  localFilters.timeToClose.length,
                  localFilters.location ? 1 : 0,
                  localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 5000000 ? 1 : 0,
                  localFilters.sizeRange[0] > 0 || localFilters.sizeRange[1] < 20 ? 1 : 0,
                  localFilters.minParking > 0 || localFilters.maxParking < 20 ? 1 : 0,
                  localFilters.hasUtilities || localFilters.hasRoadAccess || localFilters.hasSecurity ? 1 : 0
                ].reduce((a, b) => a + b, 0);
                return activeFiltersCount > 0 && (
                  <span className="px-2 lg:px-3 py-1 bg-accentYellow text-borderDark text-xs font-medium rounded-full">
                    {activeFiltersCount} active
                  </span>
                );
              })()}
            </div>
            <div className="flex items-center gap-1 lg:gap-2">
              <button
                onClick={clearAllFilters}
                className="text-xs lg:text-sm text-gray-500 hover:text-gray-700 px-2 lg:px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="p-1 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoClose className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("basic")}
              className={`flex-1 py-2 px-3 lg:px-4 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                activeTab === "basic" 
                  ? "bg-white text-borderDark shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`flex-1 py-2 px-3 lg:px-4 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                activeTab === "advanced" 
                  ? "bg-white text-borderDark shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 lg:p-6">
          {activeTab === "basic" ? (
            <div className="space-y-4 lg:space-y-6">
              {/* Location Filter */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2">
                  <IoLocationOutline className="w-4 h-4 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Location</label>
                </div>
                <input
                  type="text"
                  placeholder="Enter city, state, or zip code"
                  value={localFilters.location}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2">
                  <IoCashOutline className="w-4 h-4 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]] 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value) || 5000000] 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Size Range */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2">
                  <IoResizeOutline className="w-4 h-4 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Size Range (acres)</label>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <input
                    type="number"
                    placeholder="Min Size"
                    value={localFilters.sizeRange[0]}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      sizeRange: [parseFloat(e.target.value) || 0, prev.sizeRange[1]] 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Size"
                    value={localFilters.sizeRange[1]}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      sizeRange: [prev.sizeRange[0], parseFloat(e.target.value) || 20] 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Property Types */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Property Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handlePropertyTypeToggle(type.label)}
                      className={`p-2 lg:p-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        localFilters.propertyType.includes(type.label)
                          ? type.color
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={localFilters.sortBy}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size-asc">Size: Small to Large</option>
                  <option value="size-desc">Size: Large to Small</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-6">
              {/* Property Status */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Property Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyStatus.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusToggle(status.label)}
                      className={`p-2 lg:p-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                        localFilters.status.includes(status.label)
                          ? status.color
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time to Close */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="w-4 h-4 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">Time to Close</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {timeToClose.map((time) => (
                    <button
                      key={time.id}
                      onClick={() => handleTimeToCloseToggle(time.label)}
                      className={`p-2 lg:p-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                        localFilters.timeToClose.includes(time.label)
                          ? time.color
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parking Spaces */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Parking Spaces</label>
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <input
                    type="number"
                    placeholder="Min Parking"
                    value={localFilters.minParking}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      minParking: parseInt(e.target.value) || 0 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Parking"
                    value={localFilters.maxParking}
                    onChange={(e) => setLocalFilters(prev => ({ 
                      ...prev, 
                      maxParking: parseInt(e.target.value) || 20 
                    }))}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accentYellow focus:border-transparent transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Essential Features</label>
                <div className="grid grid-cols-1 gap-2 lg:gap-3">
                  <label className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={localFilters.hasUtilities}
                      onChange={(e) => setLocalFilters(prev => ({ ...prev, hasUtilities: e.target.checked }))}
                      className="w-4 h-4 text-accentYellow border-gray-300 rounded focus:ring-accentYellow"
                    />
                    <IoCheckmarkCircleOutline className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    <span className="text-sm font-medium">Utilities Ready</span>
                  </label>
                  <label className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={localFilters.hasRoadAccess}
                      onChange={(e) => setLocalFilters(prev => ({ ...prev, hasRoadAccess: e.target.checked }))}
                      className="w-4 h-4 text-accentYellow border-gray-300 rounded focus:ring-accentYellow"
                    />
                    <IoCheckmarkCircleOutline className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    <span className="text-sm font-medium">Road Access</span>
                  </label>
                  <label className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={localFilters.hasSecurity}
                      onChange={(e) => setLocalFilters(prev => ({ ...prev, hasSecurity: e.target.checked }))}
                      className="w-4 h-4 text-accentYellow border-gray-300 rounded focus:ring-accentYellow"
                    />
                    <IoCheckmarkCircleOutline className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    <span className="text-sm font-medium">Security Features</span>
                  </label>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-medium text-gray-700">Features & Amenities</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-2 max-h-32 lg:max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-xl">
                  {features.map((feature) => (
                    <label key={feature} className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 hover:text-gray-800 cursor-pointer p-1 lg:p-2 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={localFilters.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-accentYellow border-gray-300 rounded focus:ring-accentYellow"
                      />
                      {feature}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Apply Button */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => {
              setFilters(localFilters);
              onClose();
            }}
            className="px-6 py-2 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors shadow"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default FilterPanel; 