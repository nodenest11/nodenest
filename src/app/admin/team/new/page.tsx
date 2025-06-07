"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TeamMemberService } from "@/lib/firebase/contentServices";
import { TeamMember } from "@/lib/firebase/contentTypes";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NewTeamMember() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<TeamMember>({
    id: "",
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    order: 0,
    featured: false,
    published: true,
    social: {
      twitter: "",
      linkedin: "",
      github: "",
      dribbble: ""
    }
  });

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

  // Handle social media input changes
  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      social: {
        ...formData.social,
        [name]: value,
      },
    });
  };

  // Save team member
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Prepare team member data (set order)
      const teamMembers = await TeamMemberService.getAll();
      const newMember = {
        ...formData,
        order: teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.order || 0)) + 1 : 0
      };
      
      // Create new team member
      const savedMemberId = await TeamMemberService.create(newMember);
      if (savedMemberId) {
        toast.success("Team member created successfully!");
        router.push("/admin/team");
      } else {
        throw new Error("Failed to create team member");
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      setError("Failed to create team member. Please try again.");
      toast.error("Failed to create team member");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Add New Team Member</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">Add a new person to your team</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/admin/team"
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Team
          </Link>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Team Member Form */}
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
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">Role *</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio *</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                placeholder="https://example.com/photo.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-full object-cover border border-[var(--border-color)]"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-[var(--border-color)] pb-4 mb-4">
              <h3 className="font-medium mb-3">Social Media Links</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <div className="flex items-center">
                    <span className="text-sm text-[var(--foreground)]/70 mr-2">https://linkedin.com/in/</span>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={formData.social?.linkedin || ''}
                      onChange={handleSocialInputChange}
                      className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium mb-1">Twitter URL</label>
                  <div className="flex items-center">
                    <span className="text-sm text-[var(--foreground)]/70 mr-2">https://twitter.com/</span>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={formData.social?.twitter || ''}
                      onChange={handleSocialInputChange}
                      className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="github" className="block text-sm font-medium mb-1">GitHub URL</label>
                  <div className="flex items-center">
                    <span className="text-sm text-[var(--foreground)]/70 mr-2">https://github.com/</span>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={formData.social?.github || ''}
                      onChange={handleSocialInputChange}
                      className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dribbble" className="block text-sm font-medium mb-1">Dribbble URL</label>
                  <div className="flex items-center">
                    <span className="text-sm text-[var(--foreground)]/70 mr-2">https://dribbble.com/</span>
                    <input
                      type="text"
                      id="dribbble"
                      name="dribbble"
                      value={formData.social?.dribbble || ''}
                      onChange={handleSocialInputChange}
                      className="w-full px-4 py-2 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
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
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/team"
            className="px-6 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Create Team Member"
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
} 