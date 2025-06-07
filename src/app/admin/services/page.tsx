"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ServiceService } from "@/lib/firebase/contentServices";
import { Service } from "@/lib/firebase/contentTypes";
import { toast } from "react-hot-toast";

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await ServiceService.getAll();
        // Sort by order
        setServices(fetchedServices.sort((a, b) => (a.order || 0) - (b.order || 0)));
        
        // Extract all unique categories
        if (fetchedServices.length > 0) {
          const uniqueCategories = Array.from(
            new Set(fetchedServices.map((item) => item.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Toggle published status
  const togglePublished = async (service: Service) => {
    if (!service.id) return;
    
    try {
      await ServiceService.togglePublished(service.id, !!service.published);
      
      // Update the local state
      setServices(prevServices => 
        prevServices.map(prevService => 
          prevService.id === service.id 
            ? { ...prevService, published: !prevService.published }
            : prevService
        )
      );
      
      toast.success(`${service.title} ${!service.published ? 'published' : 'unpublished'}`);
    } catch (error) {
      console.error("Error toggling published status:", error);
      toast.error("Failed to update published status");
    }
  };

  // Toggle featured status
  const toggleFeatured = async (service: Service) => {
    if (!service.id) return;
    
    try {
      const updatedService = { 
        ...service, 
        featured: !service.featured 
      };
      
      await ServiceService.update(service.id, updatedService);
      
      // Update the local state
      setServices(services.map(s => 
        s.id === service.id ? updatedService : s
      ));
      
      toast.success(`${service.title} ${!service.featured ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  // Delete a service
  const deleteService = async (id?: string) => {
    if (!id) return;
    
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await ServiceService.delete(id);
        setServices(prev => prev.filter(service => service.id !== id));
        toast.success("Service deleted");
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service");
      }
    }
  };

  // Filter and sort services
  const filteredServices = services
    .filter((service) => {
      // Filter by search term
      const matchesSearch = 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === "all" || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected field
      let aValue: any = a[sortBy as keyof Service];
      let bValue: any = b[sortBy as keyof Service];
      
      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      
      // Default return
      return 0;
    });

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">Services Management</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">Manage your service offerings</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link 
            href="/admin"
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/admin/services/new"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2 admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Service
          </Link>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Search services..."
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
            <option key="all" value="all">All Categories</option>
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
            <option key="title-asc" value="title-asc">Name (A-Z)</option>
            <option key="title-desc" value="title-desc">Name (Z-A)</option>
            <option key="order-asc" value="order-asc">Order (Low to High)</option>
            <option key="order-desc" value="order-desc">Order (High to Low)</option>
            <option key="category-asc" value="category-asc">Category (A-Z)</option>
            <option key="category-desc" value="category-desc">Category (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="admin-spinner"></div>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-4">Icon</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--background)]/30 transition-colors admin-table-row"
                  >
                    <td className="p-4">
                      <div className="w-10 h-10 bg-[rgba(var(--accent-color-rgb),0.1)] flex items-center justify-center rounded-md">
                        <span className="material-icons text-[var(--accent-color)]">{service.icon}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{service.title}</div>
                      <div className="text-sm opacity-70 line-clamp-1">{service.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)] text-xs">
                        {service.category}
                      </span>
                    </td>
                    <td className="p-4">{service.order}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {service.published ? (
                          <span className="admin-badge admin-badge-success">
                            Published
                          </span>
                        ) : (
                          <span className="admin-badge admin-badge-secondary">
                            Draft
                          </span>
                        )}
                        {service.featured && (
                          <span className="admin-badge admin-badge-primary">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => togglePublished(service)}
                          className="text-[var(--foreground)] hover:text-[var(--accent-color)] admin-tooltip"
                          data-tooltip={service.published ? "Unpublish" : "Publish"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.published ? 
                              "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" :
                              "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            } />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleFeatured(service)}
                          className={`${service.featured ? 'text-[var(--primary-gradient-from)]' : 'text-[var(--foreground)]'} hover:text-[var(--primary-gradient-from)] admin-tooltip`}
                          data-tooltip={service.featured ? "Unfeature" : "Feature"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={service.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <Link
                          href={`/admin/services/edit/${service.id}`}
                          className="text-[var(--accent-color)] hover:underline admin-tooltip"
                          data-tooltip="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="text-[var(--error-color)] hover:underline admin-tooltip"
                          data-tooltip="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-medium mt-4">No services found</h3>
          <p className="text-sm opacity-70 mt-2">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your filters"
              : "Get started by adding your first service"}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/services/new"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all inline-flex items-center gap-2 admin-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Service
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 