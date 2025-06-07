'use client';

import React, { useState } from 'react';
import { seedDatabase, seedServices, seedTeam, seedPortfolio, seedBlog } from '@/lib/firebase/dataSeeder';

export default function SeedDatabasePage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedDatabase = async (seedType: 'all' | 'services' | 'team' | 'portfolio' | 'blog') => {
    try {
      setIsSeeding(true);
      setError(null);
      
      let result;
      
      switch (seedType) {
        case 'all':
          result = await seedDatabase();
          break;
        case 'services':
          result = { services: await seedServices() };
          break;
        case 'team':
          result = { team: await seedTeam() };
          break;
        case 'portfolio':
          result = { portfolio: await seedPortfolio() };
          break;
        case 'blog':
          result = { blog: await seedBlog() };
          break;
      }
      
      setResults(result);
    } catch (err) {
      console.error('Error seeding database:', err);
      setError('An error occurred while seeding the database. Check the console for details.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Database Seed Tool
        </h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Use this tool to populate the database with sample data. This is useful for testing and development.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-700 dark:text-yellow-200 text-sm">
              <strong>Warning:</strong> This will add new sample data to your database. It won't delete existing data but might create duplicates if run multiple times.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => handleSeedDatabase('all')}
            disabled={isSeeding}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seed All Data
          </button>
          
          <button
            onClick={() => handleSeedDatabase('services')}
            disabled={isSeeding}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seed Services Only
          </button>
          
          <button
            onClick={() => handleSeedDatabase('team')}
            disabled={isSeeding}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seed Team Only
          </button>
          
          <button
            onClick={() => handleSeedDatabase('portfolio')}
            disabled={isSeeding}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seed Portfolio Only
          </button>
          
          <button
            onClick={() => handleSeedDatabase('blog')}
            disabled={isSeeding}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seed Blog Only
          </button>
        </div>
        
        {isSeeding && (
          <div className="flex items-center justify-center p-4 mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Seeding database...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700 dark:text-red-200">
              {error}
            </p>
          </div>
        )}
        
        {results && (
          <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 mb-6 rounded">
            <h3 className="text-green-700 dark:text-green-200 font-medium mb-2">Seeding complete!</h3>
            <ul className="space-y-1 text-sm text-green-600 dark:text-green-300">
              {results.services !== undefined && (
                <li>Services: {results.services} items added</li>
              )}
              {results.team !== undefined && (
                <li>Team Members: {results.team} items added</li>
              )}
              {results.portfolio !== undefined && (
                <li>Portfolio Projects: {results.portfolio} items added</li>
              )}
              {results.blog !== undefined && (
                <li>Blog Posts: {results.blog} items added</li>
              )}
            </ul>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
} 