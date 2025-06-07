"use client";

import React from "react";
import { motion } from "framer-motion";
import GeminiHelper from "./GeminiHelper";

interface AiAssistantProps {
  contentType: "blog" | "portfolio" | "service" | "contact";
  onContentGenerated: (content: any) => void;
}

export default function AiAssistant({ contentType, onContentGenerated }: AiAssistantProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[var(--background)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]"
    >
      <h3 className="text-lg font-bold mb-4">AI Content Assistant</h3>
      <p className="text-sm mb-4">
        Generate {contentType} content with AI assistance.
      </p>
      
      <div className="flex justify-center mt-6">
        <GeminiHelper 
          contentType={contentType} 
          onGeneratedContent={onContentGenerated} 
          buttonText="Generate with AI"
        />
      </div>
    </motion.div>
  );
} 