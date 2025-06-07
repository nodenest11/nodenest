'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Check for user's preferred color scheme on component mount
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('atomflow-theme');
    
    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark';
      setIsDark(isDarkTheme);
      document.documentElement.classList.toggle('light-theme', !isDarkTheme);
    } else if (!prefersDarkMode) {
      setIsDark(false);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Toggle the 'light-theme' class on the html element
    document.documentElement.classList.toggle('light-theme', !newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('atomflow-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <motion.button 
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 right-6 z-50 w-12 h-6 rounded-full flex items-center p-1 bg-[var(--card-bg)] border border-[var(--border-color)]"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <motion.div 
        className={`w-4 h-4 rounded-full shadow-md flex items-center justify-center ${isDark ? 'bg-[var(--primary-gradient-from)]' : 'bg-[var(--primary-gradient-to)]'}`}
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        animate={{ 
          x: isDark ? 24 : 0,
        }}
      >
        {isDark ? 
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[8px]"
          >
            🌙
          </motion.span> : 
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[8px]"
          >
            ☀️
          </motion.span>
        }
      </motion.div>
      
      {isHovered && (
        <motion.span 
          className="absolute right-full mr-2 px-2 py-1 rounded bg-[var(--card-bg)] text-[var(--foreground)] text-xs whitespace-nowrap border border-[var(--border-color)]"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          {isDark ? 'Switch to Light' : 'Switch to Dark'}
        </motion.span>
      )}
    </motion.button>
  );
}
