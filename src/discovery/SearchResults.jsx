// src/discovery/SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, SortAsc, Database, Calendar, Tag, BarChart3 } from 'lucide-react';
import GenAISearch from './components/GenAISearch';
import DatasetCard from './components/DatasetCard';
import { searchDatasets, mockDatasets } from './data/mockDatasets';

const SearchResults = ({ 
  searchQuery, 
  results: initialResults,
  onDatasetSelect, 
  onBackToHome, 
  onSearch, 
  onCreateContract 
}) => {
  const [results, setResults] = useState(initialResults || []);
  const [filteredResults, setFilteredResults] = useState(initialResults || []);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and tags for filters
  const categories = [...new Set(mockDatasets.map(d => d.category))];
  const allTags = [...new Set(mockDatasets.flatMap(d => d.tags))];
  const regulatoryTags = allTags.filter(tag => 
    ['Y9C', 'FFIEC 031', 'CCAR', 'Basel III', 'AML', 'CECL', 'DFAST'].some(regTag => 
      tag.includes(regTag)
    )
  );

  // Update results when search query changes
  useEffect(() => {
    if (searchQuery) {
      const searchResults = searchDatasets(searchQuery);
      setResults(searchResults);
      setFilteredResults(searchResults);
    }
  }, [searchQuery]);

  // Handle new search
  const handleSearch = (query) => {
    const searchResults = searchDatasets(query);
    setResults(searchResults);
    setFilteredResults(searchResults);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(dataset => 
        selectedCategories.includes(dataset.category)
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(dataset =>
        selectedTags.some(tag => dataset.tags.includes(tag))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.metadata.lastUpdated) - new Date(a.metadata.lastUpdated));
        break;
      case 'relevance':
      default:
        // Keep original search order for relevance
        break;
    }

    setFilteredResults(filtered);
  }, [results, selectedCategories, selectedTags, sortBy]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Discover
        </button>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600 mb-4">
            Found {filteredResults.length} dataset{filteredResults.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
          
          {/* Refined Search */}
          <div className="border-t border-gray-200 pt-4">
            <GenAISearch 
              onSearch={handleSearch}
              isLanding={false}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {selectedCategories.length + selectedTags.length}
                </span>
              )}
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="updated">Sort by Last Updated</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredResults.length} results
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                  <Database className="h-4 w-4 mr-2" />
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regulatory Tags */}
              <div>
                <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Regulatory Reports
                </h4>
                <div className="space-y-2">
                  {regulatoryTags.slice(0, 8).map(tag => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Tags */}
              <div>
                <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                  <Tag className="h-4 w-4 mr-2" />
                  Dataset Tags
                </h4>
                <div className="space-y-2">
                  {allTags.filter(tag => !regulatoryTags.includes(tag)).slice(0, 6).map(tag => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || selectedTags.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Tips */}
      {filteredResults.length === 0 && searchQuery && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Search Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Try broader terms like "Basel", "CCAR", or "regulatory"</li>
            <li>• Use specific regulatory codes like "Y9C", "FFIEC 031"</li>
            <li>• Search by category like "Risk Intelligence" or "Market Intelligence"</li>
            <li>• Look for data types like "capital", "liquidity", "stress testing"</li>
          </ul>
        </div>
      )}

      {/* Results */}
      {filteredResults.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          {/* Results Summary */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {filteredResults.length} Dataset{filteredResults.length !== 1 ? 's' : ''} Found
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCategories.length > 0 || selectedTags.length > 0 
                    ? `Filtered from ${results.length} total results`
                    : `Showing all results for "${searchQuery}"`
                  }
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  {[...new Set(filteredResults.map(d => d.category))].length} categories
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last updated: {filteredResults.length > 0 ? 
                    new Date(Math.max(...filteredResults.map(d => new Date(d.metadata.lastUpdated)))).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Dataset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((dataset) => (
              <DatasetCard
                key={dataset.id}
                dataset={dataset}
                onClick={onDatasetSelect}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-12 text-center border border-gray-200">
          <div className="text-gray-400 mb-4">
            <Database className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No datasets found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No datasets match "${searchQuery}". Try different keywords or browse all datasets.`
              : "Try adjusting your search query or browse our trending datasets."
            }
          </p>
          
          {/* Suggested Searches */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">Try these popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Basel III', 'CCAR', 'Y9C', 'AML', 'Credit Risk'].map(term => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Datasets
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;