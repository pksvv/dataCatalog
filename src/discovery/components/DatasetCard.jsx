// src/discovery/components/DatasetCard.jsx

import React from 'react';
import { Calendar, Database, Globe, Tag } from 'lucide-react';

const DatasetCard = ({ dataset, onClick }) => {
  const getTagColor = (tag) => {
    switch (tag) {
      case 'Recently Added':
        return 'bg-green-100 text-green-800';
      case 'Recently Enhanced':
        return 'bg-blue-100 text-blue-800';
      case 'AI Ready Data':
        return 'bg-purple-100 text-purple-800';
      case 'Commodity Insights':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => onClick(dataset)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Database className="h-3 w-3 mr-1" />
            {dataset.category}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {dataset.tags.map((tag, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {dataset.description}
      </p>

      {/* Metadata */}
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          <span>{dataset.coverage}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{dataset.historicalData}</span>
        </div>
        <div className="flex items-center">
          <Database className="h-4 w-4 mr-2" />
          <span>Updated {dataset.metadata.updateFrequency}</span>
        </div>
      </div>

      {/* Delivery Options Preview */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Available via:</p>
        <div className="flex flex-wrap gap-1">
          {dataset.deliveryOptions.slice(0, 3).map((option, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
            >
              {option.name}
            </span>
          ))}
          {dataset.deliveryOptions.length > 3 && (
            <span className="inline-block px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
              +{dataset.deliveryOptions.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;