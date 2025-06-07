"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getDocumentById,
  updateDocument, 
  COLLECTIONS 
} from "@/lib/firebase/firestoreUtils";
import { BlogPost } from "@/lib/firebase/contentTypes";
import { uploadBlogImage } from "@/lib/firebase/clientStorage";
import AIContentAssistant from "@/components/admin/AIContentAssistant";
import dynamic from 'next/dynamic';
import { toast } from "react-hot-toast";

const GeminiHelper = dynamic(() => import('@/components/GeminiHelper'), { ssr: false });

export default function BlogEditClient({ postId }: { postId: string }) {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    slug: "",
    excerpt: "",
    category: "Technology",
    date: new Date().toISOString().split("T")[0],
    ogImage: "",
    tags: [],
    published: false
  });
  
  // Form operation state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  // Image handling state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // AI Content Assistant state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  // Fetch the blog post data
  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const post = await getDocumentById<BlogPost>(COLLECTIONS.BLOG, postId);
        if (post) {
          setFormData({
            ...post,
            tags: post.tags || []
          });
          
          // Set image preview if there's an image
          if (post.ogImage) {
            setImagePreview(post.ogImage);
          }
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBlogPost();
  }, [postId]);
  
  // Helper function to generate a slug from a string
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-")     // Replace spaces with hyphens
      .replace(/-+/g, "-");     // Remove consecutive hyphens
  };
  
  // Generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setFormData({ ...formData, title, slug });
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // Add a tag
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag]
      });
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Create a FileReader to get base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, ogImage: base64String }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError("Failed to process image. Please try a different file.");
    }
  };
  
  // Remove image
  const removeImage = () => {
    if (imagePreview && imageFile) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, ogImage: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.content || !formData.category) {
        throw new Error("Please fill in all required fields");
      }

      let imageUrl = formData.ogImage || "";

      // Upload image to Firebase Storage if there is a new one
      if (imageFile) {
        try {
          imageUrl = await uploadBlogImage(imageFile);
        } catch (uploadError) {
          setError("Failed to upload image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Update document in Firebase
      const success = await updateDocument<BlogPost>(
        COLLECTIONS.BLOG,
        postId,
        {
          ...formData,
          ogImage: imageUrl
        } as Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>
      );

      if (!success) {
        throw new Error("Failed to update blog post");
      }

      toast.success("Blog post updated successfully!");

      // Redirect to blog list
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle AI content generation
  const handleAIGeneratedContent = (content: string) => {
    setFormData({ ...formData, content });
    setIsAIModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--background)] p-4">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Blog Post</h1>
          <div className="flex space-x-3">
            <GeminiHelper 
              contentType="blog" 
              buttonText="AI Writer"
              onGeneratedContent={(content) => {
                if (content) {
                  setFormData({
                    ...formData,
                    title: content.title || formData.title,
                    content: content.content || formData.content,
                    slug: content.slug || formData.slug,
                    excerpt: content.excerpt || formData.excerpt,
                    category: content.category || formData.category,
                    tags: content.tags || formData.tags,
                  });
                }
              }}
            />
            <Link href="/admin/blog" className="px-4 py-2 rounded-lg bg-[var(--card-bg)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors border border-[var(--border-color)]">
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white rounded-lg shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}
      
      {/* Blog post form */}
      <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              />
            </div>
            
            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              />
            </div>
          </div>
          
          {/* Excerpt */}
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt <span className="text-[var(--error-color)]">*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content <span className="text-[var(--error-color)]">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={12}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
            <p className="text-xs mt-2 opacity-70">
              Content supports Markdown formatting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Tutorials">Tutorials</option>
                <option value="News">News</option>
                <option value="Case Study">Case Study</option>
              </select>
            </div>
            
            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-2">
                Author <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              />
            </div>
            
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Publication Date <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              />
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag) => (
                <div
                  key={tag}
                  className="bg-[var(--background)] px-3 py-1 rounded-full flex items-center gap-2 border border-[var(--border-color)]"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-[var(--foreground)] hover:text-[var(--error-color)] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags, press Enter or comma to add"
                className="flex-1 p-3 rounded-l-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 rounded-r-md bg-[var(--accent-color)] text-white hover:opacity-90 transition-all"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="image-upload"
                  className="w-full p-8 border-2 border-dashed border-[var(--border-color)] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent-color)] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm">Click to upload or drag and drop</span>
                  <span className="text-xs mt-1 opacity-70">PNG, JPG or WEBP (max 5MB)</span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {imagePreview && (
                <div className="relative w-32 h-32">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border border-[var(--border-color)]"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-[var(--error-color)] text-white rounded-full p-1 hover:opacity-90 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Published status */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
              />
              <label htmlFor="published" className="ml-2 block text-sm">
                Publish this post
              </label>
            </div>
            <p className="text-xs mt-1 opacity-70">
              When unchecked, this post will be saved as a draft
            </p>
          </div>
        </form>
      </div>
      
      {/* AI Content Assistant */}
      {isAIModalOpen && (
        <AIContentAssistant
          contentType="blog"
          isOpen={true}
          onClose={() => setIsAIModalOpen(false)}
          onContentGenerated={handleAIGeneratedContent}
        />
      )}
    </div>
  );
} 