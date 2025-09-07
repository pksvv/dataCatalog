// src/discovery/components/MetadataSection.jsx

import React from 'react';
import { 
  Calendar, 
  RefreshCw, 
  FileText, 
  Globe, 
  Database,
  Clock
} from 'lucide-react';

const MetadataSection = ({ metadata }) => {
  const metadataItems = [
    {
      label: 'Update Frequency',
      value: metadata.updateFrequency,
      icon: RefreshCw,
      iconColor: 'text-blue-600'
    },
    {
      label: 'Data Format',
      value: metadata.dataFormat,
      icon: FileText,
      iconColor: 'text-green-600'
    },
    {
      label: 'Coverage',
      value: metadata.coverage,
      icon: Database,
      iconColor: 'text-purple-600'
    },
    {
      label: 'Regions',
      value: metadata.regions,
      icon: Globe,
      iconColor: 'text-orange-600'
    },
    {
      label: 'Data Since',
      value: new Date(metadata.startDate).getFullYear(),
      icon: Calendar,
      iconColor: 'text-gray-600'
    },
    {
      label: 'Last Updated',
      value: new Date(metadata.lastUpdated).toLocaleDateString(),
      icon: Clock,
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Metadata</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metadataItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <item.icon className={`h-5 w-5 mt-0.5 ${item.iconColor}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600 break-words">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Data Quality</h4>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-blue-800">Verified Source</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-blue-800">Regular Updates</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-blue-800">API Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataSection;