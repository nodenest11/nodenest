"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  getAllDocuments, 
  COLLECTIONS, 
  SORT_FIELDS,
  deleteDocument
} from "@/lib/firebase/firestoreUtils";
import { BlogPost } from "@/lib/firebase/contentTypes";
// AI content assistant removed to fix errors

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  // AI modal state removed to fix errors
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Extract categories from blog posts
  useEffect(() => {
    if (blogPosts.length > 0) {
      const uniqueCategories = Array.from(
        new Set(blogPosts.map((post) => post.category))
      );
      setCategories(uniqueCategories);
    }
  }, [blogPosts]);

  // Fetch blog posts from Firebase
  const fetchBlogPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const posts = await getAllDocuments<BlogPost>(
        COLLECTIONS.BLOG,
        false,
        SORT_FIELDS.DATE,
        "desc"
      );
      setBlogPosts(posts);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to fetch blog posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await deleteDocument(COLLECTIONS.BLOG, postToDelete);
      setBlogPosts(prevPosts => 
        prevPosts.filter(post => post.id !== postToDelete)
      );
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post. Please try again.");
    }
  };

  // Redirect to create new post
  const handleNewPost = () => {
    // Navigate to new post page
    window.location.href = `/admin/blog/new`;
  };

  // Calculate read time from content
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Filter and sort blog posts
  const filteredPosts = blogPosts
    .filter((post) => {
      // Filter by search term
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === "all" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected field
      let aValue, bValue;
      
      switch (sortBy) {
        case "title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "author":
          aValue = a.author;
          bValue = b.author;
          break;
        case "category":
          aValue = a.category;
          bValue = b.category;
          break;
        case "date":
        default:
          aValue = a.date || "";
          bValue = b.date || "";
          break;
      }
      
      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Default return for any other case
      return 0;
    });

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Blog Management</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Manage your blog posts
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2 admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Write New Post
          </Link>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={`${sortBy}-${sortDirection}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("-");
              setSortBy(field);
              setSortDirection(direction as "asc" | "desc");
            }}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="author-asc">Author (A-Z)</option>
            <option value="author-desc">Author (Z-A)</option>
            <option value="category-asc">Category (A-Z)</option>
            <option value="category-desc">Category (Z-A)</option>
          </select>
        </div>
          </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Blog Posts */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="admin-spinner"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-4">Image</th>
                    <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Author</th>
                    <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--background)]/30 transition-colors admin-table-row"
                  >
                    <td className="p-4">
                      {post.ogImage ? (
                        <img
                          src={post.ogImage}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-[var(--background)] rounded-md flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-[var(--border-color)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div>
                        {post.title}
                        <div className="text-xs opacity-70 mt-1">
                          {post.readTime || calculateReadTime(post.content)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{post.author}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)] text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">{formatDate(post.date)}</td>
                      <td className="p-4">
                      {post.published ? (
                        <span className="admin-badge admin-badge-success">
                            Published
                          </span>
                        ) : (
                        <span className="admin-badge admin-badge-secondary">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="text-[var(--accent-color)] hover:underline admin-tooltip"
                          data-tooltip="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                          <button 
                          onClick={() => {
                            setPostToDelete(post.id || null);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-[var(--error-color)] hover:underline admin-tooltip"
                          data-tooltip="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                            </svg>
                          </button>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-[var(--foreground)] hover:underline admin-tooltip"
                          data-tooltip="View"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                            </svg>
                        </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      ) : (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] p-8 text-center glass-effect">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-[var(--border-color)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
                    </svg>
          <h3 className="text-xl font-medium mt-4">No blog posts found</h3>
          <p className="text-sm opacity-70 mt-2">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your filters"
              : "Get started by writing your first blog post"}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/blog/new"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all inline-flex items-center gap-2 admin-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Write New Post
            </Link>
                  </div>
                </div>
      )}

      {/* AI Content Assistant Modal removed to fix errors */}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-[var(--border-color)] glass-effect">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete this blog post? This action
                cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-[var(--border-color)] flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--background)]/50 transition-all"
              >
                Cancel
              </button>
                      <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-md bg-[var(--error-color)] text-white hover:opacity-90 transition-all"
                      >
                Delete
                      </button>
                  </div>
                </div>
        </div>
      )}
    </div>
  );
} 