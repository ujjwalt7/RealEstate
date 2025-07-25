"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, Star, MapPin, Clock } from "lucide-react";
import Image from 'next/image';
import StatsSection from "./StatsSection";

const successStories = [
  {
    id: 1,
    clientName: "Rajesh & Priya Sharma",
    location: "Mumbai, Maharashtra",
    propertyType: "Residential Plot",
    investment: "₹2.5 Crores",
    return: "45% ROI",
    timeline: "18 months",
    story: "We were looking for a residential plot in Mumbai for our dream home. Varsha Infra helped us find the perfect location with excellent connectivity and future development potential. The investment has already appreciated significantly.",
    before: "Struggling to find the right property in budget",
    after: "Own a premium residential plot with 45% appreciation",
    rating: 5,
    image: "/assets/img/testimonials/user1.jpeg"
  },
  {
    id: 2,
    clientName: "Amit Patel",
    location: "Pune, Maharashtra",
    propertyType: "Commercial Property",
    investment: "₹8.2 Crores",
    return: "32% ROI",
    timeline: "24 months",
    story: "As a business owner, I needed a commercial property for expansion. The team at Varsha Infra understood my requirements perfectly and found me a strategic location that has boosted my business significantly.",
    before: "Limited business expansion due to space constraints",
    after: "Expanded business with prime commercial location",
    rating: 5,
    image: "/assets/img/testimonials/user2.jpeg"
  },
  {
    id: 3,
    clientName: "Sunita & Ramesh Kumar",
    location: "Nashik, Maharashtra",
    propertyType: "Agricultural Land",
    investment: "₹1.8 Crores",
    return: "28% ROI",
    timeline: "12 months",
    story: "We wanted to invest in agricultural land for farming and future development. Varsha Infra found us fertile land with excellent water access and road connectivity. The investment is already showing great returns.",
    before: "Looking for agricultural investment opportunity",
    after: "Profitable farming business with development potential",
    rating: 5,
    image: "/assets/img/testimonials/user3.jpeg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);

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
            Success <span className="text-accentYellow">Stories</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real clients who have achieved their real estate dreams with Varsha Infra. 
            Discover how we&apos;ve helped transform their property investments into success stories.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12"
        >
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Client Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={story.image}
                    alt={story.clientName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    {story.clientName}
                  </h3>
                  <div className="flex items-center gap-1 text-accentYellow">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-accentYellow mb-3" />
                <p className="text-gray-600 leading-relaxed italic">
                  &quot;{story.story}&quot;
                </p>
              </div>

              {/* Property Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{story.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{story.timeline}</span>
                </div>
              </div>

              {/* Investment Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Investment</div>
                  <div className="text-lg font-bold text-gray-900">{story.investment}</div>
                </div>
                <div className="text-center p-3 bg-accentYellow/10 rounded-lg">
                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-lg font-bold text-accentYellow">{story.return}</div>
                </div>
              </div>

              {/* Before/After */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Before: {story.before}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">After: {story.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Remove the Book a Call CTA section at the end */}
        
      <StatsSection />
      </div>
    </section>
  );
} 