// src/discovery/components/DeliveryOptions.jsx

import React from 'react';
import { 
  Zap, 
  Download, 
  Cloud, 
  Settings,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const DeliveryOptions = ({ deliveryOptions, onCreateContract }) => {
  const getIcon = (optionName) => {
    switch (optionName) {
      case 'Type A API':
        return Zap;
      case 'Type B Feed':
        return Download;
      case 'Type C Platform':
        return Cloud;
      case 'Type D Gateway':
        return Settings;
      default:
        return Settings;
    }
  };

  const getIconColor = (optionName) => {
    switch (optionName) {
      case 'Type A API':
        return 'text-blue-600';
      case 'Type B Feed':
        return 'text-green-600';
      case 'Type C Platform':
        return 'text-purple-600';
      case 'Type D Gateway':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleCreateContract = (optionType) => {
    // This will navigate to contract creation page
    if (onCreateContract) {
      onCreateContract(optionType);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Options</h3>
      
      <div className="space-y-4">
        {deliveryOptions.map((option, index) => {
          const Icon = getIcon(option.name);
          const iconColor = getIconColor(option.name);
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon className={`h-6 w-6 mt-0.5 ${iconColor}`} />
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900">{option.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Available
                      </span>
                      {option.name === 'Type A API' && (
                        <span className="text-sm text-blue-600 font-medium">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCreateContract(option.name)}
                  className="ml-4 flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  <span>Create Contract</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Need Custom Integration?</h4>
        <p className="text-sm text-gray-600 mb-3">
          We can provide custom delivery options tailored to your specific requirements.
        </p>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Talk to an Expert →
        </button>
      </div>
    </div>
  );
};

export default DeliveryOptions;