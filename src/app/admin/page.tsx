"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-[calc(100vh-160px)]">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Welcome to your admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Quick stats cards */}
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 hover:shadow-md transition-all glass-effect">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Blog Posts</h3>
            <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-4">12</p>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-green-500">↑ 8%</span> from last month
          </div>
          <div className="mt-4">
            <Link href="/admin/blog" className="text-sm text-[var(--accent-color)] hover:underline">Manage posts →</Link>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 hover:shadow-md transition-all glass-effect">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Portfolio Projects</h3>
            <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-4">8</p>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-green-500">↑ 2</span> new projects
          </div>
          <div className="mt-4">
            <Link href="/admin/portfolio" className="text-sm text-[var(--accent-color)] hover:underline">Manage projects →</Link>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 hover:shadow-md transition-all glass-effect">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Team Members</h3>
            <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-4">6</p>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-green-500">+1</span> this week
          </div>
          <div className="mt-4">
            <Link href="/admin/team" className="text-sm text-[var(--accent-color)] hover:underline">Manage team →</Link>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 hover:shadow-md transition-all glass-effect">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contact Inquiries</h3>
            <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mt-4">23</p>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-yellow-500">3</span> unread
          </div>
          <div className="mt-4">
            <Link href="/admin/contacts" className="text-sm text-[var(--accent-color)] hover:underline">View inquiries →</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 glass-effect col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button className="text-sm text-[var(--accent-color)] hover:underline">View all</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">New blog post published</p>
                <p className="text-sm opacity-70">The Future of AI in Web Development</p>
                <p className="text-xs opacity-50 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">New contact inquiry received</p>
                <p className="text-sm opacity-70">John Smith - Project consultation</p>
                <p className="text-xs opacity-50 mt-1">Yesterday at 3:45 PM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Portfolio project updated</p>
                <p className="text-sm opacity-70">E-commerce Redesign - Added case study</p>
                <p className="text-xs opacity-50 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--card-bg)] rounded-lg shadow-sm border border-[var(--border-color)] p-6 glass-effect">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Quick Actions</h3>
          </div>
          
          <div className="space-y-3">
            <Link href="/admin/blog/new" className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span>Write new blog post</span>
            </Link>
            
            <Link href="/admin/portfolio/new" className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>Add portfolio project</span>
            </Link>
            
            <Link href="/admin/services/new" className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>Add new service</span>
            </Link>
            
            <Link href="/admin/team/new" className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span>Add team member</span>
            </Link>
            
            <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--background)]/50 transition-colors">
              <div className="p-2 bg-[rgba(var(--accent-color-rgb),0.1)] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>Site settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
