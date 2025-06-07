'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--card-bg)]/90 backdrop-blur-sm py-12 px-4 md:px-8 relative overflow-hidden border-t border-[var(--border-color)]/30">
      {/* Decorative blurred gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--primary-gradient-from)]/10 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--primary-gradient-to)]/10 rounded-full blur-3xl z-0" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: "radial-gradient(var(--border-color) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
        {/* Left: Logo & tagline */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                NodeNest
              </span>
              <span className="text-[10px] text-[var(--foreground)]/70 tracking-wider -mt-1">WEB SOLUTIONS</span>
            </div>
          </Link>
          <p className="text-[var(--foreground)]/60 text-sm max-w-xs text-center md:text-left">
            Modern web development solutions for businesses of all sizes. Built with expertise by NodeNest.
          </p>
          
          {/* Social links */}
          <div className="flex gap-3 mt-2">
            <a 
              href="https://twitter.com/nodenest" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Twitter"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] hover:text-[var(--primary-gradient-from)] hover:border-[var(--primary-gradient-from)]/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.195c-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a 
              href="https://instagram.com/nodenest" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--secondary-color)]/30 text-[var(--secondary-color)] hover:text-[var(--secondary-color)] hover:border-[var(--secondary-color)]/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/nodenest" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--accent-color)]/30 text-[var(--accent-color)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Center: Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h4 className="text-[var(--foreground)] font-semibold mb-4 text-sm">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/web-development" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Web Development</Link></li>
              <li><Link href="/services/mobile-app" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/ui-ux-design" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services/digital-marketing" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[var(--foreground)] font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[var(--foreground)] font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-[var(--foreground)]/60 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom copyright */}
      <div className="relative z-10 max-w-7xl mx-auto mt-12 pt-6 border-t border-[var(--border-color)]/20 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-[var(--foreground)]/40">
            &copy; {new Date().getFullYear()} NodeNest. All rights reserved.
          </p>
          <p className="text-xs text-[var(--foreground)]/40 mt-2 md:mt-0">
            Designed with <span className="text-[var(--secondary-color)]">♥</span> by NodeNest
          </p>
        </div>
      </div>
    </footer>
  );
}