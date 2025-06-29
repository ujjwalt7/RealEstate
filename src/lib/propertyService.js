import { supabase } from './supabase'

export const propertyService = {
  // Get all properties with optional filters and pagination
  async getProperties(filters = {}, pagination = {}) {
    const { page = 1, limit = 12 } = pagination;
    const offset = (page - 1) * limit;
    
    console.log('getProperties called with:', { filters, pagination });
    
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    // if (filters.type && filters.type.length > 0) {
    //   query = query.in('type', filters.type)
    // }

    // if (filters.status && filters.status.length > 0) {
    //   query = query.in('status', filters.status)
    // }

    // if (filters.minPrice) {
    //   query = query.gte('price->amount', filters.minPrice)
    // }

    // if (filters.maxPrice) {
    //   query = query.lte('price->amount', filters.maxPrice)
    // }

    // if (filters.minArea) {
    //   query = query.gte('dimensions->areaSqFt', filters.minArea)
    // }

    // if (filters.maxArea) {
    //   query = query.lte('dimensions->areaSqFt', filters.maxArea)
    // }

    // if (filters.location) {
    //   query = query.ilike('location->city', `%${filters.location}%`)
    // }

    // if (filters.features && filters.features.length > 0) {
    //   // For features, we need to check if any of the required features exist in the features array
    //   filters.features.forEach(feature => {
    //     query = query.contains('features', [feature])
    //   })
    // }

    const { data, error, count } = await query

    console.log('getProperties result:', { data, error, count });

    if (error) {
      console.error('Error fetching properties:', error)
      throw error
    }

    return {
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    }
  },

  // Get a single property by ID
  async getPropertyById(id) {
    try {
      console.log('propertyService.getPropertyById called with ID:', id);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error fetching property:', error);
        
        // Handle specific error cases
        if (error.code === 'PGRST116') {
          console.log('Property not found in database');
          return null; // Return null instead of throwing for "not found"
        }
        
        throw error;
      }

      console.log('Property found:', data);
      return data;
    } catch (err) {
      console.error('Unexpected error in getPropertyById:', err);
      throw err;
    }
  },

  // Search properties by text with pagination
  async searchProperties(searchTerm, pagination = {}) {
    const { page = 1, limit = 12 } = pagination;
    const offset = (page - 1) * limit;

    console.log('searchProperties called with:', { searchTerm, pagination });

    // Create a more comprehensive search query
    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .or(`title.ilike.%${searchTerm}%,location->city.ilike.%${searchTerm}%,location->locality.ilike.%${searchTerm}%,location->state.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    console.log('searchProperties result:', { data, error, count });

    if (error) {
      console.error('Error searching properties:', error)
      throw error
    }

    return {
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    }
  },

  // Search properties by features
  async searchPropertiesByFeatures(features, pagination = {}) {
    const { page = 1, limit = 12 } = pagination;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Add feature filters
    if (features && features.length > 0) {
      features.forEach(feature => {
        query = query.contains('features', [feature]);
      });
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error searching properties by features:', error)
      throw error
    }

    return {
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    }
  },

  // Get properties by location (within radius) with pagination
  async getPropertiesByLocation(lat, lng, radius = 10, pagination = {}) {
    const { page = 1, limit = 12 } = pagination;
    const offset = (page - 1) * limit;

    console.log('getPropertiesByLocation called with:', { lat, lng, radius, pagination });

    // This would require PostGIS extension in Supabase
    // For now, we'll use a simple bounding box approach
    const latDelta = radius / 111 // roughly 111km per degree latitude
    const lngDelta = radius / (111 * Math.cos(lat * Math.PI / 180))

    console.log('Calculated deltas:', { latDelta, lngDelta });

    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .gte('location->latitude', lat - latDelta)
      .lte('location->latitude', lat + latDelta)
      .gte('location->longitude', lng - lngDelta)
      .lte('location->longitude', lng + lngDelta)
      .range(offset, offset + limit - 1)

    console.log('getPropertiesByLocation result:', { data, error, count });

    if (error) {
      console.error('Error fetching properties by location:', error)
      throw error
    }

    return {
      properties: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    }
  },

  // Create a new property
  async createProperty(propertyData) {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()

    if (error) {
      console.error('Error creating property:', error)
      throw error
    }

    return data
  },

  // Update a property
  async updateProperty(id, updates) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
      throw error
    }

    return data
  },

  // Delete a property
  async deleteProperty(id) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting property:', error)
      throw error
    }

    return true
  },

  // Increment view count
  async incrementViews(id) {
    const { data, error } = await supabase
      .from('properties')
      .update({ views: supabase.raw('views + 1') })
      .eq('id', id)
      .select('views')
      .single()

    if (error) {
      console.error('Error incrementing views:', error)
      throw error
    }

    return data.views
  },

  // Get similar properties
  async getSimilarProperties(propertyId, limit = 3) {
    // First get the current property to understand its characteristics
    const currentProperty = await this.getPropertyById(propertyId)
    
    if (!currentProperty) {
      return []
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('type', currentProperty.type)
      .neq('id', propertyId)
      .limit(limit)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching similar properties:', error)
      throw error
    }

    return data
  },

  // Get property statistics
  async getPropertyStats() {
    const { data, error } = await supabase
      .from('properties')
      .select('type, status, price->amount, dimensions->areaSqFt')

    if (error) {
      console.error('Error fetching property stats:', error)
      throw error
    }

    // Calculate statistics
    const stats = {
      total: data.length,
      byType: {},
      byStatus: {},
      avgPrice: 0,
      avgArea: 0
    }

    let totalPrice = 0
    let totalArea = 0

    data.forEach(property => {
      // Count by type
      stats.byType[property.type] = (stats.byType[property.type] || 0) + 1
      
      // Count by status
      stats.byStatus[property.status] = (stats.byStatus[property.status] || 0) + 1
      
      // Sum for averages
      if (property.price?.amount) {
        totalPrice += property.price.amount
      }
      if (property.dimensions?.areaSqFt) {
        totalArea += property.dimensions.areaSqFt
      }
    })

    stats.avgPrice = totalPrice / data.length
    stats.avgArea = totalArea / data.length

    return stats
  },

  // Get suggested locations from database
  async getSuggestedLocations() {
    const { data, error } = await supabase
      .from('properties')
      .select('location->city, location->locality, location->state')
      .not('location->city', 'is', null)

    if (error) {
      console.error('Error fetching suggested locations:', error)
      return []
    }

    // Extract unique locations and format them
    const locations = new Set()
    data.forEach(property => {
      if (property.location?.city) {
        const city = property.location.city
        const state = property.location.state || ''
        const locality = property.location.locality || ''
        
        // Add city, state combination
        if (city && state) {
          locations.add(`${city}, ${state}`)
        }
        
        // Add locality, city combination if different from city
        if (locality && locality !== city) {
          locations.add(`${locality}, ${city}`)
        }
      }
    })

    return Array.from(locations).slice(0, 10) // Return top 10 unique locations
  }
} 