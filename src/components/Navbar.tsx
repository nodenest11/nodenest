'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  path: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  
  // Navigation items - always use direct page URLs
  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active link based on current path
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Handle theme 
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('nodenest-theme');
    
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
    document.documentElement.classList.toggle('light-theme', !newTheme);
    localStorage.setItem('nodenest-theme', newTheme ? 'dark' : 'light');
  };
  
  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--navbar-bg)] backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-lg animate-gradient-x"></div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                N
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] animate-gradient-x">
                NodeNest
              </span>
              <span className="text-[10px] text-[var(--foreground)]/70 tracking-wider -mt-1">WEB SOLUTIONS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <ul className="flex gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`relative px-4 py-2 rounded-md text-[15px] font-medium transition-colors ${
                      activeLink === item.path 
                        ? 'text-[var(--primary-gradient-from)]' 
                        : 'text-[var(--foreground)]/90 hover:text-[var(--primary-gradient-from)]'
                    }`}
                    onClick={() => setActiveLink(item.path)}
                  >
                    {item.label}
                    {activeLink === item.path && (
                      <motion.span 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-full"
                        layoutId="navbar-indicator"
                        style={{ width: '30%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 flex items-center justify-center transition-all hover:bg-[var(--card-bg)] hover:border-[var(--primary-gradient-from)]/50"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.svg 
                    key="moon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-[var(--primary-gradient-from)]" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    key="sun" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-[var(--secondary-color)]" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 flex items-center justify-center transition-all hover:bg-[var(--card-bg)]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.svg 
                    key="moon-mobile" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-[var(--primary-gradient-from)]" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    key="sun-mobile" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-[var(--secondary-color)]" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
            
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 flex items-center justify-center transition-all hover:bg-[var(--card-bg)]"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--navbar-bg)] backdrop-blur-lg border-t border-[var(--border-color)]/10"
          >
            <nav className="px-4 py-3">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={item.path}
                      className={`block px-4 py-2 rounded-md ${
                        activeLink === item.path 
                          ? 'bg-[var(--primary-gradient-from)]/10 text-[var(--primary-gradient-from)]' 
                          : 'text-[var(--foreground)]/90 hover:bg-[var(--card-bg)]'
                      }`}
                      onClick={() => {
                        setActiveLink(item.path);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}