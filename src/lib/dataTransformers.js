// Utility functions to transform data between frontend and Supabase formats

export const propertyTransformers = {
  // Transform Supabase data to frontend format for discover page
  toDiscoverFormat(supabaseProperty) {
    return {
      id: supabaseProperty.id,
      title: supabaseProperty.title,
      location: `${supabaseProperty.location?.locality}, ${supabaseProperty.location?.city}`,
      price: `$${supabaseProperty.price?.amount?.toLocaleString()}`,
      size: `${(supabaseProperty.dimensions?.area / 4046.86).toFixed(1)} acres`, // Convert sq m to acres
      bedrooms: 0, // Plots don't have bedrooms
      parking: supabaseProperty.parking_spaces || 0,
      type: supabaseProperty.type,
      coordinates: supabaseProperty.location?.coordinates || [supabaseProperty.location?.latitude, supabaseProperty.location?.longitude],
      image: supabaseProperty.images?.[0] || "/assets/img/house.png",
      description: supabaseProperty.description,
      features: supabaseProperty.features || []
    };
  },

  // Transform Supabase data to frontend format for property detail page
  toDetailFormat(supabaseProperty) {
    return {
      ...supabaseProperty,
      // Ensure all required fields exist with defaults
      dimensions: {
        width: supabaseProperty.dimensions?.width || 0,
        length: supabaseProperty.dimensions?.length || 0,
        area: supabaseProperty.dimensions?.area || 0,
        areaSqFt: supabaseProperty.dimensions?.areaSqFt || 0
      },
      location: {
        latitude: supabaseProperty.location?.latitude || 0,
        longitude: supabaseProperty.location?.longitude || 0,
        locality: supabaseProperty.location?.locality || '',
        city: supabaseProperty.location?.city || '',
        state: supabaseProperty.location?.state || '',
        pincode: supabaseProperty.location?.pincode || '',
        address: supabaseProperty.location?.address || '',
        coordinates: supabaseProperty.location?.coordinates || [0, 0]
      },
      price: {
        amount: supabaseProperty.price?.amount || 0,
        perSqFt: supabaseProperty.price?.perSqFt || 0,
        perSqM: supabaseProperty.price?.perSqM || 0,
        currency: supabaseProperty.price?.currency || 'INR',
        negotiable: supabaseProperty.price?.negotiable || false,
        paymentTerms: supabaseProperty.price?.paymentTerms || []
      },
      contact: {
        agent: supabaseProperty.contact?.agent || '',
        phone: supabaseProperty.contact?.phone || '',
        email: supabaseProperty.contact?.email || '',
        company: supabaseProperty.contact?.company || '',
        experience: supabaseProperty.contact?.experience || '',
        rating: supabaseProperty.contact?.rating || 0,
        reviews: supabaseProperty.contact?.reviews || 0,
        verified: supabaseProperty.contact?.verified || false
      },
      features: supabaseProperty.features || [],
      amenities: supabaseProperty.amenities || [],
      documents: supabaseProperty.documents || [],
      highlights: supabaseProperty.highlights || [],
      images: supabaseProperty.images || [],
      parkingSpaces: supabaseProperty.parking_spaces || 0
    };
  },

  // Transform frontend data to Supabase format for creating/updating
  toSupabaseFormat(frontendProperty) {
    return {
      id: frontendProperty.id,
      title: frontendProperty.title,
      type: frontendProperty.type,
      status: frontendProperty.status,
      dimensions: frontendProperty.dimensions,
      location: frontendProperty.location,
      price: frontendProperty.price,
      features: frontendProperty.features,
      amenities: frontendProperty.amenities,
      documents: frontendProperty.documents,
      contact: frontendProperty.contact,
      images: frontendProperty.images,
      description: frontendProperty.description,
      highlights: frontendProperty.highlights,
      nearby_properties: frontendProperty.nearbyProperties,
      tags: frontendProperty.tags,
      zoning: frontendProperty.zoning,
      soil_type: frontendProperty.soilType,
      road_width: frontendProperty.roadWidth,
      facing: frontendProperty.facing,
      slope: frontendProperty.slope,
      water_table: frontendProperty.waterTable,
      electricity: frontendProperty.electricity,
      water_supply: frontendProperty.waterSupply,
      sewage: frontendProperty.sewage,
      internet: frontendProperty.internet,
      security: frontendProperty.security,
      parking_spaces: frontendProperty.parkingSpaces,
      construction_allowed: frontendProperty.constructionAllowed,
      floor_area_ratio: frontendProperty.floorAreaRatio,
      building_height: frontendProperty.buildingHeight,
      setback: frontendProperty.setback,
      environmental_factors: frontendProperty.environmentalFactors,
      investment_potential: frontendProperty.investmentPotential,
      legal_status: frontendProperty.legalStatus,
      infrastructure: frontendProperty.infrastructure,
      future_plans: frontendProperty.futurePlans,
      similar_properties: frontendProperty.similarProperties,
      market_data: frontendProperty.marketData
    };
  }
};

