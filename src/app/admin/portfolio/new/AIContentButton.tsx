import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

interface AIContentButtonProps {
  onOpenModal: () => void;
  apiStatus: 'available' | 'limited' | 'unavailable';
  retryCountdown: number | null;
}

const AIContentButton: React.FC<AIContentButtonProps> = ({ 
  onOpenModal, 
  apiStatus, 
  retryCountdown 
}) => {
  // Determine status color
  const getStatusColor = () => {
    switch (apiStatus) {
      case 'available':
        return 'bg-green-500';
      case 'limited':
        return 'bg-yellow-500';
      case 'unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Determine tooltip text
  const getTooltipText = () => {
    switch (apiStatus) {
      case 'available':
        return 'AI Generation Available';
      case 'limited':
        return retryCountdown 
          ? `Rate Limited - Retry in ${retryCountdown}s` 
          : 'Rate Limited - Using Fallback';
      case 'unavailable':
        return 'AI Unavailable - Using Fallback';
      default:
        return 'AI Status Unknown';
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={onOpenModal}
        className="p-2 rounded-md bg-gradient-to-r from-[var(--primary-gradient-from)] to-[var(--primary-gradient-to)] text-white hover:opacity-90 transition-all flex items-center admin-button"
        aria-label="Generate with AI"
      >
        <div className="flex items-center">
          <FaRobot className="mr-2" />
          <span>AI</span>
          
          {/* Status indicator */}
          <div className="relative ml-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
          </div>
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {getTooltipText()}
      </div>
    </div>
  );
};

export default AIContentButton; 