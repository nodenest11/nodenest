'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Service } from "@/lib/firebase/contentTypes";
import Link from "next/link";
import { ServiceService } from "@/lib/firebase/contentServices";

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch services using our standardized service
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await ServiceService.getPublished();
        if (servicesData && servicesData.length > 0) {
        setServices(servicesData);
        } else {
          setError('No services found. Please add services in the admin panel.');
          setServices([]);
        }
      } catch (err: any) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center py-24">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Services
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Our Services</span>
        </h2>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Services
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Our Services</span>
        </h2>
        <p className="text-[var(--foreground)]/70 text-center mb-10">
          {error || 'Services are coming soon. Please check back later.'}
        </p>
        {/* Admin link if no services */}
        <Link href="/admin/services" className="px-4 py-2 bg-[var(--primary-gradient-from)] text-white rounded-md hover:opacity-90 transition-all">
          Add Services in Admin Panel
        </Link>
      </section>
    );
  }

  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--primary-gradient-from)]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--secondary-color)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
            Our Services
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">What We Offer</span>
          </h2>
          
          <p className="text-base md:text-lg opacity-70 mb-8">
            We deliver end-to-end solutions tailored to your business needs
          </p>

          {/* Tab navigation for services */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === index
                    ? 'bg-[var(--accent-color)] text-white'
                    : 'bg-[var(--card-bg)] hover:bg-[var(--background)] border border-[var(--border-color)]'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </motion.div>
      
        {/* Service details */}
        <div className="mb-16" ref={ref}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm"
                >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Service image/icon */}
              <div className="md:w-1/3">
                {services[activeTab].imageUrl ? (
                  <img 
                    src={services[activeTab].imageUrl} 
                    alt={services[activeTab].title} 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-[var(--background)] rounded-lg flex items-center justify-center text-5xl">
                    {services[activeTab].icon || '🔧'}
                  </div>
                )}
              </div>

              {/* Service content */}
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">{services[activeTab].title}</h3>
                <p className="mb-6 opacity-70">{services[activeTab].description}</p>
                
                {/* Features */}
                {services[activeTab].features && services[activeTab].features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {services[activeTab].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[var(--accent-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Tools */}
                {services[activeTab].tools && (
                  <div>
                    <h4 className="font-semibold mb-3">Technologies & Tools</h4>
                    <p className="opacity-70">{services[activeTab].tools}</p>
                  </div>
                      )}
                    </div>
            </div>
      </motion.div>
        </div>
      
        {/* CTA */}
        <div className="text-center">
              <Link 
                href="/contact"
            className="px-6 py-3 bg-[var(--accent-color)] hover:opacity-90 text-white rounded-md transition-all inline-flex items-center gap-2"
              >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
              </Link>
            </div>
      </div>
    </section>
  );
}
