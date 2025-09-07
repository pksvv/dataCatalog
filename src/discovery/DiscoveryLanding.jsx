// src/discovery/DiscoveryLanding.jsx

import React from 'react';
import GenAISearch from './components/GenAISearch';
import TrendingSection from './components/TrendingSection';
import { trendingDatasets } from './data/mockDatasets';

const DiscoveryLanding = ({ onSearch, onDatasetSelect, onCreateContract }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 mb-4">Discover Datasets</h1>
            <p className="text-lg text-gray-600">
              Search through our comprehensive data marketplace using natural language. 
              Find the perfect dataset for your analysis needs.
            </p>
          </div>
          <div className="bg-indigo-100 rounded-lg p-3">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <GenAISearch 
          onSearch={onSearch}
          isLanding={true}
        />
      </div>

      {/* Trending Datasets */}
      <div className="mb-8">
        <TrendingSection 
          datasets={trendingDatasets}
          onDatasetSelect={onDatasetSelect}
        />
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <div className="bg-blue-100 rounded-lg p-3 mb-4 inline-block">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Intelligence</h3>
            <p className="text-gray-600 text-sm">
              Access comprehensive financial data, estimates, and market insights from trusted sources.
            </p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <div className="bg-purple-100 rounded-lg p-3 mb-4 inline-block">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Ready Data</h3>
            <p className="text-gray-600 text-sm">
              Pre-processed datasets optimized for machine learning and AI applications.
            </p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <div className="bg-green-100 rounded-lg p-3 mb-4 inline-block">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Delivery Options</h3>
            <p className="text-gray-600 text-sm">
              Access data via APIs, bulk downloads, or integrated platforms to suit your needs.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <div className="bg-orange-100 rounded-lg p-3 mb-4 inline-block">
              <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600 text-sm">
              Get the latest data with real-time updates and continuous monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Finding the Right Data?</h2>
        <p className="text-lg mb-6 opacity-90">
          Our AI-powered search makes it easy to discover exactly what you need using natural language.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => onSearch("financial estimates for tech companies")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Try Example Search
          </button>
          <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors">
            Browse All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryLanding;