'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "@/lib/firebase/contentTypes";
import { COLLECTIONS, getAllDocuments, getSortedDocuments } from "@/lib/firebase/firestoreUtils";
import Link from "next/link";

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);

  // Fetch portfolio projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // First try to use getSortedDocuments (which is more advanced)
        let projectsData: PortfolioProject[] = [];
        
        try {
          // Try to get featured projects first, then by order
          projectsData = await getSortedDocuments<PortfolioProject>(
            COLLECTIONS.PORTFOLIO,
            true, // Only published projects
            [
              { field: 'featured', direction: 'desc' }, // Featured projects first
              { field: 'order', direction: 'asc' }      // Then by order
            ],
            10 // Limit to 10 projects for homepage
          );
        } catch (sortError) {
          // Fall back to the simpler getAllDocuments if getSortedDocuments fails
          projectsData = await getAllDocuments<PortfolioProject>(
            COLLECTIONS.PORTFOLIO,
            true, // Only published
            'order', 
            'asc',
            10 // Limit to 10 projects
          );
          
          // Sort manually for featured projects first if needed
          projectsData = projectsData.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (a.order || 0) - (b.order || 0);
          });
        }
        
        // Only set projects if we actually have data
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
          
          // Extract unique categories
          const uniqueCategories = ["All", ...Array.from(new Set(projectsData.map(project => project.category)))];
          setCategories(uniqueCategories);
          
          setLoading(false);
        } else {
          // If no real data, try one more time as a last resort
          const allProjects = await getAllDocuments<PortfolioProject>(
            COLLECTIONS.PORTFOLIO,
            false, // Try all projects including unpublished as last resort
            'order',
            'asc'
          );
          
          if (allProjects && allProjects.length > 0) {
            // We got some data, even if unpublished
            setProjects(allProjects);
            
            // Extract unique categories
            const uniqueCategories = ["All", ...Array.from(new Set(allProjects.map(project => project.category)))];
            setCategories(uniqueCategories);
          } else {
            // No data at all, show empty state
            setError("No portfolio projects found");
            setProjects([]);
            setCategories(["All"]);
          }
          setLoading(false);
        }
      } catch (err) {
        setError("Error loading projects");
        setLoading(false);
        setCategories(["All"]);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  // Animation variants for transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Define category colors for consistent styling
  const categoryColors: Record<string, string> = {
    'Web Development': 'var(--primary-gradient-from)',
    'Mobile App': 'var(--secondary-color)',
    'UI/UX Design': 'var(--accent-color)',
    'Branding': 'var(--secondary-color)',
    'Digital Marketing': 'var(--accent-color)',
    'Web': 'var(--primary-gradient-from)',
    'App': 'var(--secondary-color)',
    'UI': 'var(--accent-color)'
  };

  // Portfolio statistics
  const portfolioStats = [
    { value: "200+", label: "Projects Completed" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "50+", label: "Industry Awards" },
    { value: "10+", label: "Years Experience" }
  ];

  if (loading) {
    return (
      <section id="portfolio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center py-24">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Work
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Our Portfolio</span>
        </h2>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
          Our Work
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Our Portfolio</span>
        </h2>
        <p className="text-[var(--foreground)]/70 text-center mb-10">
          Our portfolio projects are coming soon. Check back later to see our work.
        </p>
      </section>
    );
  }

  return (
    <section id="portfolio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center relative overflow-hidden py-8 md:py-16">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-[var(--primary-gradient-from)]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--accent-color)]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--secondary-color)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] mr-2"></span>
            Featured Work
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
        Our Portfolio
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-6">
            Discover how we've transformed ideas into impactful digital experiences 
            that drive real business results for our clients.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mt-10 mb-8 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white shadow-lg'
                    : 'bg-[var(--card-bg)] text-[var(--primary-gradient-from)] hover:bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured project - hero size */}
        {filteredProjects.length > 0 && (activeCategory === "All" ? projects[0]?.featured : filteredProjects[0]) && (
          <motion.div 
            className="w-full mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <Link href={`/portfolio/${activeCategory === "All" && projects[0]?.featured ? projects[0].slug || projects[0].id : filteredProjects[0].slug || filteredProjects[0].id}`} className="block">
                {/* Glass effect header bar */}
                <div className="absolute top-0 inset-x-0 h-16 bg-[var(--card-bg)]/10 backdrop-blur-md z-10 flex items-center justify-between px-8 border-b border-white/10">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm mr-3">
                      Featured Project
                    </span>
                    <span className="hidden sm:flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span className="text-sm font-medium text-white/90">
                        {activeCategory === "All" && projects[0]?.featured ? projects[0].category : filteredProjects[0].category}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <span className="text-xs">View Project</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              
                {/* Project image with overlay */}
                <div className="h-[500px] relative overflow-hidden">
                  {(activeCategory === "All" && projects[0]?.featured ? projects[0].imageUrl : filteredProjects[0].imageUrl) ? (
                    <img 
                      src={activeCategory === "All" && projects[0]?.featured ? projects[0].imageUrl : filteredProjects[0].imageUrl} 
                      alt={activeCategory === "All" && projects[0]?.featured ? projects[0].title : filteredProjects[0].title} 
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br" style={{ 
                      background: `linear-gradient(135deg, 
                        ${categoryColors[activeCategory === "All" && projects[0]?.featured ? projects[0].category : filteredProjects[0].category] || 'var(--primary-gradient-from)'}50, 
                        ${categoryColors[activeCategory === "All" && projects[0]?.featured ? projects[0].category : filteredProjects[0].category] || 'var(--primary-gradient-from)'}20)` 
                    }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>

                  {/* Content overlay - positioned at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-8 z-10">
                    <div className="max-w-3xl">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-4">
                        <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[var(--primary-gradient-from)] transition-colors duration-300">
                          {activeCategory === "All" && projects[0]?.featured ? projects[0].title : filteredProjects[0].title}
                        </h3>
                        
                        <div className="md:ml-auto flex flex-wrap gap-2">
                          {(activeCategory === "All" && projects[0]?.featured ? projects[0].tags : filteredProjects[0].tags)?.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-2.5 py-1 text-xs rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl line-clamp-3 md:line-clamp-2">
                        {activeCategory === "All" && projects[0]?.featured ? projects[0].description : filteredProjects[0].description}
                      </p>
                      
                      <div className="flex items-center gap-6">
                        <div className="inline-flex items-center group/link relative overflow-hidden">
                          <div className="absolute inset-0 w-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] translate-y-[100%] group-hover/link:translate-y-0 transition-transform duration-300"></div>
                          <span className="bg-black/30 text-white text-sm relative z-10 py-2 px-5 border border-white/30 rounded-full group-hover/link:border-transparent transition-all duration-300">
                            View Case Study
                          </span>
                        </div>
                        
                        <div className="hidden md:block h-8 w-px bg-white/20"></div>
                        
                        <div className="hidden md:flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                            <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/80 to-[var(--primary-gradient-to)]/80"></div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">Client</p>
                            <p className="text-sm text-white/80">
                              {activeCategory === "All" && projects[0]?.featured ? projects[0].client || 'Confidential' : filteredProjects[0].client || 'Confidential'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Portfolio Grid - masonry style layout */}
        <AnimatePresence mode="wait">
      <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
      >
            {filteredProjects
              .slice(activeCategory === "All" ? (projects[0]?.featured ? 1 : 0) : (filteredProjects[0]?.featured ? 1 : 0))
              .slice(0, 6)
              .map((project, index) => (
          <motion.div 
            key={project.id}
                className="group"
            variants={itemVariants}
                style={{ 
                  marginTop: index % 3 === 1 ? '40px' : index % 3 === 2 ? '20px' : '0px'
                }}
              >
                <div className="relative overflow-hidden rounded-xl bg-[var(--card-bg)]/30 border border-[var(--border-color)]/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  style={{
                    boxShadow: `0 10px 30px -10px ${categoryColors[project.category] || 'var(--primary-gradient-from)'}20`
                  }}
                >
                  <Link href={`/portfolio/${project.slug || project.id}`} className="block h-full">
              {/* Project image */}
                    <div className="relative">
                      <div className="h-[220px] overflow-hidden">
              {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br" style={{ 
                            background: `linear-gradient(135deg, ${categoryColors[project.category] || 'var(--primary-gradient-from)'}30, ${categoryColors[project.category] || 'var(--primary-gradient-from)'}10)` 
                          }} />
                        )}
                      </div>
                      
                      {/* Overlay that appears on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-medium">View Project</span>
                      </div>
                      
                      {/* Category tag */}
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 text-xs rounded-md" style={{
                          backgroundColor: `${categoryColors[project.category] || 'var(--primary-gradient-from)'}20`,
                          color: categoryColors[project.category] || 'var(--primary-gradient-from)',
                          border: `1px solid ${categoryColors[project.category] || 'var(--primary-gradient-from)'}30`
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--primary-gradient-from)] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[var(--foreground)]/70 text-sm line-clamp-2">
                  {project.description}
                </p>
                      </div>
                      
                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/30 text-[var(--foreground)]/70">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--card-bg)]/70 border border-[var(--border-color)]/30 text-[var(--foreground)]/70">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-3 border-t border-[var(--border-color)]/20">
                        {/* Client info */}
                        <div className="text-[var(--foreground)]/70 text-xs">
                          {project.client && (
                            <>Client: <span className="font-medium text-[var(--foreground)]">{project.client}</span></>
                          )}
                        </div>
                        
                        {/* Arrow icon */}
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--card-bg)]/70 border border-[var(--border-color)]/30 text-[var(--foreground)]/60 group-hover:border-[var(--primary-gradient-from)]/30 group-hover:bg-[var(--primary-gradient-from)]/10 group-hover:text-[var(--primary-gradient-from)] transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33331 8H12.6666M12.6666 8L8 3.33334M12.6666 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
              </div>
            </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Portfolio Statistics */}
        <motion.div
          className="mt-20 mb-8 w-full py-12 px-6 rounded-2xl bg-gradient-to-r from-[var(--card-bg)]/80 to-[var(--card-bg)]/40 backdrop-blur-md border border-[var(--border-color)]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-center mb-10">By The Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {portfolioStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
              >
                <div className="relative inline-flex mb-2">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] opacity-20 blur-lg"></div>
                  <h4 className="relative text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                    {stat.value}
                  </h4>
                </div>
                <p className="text-sm text-[var(--foreground)]/70">{stat.label}</p>
          </motion.div>
        ))}
          </div>
      </motion.div>
      
        {/* View all projects button */}
      <motion.div
          className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link 
          href="/portfolio"
            className="relative inline-flex group"
          >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] opacity-60 blur-md group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative px-8 py-3.5 rounded-lg bg-[var(--card-bg)] text-[var(--foreground)] font-medium border border-[var(--border-color)]/30 group-hover:border-[var(--primary-gradient-from)]/50 transition-all duration-500">
              <span className="relative z-10 flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
                  Explore All Projects
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[var(--primary-gradient-from)] group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
        </Link>
      </motion.div>
      </div>
    </section>
  );
}
