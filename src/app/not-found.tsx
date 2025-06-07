"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageLoadWrapper from '@/components/PageLoadWrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <PageLoadWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--primary-gradient-from)]/10 mb-8">
                <span className="text-4xl text-[var(--primary-gradient-from)]">404</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                Page Not Found
              </h1>
              
              <p className="text-lg text-[var(--foreground)]/80 mb-8 max-w-lg mx-auto">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Back to Home
                </Link>
                
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] font-medium rounded-lg hover:bg-[var(--primary-gradient-from)]/10 transition-all duration-300"
                >
                  Contact Support
                </Link>
              </div>
              
              <div className="mt-16">
                <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                  You might be looking for:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {[
                    { name: 'Services', path: '/services' },
                    { name: 'Portfolio', path: '/portfolio' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Blog', path: '/blog' },
                  ].map((link, index) => (
                    <Link 
                      key={index}
                      href={link.path}
                      className="p-4 bg-[var(--card-bg)]/50 border border-[var(--border-color)]/30 rounded-lg hover:bg-[var(--card-bg)] transition-all text-[var(--foreground)]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
