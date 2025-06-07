"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import EnhancedContact from "../components/EnhancedContact";
import About from "../components/About";
import Footer from "../components/Footer";
import SocialMediaShowcase from "../components/SocialMediaShowcase";
import BlogPreview from "../components/BlogPreview";
import { motion } from "framer-motion";
import PageLoadWrapper from "../components/PageLoadWrapper";
import Pricing from "../components/Pricing";
import TrustedCompanies from "../components/TrustedCompanies";
import TeamMembers from "../components/TeamMembers";

// Vibrant color patterns for homepage
const colors = {
  accent1: "rgba(255, 82, 136, 0.8)", // Vibrant pink
  accent2: "rgba(67, 156, 251, 0.8)", // Bright blue`
  accent3: "rgba(246, 183, 23, 0.8)", // Warm yellow
  accent4: "rgba(89, 203, 146, 0.8)", // Fresh green
  accent5: "rgba(161, 113, 255, 0.8)", // Rich purple
};

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  // Detect current theme
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDarkMode ? 'dark' : 'light');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageLoadWrapper>
      <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden">
        {/* Dynamic color blob background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Vibrant color blobs - positioned strategically throughout the page */}
          <div
            className="absolute top-0 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-blob animation-delay-2000"
            style={{ background: currentTheme === 'light' ? colors.accent1 : `rgba(255, 82, 136, 0.2)` }}
          />
          <div
            className="absolute top-[30%] -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-blob animation-delay-4000"
            style={{ background: currentTheme === 'light' ? colors.accent2 : `rgba(67, 156, 251, 0.15)` }}
          />
          <div
            className="absolute top-[60%] left-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-blob animation-delay-1000"
            style={{ background: currentTheme === 'light' ? colors.accent3 : `rgba(246, 183, 23, 0.15)` }}
          />
          <div
            className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 animate-blob animation-delay-3000"
            style={{ background: currentTheme === 'light' ? colors.accent4 : `rgba(89, 203, 146, 0.15)` }}
          />
          <div
            className="absolute top-[40%] left-[25%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-20 animate-blob animation-delay-2000"
            style={{ background: currentTheme === 'light' ? colors.accent5 : `rgba(161, 113, 255, 0.15)` }}
          />

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[var(--background)]" style={{
            backgroundImage: "radial-gradient(var(--border-color)/10 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            opacity: 0.4
          }}></div>
        </div>

        {/* Thin colorful top accent */}
        <div className="w-full h-0.5 bg-gradient-to-r from-[#FF5288] via-[#439CFB] via-[#F6B717] via-[#59CB92] to-[#A171FF]"></div>

        <Navbar />

        <main className="w-full flex flex-col items-center">
          {/* Hero section */}
          <section className="w-full relative pb-16">
            <Hero />
          </section>

          {/* Services section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full py-[var(--section-spacing)] relative"
          >
            <Services />
          </motion.section>

          {/* About section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full py-[var(--section-spacing)] relative bg-gradient-to-b from-[var(--background)] to-[var(--card-bg)]/5"
          >
            <About />
          </motion.section>

          {/* Team Members section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full py-[var(--section-spacing)] relative bg-gradient-to-b from-[var(--card-bg)]/5 to-[var(--background)]"
          >
            <TeamMembers />
          </motion.section>

          {/* Trusted Companies section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full relative bg-gradient-to-b from-[var(--card-bg)]/5 to-[var(--background)]"
          >
            <TrustedCompanies />
          </motion.section>

          {/* Portfolio section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full py-[var(--section-spacing)] relative bg-gradient-to-b from-[var(--card-bg)]/5 to-[var(--background)]"
          >
            <Portfolio />
          </motion.section>

          {/* Pricing section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full py-[var(--section-spacing)] relative"
          >
            <Pricing />
          </motion.section>

          {/* Blog section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full py-[var(--section-spacing)] relative bg-gradient-to-b from-[var(--background)] to-[var(--card-bg)]/5"
          >
            <BlogPreview />
          </motion.section>

          {/* Social Media section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full py-[var(--section-spacing)] relative bg-gradient-to-b from-[var(--card-bg)]/5 to-[var(--background)]"
          >
            <SocialMediaShowcase />
          </motion.section>

          {/* Contact section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full py-[var(--section-spacing)] relative"
          >
            <EnhancedContact />
          </motion.section>
        </main>

        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
