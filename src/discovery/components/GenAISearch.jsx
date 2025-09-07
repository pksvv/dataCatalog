// src/discovery/components/GenAISearch.jsx

import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const GenAISearch = ({ onSearch, isLanding = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const suggestions = [
    "Financial estimates for tech companies",
    "Market demographics for emerging markets", 
    "OTC derivatives risk analysis",
    "Real-time capital market data"
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
              Find the perfect dataset for your analysis needs.
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
            placeholder="Ask me anything about datasets... (e.g., 'Show me financial data for tech companies')"
            className={`w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              isLanding ? 'py-5 text-xl' : ''
            }`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Search
          </button>
        </div>
      </form>

      {isLanding && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Try these suggestions:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenAISearch;