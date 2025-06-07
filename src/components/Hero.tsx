'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <section className="w-full relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 z-0">
        {/* Modern gradient mesh background */}
        <div className="absolute inset-0 bg-[var(--background)]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--primary-gradient-from)]/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[var(--secondary-color)]/5 rounded-full blur-[60px]" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[var(--background)]" style={{ 
          backgroundImage: "linear-gradient(var(--border-color)/5 1px, transparent 1px), linear-gradient(90deg, var(--border-color)/5 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}></div>
        
        {/* 3D-style floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-lg"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 70 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              background: i % 3 === 0 
                ? `linear-gradient(135deg, var(--primary-gradient-from)/10, var(--primary-gradient-to)/5)` 
                : i % 3 === 1 
                  ? `linear-gradient(135deg, var(--secondary-color)/10, var(--secondary-color)/5)`
                  : `linear-gradient(135deg, var(--accent-color)/10, var(--accent-color)/5)`,
              border: `1px solid ${i % 3 === 0 ? 'var(--primary-gradient-from)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)'}20`,
              zIndex: 1,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
            initial={{ opacity: 0, scale: 0, rotate: Math.random() * 20 - 10 }}
            animate={{ 
              opacity: 0.8, 
              scale: 1,
              rotate: 0,
              y: [0, Math.random() * -30 - 10, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center">
        {/* Hero content */}
        <div className="w-full lg:w-1/2 lg:pr-8">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--primary-gradient-from)]/10 border border-[var(--primary-gradient-from)]/20 text-[var(--primary-gradient-from)] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary-gradient-from)] mr-2"></span>
            Modern Web Development
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] animate-gradient-x">Web Presence</span> With NodeNest Solutions
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-[var(--foreground)]/80 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We deliver scalable, high-performance web applications using modern technologies and best practices to help businesses grow their digital footprint.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <Link
                href="/contact"
                className="relative flex items-center gap-2 px-6 py-3 bg-[var(--card-bg)] rounded-lg font-medium"
              >
                <span className="text-[var(--primary-gradient-from)]">Start Your Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.66675 3.33334L10.6667 8.00001L6.66675 12.6667" stroke="var(--primary-gradient-from)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-6 py-3 bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 rounded-lg font-medium text-[var(--primary-gradient-from)]"
              >
                Explore Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {[
              { value: "120+", label: "Projects Delivered" },
              { value: "40+", label: "Expert Developers" },
              { value: "8+", label: "Years Experience" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--foreground)]/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero image */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D style mockup container */}
            <div className="relative">
              {/* Shadow effect */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-[20px] bg-black/20 blur-xl rounded-full"></div>
              
              {/* Laptop mockup */}
              <div className="w-full max-w-[600px] mx-auto rounded-xl overflow-hidden border border-[var(--border-color)]/30 bg-gradient-to-br from-[var(--card-bg)]/80 to-[var(--card-bg)]/30 backdrop-blur-sm p-4 shadow-2xl">
                {/* Browser header */}
                <div className="flex items-center h-6 rounded-t-md bg-[var(--card-bg)] border-b border-[var(--border-color)]/30 px-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs text-[var(--foreground)]/50">www.nodenest.com</div>
                </div>
                
                {/* Dashboard content with gradient overlay */}
                <div className="relative h-[300px] overflow-hidden rounded-b-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-gradient-from)]/10 to-[var(--secondary-color)]/5"></div>
                  {/* Dashboard elements - replace with your own dashboard image */}
                  <div className="absolute inset-0 p-4 grid grid-cols-4 grid-rows-3 gap-3">
                    <div className="col-span-2 row-span-1 bg-[var(--card-bg)]/60 rounded-lg border border-[var(--border-color)]/30 p-3">
                      <div className="w-1/2 h-2 bg-[var(--foreground)]/20 rounded mb-2"></div>
                      <div className="flex items-end gap-1 h-full">
                        <div className="w-1/6 h-[30%] bg-[var(--primary-gradient-from)]/30 rounded-sm"></div>
                        <div className="w-1/6 h-[60%] bg-[var(--primary-gradient-from)]/40 rounded-sm"></div>
                        <div className="w-1/6 h-[40%] bg-[var(--primary-gradient-from)]/30 rounded-sm"></div>
                        <div className="w-1/6 h-[80%] bg-[var(--primary-gradient-from)]/50 rounded-sm"></div>
                        <div className="w-1/6 h-[50%] bg-[var(--primary-gradient-from)]/30 rounded-sm"></div>
                        <div className="w-1/6 h-[70%] bg-[var(--primary-gradient-from)]/40 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="col-span-2 row-span-1 bg-[var(--card-bg)]/60 rounded-lg border border-[var(--border-color)]/30 p-3">
                      <div className="w-1/2 h-2 bg-[var(--foreground)]/20 rounded mb-2"></div>
                      <div className="w-3/4 h-2 bg-[var(--foreground)]/10 rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="w-12 h-12 rounded-full bg-[var(--accent-color)]/20"></div>
                        <div className="w-12 h-12 rounded-full bg-[var(--secondary-color)]/20"></div>
                        <div className="w-12 h-12 rounded-full bg-[var(--primary-gradient-from)]/20"></div>
                      </div>
                    </div>
                    <div className="col-span-3 row-span-2 bg-[var(--card-bg)]/60 rounded-lg border border-[var(--border-color)]/30 p-3">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-1/4 h-2 bg-[var(--foreground)]/20 rounded"></div>
                        <div className="w-1/4 h-6 bg-[var(--primary-gradient-from)]/20 rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-full bg-[var(--card-bg)]/40 rounded p-2">
                          <div className="w-full h-2 bg-[var(--foreground)]/10 rounded mb-2"></div>
                          <div className="w-3/4 h-2 bg-[var(--foreground)]/10 rounded mb-3"></div>
                          <div className="w-20 h-20 mx-auto rounded bg-[var(--primary-gradient-from)]/10"></div>
                        </div>
                        <div className="h-full bg-[var(--card-bg)]/40 rounded p-2">
                          <div className="w-full h-2 bg-[var(--foreground)]/10 rounded mb-2"></div>
                          <div className="w-3/4 h-2 bg-[var(--foreground)]/10 rounded mb-3"></div>
                          <div className="w-20 h-20 mx-auto rounded bg-[var(--secondary-color)]/10"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 row-span-2 bg-[var(--card-bg)]/60 rounded-lg border border-[var(--border-color)]/30 p-2">
                      <div className="w-1/2 h-2 bg-[var(--foreground)]/20 rounded mb-3"></div>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-[var(--foreground)]/10 rounded"></div>
                        <div className="w-full h-2 bg-[var(--foreground)]/10 rounded"></div>
                        <div className="w-3/4 h-2 bg-[var(--foreground)]/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around the mockup */}
              <motion.div 
                className="absolute -top-6 -right-4 w-20 h-20 bg-[var(--card-bg)]/40 rounded-lg backdrop-blur-sm border border-[var(--border-color)]/30 p-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="h-3 w-3/4 bg-[var(--accent-color)]/40 rounded-full mb-2"></div>
                <div className="h-8 w-full bg-[var(--accent-color)]/20 rounded-md"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -left-6 w-24 h-16 bg-[var(--card-bg)]/40 rounded-lg backdrop-blur-sm border border-[var(--border-color)]/30 p-2 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="h-2 w-1/2 bg-[var(--secondary-color)]/40 rounded-full mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-6 w-6 bg-[var(--secondary-color)]/20 rounded"></div>
                  <div className="h-6 w-10 bg-[var(--secondary-color)]/20 rounded"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
