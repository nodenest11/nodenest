'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CompanyInfo, CompanyValue } from "@/lib/firebase/contentTypes";
import { COLLECTIONS, getAllDocuments, getDocumentById } from "@/lib/firebase/firestoreUtils";

export default function About() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // First try to get company info from the 'about' collection
        const info = await getDocumentById<CompanyInfo>(COLLECTIONS.ABOUT, 'company-info');
        if (info) {
          setCompanyInfo(info);
        }
        
        // Get company values
        const values = await getAllDocuments<CompanyValue>(
          COLLECTIONS.ABOUT,
          true, // Only published values
          'order', // Order by field
          'asc' // Direction
        );
        
        if (values.length > 0) {
          setCompanyValues(values);
        }
      } catch (err: any) {
        console.error('Error fetching company information:', err);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);
  
  // Default/fallback timeline
  const timeline = [
    { year: "2020", event: "Atom Flow founded by tech entrepreneurs Jake Chen and Mia Rodriguez in San Francisco" },
    { year: "2021", event: "First major client project with TechVision, resulting in a 200% increase in their conversion rates" },
    { year: "2022", event: "Team expansion to 15 members, including specialists in AI, AR/VR, and blockchain technologies" },
    { year: "2023", event: "Opened international offices in London and Singapore to serve our growing global client base" },
    { year: "2024", event: "Launched enterprise solutions division and received Innovation Award for our proprietary AtomCore framework" },
    { year: "2025", event: "Celebrating 5 years of innovation with over 200+ successful projects and a team of 30+ experts" }
  ];

  // Default/fallback stats
  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "30+", label: "Team Members" },
    { value: "20+", label: "Countries Served" }
  ];

  // Default/fallback values
  const defaultValues = [
    { title: "Innovation", description: "Pushing boundaries to create exceptional digital experiences", icon: "var(--primary-gradient-from)" },
    { title: "Precision", description: "Meticulous attention to detail in every project we undertake", icon: "var(--secondary-color)" },
    { title: "Partnership", description: "Building lasting relationships based on trust and results", icon: "var(--accent-color)" }
  ];

  const displayValues = companyValues.length > 0 ? companyValues : defaultValues;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
      <motion.div
        className="text-center max-w-3xl mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
        About {companyInfo?.name || "Atom Flow"}
          </span>
        </h2>
      
        <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-4">
        {companyInfo?.tagline || "We're a team of forward-thinking designers, developers, and digital strategists passionate about creating exceptional digital experiences that drive real business impact."}
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mx-auto rounded-full"></div>
      </motion.div>
      
      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="bg-[var(--card-bg)]/50 backdrop-blur-sm rounded-xl p-6 text-center border border-[var(--border-color)]/30 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            whileHover={{ 
              y: -5, 
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">{stat.value}</div>
            <div className="text-[var(--foreground)]/70 mt-2 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-16 w-full">
        <motion.div 
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={fadeIn}
          className="lg:w-1/2"
        >
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-full mr-3"></div>
            Our Vision & Mission
          </h3>
          <p className="text-[var(--foreground)]/80 mb-8 leading-relaxed">
            {companyInfo?.vision || "At Atom Flow, we envision a world where technology enhances human experiences, not complicates them. Our mission is to design and develop digital solutions that are not only visually stunning and technically excellent but also intuitive, accessible, and impactful."}
          </p>
          <p className="text-[var(--foreground)]/80 mb-8 leading-relaxed">
            {companyInfo?.mission || "We're committed to pushing the boundaries of what's possible in digital design and development, staying ahead of industry trends while maintaining a focus on delivering measurable business outcomes for our clients."}
          </p>
          
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-full mr-3"></div>
            Why Choose Us
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-[var(--card-bg)]/30 p-4 rounded-lg border border-[var(--border-color)]/20">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${defaultValues[0].icon}40, ${defaultValues[0].icon}10)` }}>
                <span className="text-[var(--primary-gradient-from)] text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Technical Excellence</h4>
                <p className="text-[var(--foreground)]/70 text-sm mt-1">Our team of experts excels in modern frameworks and technologies, ensuring robust, scalable, and future-proof solutions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[var(--card-bg)]/30 p-4 rounded-lg border border-[var(--border-color)]/20">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${defaultValues[1].icon}40, ${defaultValues[1].icon}10)` }}>
                <span className="text-[var(--secondary-color)] text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Creative Design</h4>
                <p className="text-[var(--foreground)]/70 text-sm mt-1">We blend aesthetics with functionality, creating immersive user experiences that captivate and convert</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[var(--card-bg)]/30 p-4 rounded-lg border border-[var(--border-color)]/20">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${defaultValues[2].icon}40, ${defaultValues[2].icon}10)` }}>
                <span className="text-[var(--accent-color)] text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Strategic Partnership</h4>
                <p className="text-[var(--foreground)]/70 text-sm mt-1">We're more than just implementers; we're strategic partners invested in your long-term success</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={fadeIn}
          className="lg:w-1/2"
        >
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] rounded-full mr-3"></div>
            Our Journey
          </h3>
          <div className="relative border-l-2 border-[var(--border-color)]/30 pl-8 space-y-8 ml-4">
            {timeline.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]"></div>
                <div className="font-bold text-[var(--primary-gradient-from)]">{item.year}</div>
                <div className="text-[var(--foreground)]/80 text-sm mt-1">{item.event}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        ref={ref3}
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={fadeIn}
        className="w-full bg-[var(--card-bg)]/40 backdrop-blur-sm mt-16 p-8 rounded-xl border border-[var(--border-color)]/30 shadow-sm"
      >
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Our Values</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayValues.map((value, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-[var(--card-bg)]/30 rounded-lg border border-[var(--border-color)]/20"
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)]/20 to-[var(--primary-gradient-to)]/20 flex items-center justify-center mb-4">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">{value.title.charAt(0)}</div>
              </div>
              <div className="font-bold text-[var(--foreground)] mb-2">{value.title}</div>
              <p className="text-[var(--foreground)]/70 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

