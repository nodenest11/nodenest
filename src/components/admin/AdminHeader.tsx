"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminHeader() {
  return (
    <header className="w-full bg-[var(--card-bg)] border-b border-[var(--border-color)] p-4 flex justify-between items-center">
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5288] to-[#A171FF] text-white font-bold">
            AF
          </span>
          <span className="font-bold text-lg tracking-tight">Atom Flow <span className="text-[var(--muted-foreground)] font-normal">Admin</span></span>
        </Link>
      </motion.div>

      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Admin actions */}
        <a 
          href="/" 
          target="_blank"
          rel="noopener noreferrer" 
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-7"></path>
            <path d="M16 3h5v5"></path>
            <path d="M21 3l-9 9"></path>
          </svg>
          View Site
        </a>
        
        <div className="h-6 w-px bg-[var(--border-color)]"></div>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#59CB92] to-[#439CFB] flex items-center justify-center text-white font-medium text-sm">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </motion.div>
    </header>
  );
}
