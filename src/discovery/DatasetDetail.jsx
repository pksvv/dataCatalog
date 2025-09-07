// src/discovery/DatasetDetail.jsx

import React from 'react';
import { ArrowLeft, ExternalLink, Download, Share2, Bookmark } from 'lucide-react';
import MetadataSection from './components/MetadataSection';
import DeliveryOptions from './components/DeliveryOptions';
import QnABox from './components/QnABox';
import DatasetCard from './components/DatasetCard';
import { getDatasetById, mockDatasets } from './data/mockDatasets';

const DatasetDetail = ({ datasetId, onBack, onDatasetSelect, cameFromSearch = false, onCreateContract }) => {
  const dataset = getDatasetById(datasetId);
  
  if (!dataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dataset not found</h2>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const relatedDatasets = mockDatasets.filter(ds => 
    dataset.relatedDatasets.includes(ds.title) && ds.id !== dataset.id
  );

  const handleCreateContract = (deliveryType) => {
    // Navigate to contract creation with dataset and delivery type info
    if (onCreateContract) {
      onCreateContract({
        dataset: dataset,
        deliveryType: deliveryType
      });
    }
  };

  return (
    <div className="w-full px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {cameFromSearch ? 'Back to Results' : 'Back to Discovery'}
        </button>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 pr-8">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mr-4">
                  {dataset.category}
                </span>
                {dataset.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                      tag === 'Recently Added' ? 'bg-green-100 text-green-800' :
                      tag === 'Recently Enhanced' ? 'bg-blue-100 text-blue-800' :
                      tag === 'AI Ready Data' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{dataset.title}</h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">{dataset.description}</p>
              
              <div className="flex items-center space-x-8 text-base text-gray-500">
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  {dataset.coverage}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  {dataset.historicalData}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">🔄</span>
                  Updated {dataset.metadata.updateFrequency}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Bookmark className="h-5 w-5 mr-2" />
                Save
              </button>
              <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
              <button 
                onClick={() => handleCreateContract('General')}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Request Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid - Wider layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Main Content - Takes more space */}
        <div className="xl:col-span-3 space-y-8">
          {/* Overview Section */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed">{dataset.description}</p>
              <p className="mt-6 text-lg leading-relaxed">
                This comprehensive dataset provides detailed insights and analytics for 
                market research, financial analysis, and strategic decision-making. 
                The data is continuously updated and maintained to ensure accuracy and relevance.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Comprehensive coverage across multiple regions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Regular updates to ensure data freshness
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Multiple delivery formats available
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Expert support and documentation included
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <MetadataSection metadata={dataset.metadata} />

          {/* Delivery Options */}
          <DeliveryOptions 
            deliveryOptions={dataset.deliveryOptions} 
            onCreateContract={handleCreateContract}
          />
        </div>

        {/* Sidebar - Narrower */}
        <div className="xl:col-span-1 space-y-8">
          {/* Q&A Box */}
          <QnABox dataset={dataset} />

          {/* Quick Access */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-900">Sample Data</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-900">Documentation</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-900">API Reference</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Datasets */}
      {relatedDatasets.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Datasets</h2>
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedDatasets.map((relatedDataset) => (
                <DatasetCard
                  key={relatedDataset.id}
                  dataset={relatedDataset}
                  onClick={onDatasetSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetDetail;