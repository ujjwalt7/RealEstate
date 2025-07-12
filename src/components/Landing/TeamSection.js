"use client"
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import Image from 'next/image';

const teamMembers = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    experience: "15+ Years",
    expertise: "Real Estate Development",
    description: "Visionary leader with extensive experience in real estate development and strategic planning. Has successfully led over 500+ property transactions.",
    image: "/assets/img/testimonials/user1.jpeg",
    linkedin: "#",
    email: "rajesh@varshainfra.com",
    phone: "+91 98765 43210"
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    experience: "12+ Years",
    expertise: "Property Management",
    description: "Expert in property management and client relations. Ensures seamless operations and exceptional customer experience across all projects.",
    image: "/assets/img/testimonials/user2.jpeg",
    linkedin: "#",
    email: "priya@varshainfra.com",
    phone: "+91 98765 43211"
  },
  {
    name: "Amit Patel",
    position: "Senior Property Consultant",
    experience: "10+ Years",
    expertise: "Investment Advisory",
    description: "Specialized in investment advisory and market analysis. Helps clients make informed decisions for maximum returns on their investments.",
    image: "/assets/img/testimonials/user3.jpeg",
    linkedin: "#",
    email: "amit@varshainfra.com",
    phone: "+91 98765 43212"
  },
  {
    name: "Sunita Verma",
    position: "Legal Head",
    experience: "8+ Years",
    expertise: "Real Estate Law",
    description: "Legal expert specializing in real estate law and compliance. Ensures all transactions are legally sound and transparent.",
    image: "/assets/img/testimonials/user4.jpeg",
    linkedin: "#",
    email: "sunita@varshainfra.com",
    phone: "+91 98765 43213"
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

const hoverVariants = {
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function TeamSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
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
            Meet Our <span className="text-accentYellow">Expert Team</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced team of real estate professionals is dedicated to helping you achieve your property goals. 
            With years of expertise and deep market knowledge, we ensure your success.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={hoverVariants}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accentYellow text-white px-3 py-1 rounded-full text-sm font-medium">
                    {member.experience}
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-accentYellow font-semibold mb-1">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {member.expertise}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-6">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accentYellow hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accentYellow hover:text-white transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accentYellow hover:text-white transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          <div className="text-center p-6 bg-gradient-to-br from-accentYellow to-yellow-400 rounded-2xl">
            <div className="text-3xl lg:text-4xl font-bold text-borderDark mb-2">45+</div>
            <div className="text-sm lg:text-base text-borderDark/80">Team Members</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">1500+</div>
            <div className="text-sm lg:text-base text-white/80">Properties Sold</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-sm lg:text-base text-white/80">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-sm lg:text-base text-white/80">Client Satisfaction</div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Work with Our Experts?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of experienced professionals is ready to help you achieve your real estate goals. 
              Get in touch with us today for personalized guidance and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="px-8 py-4 bg-accentYellow text-borderDark font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform text-center"
              >
                Book a Call
              </a>
              <a
                href="/discover"
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform text-center"
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