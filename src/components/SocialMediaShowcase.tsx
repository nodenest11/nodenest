'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialMediaShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Twitter and Instagram embed scripts
  useEffect(() => {
    // Load Twitter widgets JS
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    twitterScript.charset = 'utf-8';
    document.body.appendChild(twitterScript);
    
    // Set a timeout to show fallback content if Twitter doesn't load in time
    const twitterFallbackTimeout = setTimeout(() => {
      const fallbackElement = document.querySelector('.twitter-fallback');
      if (fallbackElement) {
        fallbackElement.classList.add('opacity-100');
      }
    }, 5000);

    // Load Instagram embed JS
    const instagramScript = document.createElement('script');
    instagramScript.src = 'https://www.instagram.com/embed.js';
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    return () => {
      // Cleanup scripts when component unmounts
      clearTimeout(twitterFallbackTimeout);
      if (document.body.contains(twitterScript)) {
        document.body.removeChild(twitterScript);
      }
      if (document.body.contains(instagramScript)) {
        document.body.removeChild(instagramScript);
      }
    };
  }, []);

  return (
    <section ref={ref} className="w-full bg-gradient-to-b from-[var(--background)] to-[var(--card-bg)]/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--primary-gradient-from)] rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--primary-gradient-to)] rounded-full blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: "radial-gradient(var(--border-color) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
              Connect With Us
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-4">
            Stay updated with our latest projects, insights, and tech news on our social media channels.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Social media grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Twitter Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--card-bg)]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[var(--border-color)]/30 shadow-sm hover:shadow-md transition-all duration-300 h-[550px]"
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#1DA1F2]/10 mr-3">
                  <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Twitter Feed</h3>
              </div>
              
              <div className="twitter-feed h-[470px] overflow-hidden bg-[var(--card-bg)]/30 rounded-lg relative">
                <a 
                  className="twitter-timeline" 
                  data-height="470"
                  data-theme="dark"
                  data-chrome="transparent nofooter noborders"
                  href="https://twitter.com/atomflow"
                >
                  Loading tweets...
                </a>
                
                {/* Fallback content in case Twitter embed fails */}
                <div className="twitter-fallback absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--card-bg)]/70 rounded-lg opacity-0 transition-opacity duration-500">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-[var(--foreground)] mb-3">Follow us on Twitter</h4>
                  <p className="text-[var(--foreground)]/70 mb-6">Stay updated with our latest news, projects, and insights.</p>
                  
                  <a 
                    href="https://twitter.com/atomflow" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD6] text-white font-medium shadow-md hover:shadow-lg hover:shadow-[#1DA1F2]/30 transition-all duration-200"
                  >
                    Visit Our Twitter
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instagram Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--card-bg)]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[var(--border-color)]/30 shadow-sm hover:shadow-md transition-all duration-300 h-[550px]"
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#E1306C]/10 mr-3">
                  <svg className="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Instagram Feed</h3>
              </div>
              
              <div className="instagram-feed h-[470px] overflow-hidden bg-[var(--card-bg)]/30 rounded-lg relative">
                {/* Instagram embed placeholder with link */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-[var(--foreground)] mb-3">Check out our Instagram</h4>
                  <p className="text-[var(--foreground)]/70 mb-6">See our latest projects, behind-the-scenes content, and design inspiration.</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Sample Instagram post previews - these would be real Instagram posts in a production site */}
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <div key={index} className="aspect-square bg-[var(--card-bg)]/50 rounded-lg overflow-hidden border border-[var(--border-color)]/20 hover:border-[#E1306C]/30 transition-all duration-300">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-[#E1306C]/5 to-[#F77737]/5 flex items-center justify-center text-[var(--foreground)]/30 text-xs">
                            Post {index}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="https://instagram.com/atomflow" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#F77737] text-white font-medium shadow-md hover:shadow-lg hover:shadow-[#E1306C]/30 transition-all duration-200"
                  >
                    View Our Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* View more link */}
        <motion.div 
          className="text-center mt-16 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-4">
            <a 
              href="https://twitter.com/atomflow" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 rounded-lg bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Follow on Twitter
            </a>
            <a 
              href="https://instagram.com/atomflow" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaShowcase;