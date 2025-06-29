// Sample data generator for Supabase properties table
// Run this script to generate realistic property data

const sampleProperties = [
  {
    id: "PLOT001",
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
  },
  {
    id: "PLOT002",
    title: "Commercial Plot in Bandra Kurla Complex",
    type: "commercial",
    status: "Available",
    dimensions: {
      width: 40,
      length: 60,
      area: 2400,
      areaSqFt: 25833
    },
    location: {
      latitude: 19.0596,
      longitude: 72.8295,
      locality: "Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      address: "Plot No. 456, BKC Phase 2, Bandra Kurla Complex, Mumbai - 400051",
      coordinates: [19.0596, 72.8295]
    },
    price: {
      amount: 85000000,
      perSqFt: 32917,
      perSqM: 354167,
      currency: "INR",
      negotiable: false,
      paymentTerms: ["30% Booking Amount", "70% on Registration"]
    },
    features: [
      "Premium Commercial Location",
      "High Traffic Area",
      "Zoning Approved",
      "Utilities Ready",
      "Parking Available",
      "Security System",
      "Fire Safety",
      "Elevator Ready",
      "Basement Parking",
      "Green Building Ready"
    ],
    amenities: [
      "BKC Metro Station (200m)",
      "International Airport (5km)",
      "Shopping Centers (1km)",
      "Hotels (500m)",
      "Banks (300m)",
      "Restaurants (200m)"
    ],
    documents: [
      { name: "Commercial Zoning", status: "Verified", icon: "CheckCircle" },
      { name: "Building Approval", status: "Verified", icon: "CheckCircle" },
      { name: "Fire Safety Certificate", status: "Verified", icon: "CheckCircle" },
      { name: "Environmental Clearance", status: "Verified", icon: "CheckCircle" },
      { name: "Traffic Impact Study", status: "Pending", icon: "Clock" }
    ],
    contact: {
      agent: "Priya Sharma",
      phone: "+91 98765 43211",
      email: "priya@commercialbrokers.com",
      company: "Commercial Real Estate Solutions",
      experience: "12+ years",
      rating: 4.9,
      reviews: 203,
      verified: true
    },
    images: [
      "/assets/img/blueprint.jpg",
      "/assets/img/houserender.png",
      "/assets/img/housesbg.jpg",
      "/assets/img/all.webp",
      "/assets/img/house.png"
    ],
    description: "Premium commercial plot in the prestigious Bandra Kurla Complex, Mumbai's premier business district. This plot offers excellent connectivity and is perfect for corporate offices, retail spaces, or mixed-use developments. The area is home to major multinational companies and financial institutions.",
    highlights: [
      "Prime BKC location",
      "High commercial value",
      "Excellent connectivity",
      "Premium business district",
      "High rental potential"
    ],
    nearbyProperties: [
      { id: "PLOT007", price: "₹9.2 Cr", area: "2800 sq ft" },
      { id: "PLOT008", price: "₹7.8 Cr", area: "2200 sq ft" },
      { id: "PLOT009", price: "₹12.1 Cr", area: "3500 sq ft" }
    ],
    tags: ["commercial", "bkc", "mumbai", "premium", "business"],
    zoning: "Commercial",
    soilType: "Rocky",
    roadWidth: 18,
    facing: "South-West",
    slope: "Level",
    waterTable: "25 feet",
    electricity: true,
    waterSupply: true,
    sewage: true,
    internet: true,
    security: true,
    parkingSpaces: 8,
    constructionAllowed: true,
    floorAreaRatio: 4.0,
    buildingHeight: 25,
    setback: {
      front: 4,
      back: 4,
      left: 3,
      right: 3
    },
    environmentalFactors: {
      floodZone: false,
      earthquakeZone: "Zone III",
      airQuality: "moderate",
      noiseLevel: "high"
    },
    investmentPotential: {
      appreciationRate: 15.2,
      rentalYield: 12.5,
      developmentPotential: "very high"
    },
    legalStatus: {
      titleClear: true,
      encumbrances: false,
      litigation: false,
      approvals: ["Commercial Zoning", "Building Permission", "Fire Safety"]
    },
    infrastructure: {
      roads: "Concrete",
      drainage: "Underground",
      streetlights: true,
      publicTransport: "200m"
    },
    futurePlans: {
      metroStation: "BKC Metro Hub",
      highway: "Mumbai Trans Harbour Link",
      airport: "Navi Mumbai Airport",
      commercialHub: "BKC Phase 3"
    },
    similarProperties: [
      { id: "PLOT010", title: "BKC Phase 1 Plot", price: 92000000, area: 2800, soldDate: "2024-01-20" },
      { id: "PLOT011", title: "BKC Phase 2 Plot", price: 78000000, area: 2200, soldDate: "2024-01-18" }
    ],
    marketData: {
      avgPricePerSqFt: 35000,
      priceTrend: "increasing",
      daysOnMarket: 30,
      demandLevel: "very high"
    },
    views: 2156,
    saved: 156
  }
];

