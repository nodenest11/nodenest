'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoadWrapper from '@/components/PageLoadWrapper';
import { BlogPost, COLLECTIONS, getSortedDocuments, SORT_FIELDS } from '@/lib/firebase';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getSortedDocuments<BlogPost>(
          COLLECTIONS.BLOG,
          true,
          [
            { field: SORT_FIELDS.FEATURED, direction: 'desc' },
            { field: SORT_FIELDS.DATE, direction: 'desc' }
          ],
          100
        );
        
        if (fetchedPosts.length > 0) {
          // Sort by date in descending order (newest first)
          const sortedPosts = fetchedPosts.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          
          // Set filtered posts to all posts initially
          setPosts(sortedPosts);
          setFilteredPosts(sortedPosts);
          setCategories(['All', ...new Set(sortedPosts.map(post => post.category))]);
        } else {
          setPosts([]);
          setFilteredPosts([]);
        }
      } catch (error) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Filter posts by category
  const filteredPostsByCategory = activeCategory === 'all' 
    ? filteredPosts 
    : filteredPosts.filter(post => post.category === activeCategory);

  // Animation variants
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

  return (
    <PageLoadWrapper>
      <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center pt-32 gap-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full glass-effect border border-[var(--primary-gradient-from)]/30 text-[var(--foreground)] text-sm font-medium">
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] via-[#00bfff] to-[var(--primary-gradient-to)] animate-gradient-x">
              Latest Insights & Articles
            </h1>
            <p className="text-lg text-[var(--foreground)]/70 max-w-3xl mx-auto">
              Stay up to date with the latest trends, insights, and news in technology, design, and development.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white shadow-lg'
                  : 'glass-effect border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white shadow-lg'
                    : 'glass-effect border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-red-500 max-w-xl mx-auto">
              {error}
            </div>
          ) : filteredPostsByCategory.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">No posts found</h3>
              <p className="text-[var(--foreground)]/70 mt-2">
                {activeCategory === 'all' 
                  ? 'There are no blog posts available at the moment.'
                  : `There are no posts in the "${activeCategory}" category.`}
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPostsByCategory.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="blog-card glass-effect rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300 h-full flex flex-col"
                >
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <div className="relative h-48 overflow-hidden">
                      {(post.image || post.imageUrl) ? (
                        <img
                          src={post.image || post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/30 to-[var(--primary-gradient-to)]/30"></div>
                      )}
                      
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-[var(--card-bg)]/80 backdrop-blur-sm text-[var(--foreground)] border border-[var(--border-color)]">
                          {post.category}
                        </span>
                      </div>
                      {post.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4 flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)] group-hover:text-[var(--primary-gradient-from)] transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-[var(--foreground)]/70 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="pt-4 flex items-center justify-between border-t border-[var(--border-color)]">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]">
                            {post.authorImage ? (
                              <img
                                src={post.authorImage}
                                alt={post.author || 'Author'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/30 to-[var(--primary-gradient-to)]/30 flex items-center justify-center">
                                {post.author ? post.author.charAt(0) : 'A'}
                              </div>
                            )}
                          </div>
                          <div className="ml-2">
                            <p className="text-xs font-medium text-[var(--foreground)]">
                              {post.author || 'Anonymous'}
                            </p>
                            <p className="text-xs text-[var(--foreground)]/60">
                              {post.date} {post.readTime ? `· ${post.readTime}` : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-[var(--primary-gradient-from)] group-hover:translate-x-1 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
} 