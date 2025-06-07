'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TrustedCompanies() {
  // Companies that trust us with their logos
  const companies = [
    {
      name: "TechNova",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=TechNova",
      industry: "Technology"
    },
    {
      name: "Quantum Labs",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=Quantum+Labs",
      industry: "Research"
    },
    {
      name: "Nexus Dynamics",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=Nexus+Dynamics",
      industry: "Software"
    },
    {
      name: "Fusion Brands",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=Fusion+Brands",
      industry: "Marketing"
    },
    {
      name: "Elevate Finance",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=Elevate+Finance",
      industry: "Finance"
    },
    {
      name: "Horizon Media",
      logo: "https://placehold.co/200x80/2a2a2a/FFFFFF?text=Horizon+Media",
      industry: "Media"
    },
  ];

  // Testimonials from companies
  const testimonials = [
    {
      quote: "Atom Flow transformed our digital presence with their innovative approach and technical expertise.",
      author: "Sarah Chen",
      position: "CTO at TechNova",
      company: "TechNova"
    },
    {
      quote: "The team at Atom Flow delivered beyond our expectations, creating a platform that truly represents our brand.",
      author: "Michael Rodriguez",
      position: "Marketing Director at Fusion Brands",
      company: "Fusion Brands"
    },
    {
      quote: "Working with Atom Flow has been a game-changer for our company's digital strategy.",
      author: "Jessica Park",
      position: "CEO at Nexus Dynamics",
      company: "Nexus Dynamics"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[var(--primary-gradient-from)]/5 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-[var(--secondary-color)]/5 rounded-full blur-[40px]" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[var(--background)]" style={{ 
          backgroundImage: "linear-gradient(var(--border-color)/3 1px, transparent 1px), linear-gradient(90deg, var(--border-color)/3 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--foreground)]/70 border border-[var(--border-color)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-gradient-from)] mr-2"></span>
            Our Partners
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
              Trusted By Innovative Companies
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-[var(--foreground)]/80">
            We've partnered with forward-thinking businesses across industries to deliver exceptional digital experiences.
          </p>
        </motion.div>
        
        {/* Company logos */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)]/30 rounded-lg p-6 flex items-center justify-center h-24 w-full shadow-sm hover:shadow-md transition-all">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="max-h-12 max-w-full filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="mt-3 text-sm text-[var(--foreground)]/70">{company.industry}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonials */}
        <motion.div
          className="bg-[var(--card-bg)]/50 backdrop-blur-sm border border-[var(--border-color)]/30 rounded-2xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Quote icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gradient-to-br from-[var(--primary-gradient-from)]/20 to-[var(--primary-gradient-to)]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-[var(--primary-gradient-from)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.24-.31.53-.53.88-.66.6-.23 1.28-.27 1.94-.12.7.15 1.33.48 1.81.98.6.63 1.02 1.43 1.23 2.31.19.87.19 1.77-.01 2.65-.2.87-.62 1.66-1.23 2.3-.28.29-.61.51-.96.68-.35.18-.74.28-1.13.28-.39 0-.78-.09-1.13-.28-.36-.17-.68-.39-.96-.68-.28-.28-.5-.61-.65-.96-.16-.35-.24-.74-.24-1.13v-.21l.04-.18.06-.16.09-.12.12-.09.15-.05.17-.02.19.02.18.05.15.09.12.12.07.16.04.19v.21zm-5.94-2.2c-.19-.09-.39-.14-.58-.14h-.22c-.09.02-.17.05-.24.09-.07.05-.12.11-.16.19-.03.08-.05.16-.05.25 0 .1.02.19.06.28.04.08.1.15.18.21.07.05.16.09.25.11.09.02.19.02.28 0 .1-.02.18-.06.26-.11.08-.06.14-.13.19-.22.04-.09.07-.19.07-.29 0-.09-.02-.18-.07-.26-.04-.08-.1-.14-.18-.19zm5.94 2.2c-.19-.09-.39-.14-.58-.14h-.22c-.09.02-.17.05-.24.09-.07.05-.12.11-.16.19-.03.08-.05.16-.05.25 0 .1.02.19.06.28.04.08.1.15.18.21.07.05.16.09.25.11.09.02.19.02.28 0 .1-.02.18-.06.26-.11.08-.06.14-.13.19-.22.04-.09.07-.19.07-.29 0-.09-.02-.18-.07-.26-.04-.08-.1-.14-.18-.19zM7.25 3c-.69 0-1.25.56-1.25 1.25v3.5h2.5v-3.5C8.5 3.56 7.94 3 7.25 3zm9.5 0c-.69 0-1.25.56-1.25 1.25v3.5h2.5v-3.5c0-.69-.56-1.25-1.25-1.25z"/>
              </svg>
            </div>
            
            {/* Testimonial content */}
            <div className="flex-1">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <p className="text-xl md:text-2xl text-[var(--foreground)] italic mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[var(--foreground)]">{testimonials[currentTestimonial].author}</h4>
                    <p className="text-sm text-[var(--foreground)]/70">{testimonials[currentTestimonial].position}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Testimonial navigation dots */}
              <div className="flex justify-center md:justify-start mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentTestimonial === index 
                        ? 'bg-[var(--primary-gradient-from)]' 
                        : 'bg-[var(--border-color)]'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 rounded-lg font-medium text-[var(--primary-gradient-from)] hover:bg-[var(--primary-gradient-from)]/10 transition-all"
          >
            <span>Become Our Partner</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 