// Function to generate more sample properties
function generateMoreProperties(count = 48) {
  const cities = [
    { name: "Mumbai", state: "Maharashtra", coordinates: [19.0760, 72.8777] },
    { name: "Delhi", state: "Delhi", coordinates: [28.7041, 77.1025] },
    { name: "Bangalore", state: "Karnataka", coordinates: [12.9716, 77.5946] },
    { name: "Chennai", state: "Tamil Nadu", coordinates: [13.0827, 80.2707] },
    { name: "Hyderabad", state: "Telangana", coordinates: [17.3850, 78.4867] },
    { name: "Pune", state: "Maharashtra", coordinates: [18.5204, 73.8567] },
    { name: "Kolkata", state: "West Bengal", coordinates: [22.5726, 88.3639] },
    { name: "Ahmedabad", state: "Gujarat", coordinates: [23.0225, 72.5714] }
  ];

  const propertyTypes = ["residential", "commercial", "agricultural", "industrial"];
  const statuses = ["Available", "Sold", "Under Contract", "Reserved"];
  const localities = ["Downtown", "Suburban", "Industrial Area", "Business District", "Residential Colony"];

  const additionalProperties = [];

  for (let i = 2; i <= count + 1; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const locality = localities[Math.floor(Math.random() * localities.length)];

    const area = Math.random() * 5000 + 500; // 500 to 5500 sq m
    const areaSqFt = area * 10.764;
    const pricePerSqFt = Math.random() * 20000 + 5000; // 5000 to 25000 per sq ft
    const totalPrice = areaSqFt * pricePerSqFt;

    const property = {
      id: `PLOT${i.toString().padStart(3, '0')}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Plot in ${locality}`,
      type: type,
      status: status,
      dimensions: {
        width: Math.floor(Math.random() * 50) + 20,
        length: Math.floor(Math.random() * 80) + 30,
        area: Math.floor(area),
        areaSqFt: Math.floor(areaSqFt)
      },
      location: {
        latitude: city.coordinates[0] + (Math.random() - 0.5) * 0.1,
        longitude: city.coordinates[1] + (Math.random() - 0.5) * 0.1,
        locality: locality,
        city: city.name,
        state: city.state,
        pincode: Math.floor(Math.random() * 900000) + 100000,
        address: `Plot No. ${i}, ${locality}, ${city.name} - ${Math.floor(Math.random() * 900000) + 100000}`,
        coordinates: [
          city.coordinates[0] + (Math.random() - 0.5) * 0.1,
          city.coordinates[1] + (Math.random() - 0.5) * 0.1
        ]
      },
      price: {
        amount: Math.floor(totalPrice),
        perSqFt: Math.floor(pricePerSqFt),
        perSqM: Math.floor(pricePerSqFt * 10.764),
        currency: "INR",
        negotiable: Math.random() > 0.3,
        paymentTerms: ["20% Booking Amount", "80% on Registration"]
      },
      features: [
        "Main Road Facing",
        "24x7 Water Supply",
        "Electricity Available",
        "Drainage System",
        "Security System"
      ],
      amenities: [
        "Metro Station (1km)",
        "Shopping Mall (2km)",
        "Hospital (3km)",
        "School (2km)",
        "Airport (10km)"
      ],
      documents: [
        { name: "Clear Title", status: "Verified", icon: "CheckCircle" },
        { name: "Approved Layout", status: "Verified", icon: "CheckCircle" },
        { name: "No Encumbrances", status: "Verified", icon: "CheckCircle" }
      ],
      contact: {
        agent: `Agent ${i}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `agent${i}@realestate.com`,
        company: "Real Estate Solutions",
        experience: `${Math.floor(Math.random() * 15) + 3}+ years`,
        rating: Math.random() * 2 + 3, // 3 to 5
        reviews: Math.floor(Math.random() * 200) + 50,
        verified: Math.random() > 0.2
      },
      images: [
        "/assets/img/house.png",
        "/assets/img/blueprint.jpg",
        "/assets/img/houserender.png"
      ],
      description: `This ${type} plot is located in ${locality}, ${city.name}. It offers excellent connectivity and is perfect for ${type} development.`,
      highlights: [
        "Prime location",
        "Excellent connectivity",
        "Ready for development",
        "Good investment potential"
      ],
      nearbyProperties: [],
      tags: [type, city.name.toLowerCase(), locality.toLowerCase()],
      zoning: type.charAt(0).toUpperCase() + type.slice(1),
      soilType: "Loamy",
      roadWidth: Math.floor(Math.random() * 15) + 8,
      facing: "North-East",
      slope: "Level",
      waterTable: "20 feet",
      electricity: true,
      waterSupply: true,
      sewage: true,
      internet: true,
      security: true,
      parkingSpaces: Math.floor(Math.random() * 6) + 2,
      constructionAllowed: true,
      floorAreaRatio: Math.random() * 3 + 1,
      buildingHeight: Math.floor(Math.random() * 20) + 10,
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
        appreciationRate: Math.random() * 10 + 8,
        rentalYield: Math.random() * 8 + 5,
        developmentPotential: "medium"
      },
      legalStatus: {
        titleClear: true,
        encumbrances: false,
        litigation: false,
        approvals: ["Layout Approval"]
      },
      infrastructure: {
        roads: "Asphalt",
        drainage: "Underground",
        streetlights: true,
        publicTransport: "1km"
      },
      futurePlans: {
        metroStation: "Planned Metro",
        highway: "Highway Expansion",
        airport: "Airport Development",
        commercialHub: "Commercial Development"
      },
      similarProperties: [],
      marketData: {
        avgPricePerSqFt: Math.floor(pricePerSqFt * 0.9),
        priceTrend: "stable",
        daysOnMarket: Math.floor(Math.random() * 60) + 30,
        demandLevel: "medium"
      },
      views: Math.floor(Math.random() * 1000) + 100,
      saved: Math.floor(Math.random() * 100) + 10
    };

    additionalProperties.push(property);
  }

  return additionalProperties;
}

// Generate complete dataset
const completeDataset = [...sampleProperties, ...generateMoreProperties(48)];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { completeDataset, sampleProperties };
} else {
  console.log('Sample data generated successfully!');
  console.log('Total properties:', completeDataset.length);
  console.log('Sample property:', completeDataset[0]);
} 