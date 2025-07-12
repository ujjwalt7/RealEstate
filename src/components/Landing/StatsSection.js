"use client"
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Home, Users, Star, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Home,
    number: 1500,
    suffix: "+",
    label: "Properties Sold",
    description: "Successfully closed deals"
  },
  {
    icon: Users,
    number: 2500,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers"
  },
  {
    icon: Star,
    number: 15,
    suffix: " Years",
    label: "Experience",
    description: "Industry expertise"
  },
  {
    icon: CheckCircle,
    number: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Deal completion rate"
  }
];

function AnimatedCounter({ target, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(target * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl lg:text-6xl font-bold text-black">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
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

export default function StatsSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-r from-accentBlue to-cyan-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-borderDark mb-4">
            Trusted by <span className="text-white">Thousands</span>
          </h2>
          <p className="text-lg lg:text-xl text-borderDark/80 max-w-3xl mx-auto">
            Our track record speaks for itself. We've helped countless clients achieve their real estate dreams 
            with transparency, expertise, and unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300"
              >
                <stat.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
              </motion.div>
              
              <div className="mb-3">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-lg lg:text-xl font-bold text-borderDark mb-2">
                {stat.label}
              </h3>
              <p className="text-sm lg:text-base text-borderDark/70">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-borderDark mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-borderDark/80 mb-6">
              Join thousands of satisfied clients who have found their perfect property with us.
            </p>
            <a
              href="tel:+919876543210"
              className="px-8 py-4 bg-borderDark text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform inline-block"
            >
              Book a Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 