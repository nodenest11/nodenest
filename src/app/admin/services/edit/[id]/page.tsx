"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ServiceService } from "@/lib/firebase/contentServices";
import { Service } from "@/lib/firebase/contentTypes";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from 'next/dynamic';

const GeminiHelper = dynamic(() => import('@/components/GeminiHelper'), { ssr: false });

export default function EditService() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Service>({
    id: "",
    title: "",
    icon: "",
    description: "",
    details: "",
    tools: "",
    features: [],
    process: [],
    order: 0,
    featured: false,
    published: true,
    category: "development",
    imageUrl: ""
  });

  // Load service data
  useEffect(() => {
    async function fetchService() {
      if (!serviceId) return;
      
      try {
        const serviceData = await ServiceService.getById(serviceId);
        if (serviceData) {
          setService(serviceData);
          setFormData(serviceData);
        } else {
          setError("Service not found");
          toast.error("Service not found");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to load service. Please try again.");
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    }
    
    fetchService();
  }, [serviceId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle array inputs (features, process)
  const handleArrayInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'features' | 'process') => {
    const value = e.target.value;
    const items = value.split('\n').filter(item => item.trim() !== '');
    setFormData({
      ...formData,
      [field]: items
    });
  };

  // Save service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Update service
      await ServiceService.update(serviceId, formData);
      toast.success("Service updated successfully!");
      router.push("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Failed to update service. Please try again.");
      toast.error("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  // Available icon options
  const iconOptions = [
    { value: "code", label: "Code" },
    { value: "palette", label: "Design" },
    { value: "smartphone", label: "Mobile" },
    { value: "shopping_cart", label: "E-commerce" },
    { value: "analytics", label: "Analytics" },
    { value: "cloud", label: "Cloud" },
    { value: "security", label: "Security" },
    { value: "support", label: "Support" },
    { value: "desktop_mac", label: "Desktop" },
    { value: "settings", label: "Settings" },
    { value: "build", label: "Build" },
    { value: "devices", label: "Devices" },
    { value: "speed", label: "Speed" },
  ];

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh]">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="p-8">
        <div className="bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md p-6 text-center">
          <h2 className="text-xl font-bold text-[var(--error-color)] mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <Link
            href="/admin/services"
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--background)] p-4">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--border-color)] pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Service</h1>
          <div className="flex space-x-3">
            <GeminiHelper 
              contentType="service"
              buttonText="AI Service Helper" 
              onGeneratedContent={(content) => {
                if (content) {
                  setFormData({
                    ...formData,
                    title: content.title || formData.title,
                    description: content.description || formData.description,
                    features: content.features || formData.features,
                    slug: content.slug || formData.slug,
                  });
                }
              }}
            />
            <Link href="/admin/services" className="px-4 py-2 rounded-lg bg-[var(--card-bg)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors border border-[var(--border-color)]">
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white rounded-lg shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
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

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Service Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--card-bg)] p-8 rounded-lg shadow-sm border border-[var(--border-color)] glass-effect"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Service Name *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="icon" className="block text-sm font-medium mb-1">Icon *</label>
              <select
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              >
                <option value="">Select an icon</option>
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formData.icon && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm">Selected icon:</span>
                  <span className="material-icons text-[var(--accent-color)]">{formData.icon}</span>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Short Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                placeholder="development, design, etc."
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="details" className="block text-sm font-medium mb-1">Full Details</label>
              <textarea
                id="details"
                name="details"
                value={formData.details || ""}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="tools" className="block text-sm font-medium mb-1">Tools & Technologies</label>
              <input
                type="text"
                id="tools"
                name="tools"
                value={formData.tools || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                placeholder="React, Node.js, Firebase, etc."
              />
            </div>
            
            <div>
              <label htmlFor="features" className="block text-sm font-medium mb-1">Features (one per line)</label>
              <textarea
                id="features"
                name="features"
                value={formData.features?.join('\n') || ''}
                onChange={(e) => handleArrayInputChange(e, 'features')}
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <label htmlFor="process" className="block text-sm font-medium mb-1">Service Process Steps (one per line)</label>
          <textarea
            id="process"
            name="process"
            value={formData.process?.join('\n') || ''}
            onChange={(e) => handleArrayInputChange(e, 'process')}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
            placeholder="Step 1: Planning&#10;Step 2: Design&#10;Step 3: Implementation"
          ></textarea>
        </div>
        
        <div className="mt-8 flex items-center gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300 text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
            />
            <label htmlFor="featured" className="ml-2 text-sm">Featured</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published || false}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300 text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
            />
            <label htmlFor="published" className="ml-2 text-sm">Published</label>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="order" className="mr-2 text-sm">Display Order:</label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order || 0}
              onChange={handleInputChange}
              className="w-16 px-2 py-1 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
            />
          </div>
        </div>
      </motion.form>
    </div>
  );
} 