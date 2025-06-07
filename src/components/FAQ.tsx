'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
}

export default function FAQ({ faqs: propFaqs }: FAQProps) {
  const defaultFaqs: FAQItem[] = [
    {
      question: "What services does Atom Flow offer?",
      answer: "Atom Flow specializes in premium web and mobile application development, UI/UX design, progressive web apps, e-commerce solutions, CMS implementations, and custom software development tailored to your specific business needs."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with the latest cutting-edge technologies including React, Next.js, Vue.js, Angular, React Native, Flutter, Node.js, Python, AWS, Google Cloud, and more. Our tech stack is adaptable to your project requirements to ensure optimal performance and scalability."
    },
    {
      question: "How long does it typically take to complete a project?",
      answer: "Project timelines vary based on complexity, scope, and requirements. A simple website may take 2-4 weeks, while complex web applications or mobile apps typically require 2-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project."
    },
    {
      question: "What is your design process like?",
      answer: "Our design process begins with a discovery phase to understand your brand, users, and goals. We then create wireframes, followed by interactive prototypes and high-fidelity designs. We believe in collaborative design with multiple feedback rounds to ensure the final product perfectly aligns with your vision."
    },
    {
      question: "Do you provide support after the project launch?",
      answer: "Absolutely! We offer comprehensive post-launch support packages including maintenance, updates, performance monitoring, security patches, and continuous improvements. We're committed to the long-term success of your digital product."
    },
    {
      question: "How do you handle project communication?",
      answer: "We maintain transparent communication through dedicated project management tools, regular check-ins, and progress reports. Each client is assigned a project manager as their main point of contact, ensuring smooth communication throughout the development process."
    },
    {
      question: "Can you work with our existing technology stack?",
      answer: "Yes, we're experienced in integrating with and extending existing systems. Our team can work with your current technology stack, suggest improvements where beneficial, and ensure seamless integration with new features or applications we develop."
    }
  ];

  // Use provided faqs or default ones
  const faqs = propFaqs || defaultFaqs;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-[var(--card-bg)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-[var(--primary-gradient-from)]/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-[var(--primary-gradient-to)]/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] animate-gradient-x">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 max-w-3xl mx-auto">
            Find answers to common questions about our services, process, and expertise.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => toggleExpand(index)}
                className={`w-full p-5 text-left rounded-xl glass-effect border ${
                  expandedIndex === index 
                    ? 'border-[var(--primary-gradient-from)]/50 shadow-[0_0_15px_rgba(0,255,231,0.1)]' 
                    : 'border-[var(--border-color)]'
                } transition-all duration-300 flex justify-between items-center group hover:border-[var(--primary-gradient-from)]/30`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="font-semibold text-lg text-[var(--foreground)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary-gradient-from)] group-hover:to-[var(--primary-gradient-to)] transition-all duration-300">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 flex-shrink-0 rounded-full p-1 bg-[var(--card-bg)] text-[var(--foreground)]/70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 glass-effect bg-[var(--card-bg)]/30 border-b border-l border-r border-[var(--border-color)] rounded-b-xl">
                      <p className="text-[var(--foreground)]/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: faqs.length * 0.1 }}
        >
          <p className="text-[var(--foreground)]/70 mb-6">
            Don't see your question here? Reach out to us directly.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
          >
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
