"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TeamMemberService } from "@/lib/firebase/contentServices";
import { TeamMember } from "@/lib/firebase/contentTypes";
import { toast } from "react-hot-toast";

export default function TeamAdmin() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRole, setSelectedRole] = useState("all");
  const [roles, setRoles] = useState<string[]>([]);

  // Fetch team members on component mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const fetchedMembers = await TeamMemberService.getAll();
        // Sort by order
        setTeamMembers(fetchedMembers.sort((a, b) => (a.order || 0) - (b.order || 0)));
        
        // Extract all unique roles
        if (fetchedMembers.length > 0) {
          const uniqueRoles = Array.from(
            new Set(fetchedMembers.map((member) => member.role))
          );
          setRoles(uniqueRoles);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast.error("Failed to load team members");
        setError("Failed to load team members. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Toggle featured status
  const toggleFeatured = async (member: TeamMember) => {
    if (!member.id) return;
    
    try {
      const updatedMember = { 
        ...member, 
        featured: !member.featured 
      };
      
      await TeamMemberService.update(member.id, updatedMember);
      
      // Update the local state
      setTeamMembers(teamMembers.map(m => 
        m.id === member.id ? updatedMember : m
      ));
      
      toast.success(`${member.name} ${!member.featured ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  // Delete a team member
  const deleteTeamMember = async (id?: string) => {
    if (!id) return;
    
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await TeamMemberService.delete(id);
        setTeamMembers(prev => prev.filter(member => member.id !== id));
        toast.success("Team member deleted");
      } catch (error) {
        console.error("Error deleting team member:", error);
        toast.error("Failed to delete team member");
      }
    }
  };

  // Filter and sort team members
  const filteredMembers = teamMembers
    .filter((member) => {
      // Filter by search term
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by role
      const matchesRole = 
        selectedRole === "all" || member.role === selectedRole;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      // Sort by selected field
      let aValue = a[sortBy as keyof TeamMember];
      let bValue = b[sortBy as keyof TeamMember];
      
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
            <span className="text-gradient">Team Management</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">Manage your team members</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Link 
                href="/admin" 
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--card-bg-hover)] transition-all"
              >
            Back to Dashboard
              </Link>
              <Link 
            href="/admin/team/new"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center gap-2 admin-button"
              >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Member
              </Link>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
          />
        </div>
        <div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--background)] border border-[var(--border-color)] focus:border-[var(--primary-gradient-from)] focus:ring-1 focus:ring-[var(--primary-gradient-from)] transition-all admin-input"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
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
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="role-asc">Role (A-Z)</option>
            <option value="role-desc">Role (Z-A)</option>
            <option value="order-asc">Order (Low to High)</option>
            <option value="order-desc">Order (High to Low)</option>
          </select>
        </div>
              </div>
              
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[rgba(var(--error-color),0.1)] border border-[var(--error-color)] rounded-md text-[var(--error-color)]">
          {error}
        </div>
      )}

      {/* Team Members List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="admin-spinner"></div>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] glass-effect">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-4">Photo</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Social</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--background)]/30 transition-colors admin-table-row"
                  >
                    <td className="p-4">
                      {member.imageUrl ? (
                          <img 
                          src={member.imageUrl}
                            alt={member.name} 
                          className="w-12 h-12 object-cover rounded-full"
                          />
                      ) : (
                        <div className="w-12 h-12 bg-[var(--background)] rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--border-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          </div>
                        )}
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm opacity-70 line-clamp-1">{member.role}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)] text-xs">
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {member.social?.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[var(--accent-color)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                              </svg>
                            </a>
                          )}
                        {member.social?.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[var(--accent-color)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                              </svg>
                            </a>
                          )}
                        {member.social?.github && (
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[var(--accent-color)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                    </td>
                    <td className="p-4">
                      {member.featured && (
                        <span className="admin-badge admin-badge-primary">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleFeatured(member)}
                          className={`${member.featured ? 'text-[var(--primary-gradient-from)]' : 'text-[var(--foreground)]'} hover:text-[var(--primary-gradient-from)] admin-tooltip`}
                          data-tooltip={member.featured ? "Unfeature" : "Feature"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={member.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <Link
                          href={`/admin/team/edit/${member.id}`}
                          className="text-[var(--accent-color)] hover:underline admin-tooltip"
                          data-tooltip="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => deleteTeamMember(member.id)}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-medium mt-4">No team members found</h3>
          <p className="text-sm opacity-70 mt-2">
            {searchTerm || selectedRole !== "all"
              ? "Try adjusting your filters"
              : "Get started by adding your first team member"}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/team/new"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all inline-flex items-center gap-2 admin-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Member
                    </Link>
          </div>
        </div>
      )}
    </div>
  );
}
