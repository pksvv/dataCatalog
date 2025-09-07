import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, SortAsc, Database, Calendar, Tag, BarChart3, Sparkles, Brain, ChevronDown, ChevronUp, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import GenAISearch from './components/GenAISearch';
import DatasetCard from './components/DatasetCard';
import { searchDatasets, mockDatasets, mapQueryToDatasets, generateIntelligentResponse } from './data/mockDatasets';

const SearchResults = ({ 
  searchQuery, 
  results: initialResults,
  onDatasetSelect, 
  onBackToHome, 
  onSearch, 
  onCreateContract 
}) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  // Get unique categories and tags for filters
  const categories = [...new Set(mockDatasets.map(d => d.category))];
  const allTags = [...new Set(mockDatasets.flatMap(d => d.tags))];
  const regulatoryTags = allTags.filter(tag => 
    ['Y9C', 'FFIEC 031', 'CCAR', 'Basel III', 'AML', 'CECL', 'DFAST'].some(regTag => 
      tag.includes(regTag)
    )
  );

  // Simulate AI processing with loading animation
  const processSearchWithAI = async (query) => {
    setIsLoading(true);
    setAiResponse(null);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Get intelligent dataset mapping
    const mappedResults = mapQueryToDatasets(query);
    
    // Generate AI response
    const intelligentResponse = generateIntelligentResponse(query, mappedResults);
    
    setResults(mappedResults);
    setFilteredResults(mappedResults);
    setAiResponse(intelligentResponse);
    setIsLoading(false);
  };

  // Update results when search query changes
  useEffect(() => {
    if (searchQuery) {
      processSearchWithAI(searchQuery);
    }
  }, [searchQuery]);

  // Handle new search
  const handleSearch = async (query) => {
    await processSearchWithAI(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(dataset => 
        selectedCategories.includes(dataset.category)
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(dataset =>
        selectedTags.some(tag => dataset.tags.includes(tag))
      );
    }

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
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing your query "{searchQuery}"...
              </span>
            ) : (
              `Found ${filteredResults.length} dataset${filteredResults.length !== 1 ? 's' : ''} matching "${searchQuery}"`
            )}
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

      {/* Loading State */}
      {isLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <Sparkles className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">AI is analyzing your query...</h3>
              <p className="text-blue-700 text-sm">
                Searching through datasets and generating intelligent insights
              </p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Panel */}
      {!isLoading && aiResponse && filteredResults.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6 opacity-0 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">AI Analysis & Insights</h3>
            </div>
            <button
              onClick={() => setShowAiInsights(!showAiInsights)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showAiInsights ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showAiInsights && (
            <div className="space-y-4 opacity-0 animate-slide-down">
              {/* Summary */}
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                  <Sparkles className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Query Analysis</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{aiResponse.summary}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recommendations */}
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommended Datasets</h4>
                      <ul className="space-y-2">
                        {aiResponse.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Related Concepts */}
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Related Concepts</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.relatedConcepts.map((concept, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Context */}
              {aiResponse.context && (
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Industry Context</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{aiResponse.context}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance Notes */}
              {aiResponse.compliance && aiResponse.compliance.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Key Compliance Requirements</h4>
                      <ul className="space-y-1">
                        {aiResponse.compliance.map((note, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filters and Sort */}
      {!isLoading && (
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
      )}

      {/* Results */}
      {!isLoading && (
        <>
          {filteredResults.length > 0 ? (
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 opacity-0 animate-fade-in">
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
                {filteredResults.map((dataset, index) => (
                  <div 
                    key={dataset.id} 
                    className="opacity-0 animate-slide-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <DatasetCard
                      dataset={dataset}
                      onClick={onDatasetSelect}
                    />
                  </div>
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
        </>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchResults;