import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--primary-gradient-from)]/20"></div>
          
          {/* Spinning gradient border */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--primary-gradient-from)] border-r-[var(--primary-gradient-to)] animate-spin"></div>
        </div>
        <p className="mt-4 text-[var(--foreground)]/70 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
