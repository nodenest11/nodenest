'use client';

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

// Define TypeScript interface for form data
interface FormData {
  name: string;
  email: string;
  message: string;
  subject: string;
  phone?: string;
  company?: string;
}

export default function EnhancedContact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    subject: 'General Inquiry',
    phone: '',
    company: ''
  });
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(null);
    
    try {
      // Validate form data (simple check)
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitSuccess(false);
        setSubmitting(false);
        return;
      }
      
      // Submit form data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: 'General Inquiry',
        phone: '',
        company: ''
      });
      
      setSubmitSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(null), 5000);
    } catch (error) {
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
      <motion.div
        className="text-center max-w-3xl mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
        Contact Us
          </span>
        </h2>
        
        <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-4">
        Ready to elevate your digital presence? Let's build something extraordinary together. 
        Reach out to discuss your project needs.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mx-auto rounded-full"></div>
      </motion.div>
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="w-full bg-[var(--card-bg)]/50 backdrop-blur-sm rounded-xl p-8 border border-[var(--border-color)]/30 shadow-sm">
            {submitSuccess === true && (
              <motion.div 
                className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}
            
            {submitSuccess === false && (
              <motion.div 
                className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                There was an error sending your message. Please try again.
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-[var(--foreground)]/70 text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[var(--foreground)]/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="phone" className="block text-[var(--foreground)]/70 text-sm mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-[var(--foreground)]/70 text-sm mb-2">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
              <div className="mb-6">
              <label htmlFor="subject" className="block text-[var(--foreground)]/70 text-sm mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all"
                required
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Website Development">Website Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Tech Consultation">Tech Consultation</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-[var(--foreground)]/70 text-sm mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="w-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/40 rounded-lg px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-gradient-from)]/50 focus:border-transparent transition-all min-h-[120px]"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white font-medium shadow-md hover:shadow-lg hover:shadow-[var(--primary-gradient-from)]/30 transition-all duration-200 relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
        
        <motion.div 
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-[var(--card-bg)]/30 backdrop-blur-sm rounded-xl p-8 border border-[var(--border-color)]/20 h-full flex flex-col justify-center">
            <motion.h3 
              className="text-2xl font-bold text-[var(--foreground)] mb-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-full mr-3"></div>
              Get in Touch
            </motion.h3>
            
            <motion.div 
              className="mb-8 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--primary-gradient-from)]/10 mr-3">
                <svg className="w-5 h-5 text-[var(--primary-gradient-from)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[var(--foreground)]/90 font-medium">Email</h4>
                <a href="mailto:contact@nodenest.com" className="text-[var(--foreground)]/70 text-sm hover:text-[var(--primary-gradient-from)] transition-colors">
                contact@nodenest.com
              </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--secondary-color)]/10 mr-3">
                <svg className="w-5 h-5 text-[var(--secondary-color)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
              </div>
              <div>
                <h4 className="text-[var(--foreground)]/90 font-medium">Phone</h4>
                <a href="tel:+1234567890" className="text-[var(--foreground)]/70 text-sm hover:text-[var(--secondary-color)] transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </motion.div>
            
            <motion.div
              className="mb-8 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--accent-color)]/10 mr-3">
                <svg className="w-5 h-5 text-[var(--accent-color)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[var(--foreground)]/90 font-medium">Office</h4>
                <address className="text-[var(--foreground)]/70 text-sm not-italic">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </address>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-auto pt-6 border-t border-[var(--border-color)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-[var(--foreground)]/90 font-medium mb-3">Connect With Us</h4>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com/nodenest" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] hover:text-[var(--primary-gradient-from)] hover:border-[var(--primary-gradient-from)]/50 transition-colors"
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--secondary-color)]/30 text-[var(--secondary-color)] hover:text-[var(--secondary-color)] hover:border-[var(--secondary-color)]/50 transition-colors"
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--card-bg)] border border-[var(--accent-color)]/30 text-[var(--accent-color)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
