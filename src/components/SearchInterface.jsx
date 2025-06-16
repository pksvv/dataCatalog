import React, { useState, useEffect } from 'react';
import { Search, Database } from 'lucide-react';
import { exampleQueries } from '../data/dataProducts';
import { generateSearchSuggestions } from '../utils/searchUtils';

const SearchInterface = ({ 
  searchTerm, 
  onSearchChange, 
  onProductSelect, 
  dataProducts
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleSearchFocus = () => {
    if (searchSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleExampleClick = (example) => {
    onSearchChange(example);
  };

  // Handle search processing with useEffect to avoid infinite re-renders
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate AI processing delay
    const timeoutId = setTimeout(() => {
      const suggestions = generateSearchSuggestions(searchTerm);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="relative">
        <input
          type="text"
          placeholder="What are you searching for today?"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        <Search className={`absolute left-3 top-3.5 h-5 w-5 ${isSearching ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
        {isSearching && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      {/* Example queries */}
      {!searchTerm && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.slice(0, 4).map((example, index) => (
              <button
                key={index}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Intelligent Suggestions */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <div className="mt-4 border border-blue-200 rounded-lg bg-blue-50 p-4">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-blue-900">For your query, you might want to explore:</h4>
            <button 
              className="ml-auto text-blue-500 hover:text-blue-700"
              onClick={() => setShowSuggestions(false)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {searchSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <Database className="h-4 w-4 text-blue-600 mr-2" />
                      <h5 className="font-medium text-gray-900">{suggestion.title}</h5>
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        suggestion.type === 'sensitivity' ? 'bg-red-100 text-red-800' : 
                        suggestion.type === 'pricing' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {suggestion.type === 'sensitivity' ? 'High Sensitivity' : 
                         suggestion.type === 'pricing' ? 'Pricing Data' :
                         'Data Product'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Key columns:</strong> {suggestion.columns.join(', ')}
                    </div>
                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      💡 {suggestion.reasoning}
                    </div>
                  </div>
                  <button 
                    className="ml-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => {
                      const product = dataProducts.find(p => p.name === suggestion.title);
                      if (product) onProductSelect(product);
                      setShowSuggestions(false);
                    }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center mt-2 text-sm text-gray-600">
        <span>Filters:</span>
        <button className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          Domain: All
        </button>
        <button className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          Sensitivity: All
        </button>
      </div>
    </div>
  );
};

export default SearchInterface;