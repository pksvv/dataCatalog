// src/discovery/SearchResults.jsx

import React from 'react';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';
import GenAISearch from './components/GenAISearch';
import DatasetCard from './components/DatasetCard';

const SearchResults = ({ searchQuery, results, onDatasetSelect, onBackToHome, onSearch, onCreateContract }) => {
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
            Found {results.length} dataset{results.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
          
          {/* Refined Search */}
          <div className="border-t border-gray-200 pt-4">
            <GenAISearch 
              onSearch={onSearch}
              isLanding={false}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by Relevance
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {results.length} results
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((dataset) => (
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
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.044-5.709-2.573m10.418 0A7.962 7.962 0 0012 15c2.34 0 4.29-1.044 5.709-2.573m-10.418 0A7.745 7.745 0 016 12c0-1.357.377-2.63 1.027-3.709m10.418 0A7.745 7.745 0 0118 12c0-1.357-.377-2.63-1.027-3.709" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No datasets found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search query or browse our trending datasets.
          </p>
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