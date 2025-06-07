'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border-color)]/30 p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--error-color)]/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--error-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Something went wrong</h1>
        
        <p className="text-[var(--foreground)]/80 mb-6">
          We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-[var(--background)] rounded-lg text-left overflow-auto max-h-40 text-sm text-[var(--foreground)]/70 border border-[var(--border-color)]/30">
            <p className="font-medium mb-2">Error details:</p>
            <p>{error.message || 'Unknown error'}</p>
            {error.digest && <p className="mt-2 text-xs">Error ID: {error.digest}</p>}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="px-6 py-3 bg-[var(--card-bg)] border border-[var(--primary-gradient-from)]/30 text-[var(--primary-gradient-from)] font-medium rounded-lg hover:bg-[var(--primary-gradient-from)]/10 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 