"use client";

import React, { useState } from 'react';
import GeminiHelper from './GeminiHelper';

interface AIContentAssistantProps {
  contentType: 'blog' | 'portfolio' | 'service' | 'contact';
  isOpen: boolean;
  onClose: () => void;
  onContentGenerated?: (content: any) => void;
}

export default function AIContentAssistant({ 
  contentType, 
  isOpen, 
  onClose, 
  onContentGenerated 
}: AIContentAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGeneratedContent = (content: any) => {
    if (onContentGenerated) {
      onContentGenerated(content);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-[var(--border-color)] glass-effect">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">AI Content Assistant</h2>
          <p className="mb-6">Generate {contentType} content with AI</p>
          
          <div className="flex justify-center">
            <GeminiHelper 
              onGeneratedContent={handleGeneratedContent}
              contentType={contentType}
              buttonText="Start Generating"
            />
          </div>
        </div>
        <div className="p-4 border-t border-[var(--border-color)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-[var(--border-color)] hover:bg-[var(--background)]/50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 