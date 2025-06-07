'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost, COLLECTIONS, getSortedDocuments } from '@/lib/firebase';

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get posts sorted by date (newest first)
        const fetchedPosts = await getSortedDocuments<BlogPost>(
          COLLECTIONS.BLOG, 
          true, // published only
          [{ field: 'date', direction: 'desc' }],
          4 // limit to 4 posts
        );
        
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          // Use fallback data if no posts found
          setPosts(fallbackPosts);
        }
      } catch (error) {
        // Use fallback data on error
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fallback posts if none are found in Firestore
  const fallbackPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Web Development in 2024",
      excerpt: "Discover the latest trends and technologies shaping the web development landscape in 2024.",
      content: "# The Future of Web Development in 2024\n\nWeb development is constantly evolving...",
      date: "2024-05-15",
      author: "Jane Smith",
      authorRole: "Lead Developer",
      authorImage: "/team/jane-smith.jpg",
      category: "Technology",
      tags: ["Web Development", "React", "AI", "Performance"],
      readTime: "5 min",
      image: "/blog/web-dev-2024.jpg",
      featured: true,
      slug: "future-of-web-development-2024",
      published: true
    },
    {
      id: "2",
      title: "Optimizing React Applications for Performance",
      excerpt: "Learn how to enhance your React application's performance with these proven strategies.",
      content: "# Optimizing React Applications for Performance\n\nPerformance optimization is a critical aspect...",
      date: "2024-05-08",
      author: "Michael Johnson",
      authorRole: "Frontend Specialist",
      authorImage: "/team/michael-johnson.jpg",
      category: "Development",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      readTime: "7 min",
      image: "/blog/react-performance.jpg",
      featured: true,
      slug: "optimizing-react-applications-performance",
      published: true
    },
    {
      id: "3",
      title: "The Role of AI in Modern Web Design",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we approach web design.",
      content: "# The Role of AI in Modern Web Design\n\nArtificial intelligence has become an integral part...",
      date: "2024-04-30",
      author: "Sarah Chen",
      authorRole: "UX Designer",
      authorImage: "/team/sarah-chen.jpg",
      category: "Design",
      tags: ["AI", "UX/UI", "Design", "Innovation"],
      readTime: "6 min",
      image: "/blog/ai-web-design.jpg",
      featured: false,
      slug: "role-of-ai-in-modern-web-design",
      published: true
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">Latest Insights</span>
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-gradient-from)]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-0 w-96 h-96 bg-[var(--secondary-color)]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-0 w-72 h-72 bg-[var(--primary-gradient-from)]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Section header */}
      <motion.div 
        className="relative z-10 text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm bg-[var(--card-bg)]/70 text-[var(--secondary-color)] border border-[var(--secondary-color)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--secondary-color)] mr-2"></span>
          Our Blog
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)]">
            Latest Insights & Articles
          </span>
        </h2>
        
        <p className="text-base md:text-lg text-[var(--foreground)]/80 mb-4">
          Discover expert perspectives on technology, design, and industry trends to stay ahead of the curve.
        </p>
      </motion.div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-red-500 max-w-xl mx-auto">
          {error}
        </div>
      )}
      
      {/* Featured blog post - if available */}
      {posts.length > 0 && posts[0].featured && (
        <motion.div
          className="relative z-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r p-[1px] from-[var(--primary-gradient-from)] via-[var(--primary-gradient-to)] to-[var(--primary-gradient-from)] rounded-2xl">
            <div className="bg-[var(--card-bg)]/60 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Image */}
                <div className="h-64 md:h-full relative overflow-hidden">
                  {posts[0].image ? (
                    <img
                      src={posts[0].image}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/30 to-[var(--primary-gradient-to)]/20"></div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-[var(--primary-gradient-from)] shadow-sm">
                      Featured
                    </span>
                  </div>
                </div>
                
                {/* Right: Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4 space-x-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--primary-gradient-from)]/10 text-[var(--primary-gradient-from)] border border-[var(--primary-gradient-from)]/20">
                      {posts[0].category}
                    </span>
                    <span className="text-xs text-[var(--foreground)]/60">
                      {posts[0].readTime} read
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">
                    {posts[0].title}
                  </h3>
                  
                  <p className="text-[var(--foreground)]/70 mb-6 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)]/30">
                        {posts[0].authorImage ? (
                          <img
                            src={posts[0].authorImage}
                            alt={posts[0].author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/30 to-[var(--primary-gradient-to)]/30 flex items-center justify-center text-[var(--foreground)]">
                            {posts[0].author.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-[var(--foreground)]">{posts[0].author}</p>
                        <p className="text-xs text-[var(--foreground)]/60">{posts[0].date}</p>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${posts[0].slug}`}
                      className="inline-flex items-center group"
                    >
                      <span className="mr-2 text-sm font-medium text-[var(--primary-gradient-from)]">Read Article</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--primary-gradient-from)]/10 group-hover:bg-[var(--primary-gradient-from)]/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary-gradient-from)] group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Blog post grid - show remaining posts */}
      <motion.div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.slice(posts[0]?.featured ? 1 : 0).map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            className="group h-full"
          >
            <div className="bg-[var(--card-bg)]/40 backdrop-blur-sm rounded-xl overflow-hidden border border-[var(--border-color)]/30 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-2">
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/20 to-[var(--primary-gradient-to)]/20"></div>
                  )}
                  
                  <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--card-bg)]/80 backdrop-blur-sm text-[var(--foreground)]/80 border border-[var(--border-color)]/30">
                      {post.category}
                    </span>
                    
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-[var(--card-bg)]/80 backdrop-blur-sm text-[var(--foreground)]/60 border border-[var(--border-color)]/30">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-bold mb-3 text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--primary-gradient-from)] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-[var(--foreground)]/70 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-[var(--border-color)]/20">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]/30 bg-[var(--card-bg)]/70">
                        {post.authorImage ? (
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[var(--primary-gradient-from)]/30 to-[var(--primary-gradient-to)]/30 flex items-center justify-center text-xs text-[var(--foreground)]">
                            {post.author.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium text-[var(--foreground)]">
                          {post.author}
                        </p>
                        <p className="text-xs text-[var(--foreground)]/60">
                          {post.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--card-bg)]/70 border border-[var(--border-color)]/30 text-[var(--primary-gradient-from)] group-hover:bg-[var(--primary-gradient-from)]/10 group-hover:border-[var(--primary-gradient-from)]/30 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* View all button */}
      <motion.div 
        className="relative z-10 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link 
          href="/blog" 
          className="relative inline-flex group"
        >
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] opacity-60 blur-md group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative px-8 py-3.5 rounded-lg bg-[var(--card-bg)] font-medium border border-[var(--primary-gradient-from)]/30 group-hover:border-[var(--primary-gradient-from)]/50 transition-all duration-500">
            <span className="relative z-10 flex items-center">
              <span className="text-[var(--primary-gradient-from)]">
                View All Articles
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[var(--primary-gradient-from)] group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
} 