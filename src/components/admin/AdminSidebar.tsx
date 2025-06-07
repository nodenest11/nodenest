"use client";

import React from "react";
import { motion } from "framer-motion";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "pie-chart" },
    { id: "portfolio", label: "Portfolio", icon: "briefcase" },
    { id: "blog", label: "Blog Posts", icon: "file-text" },
    { id: "services", label: "Services", icon: "settings" },
    { id: "team", label: "Team", icon: "users" },
    { id: "gemini", label: "Gemini AI", icon: "zap" },
  ];

  // Function to render the appropriate icon
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "pie-chart":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
        );
      case "briefcase":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case "file-text":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <line x1="10" x2="8" y1="9" y2="9"></line>
          </svg>
        );
      case "settings":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
      case "users":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case "zap":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.aside
      className="w-64 bg-[var(--card-bg)] border-r border-[var(--border-color)] h-[calc(100vh-64px)] overflow-y-auto"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-colors
              ${activeSection === item.id
                ? "bg-[var(--secondary-bg)] text-[var(--foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary-bg)]/50"
              }
            `}
          >
            {renderIcon(item.icon)}
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-4 border-t border-[var(--border-color)]">
        <div className="bg-[var(--background)] rounded-md p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span className="font-medium">Need help?</span>
          </div>
          <p className="text-[var(--muted-foreground)] mb-3">
            Use the Gemini AI assistant to help you create and manage content.
          </p>
          <button
            onClick={() => setActiveSection("gemini")}
            className="w-full text-center py-1.5 px-2 bg-gradient-to-r from-[#439CFB] to-[#A171FF] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Open Gemini AI
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
