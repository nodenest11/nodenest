"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  addDocument, 
  COLLECTIONS, 
  SORT_FIELDS 
} from "@/lib/firebase/firestoreUtils";
import { PortfolioProject } from "@/lib/firebase/contentTypes";
import { uploadPortfolioImages } from "@/lib/firebase/clientStorage";
import dynamic from 'next/dynamic';
import { toast } from "react-hot-toast";

const GeminiHelper = dynamic(() => import('@/components/GeminiHelper'), { ssr: false });

export default function NewPortfolioItem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Note: AI functionality has been removed
  
  // Form state - ensure all values are initialized properly
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: searchParams?.get("title") || "",
    description: searchParams?.get("description") || "",
    slug: "",
    client: "",
    category: "Web Development",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    galleryImages: [],
    challenge: "",
    solution: "",
    results: "",
    testimonial: "",
    websiteUrl: "",
    featured: false,
    published: false,
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
    imageAlt: "",
    order: 0
  });
  
  // Form operation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  // Image handling state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Helper function to generate a slug from a string
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-")     // Replace spaces with hyphens
      .replace(/-+/g, "-");     // Remove consecutive hyphens
  };

  // Generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  // Handle image upload - updated for multiple images
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert FileList to array and add to existing files
    const newFiles = Array.from(files);
    setImageFiles(prev => [...prev, ...newFiles]);
    
    // Create preview URLs for the new images
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Set the first image as the main image if none exists
    if (!previewImage && newPreviews.length > 0) {
      setPreviewImage(newPreviews[0]);
      // Store the actual preview URL rather than a placeholder
      setFormData(prev => ({ ...prev, imageUrl: newPreviews[0] }));
    }
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    // Remove from files
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    
    // Remove from previews
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    
    // Update main image if needed
    if (index === 0 && newPreviews.length > 0) {
      setPreviewImage(newPreviews[0]);
    } else if (newPreviews.length === 0) {
      setPreviewImage(null);
      setFormData(prev => ({ ...prev, imageUrl: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.category) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      // Generate slug if not provided
      if (!formData.slug) {
        const generatedSlug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
        formData.slug = generatedSlug;
      }
      
      // If there are images to upload
      if (previewImage || imageFiles.length > 0) {
        // Warning for large number of images
        if (imageFiles.length > 5) {
          toast.warning(`Uploading ${imageFiles.length} images may take a while and could exceed storage limits.`);
        }
        
        let imageUrl = formData.imageUrl || "";
        let galleryImages: string[] = formData.galleryImages || [];
        
        // Upload the main image if selected
        if (previewImage) {
          imageUrl = await uploadPortfolioImages([new File([previewImage], "main_image.jpg")]);
        }
        
        // Upload gallery images if any
        if (imageFiles.length > 0) {
          const galleryImageFiles = Array.from(imageFiles);
          const uploadedGalleryImages = await uploadPortfolioImages(galleryImageFiles);
          galleryImages = [...galleryImages, ...uploadedGalleryImages];
        }
        
        // Add the project to Firestore with image URLs
        await addDocument<PortfolioProject>(
          COLLECTIONS.PORTFOLIO,
          {
            ...formData,
            imageUrl,
            galleryImages,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Omit<PortfolioProject, "id">
        );
      } else {
        // Add the project to Firestore without images
        await addDocument<PortfolioProject>(
          COLLECTIONS.PORTFOLIO,
          {
            ...formData,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Omit<PortfolioProject, "id">
        );
      }
      
      toast.success("Portfolio project created successfully!");
      // Redirect to portfolio list
      router.push("/admin/portfolio");
    } catch (err) {
      setError("Failed to create portfolio project. Please try again.");
      toast.error("Failed to create portfolio project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--background)] p-4">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Create New Portfolio Item</h1>
          <div className="flex space-x-3">
            <GeminiHelper 
              contentType="portfolio"
              buttonText="AI Creator" 
              onGeneratedContent={(content) => {
                if (content) {
                  setFormData({
                    ...formData,
                    title: content.title || formData.title,
                    description: content.description || formData.description,
                    client: content.client || formData.client,
                    category: content.category || formData.category,
                    challenge: content.challenge || formData.challenge,
                    solution: content.solution || formData.solution,
                    results: content.results || formData.results,
                    tags: content.tags || formData.tags,
                    slug: content.slug || formData.slug,
                  });
                }
              }}
            />
            <Link href="/admin/portfolio" className="px-4 py-2 rounded-lg bg-[var(--card-bg)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors border border-[var(--border-color)]">
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
        <div className="mb-4 p-3 text-sm bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Client <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-[var(--error-color)]">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                  rows={3}
                  required
                />
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
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Branding">Branding</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                  />
                </div>
              </div>
            </div>
            
            {/* Project Content Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Project Content</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Challenge
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                  rows={3}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Solution
                </label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                  rows={3}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Results
                </label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                  rows={3}
                />
              </div>
            </div>
            
            {/* Images Section */}
            <div>
              <h2 className="text-lg font-semibold mb-6">Project Images</h2>
              
              {/* Main Thumbnail Image */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Main Thumbnail Image <span className="text-[var(--error-color)]">*</span></h3>
                <div className="flex items-center gap-4">
                  {/* Upload area */}
                  <div className="flex-1">
                    <label
                      htmlFor="thumbnail-upload"
                      className="w-full p-6 border-2 border-dashed border-[var(--border-color)] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary-gradient-from)]/50 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-[var(--text-color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[var(--text-color-secondary)]">
                        Upload thumbnail image
                      </p>
                      <p className="text-xs text-[var(--text-color-secondary)] mt-1">
                        This will be the main image shown in listings
                      </p>
                    </label>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        // Create a FileReader to get base64
                        const reader = new FileReader();
                        reader.onload = () => {
                          const base64String = reader.result as string;
                          setPreviewImage(base64String);
                          setFormData(prev => ({ ...prev, imageUrl: base64String }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Preview */}
                  {previewImage && (
                    <div className="relative w-32 h-32">
                      <img 
                        src={previewImage} 
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover rounded-md border border-[var(--border-color)]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, imageUrl: "" }));
                        }}
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

              {/* Gallery Images */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium">Gallery Images</h3>
                  <label className="cursor-pointer px-3 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--background)]/50 transition-all flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Gallery Images
                    <input
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files || files.length === 0) return;
                        
                        // Convert FileList to array
                        const fileArray = Array.from(files);
                        
                        // Process each file to create base64 previews
                        fileArray.forEach(file => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const base64String = reader.result as string;
                            setImagePreviews(prev => [...prev, base64String]);
                            setFormData(prev => ({
                              ...prev,
                              galleryImages: [...(prev.galleryImages || []), base64String]
                            }));
                          };
                          reader.readAsDataURL(file);
                        });
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {formData.galleryImages && formData.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.galleryImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-[var(--background)] rounded-md overflow-hidden border border-[var(--border-color)]">
                          <img 
                            src={image} 
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            // Remove from form data
                            setFormData(prev => ({
                              ...prev,
                              galleryImages: prev.galleryImages?.filter((_, i) => i !== index) || []
                            }));
                          }}
                          className="absolute top-1 right-1 bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[var(--border-color)] rounded-md p-6 text-center">
                    <p className="text-[var(--text-color-secondary)]">
                      No gallery images added yet
                    </p>
                    <p className="text-xs text-[var(--text-color-secondary)] mt-1">
                      Add images to create a gallery on the project page
                    </p>
                  </div>
                )}
              </div>
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
                  className="flex-1 p-2 text-sm rounded-l-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
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
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="rounded border-[var(--border-color)] text-[var(--primary-gradient-from)] focus:ring-[var(--primary-gradient-from)]"
                  />
                  <span className="ml-2 text-sm">Featured</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="rounded border-[var(--border-color)] text-[var(--primary-gradient-from)] focus:ring-[var(--primary-gradient-from)]"
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