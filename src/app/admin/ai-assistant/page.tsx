"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ prompt: string; response: string }[]>([]);
  const [contentType, setContentType] = useState("blog");
  
  const responseRef = useRef<HTMLDivElement>(null);

  // Template prompts for different content types
  const templates = {
    blog: "Write a blog post about",
    portfolio: "Create a portfolio project description for",
    service: "Write a service description for",
    team: "Create a team member bio for",
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    try {
      const templatePrefix = templates[contentType as keyof typeof templates] || "";
      const fullPrompt = `${templatePrefix} ${prompt}. Make it professional and engaging.`;
      
      const response = await fetch("/api/admin/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate content");
      }
      
      const data = await response.json();
      setResponse(data.content);
      
      // Add to history
      setHistory(prev => [...prev, { 
        prompt: prompt,
        response: data.content 
      }]);
      
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("An error occurred while generating content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    
    navigator.clipboard.writeText(response)
      .then(() => {
        alert("Content copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  // Scroll to response when it's generated
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-[var(--card-bg)] text-[var(--text-color)]">
      <header className="bg-[var(--background)] shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">AI Content Assistant</h1>
          <p className="text-sm opacity-70">Generate content with AI</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <nav className="mb-8">
          <ul className="flex flex-wrap gap-2 md:gap-4">
            <li>
              <Link 
                href="/admin" 
                className="px-4 py-2 bg-[var(--background)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/portfolio" 
                className="px-4 py-2 bg-[var(--background)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/blog" 
                className="px-4 py-2 bg-[var(--background)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/services" 
                className="px-4 py-2 bg-[var(--background)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/team" 
                className="px-4 py-2 bg-[var(--background)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
              >
                Team
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/ai-assistant" 
                className="px-4 py-2 bg-[var(--accent-color)] rounded-md hover:opacity-90 transition-opacity"
              >
                AI Assistant
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--background)] p-6 rounded-lg shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold mb-4">Generate Content</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select 
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full p-3 rounded-md bg-[var(--card-bg)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                >
                  <option value="blog">Blog Post</option>
                  <option value="portfolio">Portfolio Project</option>
                  <option value="service">Service Description</option>
                  <option value="team">Team Member Bio</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`E.g., "modern web development trends" for a blog post`}
                  className="w-full p-3 min-h-[120px] rounded-md bg-[var(--card-bg)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                />
              </div>
              
              <button 
                onClick={generateContent}
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-3 px-4 rounded-md font-medium ${
                  isLoading || !prompt.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--accent-color)] hover:opacity-90'
                } transition-colors`}
              >
                {isLoading ? 'Generating...' : 'Generate Content'}
              </button>
            </motion.div>

            {/* Response Section */}
            {(isLoading || response) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                ref={responseRef}
                className="bg-[var(--background)] p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Generated Content</h2>
                  {response && (
                    <button 
                      onClick={copyToClipboard}
                      className="text-sm px-3 py-1 bg-[var(--card-bg)] rounded-md hover:bg-[var(--card-bg-hover)] transition-colors"
                    >
                      Copy to Clipboard
                    </button>
                  )}
                </div>
                
                <div className="bg-[var(--card-bg)] p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-color)]"></div>
                    </div>
                  ) : (
                    response
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* History Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-[var(--background)] p-6 rounded-lg shadow-sm sticky top-4"
            >
              <h2 className="text-xl font-bold mb-4">History</h2>
              
              {history.length === 0 ? (
                <p className="text-sm opacity-70">No generation history yet. Your previous prompts will appear here.</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {history.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-[var(--card-bg)] p-3 rounded-md cursor-pointer hover:bg-[var(--card-bg-hover)] transition-colors"
                      onClick={() => {
                        setPrompt(item.prompt);
                        setResponse(item.response);
                      }}
                    >
                      <p className="font-medium truncate">{item.prompt}</p>
                      <p className="text-sm opacity-70 truncate">{item.response.substring(0, 60)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 