"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline, IoClose } from "react-icons/io5";
import "leaflet/dist/leaflet.css";

function DiscoverMap({ properties, hoveredPropertyId, selectedPropertyId, onMarkerHover, onMarkerLeave, onMarkerClick }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const LRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      if (typeof window === 'undefined') return;
      
      const L = await import('leaflet');
      LRef.current = L.default;

      // Fix for default markers in Leaflet
      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Create map instance
      const map = L.default.map(mapRef.current, {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        zoomControl: false, // We'll add custom controls
      });

      // Add OpenStreetMap tiles
      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add custom zoom controls
      L.default.control.zoom({
        position: 'topright'
      }).addTo(map);

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !LRef.current) return;

    const map = mapInstanceRef.current;
    const L = LRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    // Add new markers
    properties.forEach(property => {
      const { coordinates } = property;
      
      // Check if coordinates are valid
      const hasValidCoordinates = coordinates && 
        Array.isArray(coordinates) && 
        coordinates.length === 2 && 
        typeof coordinates[0] === 'number' && 
        typeof coordinates[1] === 'number' &&
        !isNaN(coordinates[0]) && 
        !isNaN(coordinates[1]);
      
      // Use default coordinates for India if no valid coordinates
      const markerCoordinates = hasValidCoordinates ? coordinates : [20.5937, 78.9629]; // Center of India
      
      // Create custom icon based on property state
      const getIcon = () => {
        const size = selectedPropertyId === property.id ? 32 : 
                    hoveredPropertyId === property.id ? 28 : 24;
        
        // Different icon for properties without coordinates
        const iconColor = hasValidCoordinates ? 
          (selectedPropertyId === property.id ? '#0891b2' : 
           hoveredPropertyId === property.id ? '#06b6d4' : '#6b7280') : 
          '#f59e0b'; // Orange for properties without coordinates
        
        const iconContent = hasValidCoordinates ? 
          `<svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>` :
          `<svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>`;
        
        return L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-container" style="
              width: ${size}px; 
              height: ${size}px; 
              background: ${iconColor};
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              transition: all 0.3s ease;
              ${!hasValidCoordinates ? 'opacity: 0.7;' : ''}
            ">
              ${iconContent}
            </div>
          `,
          iconSize: [size, size],
          iconAnchor: [size / 2, size],
        });
      };

      // Create marker
      const marker = L.marker(markerCoordinates, { icon: getIcon() }).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="property-popup" style="min-width: 200px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h3 style="font-weight: 600; color: #111827; font-size: 14px; margin: 0;">${property.title}</h3>
            <button class="close-popup" style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 12px;">✕</button>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0;">${property.location}</p>
          ${!hasValidCoordinates ? '<p style="color: #f59e0b; font-size: 11px; margin: 0 0 8px 0; font-style: italic;">📍 Location approximate</p>' : ''}
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #0891b2;">${property.price}</span>
            <span style="color: #6b7280;">${property.size}</span>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
            <span class="property-type-badge" style="
              padding: 2px 8px; 
              border-radius: 12px; 
              font-size: 11px; 
              font-weight: 500;
              ${property.type === "Residential" ? "background: #dbeafe; color: #1e40af;" :
                property.type === "Commercial" ? "background: #dcfce7; color: #166534;" :
                "background: #fed7aa; color: #c2410c;"}
            ">${property.type}</span>
          </div>
        </div>
      `;

      // Add popup
      marker.bindPopup(popupContent, {
        closeButton: false,
        className: 'custom-popup'
      });

      // Event handlers
      marker.on('mouseover', () => {
        onMarkerHover(property.id);
        marker.setIcon(getIcon());
      });

      marker.on('mouseout', () => {
        onMarkerLeave();
        marker.setIcon(getIcon());
      });

      marker.on('click', () => {
        onMarkerClick(property.id);
      });

      // Store marker reference
      markersRef.current[property.id] = marker;
    });

    // Fit map to show all markers
    if (properties.length > 0) {
      const group = new L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.1));
    }

  }, [properties, hoveredPropertyId, selectedPropertyId, onMarkerHover, onMarkerLeave, onMarkerClick]);

  // Update marker appearance when hover/selection state changes
  useEffect(() => {
    if (!LRef.current) return;
    
    const L = LRef.current;
    
    Object.entries(markersRef.current).forEach(([propertyId, marker]) => {
      const property = properties.find(p => p.id === parseInt(propertyId));
      if (property) {
        const size = selectedPropertyId === property.id ? 32 : 
                    hoveredPropertyId === property.id ? 28 : 24;
        
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-container" style="
              width: ${size}px; 
              height: ${size}px; 
              background: ${selectedPropertyId === property.id ? '#0891b2' : 
                          hoveredPropertyId === property.id ? '#06b6d4' : '#6b7280'};
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              transition: all 0.3s ease;
            ">
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `,
          iconSize: [size, size],
          iconAnchor: [size / 2, size],
        });
        
        marker.setIcon(icon);
      }
    });
  }, [hoveredPropertyId, selectedPropertyId, properties]);

  return (
    <div className="w-full h-full flex flex-col z-0">
      {/* Map Header */}
      <div className="flex-shrink-0 p-3 lg:p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Property Map</h2>
          <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
            <span>{properties.length} properties</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden z-0" ref={mapRef}>
        {/* Legend */}
        <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 bg-white rounded-lg shadow-md p-2 lg:p-3 z-[1000] max-w-[140px] lg:max-w-none">
          <h4 className="text-xs font-semibold text-gray-700 mb-1 lg:mb-2">Property Types</h4>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600 hidden sm:inline">Residential</span>
              <span className="text-gray-600 sm:hidden">Res</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-600 rounded-full"></div>
              <span className="text-gray-600 hidden sm:inline">Commercial</span>
              <span className="text-gray-600 sm:hidden">Com</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-orange-600 rounded-full"></div>
              <span className="text-gray-600 hidden sm:inline">Industrial</span>
              <span className="text-gray-600 sm:hidden">Ind</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full opacity-70"></div>
              <span className="text-gray-600 hidden sm:inline">Approximate</span>
              <span className="text-gray-600 sm:hidden">Approx</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for popups */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: none;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .marker-container:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default DiscoverMap; 