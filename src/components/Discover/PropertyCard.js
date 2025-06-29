"use client"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoLocationOutline, IoResizeOutline, IoCarOutline, IoCallOutline, IoMailOutline, IoEyeOutline, IoStarOutline, IoTimeOutline } from "react-icons/io5";

function PropertyCard({ property, isHovered, isSelected, onHover, onLeave, onClick }) {
  const router = useRouter();

  const getTypeColor = (type) => {
    switch (type) {
      case "Residential": return "bg-blue-100 text-blue-800";
      case "Commercial": return "bg-green-100 text-green-800";
      case "Industrial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = async (e) => {
    e.stopPropagation();
    
    // Trigger click callback for map interaction
    if (onClick) {
      onClick(property.id);
    }

    // Add a small delay for the click animation
    await new Promise(resolve => setTimeout(resolve, 150));

    // Navigate to property detail page with smooth transition
    router.push(`/property/${property.id}`);
  };

  const handleRequestInfo = (e) => {
    e.stopPropagation();
    // Handle request info action
    console.log("Request info for:", property.title);
  };

  const handleBookCall = (e) => {
    e.stopPropagation();
    // Handle book call action
    console.log("Book call for:", property.title);
  };

  const handleCardClick = (e) => {
    // Only navigate if clicking on the card itself, not on buttons
    if (e.target === e.currentTarget || e.target.closest('button') === null) {
      handleViewDetails(e);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-105 ring-2 ring-accentYellow' : ''
      } ${isSelected ? 'ring-2 ring-borderDark shadow-2xl' : ''}`}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={onLeave}
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-2 left-2 flex flex-col sm:flex-row gap-1 sm:gap-2">
          <motion.span 
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(property.type)}`}
            whileHover={{ scale: 1.05 }}
          >
            {property.type}
          </motion.span>
          <motion.span 
            className="px-2 py-1 rounded-full text-xs font-medium bg-accentYellow text-borderDark font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Available
          </motion.span>
        </div>
        <motion.div 
          className="absolute top-2 right-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold bg-white/95 text-borderDark shadow-sm">
            {property.price}
          </span>
        </motion.div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs lg:text-sm bg-black/50 px-2 py-1 rounded-lg">
          <IoStarOutline className="w-3 h-3 lg:w-4 lg:h-4" />
          <span>4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 lg:p-4">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-2 lg:mb-3">
          <IoLocationOutline className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="text-xs lg:text-sm">{property.location}</span>
        </div>

        <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4">
          <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600">
            <IoResizeOutline className="w-3 h-3 lg:w-4 lg:h-4" />
            <span>{property.size}</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600">
            <IoCarOutline className="w-3 h-3 lg:w-4 lg:h-4" />
            <span>{property.parking} parking</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600">
            <IoTimeOutline className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">30 days to close</span>
            <span className="sm:hidden">30 days</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600">
            <IoStarOutline className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Premium location</span>
            <span className="sm:hidden">Premium</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3 lg:mb-4">
          {property.features.slice(0, 2).map((feature, index) => (
            <motion.span
              key={index}
              className="px-1 lg:px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            >
              {feature}
            </motion.span>
          ))}
          {property.features.length > 2 && (
            <motion.span 
              className="px-1 lg:px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            >
              +{property.features.length - 2} more
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <motion.button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 bg-accentYellow text-borderDark font-semibold text-xs lg:text-sm rounded-lg hover:bg-yellow-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoEyeOutline className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </motion.button>
          <div className="flex gap-1 sm:gap-2">
            <motion.button
              onClick={handleRequestInfo}
              className="flex-1 flex items-center justify-center gap-1 px-2 lg:px-3 py-2 bg-white border border-gray-300 text-gray-700 text-xs lg:text-sm rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IoMailOutline className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Inquire</span>
              <span className="sm:hidden">Info</span>
            </motion.button>
            <motion.button
              onClick={handleBookCall}
              className="flex-1 flex items-center justify-center gap-1 px-2 lg:px-3 py-2 bg-white border border-gray-300 text-gray-700 text-xs lg:text-sm rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IoCallOutline className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Call</span>
              <span className="sm:hidden">Call</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-accentYellow/5 pointer-events-none"
        />
      )}

      {/* Quick Actions on Hover (Desktop only) */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-2 hidden lg:flex gap-1"
        >
          <motion.button
            onClick={handleRequestInfo}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-accentYellow transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoMailOutline className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={handleBookCall}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-accentYellow transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoCallOutline className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Loading indicator for navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-accentYellow"
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default PropertyCard; 