"use client"
import { motion } from "framer-motion";
import { Search, BarChart3, Handshake, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    number: "01",
    title: "Property Discovery",
    description: "We help you find the perfect property that matches your requirements, budget, and investment goals.",
    details: ["Market Analysis", "Property Research", "Location Assessment", "Investment Potential"]
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Expert Consultation",
    description: "Our experienced team provides personalized guidance and market insights to make informed decisions.",
    details: ["Financial Planning", "Legal Guidance", "Market Trends", "Risk Assessment"]
  },
  {
    icon: Handshake,
    number: "03",
    title: "Negotiation & Deal",
    description: "We handle all negotiations and paperwork to ensure you get the best deal with complete transparency.",
    details: ["Price Negotiation", "Documentation", "Legal Compliance", "Due Diligence"]
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Successful Closure",
    description: "From signing to possession, we ensure a smooth and hassle-free property acquisition process.",
    details: ["Final Documentation", "Possession Handover", "Post-Sale Support", "Ongoing Assistance"]
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

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

export default function ProcessSection() {
  return (
    <section className="w-full py-16 lg:py-24 lg:w-[80%] lg:mx-auto bg-white">
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
            How We <span className="text-accentYellow">Work</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step process ensures a seamless and transparent property acquisition experience. 
            From discovery to closure, we're with you every step of the way.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 lg:space-y-12"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number and Icon */}
              <div className="relative flex-shrink-0">
                <motion.div
                  variants={iconVariants}
                  className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-accentYellow to-yellow-400 rounded-full flex items-center justify-center shadow-xl"
                >
                  <step.icon className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-borderDark text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold">
                    {step.number}
                  </div>
                </motion.div>
                
                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-gradient-to-r from-accentYellow to-transparent transform -translate-y-1/2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accentYellow rounded-full"></div>
                      <span className="text-sm lg:text-base text-gray-600 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="bg-gradient-to-r from-accentYellow to-yellow-400 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-borderDark mb-4">
              Ready to Start Your Property Journey?
            </h3>
            <p className="text-lg text-borderDark/80 mb-8 max-w-2xl mx-auto">
              Let our expert team guide you through every step of the process. 
              Get started today and discover your perfect property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="px-8 py-4 bg-borderDark text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform text-center"
              >
                Book a Call
              </a>
              <a
                href="/discover"
                className="px-8 py-4 bg-white text-borderDark font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform text-center"
              >
                View Properties
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 