-- Create properties table
CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('residential', 'commercial', 'agricultural', 'industrial')),
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Sold', 'Under Contract', 'Reserved')),
  
  -- Dimensions
  dimensions JSONB NOT NULL DEFAULT '{}',
  
  -- Location
  location JSONB NOT NULL DEFAULT '{}',
  
  -- Price
  price JSONB NOT NULL DEFAULT '{}',
  
  -- Features and amenities
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  
  -- Documents
  documents JSONB DEFAULT '[]',
  
  -- Contact information
  contact JSONB NOT NULL DEFAULT '{}',
  
  -- Images
  images TEXT[] DEFAULT '{}',
  
  -- Description and highlights
  description TEXT,
  highlights TEXT[] DEFAULT '{}',
  
  -- Nearby properties
  nearby_properties JSONB DEFAULT '[]',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Analytics
  views INTEGER DEFAULT 0,
  saved INTEGER DEFAULT 0,
  
  -- Additional fields
  tags TEXT[] DEFAULT '{}',
  zoning TEXT,
  soil_type TEXT,
  road_width NUMERIC,
  facing TEXT,
  slope TEXT,
  water_table TEXT,
  
  -- Infrastructure
  electricity BOOLEAN DEFAULT FALSE,
  water_supply BOOLEAN DEFAULT FALSE,
  sewage BOOLEAN DEFAULT FALSE,
  internet BOOLEAN DEFAULT FALSE,
  security BOOLEAN DEFAULT FALSE,
  parking_spaces INTEGER DEFAULT 0,
  
  -- Construction details
  construction_allowed BOOLEAN DEFAULT TRUE,
  floor_area_ratio NUMERIC,
  building_height NUMERIC,
  setback JSONB DEFAULT '{}',
  
  -- Environmental factors
  environmental_factors JSONB DEFAULT '{}',
  
  -- Investment potential
  investment_potential JSONB DEFAULT '{}',
  
  -- Legal status
  legal_status JSONB DEFAULT '{}',
  
  -- Infrastructure details
  infrastructure JSONB DEFAULT '{}',
  
  -- Future plans
  future_plans JSONB DEFAULT '{}',
  
  -- Similar properties
  similar_properties JSONB DEFAULT '[]',
  
  -- Market data
  market_data JSONB DEFAULT '{}'
);

-- Create indexes for better performance
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_location ON properties USING GIN(location);
CREATE INDEX idx_properties_price ON properties USING GIN(price);
CREATE INDEX idx_properties_features ON properties USING GIN(features);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX idx_properties_views ON properties(views DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON properties
    FOR SELECT USING (true);

-- Create policies for authenticated users to create/update their own properties
CREATE POLICY "Allow authenticated users to create properties" ON properties
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update properties" ON properties
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to increment views
CREATE OR REPLACE FUNCTION increment_property_views(property_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    new_views INTEGER;
BEGIN
    UPDATE properties 
    SET views = views + 1 
    WHERE id = property_id 
    RETURNING views INTO new_views;
    
    RETURN COALESCE(new_views, 0);
END;
$$ LANGUAGE plpgsql;

-- Create a function to search properties
CREATE OR REPLACE FUNCTION search_properties(search_term TEXT)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    type TEXT,
    status TEXT,
    location JSONB,
    price JSONB,
    description TEXT,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.type,
        p.status,
        p.location,
        p.price,
        p.description,
        p.images,
        p.created_at
    FROM properties p
    WHERE 
        p.title ILIKE '%' || search_term || '%'
        OR p.location->>'city' ILIKE '%' || search_term || '%'
        OR p.location->>'locality' ILIKE '%' || search_term || '%'
        OR p.description ILIKE '%' || search_term || '%'
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data (you can remove this in production)
INSERT INTO properties (
    id, title, type, status, dimensions, location, price, features, amenities, 
    contact, images, description, highlights, created_at
) VALUES (
    'PLOT001',
    'Premium Residential Plot in Andheri West',
    'residential',
    'Available',
    '{"width": 30, "length": 50, "area": 1500, "areaSqFt": 16146}',
    '{"latitude": 19.0760, "longitude": 72.8774, "locality": "Andheri West", "city": "Mumbai", "state": "Maharashtra", "pincode": "400058", "address": "Plot No. 123, Sector 7, Andheri West, Mumbai - 400058", "coordinates": [19.0760, 72.8774]}',
    '{"amount": 25000000, "perSqFt": 16667, "perSqM": 154321, "currency": "INR", "negotiable": true, "paymentTerms": ["20% Booking Amount", "80% on Registration"]}',
    ARRAY['Corner Plot', 'Main Road Facing', '24x7 Water Supply', 'Gated Community', 'Near Metro Station', 'Ready for Construction', 'Electricity Available', 'Drainage System', 'Security System', 'Parking Space'],
    ARRAY['Metro Station (500m)', 'Shopping Mall (1km)', 'Hospital (2km)', 'School (1.5km)', 'Airport (8km)', 'Railway Station (3km)'],
    '{"agent": "Rajesh Kumar", "phone": "+91 98765 43210", "email": "rajesh@landbroker.com", "company": "Premium Land Brokers", "experience": "8+ years", "rating": 4.8, "reviews": 127, "verified": true}',
    ARRAY['/assets/img/house.png', '/assets/img/blueprint.jpg', '/assets/img/houserender.png', '/assets/img/housesbg.jpg', '/assets/img/all.webp'],
    'This premium residential plot is located in the heart of Andheri West, one of Mumbai''s most sought-after residential areas. The plot offers excellent connectivity to major landmarks and is perfect for building your dream home. The area is well-developed with all modern amenities and infrastructure.',
    ARRAY['Prime location with excellent connectivity', 'Ready for immediate construction', 'All legal documents verified', 'Excellent investment potential', 'High rental yield area'],
    NOW()
); 