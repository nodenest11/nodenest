'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoadWrapper from '@/components/PageLoadWrapper';
import { BlogPost, COLLECTIONS, getAllDocuments } from '@/lib/firebase';
import { marked } from 'marked';

// Function to convert markdown to HTML
function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // First try to get published posts only
        const allPosts = await getAllDocuments<BlogPost>(
          COLLECTIONS.BLOG,
          true // Only published
        );
        
        // Find the post with the matching slug
        const currentPost = allPosts.find(post => post.slug === slug);
        
        if (currentPost) {
          setPost(currentPost);
          
          // Find related posts (same category, excluding current post)
          const related = allPosts
            .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
            .slice(0, 3);
          
          setRelatedPosts(related);
        } else {
          // If not found with slug, try with ID as fallback
          const postById = allPosts.find(post => post.id === slug);
          
          if (postById) {
            setPost(postById);
            
            // Find related posts
            const related = allPosts
              .filter(p => p.category === postById.category && p.id !== postById.id)
              .slice(0, 3);
            
            setRelatedPosts(related);
          } else {
            // Try fetching unpublished posts as last resort
            const allPostsIncludingDrafts = await getAllDocuments<BlogPost>(
              COLLECTIONS.BLOG,
              false // Include unpublished
            );
            
            const anyMatch = allPostsIncludingDrafts.find(
              p => p.slug === slug || p.id === slug
            );
            
            if (anyMatch) {
              setPost(anyMatch);
              
              // Find related posts
              const related = allPostsIncludingDrafts
                .filter(p => p.category === anyMatch.category && p.id !== anyMatch.id)
                .slice(0, 3);
              
              setRelatedPosts(related);
            } else {
              setError('Blog post not found');
            }
          }
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  // Default author image if not provided
  const authorImage = post?.authorImage || '/team/default-avatar.svg';
  const authorRole = post?.authorRole || 'Content Writer';

  if (loading) {
    return (
      <PageLoadWrapper>
        <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto min-h-[60vh]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[var(--primary-gradient-from)] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[var(--foreground)]/70">Loading blog post...</p>
            </div>
          </main>
          <Footer />
        </div>
      </PageLoadWrapper>
    );
  }

  if (error || !post) {
    return (
      <PageLoadWrapper>
        <div className="bg-[var(--background)] min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col items-center justify-center pt-32 px-4 max-w-7xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Post not found</h1>
            <p className="mt-4 text-[var(--foreground)]/70">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/blog" 
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-[var(--background)] font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,231,0.5)]"
            >
              Back to Blog
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
              href="/blog" 
              className="inline-flex items-center text-[var(--foreground)]/70 hover:text-[var(--primary-gradient-from)] mb-6 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all articles
            </Link>
            
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full glass-effect border border-[var(--primary-gradient-from)]/30 text-[var(--foreground)]">
                {post.category}
              </span>
              <span className="ml-4 text-[var(--foreground)]/60 text-sm">{post.date} · {post.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-[var(--foreground)]/80 mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary-gradient-from)]">
                <img 
                  src={authorImage} 
                  alt={post.author} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/team/default-avatar.svg';
                  }}
                />
              </div>
              <div className="ml-4">
                <p className="font-medium text-[var(--foreground)]">{post.author}</p>
                <p className="text-sm text-[var(--foreground)]/60">{authorRole}</p>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/1200x600?text=Blog+Image';
                }}
              />
            </div>
          </motion.div>
          
          {/* Article Content */}
          <motion.div 
            className="w-full max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div 
              className="prose prose-lg dark:prose-invert prose-headings:text-[var(--foreground)] prose-p:text-[var(--foreground)]/80 prose-a:text-[var(--primary-gradient-from)] prose-strong:text-[var(--foreground)] max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </motion.div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
              className="w-full max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
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
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              className="w-full max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-[var(--foreground)]">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="glass-effect rounded-xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--primary-gradient-from)]/50 transition-all duration-300 h-full">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--primary-gradient-from)] transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground)]/60">
                          {relatedPost.date} · {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
    </PageLoadWrapper>
  );
} 