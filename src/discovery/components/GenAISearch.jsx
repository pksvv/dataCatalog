// src/discovery/components/GenAISearch.jsx

import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

const GenAISearch = ({ onSearch, isLanding = false }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      setIsSearching(true);
      try {
        await onSearch(query);
      } finally {
        setTimeout(() => setIsSearching(false), 800);
      }
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion);
    setIsSearching(true);
    try {
      await onSearch(suggestion);
    } finally {
      setTimeout(() => setIsSearching(false), 800);
    }
  };

  const suggestions = [
    "CCAR stress testing datasets for capital planning",
    "Basel III capital adequacy reports and RWA data", 
    "FFIEC Call Report data for quarterly filings",
    "AML transaction monitoring for BSA compliance",
    "Y9C bank holding company regulatory reports",
    "CECL credit loss modeling and provisioning data",
    "Financial estimates for tech companies",
    "Market demographics for emerging markets"
  ];

  return (
    <div className={`${isLanding ? 'mb-12' : 'mb-6'}`}>
      <div className={`${isLanding ? 'text-center mb-8' : 'mb-4'}`}>
        {isLanding && (
          <>
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Discover Datasets</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search through our comprehensive data marketplace using natural language. 
              Find the perfect dataset for your regulatory reporting, risk analysis, and business intelligence needs.
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about datasets... (e.g., 'Show me CCAR data for stress testing')"
            className={`w-full pl-12 pr-24 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              isLanding ? 'py-5 text-xl pr-28' : ''
            }`}
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {isLanding && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Try these suggestions:</p>
          <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isSearching}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-gray-200 transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {isSearching && (
            <div className="flex items-center justify-center mt-6 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span className="text-sm font-medium">Searching datasets...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenAISearch;