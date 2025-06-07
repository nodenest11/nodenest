'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const toggleBilling = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };
  
  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups",
      monthlyPrice: 999,
      yearlyPrice: 9990, // 10 months price (2 months free)
      features: [
        { name: "5-page responsive website", included: true },
        { name: "Basic SEO optimization", included: true },
        { name: "Contact form integration", included: true },
        { name: "Mobile-responsive design", included: true },
        { name: "1 month of support", included: true },
        { name: "CMS integration", included: false },
        { name: "E-commerce functionality", included: false },
        { name: "Custom animations", included: false },
      ],
      highlight: false,
      ctaText: "Get Started",
      color: "var(--primary-gradient-from)"
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses",
      monthlyPrice: 1999,
      yearlyPrice: 19990, // 10 months price (2 months free)
      features: [
        { name: "10-page responsive website", included: true },
        { name: "Advanced SEO optimization", included: true },
        { name: "Contact form integration", included: true },
        { name: "Mobile-responsive design", included: true },
        { name: "3 months of support", included: true },
        { name: "CMS integration", included: true },
        { name: "Basic e-commerce (up to 50 products)", included: true },
        { name: "Custom animations", included: false },
      ],
      highlight: true,
      ctaText: "Get Started",
      color: "var(--primary-gradient-to)"
    },
    {
      name: "Enterprise",
      description: "For established companies with complex needs",
      monthlyPrice: 3999,
      yearlyPrice: 39990, // 10 months price (2 months free)
      features: [
        { name: "Unlimited pages", included: true },
        { name: "Premium SEO optimization", included: true },
        { name: "Advanced contact & forms", included: true },
        { name: "Mobile-responsive design", included: true },
        { name: "12 months of support", included: true },
        { name: "Headless CMS integration", included: true },
        { name: "Full e-commerce suite", included: true },
        { name: "Custom animations & interactions", included: true },
      ],
      highlight: false,
      ctaText: "Contact Us",
      color: "var(--secondary-color)"
    }
  ];
  
  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
      <motion.div
        className="text-center max-w-3xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
            Simple, Transparent Pricing
          </span>
        </h2>
        
        <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-4">
          Choose the perfect plan for your project needs with no hidden fees or surprises
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mx-auto rounded-full"></div>
      </motion.div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center mb-12">
        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/60'}`}>
          Monthly
        </span>
        
        <button 
          onClick={toggleBilling}
          className="mx-3 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          aria-pressed={billingCycle === 'yearly'}
        >
          <span className={`absolute inset-0 rounded-full ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]' : 'bg-[var(--card-bg)] border-2 border-[var(--border-color)]'}`} />
          <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        
        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/60'}`}>
          Yearly <span className="text-xs ml-1 py-0.5 px-1.5 rounded-full bg-[var(--primary-gradient-from)]/10 text-[var(--primary-gradient-from)]">Save 20%</span>
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {pricingPlans.map((plan, index) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          
          return (
            <motion.div 
              key={plan.name}
              className={`relative bg-[var(--card-bg)]/50 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col h-full border ${plan.highlight ? 'border-[var(--primary-gradient-to)]' : 'border-[var(--border-color)]/30'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ 
                y: -5, 
                boxShadow: `0 10px 40px -10px ${plan.highlight ? 'rgba(0, 180, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]"></div>
              )}
                
              <div className="p-6 lg:p-8 flex-grow">
                <h3 className="text-xl font-bold mb-2" style={{ color: plan.color }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--foreground)]/70 mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                      {formatPrice(price)}
                    </span>
                    <span className="ml-1 text-sm text-[var(--foreground)]/70">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-xs text-[var(--primary-gradient-from)] mt-1">
                      Save {formatPrice(plan.monthlyPrice * 2)} with annual billing
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`mt-1 mr-3 flex-shrink-0 w-4 h-4 rounded-full ${feature.included ? 'bg-[' + plan.color + ']/20' : 'bg-[var(--border-color)]/20'} flex items-center justify-center`}>
                        {feature.included ? (
                          <svg className="w-2.5 h-2.5" style={{ color: plan.color }} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg className="w-2.5 h-2.5 text-[var(--border-color)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/50 line-through'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 pt-0 lg:p-8 lg:pt-0">
                <Link 
                  href={plan.name === "Enterprise" ? "/contact" : "/contact?plan=" + plan.name.toLowerCase()}
                  className={`block w-full py-3 text-center rounded-lg font-medium transition-all ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--primary-gradient-from)]/20' 
                      : 'bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] hover:bg-[var(--card-bg)]/80'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enterprise callout */}
      <motion.div 
        className="w-full mt-14 p-8 rounded-2xl bg-gradient-to-br from-[var(--card-bg)]/80 to-[var(--card-bg)]/30 backdrop-blur-md border border-[var(--border-color)]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Need a custom solution?</h3>
          <p className="text-[var(--foreground)]/70">Get in touch for enterprise-grade solutions tailored to your specific requirements</p>
        </div>
        <Link 
          href="/contact?type=custom"
          className="whitespace-nowrap px-6 py-3 rounded-lg bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] font-medium hover:bg-[var(--card-bg)]/80 transition-all"
        >
          Contact Sales
        </Link>
      </motion.div>
      
      {/* FAQ teaser */}
      <div className="mt-16 text-center">
        <p className="text-[var(--foreground)]/70 mb-2">Have questions about our pricing?</p>
        <Link 
          href="/faq"
          className="text-[var(--primary-gradient-from)] hover:underline"
        >
          Check our FAQ or contact us →
        </Link>
      </div>
    </section>
  );
} 