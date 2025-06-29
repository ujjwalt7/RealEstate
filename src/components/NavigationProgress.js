"use client"
import { motion, useMotionValue, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavigationProgress = () => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    // Reset progress when pathname changes
    progress.set(0);
    setIsNavigating(false);
  }, [pathname, progress]);

  useEffect(() => {
    // Simulate navigation progress
    if (isNavigating) {
      const timer = setTimeout(() => {
        progress.set(100);
        setTimeout(() => {
          setIsNavigating(false);
          progress.set(0);
        }, 200);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isNavigating, progress]);

  // Listen for navigation events
  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true);
      progress.set(0);
    };

    const handleComplete = () => {
      progress.set(100);
      setTimeout(() => {
        setIsNavigating(false);
        progress.set(0);
      }, 200);
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, [progress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accentYellow z-50"
      style={{ width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavigating ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default NavigationProgress; 