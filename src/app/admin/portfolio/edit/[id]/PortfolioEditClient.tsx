"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  getDocumentById, 
  updateDocument, 
  COLLECTIONS 
} from "@/lib/firebase/firestoreUtils";
import { PortfolioProject } from "@/lib/firebase/contentTypes";
import AIContentAssistant from "@/components/admin/AIContentAssistant";
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { uploadPortfolioImages } from "@/lib/firebase/clientStorage";

const GeminiHelper = dynamic(() => import('@/components/GeminiHelper'), { ssr: false });

interface PortfolioEditClientProps {
  portfolioId: string;
}

export default function PortfolioEditClient({ portfolioId }: PortfolioEditClientProps) {
  const router = useRouter();
  
  // Initialize with all fields to avoid controlled/uncontrolled switch
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: "",
    description: "",
    client: "",
    category: "",
    tags: [],
    imageUrl: "",
    galleryImages: [],
    challenge: "",
    solution: "",
    results: "",
    featured: false,
    order: 0,
    slug: "",
    date: "",
    published: false,
    testimonial: "",
    websiteUrl: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
    imageAlt: ""
  });
  
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAIAvailable, setIsAIAvailable] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch portfolio item data
  useEffect(() => {
    async function fetchPortfolioItem() {
      setIsLoading(true);
      setError(null);

      try {
        const item = await getDocumentById<PortfolioProject>(COLLECTIONS.PORTFOLIO, portfolioId);
        
        if (!item) {
          throw new Error("Portfolio item not found");
        }
        
        // Ensure all expected fields are present
        setFormData(prevData => ({
          ...prevData,
          ...item
        }));
        
        if (item.imageUrl) {
          setPreviewImage(item.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching portfolio item:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolioItem();
    setIsAIAvailable(true);
  }, [portfolioId]);

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, formData.slug]);

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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 and set in state
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Apply compression to stay under Firestore limits
          const isCompressibleImage = file.type.startsWith('image/') && 
                                    (file.type === 'image/jpeg' || 
                                      file.type === 'image/png' || 
                                      file.type === 'image/webp');
          
          let base64String = reader.result as string;
          
          // If it's an image, compress it before storing
          if (isCompressibleImage) {
            // Use the uploadPortfolioImages function which applies aggressive compression
            const compressedImages = await uploadPortfolioImages([file]);
            base64String = compressedImages[0];
          }
          
          setPreviewImage(base64String);
          setFormData(prev => ({ ...prev, imageUrl: base64String }));
        } catch (error) {
          console.error("Error compressing image:", error);
          // Fall back to the original image if compression fails
          setPreviewImage(reader.result as string);
          setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.client || !formData.category) {
        throw new Error("Please fill in all required fields");
      }

      // Update document in Firebase
      const success = await updateDocument<PortfolioProject>(
        COLLECTIONS.PORTFOLIO,
        portfolioId,
        formData as Partial<Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">>
      );

      if (!success) {
        throw new Error("Failed to update portfolio item");
      }

      // Redirect to portfolio list
      router.push("/admin/portfolio");
    } catch (err) {
      console.error("Error updating portfolio item:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle AI generated content
  const handleAIGeneratedContent = (content: Partial<PortfolioProject>) => {
    setFormData(prev => ({
      ...prev,
      ...content,
      // Preserve existing values not provided by AI
      id: prev.id,
      imageUrl: prev.imageUrl || content.imageUrl || "",
      galleryImages: prev.galleryImages || content.galleryImages || [],
      date: prev.date || content.date || new Date().toISOString().split("T")[0]
    }));
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--background)] p-4">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Portfolio Project</h1>
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
      
      {/* Portfolio form */}
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
                onChange={handleInputChange}
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
          
          {/* Client */}
          <div className="mb-6">
            <label htmlFor="client" className="block text-sm font-medium mb-2">
              Client <span className="text-[var(--error-color)]">*</span>
            </label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description <span className="text-[var(--error-color)]">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Branding">Branding</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Enterprise Software">Enterprise Software</option>
              </select>
            </div>
            
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Completion Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
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
              Main Thumbnail Image <span className="text-[var(--error-color)]">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="image-upload"
                  className="w-full p-6 border-2 border-dashed border-[var(--border-color)] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent-color)] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm">Upload main thumbnail</span>
                  <span className="text-xs mt-1 opacity-70">This will be the main image shown in listings</span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {previewImage && (
                <div className="relative w-32 h-32">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border border-[var(--border-color)]"
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

          {/* Gallery Images Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium">
                Gallery Images
              </label>
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
                    
                    // Process each file to create base64 previews
                    Array.from(files).forEach(async (file) => {
                      try {
                        // Apply compression to stay under Firestore limits
                        const compressedImages = await uploadPortfolioImages([file]);
                        const base64String = compressedImages[0];
                        
                        if (base64String) {
                          setFormData(prev => ({
                            ...prev,
                            galleryImages: [...(prev.galleryImages || []), base64String]
                          }));
                        }
                      } catch (error) {
                        console.error("Error processing gallery image:", error);
                      }
                    });
                  }}
                  className="hidden"
                />
              </label>
            </div>
            
            {formData.galleryImages && formData.galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video bg-[var(--background)] rounded-md overflow-hidden border border-[var(--border-color)]">
                      <img 
                        src={image} 
                        alt={`Project gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
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
                <p className="text-[var(--muted-foreground)]">
                  No gallery images added yet. Click "Add Gallery Images" to upload.
                </p>
              </div>
            )}
          </div>
          
          {/* Challenge */}
          <div className="mb-6">
            <label htmlFor="challenge" className="block text-sm font-medium mb-2">
              Challenge
            </label>
            <textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          {/* Solution */}
          <div className="mb-6">
            <label htmlFor="solution" className="block text-sm font-medium mb-2">
              Solution
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <label htmlFor="results" className="block text-sm font-medium mb-2">
              Results
            </label>
            <textarea
              id="results"
              name="results"
              value={formData.results}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all admin-input"
            />
          </div>
          
          {/* Featured & Published status */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                />
                <label htmlFor="featured" className="ml-2 block text-sm">
                  Featured project
                </label>
              </div>
              <p className="text-xs mt-1 opacity-70">
                Featured projects are highlighted on the homepage
              </p>
            </div>
            
            <div>
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
                  Published
                </label>
              </div>
              <p className="text-xs mt-1 opacity-70">
                Published projects are visible on the website
              </p>
            </div>
          </div>
        </form>
      </div>
      
      {/* AI Content Assistant Modal */}
      {isAIModalOpen && (
        <AIContentAssistant
          contentType="portfolio"
          isOpen={true}
          onClose={() => setIsAIModalOpen(false)}
          onContentGenerated={handleAIGeneratedContent}
        />
      )}
    </div>
  );
} 