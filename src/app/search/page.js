"use client"
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline, IoBedOutline, IoCarOutline, IoResizeOutline, IoFilterOutline, IoOptionsOutline, IoClose, IoSearchOutline, IoArrowBack } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";
import DiscoverMap from "@/components/Discover/DiscoverMap";
import PropertyCard from "@/components/Discover/PropertyCard";
import PropertyCardSkeleton from "@/components/Discover/PropertyCardSkeleton";
import FilterPanel from "@/components/Discover/FilterPanel";
import Pagination from "@/components/Discover/Pagination";
import { propertyService } from "@/lib/propertyService";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  // Get search query from URL
  const searchQuery = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'all'; // 'all', 'location', 'property'
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // Fetch search results from Supabase
  useEffect(() => {
    const fetchSearchResults = async () => {
      console.log('Search params:', { searchQuery, searchType, lat, lon, currentPage });
      
      if (!searchQuery.trim()) {
        console.log('No search query, redirecting to discover');
        router.push('/discover');
        return;
      }

      try {
        if (currentPage === 1) {
          setLoading(true);
        } else {
          setPageLoading(true);
        }
        setError(null);

        let result;
        
        if (searchType === 'location') {
          console.log('Searching by location...');
          if (lat && lon) {
            console.log('Using provided coordinates:', lat, lon);
            // We have coordinates, search for properties near this location (500km radius)
            result = await propertyService.getPropertiesByLocation(
              parseFloat(lat),
              parseFloat(lon),
              500, // 500km radius
              { page: currentPage, limit: 12 }
            );
          } else {
            console.log('Geocoding location:', searchQuery);
            // We need to geocode the location first
            const locationResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&countrycodes=in`
            );
            const locationData = await locationResponse.json();
            console.log('Geocoding result:', locationData);
            
            if (locationData.length > 0) {
              const location = locationData[0];
              console.log('Found location:', location);
              result = await propertyService.getPropertiesByLocation(
                parseFloat(location.lat),
                parseFloat(location.lon),
                500, // 500km radius
                { page: currentPage, limit: 12 }
              );
            } else {
              console.log('Geocoding failed, falling back to text search');
              // Fallback to text search if geocoding fails
              result = await propertyService.searchProperties(searchQuery, { page: currentPage, limit: 12 });
            }
          }
        } else {
          console.log('Searching by text:', searchQuery);
          // Search by text (properties, features, etc.)
          result = await propertyService.searchProperties(searchQuery, { page: currentPage, limit: 12 });
        }
        
        console.log('Search result:', result);
        
        // If no results from database, show mock data for testing
        if (!result.properties || result.properties.length === 0) {
          console.log('No results from database, showing mock data for testing');
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
            }
          ];
          
          result = {
            properties: mockData,
            pagination: {
              page: 1,
              limit: 12,
              total: mockData.length,
              totalPages: 1,
              hasNext: false,
              hasPrev: false
            }
          };
        }
        
        // Transform data to match the expected format
        const transformedData = result.properties.map(property => {
          let priceString = '';
          if (typeof property.price === 'object' && property.price !== null) {
            if (property.price.amount !== undefined) {
              priceString = `₹${property.price.amount.toLocaleString()}`;
            } else {
              priceString = 'N/A';
            }
          } else if (typeof property.price === 'string') {
            priceString = property.price;
          } else {
            priceString = 'N/A';
          }

          let locationString = '';
          if (typeof property.location === 'object' && property.location !== null) {
            const { locality, city, state } = property.location;
            locationString = [locality, city, state].filter(Boolean).join(', ');
          } else if (typeof property.location === 'string') {
            locationString = property.location;
          } else {
            locationString = '';
          }

          return {
            id: property.id,
            title: property.title,
            location: locationString,
            price: priceString,
            size: property.size || `${(property.dimensions?.area / 4046.86).toFixed(1)} acres`, // Convert sq m to acres
            bedrooms: property.bedrooms || 0, // Plots don't have bedrooms
            parking: property.parking || property.parkingSpaces || 0,
            type: property.type,
            coordinates: property.coordinates || property.location?.coordinates || [property.location?.latitude, property.location?.longitude],
            image: property.image || property.images?.[0] || "/assets/img/house.png",
            description: property.description,
            features: property.features || []
          };
        });

        console.log('Transformed data:', transformedData);

        setProperties(transformedData);
        setFilteredProperties(transformedData);
        setPagination(result.pagination);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again later.');
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, searchType, lat, lon, currentPage, router]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchType]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDiscover = () => {
    router.push('/discover');
  };

  if (loading) {
    return (
      <div className="w-full lg:h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentYellow"></div>
          <p className="text-gray-600">Searching properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Error Loading Search Results</h3>
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
      <div className="hidden lg:block lg:w-2/5 h-full bg-white border-r border-gray-200">
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
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={handleBackToDiscover}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoArrowBack className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-borderDark">
                    {searchType === 'location' ? 'Properties Near' : 'Search Results'}
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600 mt-1">
                    <span className="text-accentYellow font-medium">
                      &quot;{searchQuery}&quot;
                    </span>
                    {searchType === 'location' && (
                      <span className="ml-2 text-gray-500">• Within 10km radius</span>
                    )}
                    <span className="ml-2">• {pagination.total} properties found</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
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
              <div className="text-gray-400 text-4xl lg:text-6xl mb-4">🔍</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
              <p className="text-sm lg:text-base text-gray-500 mb-4">
                {searchType === 'location' 
                  ? `No properties found within 10km of "${searchQuery}". Try searching for a different location.`
                  : `No properties match your search for "${searchQuery}"`
                }
              </p>
              <button
                onClick={handleBackToDiscover}
                className="px-4 py-2 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Back to Discover
              </button>
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

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
} 