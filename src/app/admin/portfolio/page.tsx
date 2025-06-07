"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { deleteDocument } from "@/lib/firebase/firestoreUtils";
import { PortfolioProject } from "@/lib/firebase/contentTypes";
import AIContentAssistant from "@/components/admin/AIContentAssistant";
import { PortfolioService } from "@/lib/firebase/contentServices";
import GeminiHelper from "@/components/admin/GeminiHelper";
import { useRouter } from "next/navigation";

export default function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isAIAvailable, setIsAIAvailable] = useState(true);

  // Fetch portfolio items on component mount
  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  // Extract categories from portfolio items
  useEffect(() => {
    if (portfolioItems.length > 0) {
      const uniqueCategories = Array.from(
        new Set(portfolioItems.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    }
  }, [portfolioItems]);

  // Fetch portfolio items using our standardized service
  const fetchPortfolioItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const items = await PortfolioService.getAll();
      setPortfolioItems(items);
    } catch (err) {
      console.error("Error fetching portfolio items:", err);
      setError("Failed to fetch portfolio items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete confirmation using our standardized service
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await PortfolioService.delete(itemToDelete);
      setPortfolioItems(prevItems => 
        prevItems.filter(item => item.id !== itemToDelete)
      );
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error deleting portfolio item:", err);
      setError("Failed to delete portfolio item. Please try again.");
    }
  };

  // Handle toggling publish status
  const handleTogglePublish = async (item: PortfolioProject) => {
    if (!item.id) return;
    
    try {
      await PortfolioService.togglePublished(item.id, !!item.published);
      
      // Update the local state
      setPortfolioItems(prevItems => 
        prevItems.map(prevItem => 
          prevItem.id === item.id 
            ? { ...prevItem, published: !prevItem.published }
            : prevItem
        )
      );
    } catch (err) {
      console.error("Error toggling publish status:", err);
      setError("Failed to update item status. Please try again.");
    }
  };

  // Handle toggling featured status
  const handleToggleFeatured = async (item: PortfolioProject) => {
    if (!item.id) return;
    
    try {
      await PortfolioService.toggleFeatured(item.id, !!item.featured);
      
      // Update the local state
      setPortfolioItems(prevItems => 
        prevItems.map(prevItem => 
          prevItem.id === item.id 
            ? { ...prevItem, featured: !prevItem.featured }
            : prevItem
        )
      );
    } catch (err) {
      console.error("Error toggling featured status:", err);
      setError("Failed to update item status. Please try again.");
    }
  };

  // Handle AI generated content
  const handleAIGeneratedContent = (content: Partial<PortfolioProject>) => {
    // Navigate to new item page with generated content
    window.location.href = `/admin/portfolio/new?aiGenerated=true&title=${encodeURIComponent(content.title || '')}&description=${encodeURIComponent(content.description || '')}`;
  };

  // Filter and sort portfolio items
  const filteredItems = portfolioItems
    .filter((item) => {
      // Filter by search term
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === "all" || item.category === selectedCategory;
      
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
        case "client":
          aValue = a.client;
          bValue = b.client;
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
      
      // Handle number comparison - fixed type conversion error
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      
      // Default return for any other case
      return 0;
    });

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Portfolio Management</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Manage your portfolio projects
          </p>
        </div>        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link
            href="/admin/portfolio/new"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2 admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Project
          </Link>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
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
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="client-asc">Client (A-Z)</option>
            <option value="client-desc">Client (Z-A)</option>
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

      {/* Portfolio Items */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="admin-spinner"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-4">Image</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--background)]/30 transition-colors admin-table-row"
                  >
                    <td className="p-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
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
                    <td className="p-4">{item.title}</td>
                    <td className="p-4">{item.client}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)] text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4">{item.date || "N/A"}</td>
                    <td className="p-4">
                      {item.published ? (
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
                          href={`/admin/portfolio/edit/${item.id}`}
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
                            setItemToDelete(item.id || null);
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
                          href={`/portfolio/${item.slug}`}
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-xl font-medium mt-4">No portfolio items found</h3>
          <p className="text-sm opacity-70 mt-2">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your filters"
              : "Get started by adding your first portfolio item"}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/portfolio/new"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all inline-flex items-center gap-2 admin-button"
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
              Add New Project
            </Link>
          </div>
        </div>
      )}

      {/* AI Content Assistant Modal */}
      <AIContentAssistant
        contentType="portfolio"
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onContentGenerated={handleAIGeneratedContent}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-[var(--border-color)] glass-effect">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete this portfolio item? This action
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

      <GeminiHelper 
        contentType="portfolio"
        buttonText="AI Creator" 
        onGeneratedContent={(content) => {
          if (content) {
            const router = useRouter();
            router.push(
              `/admin/portfolio/new?title=${encodeURIComponent(content.title || '')}&description=${encodeURIComponent(content.description || '')}`
            );
          }
        }}
      />
    </div>
  );
} 