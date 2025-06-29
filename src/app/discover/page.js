"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline, IoBedOutline, IoCarOutline, IoResizeOutline, IoFilterOutline, IoOptionsOutline, IoClose } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import DiscoverMap from "@/components/Discover/DiscoverMap";
import PropertyCard from "@/components/Discover/PropertyCard";
import PropertyCardSkeleton from "@/components/Discover/PropertyCardSkeleton";
import FilterPanel from "@/components/Discover/FilterPanel";
import Pagination from "@/components/Discover/Pagination";
import { propertyService } from "@/lib/propertyService";

function Discover() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const [filters, setFilters] = useState({
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

  // Fetch properties from Supabase with pagination
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Show page loading for pagination, full loading for initial load
        if (currentPage === 1) {
          setLoading(true);
        } else {
          setPageLoading(true);
        }
        setError(null);
        
        // Convert filters to Supabase format
        const supabaseFilters = {
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          minArea: filters.sizeRange[0] * 4046.86, // Convert acres to sq ft
          maxArea: filters.sizeRange[1] * 4046.86,
          type: filters.propertyType.length > 0 ? filters.propertyType : undefined,
          status: filters.status.length > 0 ? filters.status : undefined,
          location: filters.location || undefined,
          features: filters.features.length > 0 ? filters.features : undefined
        };

        const paginationParams = {
          page: currentPage,
          limit: 12
        };

        const result = await propertyService.getProperties(supabaseFilters, paginationParams);
        
        // Transform data to match the expected format
        const transformedData = result.properties.map(property => ({
          id: property.id,
          title: property.title,
          location: `${property.location?.locality}, ${property.location?.city}`,
          price: `$${property.price?.amount?.toLocaleString()}`,
          size: `${(property.dimensions?.area / 4046.86).toFixed(1)} acres`, // Convert sq m to acres
          bedrooms: 0, // Plots don't have bedrooms
          parking: property.parkingSpaces || 0,
          type: property.type,
          coordinates: property.location?.coordinates || [property.location?.latitude, property.location?.longitude],
          image: property.images?.[0] || "/assets/img/house.png",
          description: property.description,
          features: property.features || []
        }));

        setProperties(transformedData);
        setFilteredProperties(transformedData);
        setPagination(result.pagination);
      } catch (err) {
        console.error('Error fetching properties:', err);
        
        // Show mock data if database is not available
        console.log('Showing mock data due to database error');
        const mockData = [
          {
            id: "PLOT001",
            title: "Premium Residential Plot in Andheri West",
            location: "Andheri West, Mumbai",
            price: "$25,000,000",
            size: "0.4 acres",
            bedrooms: 0,
            parking: 4,
            type: "residential",
            coordinates: [19.0760, 72.8774],
            image: "/assets/img/house.png",
            description: "This premium residential plot is located in the heart of Andheri West, one of Mumbai's most sought-after residential areas.",
            features: ["Corner Plot", "Main Road Facing", "24x7 Water Supply", "Gated Community"]
          },
          {
            id: "PLOT002",
            title: "Commercial Plot in Bandra Kurla Complex",
            location: "Bandra Kurla Complex, Mumbai",
            price: "$85,000,000",
            size: "0.6 acres",
            bedrooms: 0,
            parking: 6,
            type: "commercial",
            coordinates: [19.0596, 72.8295],
            image: "/assets/img/blueprint.jpg",
            description: "Premium commercial plot in the heart of Mumbai's business district.",
            features: ["Premium Commercial Location", "High Traffic Area", "Zoning Approved", "Utilities Ready"]
          },
          {
            id: "PLOT003",
            title: "Agricultural Land in Pune",
            location: "Pune, Maharashtra",
            price: "$15,000,000",
            size: "2.0 acres",
            bedrooms: 0,
            parking: 2,
            type: "agricultural",
            coordinates: [18.5204, 73.8567],
            image: "/assets/img/houserender.png",
            description: "Fertile agricultural land perfect for farming or future development.",
            features: ["Fertile Soil", "Water Source", "Road Access", "Electricity Available"]
          }
        ];
        
        setProperties(mockData);
        setFilteredProperties(mockData);
        setPagination({
          page: 1,
          limit: 12,
          total: mockData.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        });
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };

    fetchProperties();
  }, [filters, currentPage]);

  // Handle URL search parameters
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setFilters(prev => ({
        ...prev,
        location: decodeURIComponent(locationParam)
      }));
      setIsFilterOpen(true);
    }
  }, [searchParams]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Apply client-side sorting
  useEffect(() => {
    if (properties.length === 0) return;

    let sorted = [...properties];
    
    switch (filters.sortBy) {
      case "price-asc":
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[$,]/g, ""));
          const priceB = parseInt(b.price.replace(/[$,]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-desc":
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[$,]/g, ""));
          const priceB = parseInt(b.price.replace(/[$,]/g, ""));
          return priceB - priceA;
        });
        break;
      case "size-asc":
        sorted.sort((a, b) => {
          const sizeA = parseFloat(a.size.split(" ")[0]);
          const sizeB = parseFloat(b.size.split(" ")[0]);
          return sizeA - sizeB;
        });
        break;
      case "size-desc":
        sorted.sort((a, b) => {
          const sizeA = parseFloat(a.size.split(" ")[0]);
          const sizeB = parseFloat(b.size.split(" ")[0]);
          return sizeB - sizeA;
        });
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        sorted.sort((a, b) => a.id - b.id);
        break;
    }
    
    setFilteredProperties(sorted);
  }, [properties, filters.sortBy]);

  // Check if we have active filters
  const hasActiveFilters = filters.location || filters.propertyType.length > 0 || filters.features.length > 0 || 
                          filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000 || 
                          filters.sizeRange[0] > 0 || filters.sizeRange[1] < 20;
  const filterText = filters.location ? `in ${filters.location}` : '';

  const handlePropertyHover = (propertyId) => {
    setHoveredPropertyId(propertyId);
  };

  const handlePropertyLeave = () => {
    setHoveredPropertyId(null);
  };

  const handlePropertyClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
  };

  const handleMarkerHover = (propertyId) => {
    setHoveredPropertyId(propertyId);
  };

  const handleMarkerLeave = () => {
    setHoveredPropertyId(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top of property cards section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full lg:h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentYellow"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Error Loading Properties</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Map (Full width on mobile, 2/5 on desktop) */}
      <div className="w-full lg:w-2/5 h-[50vh] lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
        <DiscoverMap
          properties={filteredProperties}
          hoveredPropertyId={hoveredPropertyId}
          selectedPropertyId={selectedPropertyId}
          onMarkerHover={handleMarkerHover}
          onMarkerLeave={handleMarkerLeave}
          onMarkerClick={handlePropertyClick}
        />
      </div>

      {/* Right Side - Property Cards (Full width on mobile, 3/5 on desktop) */}
      <div className="w-full lg:w-3/5 h-1/2 lg:h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex-shrink-0 p-4 lg:p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-borderDark">
                {hasActiveFilters ? 'Filtered Results' : 'Discover Properties'}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 mt-1">
                {hasActiveFilters && filterText && (
                  <span className="text-accentYellow font-medium">
                    Showing results {filterText}
                  </span>
                )}
                {pagination.total} properties found
              </p>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setFilters({
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
                    setCurrentPage(1);
                  }}
                  className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-100 text-gray-700 font-medium text-sm lg:text-base rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <IoClose className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Clear Filters</span>
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-5 py-2 lg:py-3 bg-accentYellow text-borderDark font-semibold text-sm lg:text-base rounded-xl border-b-4 border-yellow-400 hover:bg-yellow-400 transition-colors shadow-md"
              >
                <IoFilterOutline className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters}
                onClose={() => setIsFilterOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property Cards Grid */}
        <div className="flex-1 overflow-y-auto p-3 lg:p-6">
          <div className="grid grid-cols-1 px-8 lg:px-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {pageLoading ? (
              // Show skeleton loading during pagination
              Array.from({ length: 12 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            ) : (
              // Show actual property cards
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isHovered={hoveredPropertyId === property.id}
                  isSelected={selectedPropertyId === property.id}
                  onHover={handlePropertyHover}
                  onLeave={handlePropertyLeave}
                  onClick={handlePropertyClick}
                />
              ))
            )}
          </div>
          
          {!pageLoading && filteredProperties.length === 0 && (
            <div className="text-center py-8 lg:py-12">
              <div className="text-gray-400 text-4xl lg:text-6xl mb-4">🏠</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
              <p className="text-sm lg:text-base text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}

          {/* Pagination */}
          {!pageLoading && filteredProperties.length > 0 && (
            <div className="mt-8 lg:mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
                className="px-8 lg:px-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Discover;