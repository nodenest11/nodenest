"use client";

import React from "react";

interface AdminPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function AdminPageLayout({
  title,
  description,
  children,
  actions,
}: AdminPageLayoutProps) {
  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm opacity-70 mt-1">{description}</p>
        </div>
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </header>
      
      {children}
    </div>
  );
} 