"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  addDocument, 
  COLLECTIONS 
} from "@/lib/firebase/firestoreUtils";
import { BlogPost } from "@/lib/firebase/contentTypes";
import { uploadBlogImage } from "@/lib/firebase/clientStorage";
import dynamic from 'next/dynamic';
import { toast } from "react-hot-toast";

const GeminiHelper = dynamic(() => import('@/components/GeminiHelper'), { ssr: false });

export default function NewBlogPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form state
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: searchParams?.get("title") || "",
    content: "",
    slug: "",
    excerpt: searchParams?.get("excerpt") || "",
    category: "web-development",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: "Admin",
    authorRole: "Content Writer",
    authorImage: "/team/default-avatar.jpg",
    image: "/blog/default-post.jpg",
    imageUrl: "/blog/default-post.jpg",
    readTime: "2 min read",
    tags: [],
    featured: false,
    published: false
  });
  
  // Form operation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  // Image handling state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
  
  // Initialize slug from title in URL params if present
  useEffect(() => {
    if (searchParams?.get("title") && !formData.slug) {
      const slug = generateSlug(searchParams.get("title") || "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, []);

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
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setImageFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Set a placeholder for the image URL until it's uploaded
    setFormData({ ...formData, image: "placeholder-url", imageUrl: "placeholder-url" });
  };
  
  // Remove image
  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: "" });
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

      let imageUrl = "";

      // Upload image to Firestore if there is one
      if (imageFile) {
        try {
          console.log("Uploading blog image to Firestore...");
          imageUrl = await uploadBlogImage(imageFile);
          console.log("Uploaded image base64 string length:", imageUrl.length);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          setError("Failed to upload image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Add document to Firebase
      const docId = await addDocument<BlogPost>(
        COLLECTIONS.BLOG,
        {
          ...formData,
          image: imageUrl || formData.image || "",
          imageUrl: imageUrl || formData.imageUrl || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Omit<BlogPost, "id" | "createdAt" | "updatedAt">
      );

      if (!docId) {
        throw new Error("Failed to create blog post");
      }

      toast.success('Blog post created successfully!');

      // Redirect to blog list
      router.push("/admin/blog");
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast.error('Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--background)] p-4">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Create New Blog Post</h1>
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
                  Publishing...
                </>
              ) : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 text-sm bg-[rgba(var(--error-color-rgb),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Basic Info Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                  required
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                />
                <p className="text-xs opacity-70 mt-1">
                  Auto-generated from title. This will be used in the URL.
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Excerpt <span className="text-[var(--error-color)]">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                  rows={2}
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  A short summary that appears in blog listings.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="seo">SEO</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                  />
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Blog Content</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content <span className="text-[var(--error-color)]">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                  rows={12}
                  required
                />
              </div>
            </div>
            
            {/* Image Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Featured Image</h2>
                <label className="cursor-pointer px-3 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--background)]/50 transition-all flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              {imagePreview ? (
                <div className="relative">
                  <div className="aspect-video bg-[var(--background)] rounded-md overflow-hidden border border-[var(--border-color)]">
                    <img 
                      src={imagePreview} 
                      alt="Blog featured image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-md p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[var(--muted-foreground)]">
                    Click "Add Image" to upload a featured image
                  </p>
                </div>
              )}
            </div>
            
            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-1 mb-2">
                {formData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-[var(--accent-color)] hover:text-[var(--accent-color-hover)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags (press Enter)"
                  className="flex-1 p-2 text-sm rounded-l-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 text-sm rounded-r-md bg-[var(--background)] border-y border-r border-[var(--border-color)] hover:bg-[var(--background)]/50 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Settings Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="rounded border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                  />
                  <span className="ml-2 text-sm">Published</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
