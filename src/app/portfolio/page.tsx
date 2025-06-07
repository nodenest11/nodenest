"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import PageLoadWrapper from '@/components/PageLoadWrapper';
import { PortfolioProject } from '@/lib/firebase/contentTypes';
import { COLLECTIONS, getAllDocuments } from '@/lib/firebase/firestoreUtils';
import Link from 'next/link';

// Category to color mapping
const categoryColors: Record<string, string> = {
  'Web Development': 'from-blue-500 to-cyan-400',
  'Mobile App': 'from-purple-500 to-pink-500',
  'UI/UX Design': 'from-emerald-500 to-teal-400',
  'Branding': 'from-red-500 to-orange-400',
  'Digital Marketing': 'from-indigo-500 to-blue-500',
  'Web': 'from-blue-500 to-cyan-400',
  'App': 'from-purple-500 to-pink-500',
  'UI': 'from-emerald-500 to-teal-400'
};

// Fallback project if needed - will only use if there's a serious error
const fallbackProjects = [
  {
    id: "1",
    title: "Modern E-Commerce Platform",
    description: "A fully responsive e-commerce solution with integrated payment processing and inventory management.",
    client: "RetailPlus",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    imageUrl: "/portfolio/portfolio1.jpg",
    featured: true,
    order: 1,
    slug: "modern-ecommerce-platform",
    published: true
  },
  {
    id: "2",
    title: "Health & Fitness Mobile App",
    description: "A comprehensive fitness tracking app with personalized workout plans and nutrition guidance.",
    client: "FitLife",
    category: "Mobile App",
    tags: ["React Native", "Firebase", "HealthKit"],
    imageUrl: "/portfolio/portfolio2.jpg",
    featured: false,
    order: 2,
    slug: "health-fitness-app",
    published: true
  },
  {
    id: "3",
    title: "Corporate Brand Redesign",
    description: "Complete visual identity refresh for an established financial services company.",
    client: "Capital Finance",
    category: "Branding",
    tags: ["Brand Strategy", "Logo Design", "Visual Identity"],
    imageUrl: "/portfolio/portfolio3.jpg",
    featured: true,
    order: 3,
    slug: "corporate-brand-redesign",
    published: true
  }
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("All");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        // Use publishedOnly=true to get only published projects
        const fetchedProjects = await getAllDocuments<PortfolioProject>(
          COLLECTIONS.PORTFOLIO,
          true,
          'order',
          'asc',
          100
        );
        
        if (fetchedProjects && fetchedProjects.length > 0) {
          // Sort by order
          const sortedProjects = fetchedProjects.sort((a, b) => (a.order || 0) - (b.order || 0));
          
          // Extract unique categories
          const uniqueCategories = ['All', ...new Set(sortedProjects.map(project => project.category))];
          setCategories(uniqueCategories);
          setProjects(sortedProjects);
        } else {
          // If no published projects found, try getting all projects as a fallback
          const allProjects = await getAllDocuments<PortfolioProject>(
            COLLECTIONS.PORTFOLIO, 
            false, // Try including unpublished as last resort
            'order',
            'asc'
          );
          
          if (allProjects && allProjects.length > 0) {
            const uniqueCategories = ['All', ...new Set(allProjects.map(project => project.category))];
            setCategories(uniqueCategories);
            setProjects(allProjects);
          } else {
            setProjects([]);
            setError("No portfolio projects available at the moment.");
          }
        }
      } catch (err) {
        setError("Failed to load portfolio projects. Please try again later.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
      
        <main className="w-full max-w-7xl mx-auto pt-28 px-4 pb-16 flex flex-col items-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Portfolio
          </motion.h1>
          
          <motion.p 
            className="text-lg text-[var(--foreground)] opacity-90 max-w-3xl text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our latest projects and see how we've helped businesses transform their digital presence. 
            Each project represents our commitment to excellence and delivering measurable results.
          </motion.p>

          {error && (
            <motion.div 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-full max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Filter Buttons */}
          {categories.length > 1 && (
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    filter === category 
                      ? "bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white font-bold" 
                      : "bg-[var(--card-bg)] text-[var(--foreground)] opacity-80 hover:bg-[var(--border-color)]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}

          {filteredProjects.length === 0 && !loading && (
            <motion.div 
              className="w-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-[var(--foreground)]">No projects found in this category.</h3>
              <p className="mt-2 text-[var(--foreground)] opacity-70">
                {projects.length === 0 
                  ? "There are no portfolio projects in the database. Please add some through the admin panel."
                  : "Please try another category or check back later."
                }
              </p>
            </motion.div>
          )}
        </main>
        
        <Footer />
      </div>
    </PageLoadWrapper>
  );
}

interface ProjectCardProps {
  project: PortfolioProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  // Get color based on category or default
  const colorClass = categoryColors[project.category] || 'from-violet-500 to-purple-400';
  
  return (
    <Link href={`/portfolio/${project.slug || project.id}`} className="block">
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
      >
        <div className="h-60 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-20`}></div>
          {/* If image data exists and it looks like a base64 string, display it */}
          {(project.imageUrl && project.imageUrl.startsWith('data:')) ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, show gradient
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                // Add gradient as fallback
                const parent = target.parentElement;
                if (parent) {
                  parent.className = `h-full w-full flex items-center justify-center bg-gradient-to-br ${colorClass}`;
                  parent.innerHTML = `<span class="text-white font-medium">${project.title}</span>`;
                }
              }}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colorClass}`}>
              <span className="text-white font-medium">{project.title}</span>
            </div>
          )}
          
          {project.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white text-xs font-bold py-1 px-3 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${colorClass} text-white`}>
              {project.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{project.title}</h3>
          <p className="text-[var(--foreground)] opacity-75 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--foreground)] opacity-60">
              {project.client || 'Client name'}
            </span>
            
            <div 
              className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] flex items-center"
            >
              View Details
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
