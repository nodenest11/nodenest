'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoadWrapper from '@/components/PageLoadWrapper';
import { PortfolioProject, COLLECTIONS, getAllDocuments } from '@/lib/firebase';

export default function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getAllDocuments("portfolio");
        
        // Find the project by slug or id
        const foundProject = projects.find(
          (p) => p.slug === slug || p.id === slug
        );
        
        if (foundProject) {
          setProject(foundProject);
          setLoading(false);
        } else {
          setError('Portfolio project not found');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to load portfolio project. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <PageLoadWrapper>
        <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto min-h-[60vh]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[var(--primary-gradient-from)] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[var(--foreground)]/70">Loading project...</p>
            </div>
          </main>
          <Footer />
        </div>
      </PageLoadWrapper>
    );
  }

  if (error || !project) {
    return (
      <PageLoadWrapper>
        <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Project not found</h1>
            <p className="mt-4 text-[var(--foreground)]/70">The portfolio project you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/portfolio" 
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
            >
              Back to Portfolio
            </Link>
          </main>
          <Footer />
        </div>
      </PageLoadWrapper>
    );
  }

  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-32 gap-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            className="w-full max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)] mb-6 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all projects
            </Link>
            
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full glass-effect border border-[var(--primary-gradient-from)]/30 text-[var(--foreground)]">
                {project.category}
              </span>
              <span className="ml-4 text-[var(--foreground)]/60 text-sm">{project.client}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-[var(--foreground)]/80 mb-8">
              {project.description}
            </p>
            
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12">
              {(project.imageUrl && project.imageUrl.startsWith('data:')) ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/portfolio/default-project.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">{project.title}</span>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Project Details */}
          <motion.div 
            className="w-full max-w-3xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-effect rounded-xl p-6 border border-[var(--border-color)]">
              <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Client</h3>
              <p className="text-[var(--foreground)]/80">{project.client || 'N/A'}</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 border border-[var(--border-color)]">
              <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Technologies</h3>
              <p className="text-[var(--foreground)]/80">{project.tags?.join(', ') || 'N/A'}</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 border border-[var(--border-color)]">
              <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Website</h3>
              {project.websiteUrl ? (
                <a 
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-gradient-from)] hover:underline"
                >
                  Visit Website
                </a>
              ) : (
                <p className="text-[var(--foreground)]/80">N/A</p>
              )}
            </div>
          </motion.div>
          
          {/* Challenge, Solution, Results */}
          <motion.div 
            className="w-full max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.challenge && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">The Challenge</h2>
                <p className="text-[var(--foreground)]/80 leading-relaxed">{project.challenge}</p>
              </div>
            )}
            
            {project.solution && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Our Solution</h2>
                <p className="text-[var(--foreground)]/80 leading-relaxed">{project.solution}</p>
              </div>
            )}
            
            {project.results && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">The Results</h2>
                <p className="text-[var(--foreground)]/80 leading-relaxed">{project.results}</p>
              </div>
            )}
          </motion.div>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div 
              className="w-full max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-full glass-effect border border-[var(--border-color)] text-[var(--foreground)]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div 
              className="w-full max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-[var(--foreground)]">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link 
                    key={relatedProject.id}
                    href={`/portfolio/${relatedProject.slug}`}
                    className="block group"
                  >
                    <div className="glass-effect rounded-xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300 h-full">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={relatedProject.imageUrl} 
                          alt={relatedProject.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--primary-gradient-from)] transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground)]/60">
                          {relatedProject.client}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Project Gallery - Moved to bottom */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <motion.div 
              className="w-full max-w-7xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">Project Gallery</h2>
                <div className="bg-[var(--card-bg)]/80 px-4 py-2 rounded-full">
                  <span className="text-sm">{project.galleryImages.length} image{project.galleryImages.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative rounded-xl overflow-hidden border border-[var(--border-color)]/30 group aspect-[4/3]"
                    onClick={() => setSelectedGalleryImage(image)}
                  >
                    {(image && image.startsWith('data:')) ? (
                      <img 
                        src={image} 
                        alt={`${project.title} gallery image ${index + 1}`} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/portfolio/default-project.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-sm">Image {index + 1}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Image Lightbox */}
          {selectedGalleryImage && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <div className="relative max-w-5xl max-h-[90vh]">
                <img 
                  src={selectedGalleryImage} 
                  alt="Gallery image fullscreen view" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedGalleryImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
} 