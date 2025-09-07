// src/discovery/components/TrendingSection.jsx

import React from 'react';
import { TrendingUp, Star, Clock } from 'lucide-react';
import DatasetCard from './DatasetCard';

const TrendingSection = ({ datasets, onDatasetSelect }) => {
  const recentlyAdded = datasets.filter(ds => ds.tags.includes('Recently Added'));
  const recentlyEnhanced = datasets.filter(ds => ds.tags.includes('Recently Enhanced'));
  const aiReady = datasets.filter(ds => ds.tags.includes('AI Ready Data'));

  const Section = ({ title, datasets, icon: Icon, iconColor, bgColor }) => (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8 border border-gray-200">
      <div className="flex items-center mb-6">
        <div className={`p-2 rounded-lg ${bgColor} mr-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">
            {datasets.length} dataset{datasets.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {datasets.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            onClick={onDatasetSelect}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {recentlyAdded.length > 0 && (
        <Section
          title="Recently Added"
          datasets={recentlyAdded}
          icon={Clock}
          iconColor="text-green-600"
          bgColor="bg-green-100"
        />
      )}

      {recentlyEnhanced.length > 0 && (
        <Section
          title="Recently Enhanced"
          datasets={recentlyEnhanced}
          icon={TrendingUp}
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />
      )}

      {aiReady.length > 0 && (
        <Section
          title="AI Ready Data"
          datasets={aiReady}
          icon={Star}
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />
      )}
    </div>
  );
};

export default TrendingSection;