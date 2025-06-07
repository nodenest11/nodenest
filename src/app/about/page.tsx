"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageLoadWrapper from '../../components/PageLoadWrapper';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TeamMember, COLLECTIONS, getAllDocuments, SORT_FIELDS } from '@/lib/firebase';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch team members from the database
  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true);
        const members = await getAllDocuments<TeamMember>(
          COLLECTIONS.TEAM,
          true, // Published only
          SORT_FIELDS.ORDER, // Order by the 'order' field
          'asc' // Ascending order
        );
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  const timeline = [
    { year: "2020", event: "Atom Flow founded by tech entrepreneurs Jake Chen and Mia Rodriguez in San Francisco" },
    { year: "2021", event: "First major client project with TechVision, resulting in a 200% increase in their conversion rates" },
    { year: "2022", event: "Team expansion to 15 members, including specialists in AI, AR/VR, and blockchain technologies" },
    { year: "2023", event: "Opened international offices in London and Singapore to serve our growing global client base" },
    { year: "2024", event: "Launched enterprise solutions division and received Innovation Award for our proprietary AtomCore framework" },
    { year: "2025", event: "Celebrating 5 years of innovation with over 200+ successful projects and a team of 30+ experts" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We push boundaries and stay ahead of industry trends to deliver cutting-edge solutions."
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to client communication."
    },
    {
      title: "Collaboration",
      description: "We believe the best results come from close partnership with our clients and open communication."
    },
    {
      title: "Impact",
      description: "We measure our success by the tangible business results and value we create for our clients."
    }
  ];

  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-28 px-4 bg-[var(--background)]">
          {/* Hero Section */}
          <section className="w-full max-w-6xl mx-auto mb-20 flex flex-col items-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.h1>
            <motion.p 
              className="text-xl text-[var(--foreground)] opacity-90 max-w-4xl text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Atom Flow was founded in 2020 with a vision to transform how businesses engage with technology. What started as a two-person team has grown into a global studio of 30+ experts dedicated to creating exceptional digital experiences.
            </motion.p>
            
            {/* Company Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.1 }}
            >
              {[
                { value: "200+", label: "Projects Completed" },
                { value: "95%", label: "Client Satisfaction" },
                { value: "30+", label: "Team Members" },
                { value: "20+", label: "Countries Served" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="glass-effect rounded-xl p-6 text-center border border-[var(--border-color)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 20px rgba(0, 255, 231, 0.2)'
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">{stat.value}</div>
                  <div className="text-[var(--foreground)] opacity-80 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          
          {/* Mission & Vision */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <div className="glass-effect rounded-2xl p-10 border border-[var(--border-color)] shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-6">Our Mission</h2>
                  <p className="text-lg text-[var(--foreground)] opacity-90 mb-4">
                    At Atom Flow, our mission is to design and develop digital solutions that are not only visually stunning and technically excellent but also intuitive, accessible, and impactful.
                  </p>
                  <p className="text-lg text-[var(--foreground)] opacity-90">
                    We strive to be a partner in our clients' success, creating meaningful digital experiences that drive business growth and user engagement.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-6">Our Vision</h2>
                  <p className="text-lg text-[var(--foreground)] opacity-90 mb-4">
                    We envision a world where technology enhances human experiences, not complicates them. Our vision is to be the leading digital studio known for creating innovative, user-centered digital products that set new standards in the industry.
                  </p>
                  <p className="text-lg text-[var(--foreground)] opacity-90">
                    By 2030, we aim to have transformed the digital presence of 1000+ businesses worldwide, establishing a new benchmark for what exceptional digital experiences should be.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Core Values */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Our Core Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="glass-effect rounded-xl p-8 border border-[var(--border-color)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-4">{value.title}</h3>
                  <p className="text-lg text-[var(--foreground)] opacity-90">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Our Journey Timeline */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Our Journey
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] transform md:translate-x-[-50%]"></div>
              
              {/* Timeline events */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  >
                    <div className="md:w-1/2 flex md:justify-end px-4">
                      <div className={`w-full md:max-w-sm glass-effect rounded-xl p-6 ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'} border border-[var(--border-color)]`}>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-2">{item.year}</div>
                        <p className="text-[var(--foreground)] opacity-90">{item.event}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] transform translate-x-[-50%] mt-6"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Leadership Team */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Leadership Team
            </motion.h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-[var(--primary-gradient-from)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : teamMembers.length === 0 ? (
              <p className="text-center text-[var(--foreground)]/70">No team members available at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={member.id}
                    className="glass-effect rounded-xl p-6 border border-[var(--border-color)] flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(0, 255, 231, 0.2)'
                    }}
                  >
                    {member.imageUrl ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[var(--primary-gradient-from)]">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/team/default-avatar.svg';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-4 flex items-center justify-center text-[var(--background)] text-2xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">{member.name}</h3>
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-4 font-medium">{member.role}</p>
                    <p className="text-[var(--foreground)] opacity-80 text-sm">{member.bio}</p>
                    
                    {/* Social links if available */}
                    {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
                      <div className="flex space-x-3 mt-4">
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.website && (
                          <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </section>
          
          {/* Join the Team CTA */}
          <section className="w-full max-w-6xl mx-auto mb-20">
            <motion.div 
              className="relative overflow-hidden glass-effect rounded-2xl p-10 md:p-16 border border-[var(--primary-gradient-from)]/30 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] mb-6">Join Our Team</h2>
                <p className="text-lg md:text-xl text-[var(--foreground)] opacity-90 mb-8 max-w-3xl">
                  We're always looking for talented individuals to join our team. If you're passionate about creating exceptional digital experiences, we'd love to hear from you.
                </p>
                <Link 
                  href="/careers" 
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)] inline-block"
                >
                  Explore Careers
                </Link>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-gradient-from)]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--primary-gradient-to)]/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}
