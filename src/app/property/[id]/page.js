"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  Star, 
  Calendar, 
  Users, 
  Car, 
  Wifi, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Camera,
  Home,
  Building2,
  TreePine,
  Factory,
  Ruler,
  DollarSign,
  Clock,
  Award,
  ThumbsUp,
  MessageCircle,
  Eye
} from 'lucide-react';
import PropertyMobileNav from '@/components/Property/PropertyMobileNav';
import PropertyLoading from '@/components/Property/PropertyLoading';
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoLocationOutline, 
  IoResizeOutline, 
  IoCarOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoStarOutline, 
  IoTimeOutline,
  IoArrowBack,
  IoShareOutline,
  IoHeartOutline,
  IoHeart,
  IoChevronBack,
  IoChevronForward,
  IoBedOutline,
  IoWaterOutline,
  IoFlashOutline,
  IoWifiOutline,
  IoShieldCheckmarkOutline,
  IoMapOutline,
  IoDocumentTextOutline,
  IoCalculatorOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";
import "leaflet/dist/leaflet.css";
import { propertyService } from '@/lib/propertyService';
import Image from 'next/image';

const PropertyDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mapInstance, setMapInstance] = useState(null);
  const [carouselMapInstance, setCarouselMapInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching property with ID:', params.id);
        
        const propertyData = await propertyService.getPropertyById(params.id);
        
        console.log('Property data received:', propertyData);
        
        if (propertyData) {
          setProperty(propertyData);
          // Increment view count
          // await propertyService.incrementViews(params.id);
        } else {
          console.log('Property not found in database, showing mock data');
          // Show mock data if property not found in database
          const mockProperty = {
            id: params.id,
            title: "Premium Residential Plot in Andheri West",
            type: "residential",
            status: "Available",
            dimensions: {
              width: 30,
              length: 50,
              area: 1500,
              areaSqFt: 16146
            },
            location: {
              latitude: 19.0760,
              longitude: 72.8774,
              locality: "Andheri West",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400058",
              address: "Plot No. 123, Sector 7, Andheri West, Mumbai - 400058",
              coordinates: [19.0760, 72.8774]
            },
            price: {
              amount: 25000000,
              perSqFt: 16667,
              perSqM: 154321,
              currency: "INR",
              negotiable: true,
              paymentTerms: ["20% Booking Amount", "80% on Registration"]
            },
            features: [
              "Corner Plot",
              "Main Road Facing",
              "24x7 Water Supply",
              "Gated Community",
              "Near Metro Station",
              "Ready for Construction",
              "Electricity Available",
              "Drainage System",
              "Security System",
              "Parking Space"
            ],
            amenities: [
              "Metro Station (500m)",
              "Shopping Mall (1km)",
              "Hospital (2km)",
              "School (1.5km)",
              "Airport (8km)",
              "Railway Station (3km)"
            ],
            documents: [
              { name: "Clear Title", status: "Verified", icon: "CheckCircle" },
              { name: "Approved Layout", status: "Verified", icon: "CheckCircle" },
              { name: "No Encumbrances", status: "Verified", icon: "CheckCircle" },
              { name: "Ready for Registration", status: "Pending", icon: "Clock" },
              { name: "Environmental Clearance", status: "Verified", icon: "CheckCircle" }
            ],
            contact: {
              agent: "Rajesh Kumar",
              phone: "+91 98765 43210",
              email: "rajesh@landbroker.com",
              company: "Premium Land Brokers",
              experience: "8+ years",
              rating: 4.8,
              reviews: 127,
              verified: true
            },
            images: [
              "/assets/img/house.png",
              "/assets/img/blueprint.jpg",
              "/assets/img/houserender.png",
              "/assets/img/housesbg.jpg",
              "/assets/img/all.webp"
            ],
            description: "This premium residential plot is located in the heart of Andheri West, one of Mumbai's most sought-after residential areas. The plot offers excellent connectivity to major landmarks and is perfect for building your dream home. The area is well-developed with all modern amenities and infrastructure.",
            highlights: [
              "Prime location with excellent connectivity",
              "Ready for immediate construction",
              "All legal documents verified",
              "Excellent investment potential",
              "High rental yield area"
            ],
            nearbyProperties: [
              { id: "PLOT002", price: "₹3.2 Cr", area: "1800 sq ft" },
              { id: "PLOT003", price: "₹2.8 Cr", area: "1600 sq ft" },
              { id: "PLOT004", price: "₹4.1 Cr", area: "2200 sq ft" }
            ],
            tags: ["premium", "residential", "mumbai", "andheri", "metro-near"],
            zoning: "Residential",
            soilType: "Loamy",
            roadWidth: 12,
            facing: "North-East",
            slope: "Level",
            waterTable: "15 feet",
            electricity: true,
            waterSupply: true,
            sewage: true,
            internet: true,
            security: true,
            parkingSpaces: 4,
            constructionAllowed: true,
            floorAreaRatio: 2.5,
            buildingHeight: 15,
            setback: {
              front: 3,
              back: 3,
              left: 2,
              right: 2
            },
            environmentalFactors: {
              floodZone: false,
              earthquakeZone: "Zone III",
              airQuality: "good",
              noiseLevel: "moderate"
            },
            investmentPotential: {
              appreciationRate: 12.5,
              rentalYield: 8.2,
              developmentPotential: "high"
            },
            legalStatus: {
              titleClear: true,
              encumbrances: false,
              litigation: false,
              approvals: ["Layout Approval", "Building Permission"]
            },
            infrastructure: {
              roads: "Asphalt",
              drainage: "Underground",
              streetlights: true,
              publicTransport: "500m"
            },
            futurePlans: {
              metroStation: "Andheri Metro Extension",
              highway: "Western Express Highway Widening",
              airport: "Mumbai Airport Expansion",
              commercialHub: "Andheri Business District"
            },
            similarProperties: [
              { id: "PLOT005", title: "Andheri East Plot", price: 28000000, area: 1800, soldDate: "2024-01-15" },
              { id: "PLOT006", title: "Bandra West Plot", price: 35000000, area: 2000, soldDate: "2024-01-10" }
            ],
            marketData: {
              avgPricePerSqFt: 18000,
              priceTrend: "increasing",
              daysOnMarket: 45,
              demandLevel: "high"
            },
            views: 1247,
            saved: 89
          };
          setProperty(mockProperty);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        
        // Show mock data if there's an error
        console.log('Showing mock data due to error');
        const mockProperty = {
          id: params.id,
          title: "Premium Residential Plot in Andheri West",
          type: "residential",
          status: "Available",
          dimensions: {
            width: 30,
            length: 50,
            area: 1500,
            areaSqFt: 16146
          },
          location: {
            latitude: 19.0760,
            longitude: 72.8774,
            locality: "Andheri West",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400058",
            address: "Plot No. 123, Sector 7, Andheri West, Mumbai - 400058",
            coordinates: [19.0760, 72.8774]
          },
          price: {
            amount: 25000000,
            perSqFt: 16667,
            perSqM: 154321,
            currency: "INR",
            negotiable: true,
            paymentTerms: ["20% Booking Amount", "80% on Registration"]
          },
          features: [
            "Corner Plot",
            "Main Road Facing",
            "24x7 Water Supply",
            "Gated Community",
            "Near Metro Station",
            "Ready for Construction",
            "Electricity Available",
            "Drainage System",
            "Security System",
            "Parking Space"
          ],
          amenities: [
            "Metro Station (500m)",
            "Shopping Mall (1km)",
            "Hospital (2km)",
            "School (1.5km)",
            "Airport (8km)",
            "Railway Station (3km)"
          ],
          documents: [
            { name: "Clear Title", status: "Verified", icon: "CheckCircle" },
            { name: "Approved Layout", status: "Verified", icon: "CheckCircle" },
            { name: "No Encumbrances", status: "Verified", icon: "CheckCircle" },
            { name: "Ready for Registration", status: "Pending", icon: "Clock" },
            { name: "Environmental Clearance", status: "Verified", icon: "CheckCircle" }
          ],
          contact: {
            agent: "Rajesh Kumar",
            phone: "+91 98765 43210",
            email: "rajesh@landbroker.com",
            company: "Premium Land Brokers",
            experience: "8+ years",
            rating: 4.8,
            reviews: 127,
            verified: true
          },
          images: [
            "/assets/img/house.png",
            "/assets/img/blueprint.jpg",
            "/assets/img/houserender.png",
            "/assets/img/housesbg.jpg",
            "/assets/img/all.webp"
          ],
          description: "This premium residential plot is located in the heart of Andheri West, one of Mumbai's most sought-after residential areas. The plot offers excellent connectivity to major landmarks and is perfect for building your dream home. The area is well-developed with all modern amenities and infrastructure.",
          highlights: [
            "Prime location with excellent connectivity",
            "Ready for immediate construction",
            "All legal documents verified",
            "Excellent investment potential",
            "High rental yield area"
          ],
          nearbyProperties: [
            { id: "PLOT002", price: "₹3.2 Cr", area: "1800 sq ft" },
            { id: "PLOT003", price: "₹2.8 Cr", area: "1600 sq ft" },
            { id: "PLOT004", price: "₹4.1 Cr", area: "2200 sq ft" }
          ],
          tags: ["premium", "residential", "mumbai", "andheri", "metro-near"],
          zoning: "Residential",
          soilType: "Loamy",
          roadWidth: 12,
          facing: "North-East",
          slope: "Level",
          waterTable: "15 feet",
          electricity: true,
          waterSupply: true,
          sewage: true,
          internet: true,
          security: true,
          parkingSpaces: 4,
          constructionAllowed: true,
          floorAreaRatio: 2.5,
          buildingHeight: 15,
          setback: {
            front: 3,
            back: 3,
            left: 2,
            right: 2
          },
          environmentalFactors: {
            floodZone: false,
            earthquakeZone: "Zone III",
            airQuality: "good",
            noiseLevel: "moderate"
          },
          investmentPotential: {
            appreciationRate: 12.5,
            rentalYield: 8.2,
            developmentPotential: "high"
          },
          legalStatus: {
            titleClear: true,
            encumbrances: false,
            litigation: false,
            approvals: ["Layout Approval", "Building Permission"]
          },
          infrastructure: {
            roads: "Asphalt",
            drainage: "Underground",
            streetlights: true,
            publicTransport: "500m"
          },
          futurePlans: {
            metroStation: "Andheri Metro Extension",
            highway: "Western Express Highway Widening",
            airport: "Mumbai Airport Expansion",
            commercialHub: "Andheri Business District"
          },
          similarProperties: [
            { id: "PLOT005", title: "Andheri East Plot", price: 28000000, area: 1800, soldDate: "2024-01-15" },
            { id: "PLOT006", title: "Bandra West Plot", price: 35000000, area: 2000, soldDate: "2024-01-10" }
          ],
          marketData: {
            avgPricePerSqFt: 18000,
            priceTrend: "increasing",
            daysOnMarket: 45,
            demandLevel: "high"
          },
          views: 1247,
          saved: 89
        };
        setProperty(mockProperty);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined' && property && !mapInstance && activeTab === "map") {
      const initMap = async () => {
        // Wait for the DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const mapContainer = document.getElementById('property-map');
        if (!mapContainer) {
          console.log('Map container not found, retrying...');
          return;
        }

        const L = await import('leaflet');
        
        const map = L.default.map('property-map', {
          center: property.location.coordinates,
          zoom: 15,
          zoomControl: false
        });

        L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add property marker
        const marker = L.default.marker(property.location.coordinates).addTo(map);
        marker.bindPopup(`
          <div class="property-popup">
            <h3 class="font-semibold text-gray-900">${property.title}</h3>
            <p class="text-gray-600 text-sm">${property.location.address}</p>
            <p class="text-cyan-600 font-semibold">${property.price.amount.toLocaleString()} ${property.price.currency}</p>
          </div>
        `);

        setMapInstance(map);
      };

      initMap();

      return () => {
        if (mapInstance) mapInstance.remove();
      };
    }
  }, [property, mapInstance, activeTab]);

  // Cleanup map when switching away from map tab
  useEffect(() => {
    if (activeTab !== "map" && mapInstance) {
      mapInstance.remove();
      setMapInstance(null);
    }
  }, [activeTab, mapInstance]);

  // Initialize carousel map
  useEffect(() => {
    if (typeof window !== 'undefined' && property && currentImageIndex === 0 && !carouselMapInstance) {
      const initCarouselMap = async () => {
        // Wait for the DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const mapContainer = document.getElementById('carousel-map');
        if (!mapContainer) {
          console.log('Carousel map container not found, retrying...');
          return;
        }

        const L = await import('leaflet');
        
        const map = L.default.map('carousel-map', {
          center: property.location.coordinates,
          zoom: 15,
          zoomControl: false
        });

        L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add property marker
        const marker = L.default.marker(property.location.coordinates).addTo(map);
        marker.bindPopup(`
          <div class="property-popup">
            <h3 class="font-semibold text-gray-900">${property.title}</h3>
            <p class="text-gray-600 text-sm">${property.location.address}</p>
            <p class="text-cyan-600 font-semibold">${property.price.amount.toLocaleString()} ${property.price.currency}</p>
          </div>
        `);

        setCarouselMapInstance(map);
      };

      initCarouselMap();

      return () => {
        if (carouselMapInstance) carouselMapInstance.remove();
      };
    }
  }, [property, currentImageIndex, carouselMapInstance]);

  // Show loading component while fetching data
  if (loading) {
    return <PropertyLoading />;
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Property</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  // Show property not found
  if (!property) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.push('/discover')}
            className="px-6 py-3 bg-accentYellow text-borderDark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </motion.div>
    );
  }

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const getPropertyTypeIcon = (type) => {
    const icons = {
      residential: Home,
      commercial: Building2,
      agricultural: TreePine,
      industrial: Factory
    };
    return icons[type] || Home;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({ name: '', phone: '', email: '', message: '' });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  const nextImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prev) => 
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property?.images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "residential": return "bg-blue-100 text-blue-800";
      case "commercial": return "bg-green-100 text-green-800";
      case "agricultural": return "bg-orange-100 text-orange-800";
      case "industrial": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleContactAction = (type) => {
    if (type === 'call') {
      window.location.href = `tel:${property.contact.phone}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${property.contact.email}`;
    }
  };

  // Create carousel items with map first, then images
  const carouselItems = property ? [
    {
      type: 'map',
      id: 'location-map',
      title: 'Location Map',
      content: null // Will be rendered separately
    },
    ...(property.images?.map((image, index) => ({
      type: 'image',
      id: `image-${index}`,
      title: `Property View ${index + 1}`,
      content: image
    })) || [])
  ] : [];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pb-20 lg:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b sticky top-0 z-40"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoArrowBack className="w-5 h-5" />
              <span className="hidden sm:block">Back to Search</span>
            </motion.button>
            
            <div className="flex items-center gap-4">
              <motion.button 
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoShareOutline className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleFavorite}
                className={`p-2 transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isFavorite ? (
                  <IoHeart className="w-5 h-5 fill-current" />
                ) : (
                  <IoHeartOutline className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Image Carousel */}
        <motion.div 
          className="relative mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-200">
            <AnimatePresence mode="wait">
              {currentImageIndex === 0 ? (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <div id="carousel-map" className="w-full h-full z-0"></div>
                </motion.div>
              ) : (
                <motion.img
                  key={currentImageIndex}
                  src={carouselItems[currentImageIndex]?.content}
                  alt={`${property.title} - Image ${currentImageIndex}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoChevronBack className="w-5 h-5 text-gray-700" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoChevronForward className="w-5 h-5 text-gray-700" />
            </motion.button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            {/* Property Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <motion.span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(property.type)}`}
                whileHover={{ scale: 1.05 }}
              >
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </motion.span>
              <motion.span 
                className="px-3 py-1 rounded-full text-sm font-medium bg-accentYellow text-borderDark font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                {property.status}
              </motion.span>
            </div>

            {/* Map/Image Type Indicator */}
            <motion.div 
              className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                {currentImageIndex === 0 ? (
                  <IoMapOutline className="w-4 h-4" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {carouselItems[currentImageIndex]?.title}
                </span>
              </div>
            </motion.div>

            {/* Price Badge */}
            <motion.div 
              className="absolute top-4 right-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-4 py-2 rounded-full text-lg font-bold bg-white/95 text-borderDark shadow-lg">
                {formatPrice(property.price.amount)}
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-borderDark mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <IoLocationOutline className="w-4 h-4" />
                    <span>{property.location.address}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <IoResizeOutline className="w-4 h-4" />
                      <span>{property.dimensions.areaSqFt.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCarOutline className="w-4 h-4" />
                      <span>{property.parkingSpaces || 0} parking</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoTimeOutline className="w-4 h-4" />
                      <span>30-60 days</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <IoStarOutline className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{property.contact.rating} ({property.contact.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="border-b border-gray-200">
                <div className="flex gap-1 p-4 overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: IoDocumentTextOutline },
                    { id: "features", label: "Features", icon: IoShieldCheckmarkOutline },
                    { id: "map", label: "Location", icon: IoMapOutline },
                    { id: "documents", label: "Documents", icon: IoDocumentTextOutline },
                    { id: "calculator", label: "Calculator", icon: IoCalculatorOutline }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-accentYellow text-borderDark"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Description</h3>
                        <p className="text-gray-700 leading-relaxed">{property.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {property.highlights?.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <IoCheckmarkCircleOutline className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Plot Dimensions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <div className="text-lg font-semibold text-gray-800">{property.dimensions.width}m × {property.dimensions.length}m</div>
                            <div className="text-sm text-gray-500 mt-1">Dimensions</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <div className="text-lg font-semibold text-gray-800">{property.dimensions.area} sq m</div>
                            <div className="text-sm text-gray-500 mt-1">Area (sq m)</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <div className="text-lg font-semibold text-gray-800">{property.dimensions.areaSqFt.toLocaleString()} sq ft</div>
                            <div className="text-sm text-gray-500 mt-1">Area (sq ft)</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <div className="text-lg font-semibold text-gray-800">₹{property.price.perSqM.toLocaleString()}</div>
                            <div className="text-sm text-gray-500 mt-1">Per sq m</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Amenities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {property.amenities?.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-accentYellow rounded-full"></div>
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "features" && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {property.features?.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                              <IoCheckmarkCircleOutline className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "map" && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Property Location</h3>
                      <div id="property-map" className="h-96 rounded-xl overflow-hidden"></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                          <p className="text-gray-600">{property.location.address}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Coordinates</h4>
                          <p className="text-gray-600">{property.location.coordinates.join(", ")}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "documents" && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Property Documents</h3>
                      <div className="space-y-3">
                        {property.documents?.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {React.createElement(doc.icon, { 
                                className: `w-5 h-5 ${doc.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'}` 
                              })}
                              <span className="font-medium text-gray-800">{doc.name}</span>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              doc.status === 'Verified' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "calculator" && (
                    <motion.div
                      key="calculator"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Cost Calculator</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Payment Terms</h4>
                          <div className="space-y-2 text-sm">
                            {property.price.paymentTerms?.map((term, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accentYellow rounded-full"></div>
                                <span className="text-gray-700">{term}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Price Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Price</span>
                              <span className="font-medium">{formatPrice(property.price.amount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Per sq ft</span>
                              <span className="font-medium">₹{property.price.perSqFt.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Per sq m</span>
                              <span className="font-medium">₹{property.price.perSqM.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={property.images?.[0] || "/assets/img/house.png"}
                  alt={property.contact.agent}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{property.contact.agent}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <IoStarOutline className="w-3 h-3 fill-current text-yellow-500" />
                    <span>{property.contact.rating}</span>
                    <span>({property.contact.experience})</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleContactAction('call')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accentYellow text-borderDark font-semibold rounded-xl border-b-4 border-yellow-400 hover:bg-yellow-400 transition-colors"
                >
                  <IoCallOutline className="w-4 h-4" />
                  Call Agent
                </button>
                <button
                  onClick={() => handleContactAction('email')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <IoMailOutline className="w-4 h-4" />
                  Send Email
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoResizeOutline className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Land Area</p>
                    <p className="font-medium text-gray-900">{property.dimensions.areaSqFt.toLocaleString()} sq ft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoCarOutline className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Parking Spaces</p>
                    <p className="font-medium text-gray-900">{property.parkingSpaces || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IoTimeOutline className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time to Close</p>
                    <p className="font-medium text-gray-900">30-60 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <div className="space-y-2">
                {property.features?.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <IoCheckmarkCircleOutline className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
                {property.features && property.features.length > 6 && (
                  <button
                    onClick={() => setActiveTab("features")}
                    className="text-sm text-accentYellow hover:text-yellow-600 font-medium"
                  >
                    View all {property.features.length} features
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <PropertyMobileNav 
        property={property}
        onContact={handleContact}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-accentYellow"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-accentYellow"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-accentYellow"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-accentYellow"
                  placeholder="I'm interested in this property..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-accentYellow text-borderDark py-3 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetailPage; 