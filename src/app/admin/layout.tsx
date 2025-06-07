import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for website content management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Colorful top accent - matching website gradient */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-gradient-from)] via-[var(--accent-color)] to-[var(--primary-gradient-to)] z-50"></div>
      
      {/* Dynamic color blob background elements - similar to website */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Vibrant color blobs - positioned strategically */}
        <div
          className="absolute top-0 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 animate-blob animation-delay-2000"
          style={{ background: `rgba(var(--primary-gradient-from-rgb), 0.2)` }}
        />
        <div
          className="absolute top-[40%] -right-20 w-[350px] h-[350px] rounded-full blur-[120px] opacity-10 animate-blob animation-delay-4000"
          style={{ background: `rgba(var(--primary-gradient-to-rgb), 0.15)` }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 animate-blob animation-delay-3000"
          style={{ background: `rgba(var(--accent-color-rgb), 0.15)` }}
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(var(--border-color)/10 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.4
        }}></div>
      </div>
      
      {/* Side Navigation */}
      <aside className="fixed left-0 top-1 w-64 h-[calc(100vh-1px)] bg-[var(--card-bg)] border-r border-[var(--border-color)] overflow-y-auto z-40 backdrop-blur-sm admin-custom-scroll">
        <div className="p-6">
          <Link href="/admin" className="block group">
            <h1 className="text-2xl font-bold admin-text-gradient">Admin</h1>
            <p className="text-xs opacity-70 mt-1">Content Management</p>
          </Link>
        </div>
        
        <nav className="mt-2">
          <Link 
            href="/admin" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/portfolio" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Portfolio</span>
          </Link>
          
          <Link 
            href="/admin/blog" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Blog</span>
          </Link>
          
          <Link 
            href="/admin/services" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Services</span>
          </Link>
          
          <Link 
            href="/admin/team" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Team</span>
          </Link>
          
          <Link 
            href="/admin/contacts" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Contacts</span>
          </Link>
          
          <div className="px-6 py-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"></div>
          </div>
          
          <Link 
            href="/" 
            className="flex items-center px-6 py-3 hover:bg-[var(--card-bg-hover)] transition-all duration-300 border-l-4 border-transparent hover:border-[var(--primary-gradient-from)] group admin-nav-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--accent-color)] group-hover:text-[var(--primary-gradient-from)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform">Back to Site</span>
          </Link>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 ml-64 pt-1 min-h-screen admin-custom-scroll">
        {children}
      </main>
    </div>
  );
} 