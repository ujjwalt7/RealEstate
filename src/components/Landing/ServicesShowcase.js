"use client"
import { motion } from "framer-motion";
import { Home, Building2, Leaf, Construction, Car, MapPin } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Properties",
    description: "Premium residential plots and homes in prime locations with modern amenities and excellent connectivity.",
    features: ["Gated Communities", "24/7 Security", "Modern Infrastructure", "Green Spaces"],
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    description: "Strategic commercial properties for businesses, offices, and retail spaces in high-traffic areas.",
    features: ["Prime Locations", "High ROI", "Business Ready", "Parking Facilities"],
    color: "from-green-500 to-green-600"
  },
  {
    icon: Leaf,
    title: "Agricultural Land",
    description: "Fertile agricultural land perfect for farming, cultivation, and sustainable development projects.",
    features: ["Fertile Soil", "Water Access", "Road Connectivity", "Future Potential"],
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Construction,
    title: "Industrial Properties",
    description: "Large-scale industrial plots and warehouses with excellent logistics and transportation access.",
    features: ["Heavy Machinery", "Storage Space", "Transport Links", "Zoning Approved"],
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Car,
    title: "Parking Solutions",
    description: "Strategic parking spaces and commercial parking lots in high-demand urban areas.",
    features: ["Prime Locations", "24/7 Access", "Security", "High Demand"],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: MapPin,
    title: "Land Development",
    description: "End-to-end land development services from planning to execution and project management.",
    features: ["Expert Planning", "Quality Construction", "Timely Delivery", "After-Sales Support"],
    color: "from-red-500 to-red-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const hoverVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function ServicesShowcase() {
  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-accentYellow">Services</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive real estate solutions tailored to your needs. From residential to commercial, 
            we provide expert guidance and premium properties across all categories.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accentYellow rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accentYellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
} 