export const filterTransformers = {
  // Transform frontend filters to Supabase query format
  toSupabaseFilters(frontendFilters) {
    const supabaseFilters = {};

    if (frontendFilters.priceRange) {
      supabaseFilters.minPrice = frontendFilters.priceRange[0];
      supabaseFilters.maxPrice = frontendFilters.priceRange[1];
    }

    if (frontendFilters.sizeRange) {
      // Convert acres to sq ft for database query
      supabaseFilters.minArea = frontendFilters.sizeRange[0] * 4046.86;
      supabaseFilters.maxArea = frontendFilters.sizeRange[1] * 4046.86;
    }

    if (frontendFilters.propertyType && frontendFilters.propertyType.length > 0) {
      supabaseFilters.type = frontendFilters.propertyType;
    }

    if (frontendFilters.status && frontendFilters.status.length > 0) {
      supabaseFilters.status = frontendFilters.status;
    }

    if (frontendFilters.location) {
      supabaseFilters.location = frontendFilters.location;
    }

    if (frontendFilters.features && frontendFilters.features.length > 0) {
      supabaseFilters.features = frontendFilters.features;
    }

    return supabaseFilters;
  }
};

export const priceFormatters = {
  // Format price for display
  formatPrice(amount, currency = 'INR') {
    if (!amount) return 'Price on request';
    
    if (currency === 'INR') {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1)} Cr`;
      } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} Lakh`;
      } else {
        return `₹${amount.toLocaleString()}`;
      }
    } else {
      return `${currency} ${amount.toLocaleString()}`;
    }
  },

  // Parse price from display format
  parsePrice(priceString) {
    if (!priceString) return 0;
    
    const cleanPrice = priceString.replace(/[₹$,]/g, '');
    
    if (cleanPrice.includes('Cr')) {
      return parseFloat(cleanPrice.replace('Cr', '')) * 10000000;
    } else if (cleanPrice.includes('Lakh')) {
      return parseFloat(cleanPrice.replace('Lakh', '')) * 100000;
    } else {
      return parseFloat(cleanPrice) || 0;
    }
  }
};

export const areaFormatters = {
  // Convert square meters to square feet
  sqMToSqFt(sqM) {
    return sqM * 10.764;
  },

  // Convert square feet to square meters
  sqFtToSqM(sqFt) {
    return sqFt / 10.764;
  },

  // Convert acres to square feet
  acresToSqFt(acres) {
    return acres * 4046.86;
  },

  // Convert square feet to acres
  sqFtToAcres(sqFt) {
    return sqFt / 4046.86;
  },

  // Format area for display
  formatArea(area, unit = 'sqft') {
    if (!area) return 'Area not specified';
    
    if (unit === 'sqft') {
      if (area >= 43560) { // 1 acre = 43,560 sq ft
        const acres = (area / 43560).toFixed(2);
        return `${acres} acres (${area.toLocaleString()} sq ft)`;
      } else {
        return `${area.toLocaleString()} sq ft`;
      }
    } else if (unit === 'sqm') {
      const sqFt = this.sqMToSqFt(area);
      return `${area.toLocaleString()} sq m (${sqFt.toLocaleString()} sq ft)`;
    }
    
    return `${area.toLocaleString()} ${unit}`;
  }
};

export const validationHelpers = {
  // Validate property data
  validateProperty(property) {
    const errors = [];

    if (!property.title) errors.push('Title is required');
    if (!property.type) errors.push('Property type is required');
    if (!property.location?.city) errors.push('City is required');
    if (!property.price?.amount) errors.push('Price is required');
    if (!property.dimensions?.area) errors.push('Area is required');

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate contact form
  validateContactForm(form) {
    const errors = [];

    if (!form.name) errors.push('Name is required');
    if (!form.phone) errors.push('Phone is required');
    if (!form.email) errors.push('Email is required');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      errors.push('Please enter a valid email address');
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (form.phone && !phoneRegex.test(form.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}; 