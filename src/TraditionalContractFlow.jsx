// src/TraditionalContractFlow.jsx
// Enhanced TraditionalContractFlow.jsx with Contract Context Support + Success View

import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Database, Settings, FileText, Download, ExternalLink } from 'lucide-react';

const TraditionalContractFlow = ({ contractContext, onClearContext, onCreateAnother }) => {
  const [currentStep, setCurrentStep] = useState(contractContext ? 2 : 1);
  const [selectedProduct, setSelectedProduct] = useState(contractContext?.dataset || null);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(contractContext?.deliveryType || null);
  const [selectedColumns, setSelectedColumns] = useState([]);

  // Success state
  const [contractCreated, setContractCreated] = useState(false);
  const [contractId, setContractId] = useState(null);

  useEffect(() => {
    if (contractContext) {
      setSelectedProduct(contractContext.dataset);
      setSelectedDeliveryType(contractContext.deliveryType);
      setCurrentStep(2);
    }
  }, [contractContext]);

  const steps = [
    { id: 1, name: 'Select Product', icon: Database },
    { id: 2, name: 'Configure Delivery', icon: Settings },
    { id: 3, name: 'Select Columns', icon: FileText },
    { id: 4, name: 'Review Contract', icon: CheckCircle }
  ];

  const deliveryOptions = selectedProduct?.deliveryOptions || [
    { name: 'Type A API', description: 'REST API with real-time access', config: ['endpoint', 'authentication', 'rate_limit'] },
    { name: 'Type B Feed', description: 'Excel Add-In for bulk downloads', config: ['schedule', 'format', 'location'] },
    { name: 'Type C Platform', description: 'SFTP SnowFlake integration', config: ['connection', 'schema', 'frequency'] },
    { name: 'Type D Gateway', description: 'Custom data feeds', config: ['protocol', 'format', 'delivery'] }
  ];

  const handleNext = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleClearContext = () => {
    onClearContext?.();
    setSelectedProduct(null);
    setSelectedDeliveryType(null);
    setSelectedColumns([]);
    setCurrentStep(1);
  };

  const handleCreateContract = () => {
    const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
    const id = `CON-${new Date().getFullYear()}-${rand}`;
    setContractId(id);
    setContractCreated(true);
  };

  // NEW: when "Create Another" is clicked, go to Discovery if parent provided a handler
  const handleStartNew = () => {
    if (onCreateAnother) {
      onCreateAnother(); // parent moves to discovery
    } else {
      // fallback: reset local flow
      setContractCreated(false);
      setContractId(null);
      handleClearContext();
    }
  };

  // Success / registration screen
  if (contractCreated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contract Registered</h1>
        <p className="text-lg text-gray-600">Your contract has been closed and registered successfully.</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contract ID</h2>
              <p className="font-mono text-blue-700 text-lg">{contractId}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ● Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">Dataset</h3>
              <p className="text-sm text-gray-700">{selectedProduct?.title || selectedProduct?.name || '—'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">Delivery</h3>
              <p className="text-sm text-gray-700">{selectedDeliveryType || '—'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">Fields</h3>
              <p className="text-sm text-gray-700">{selectedColumns?.length || 0} selected</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ExternalLink className="h-5 w-5 mr-2" />
            View in Dashboard
          </button>
          <button className="flex items-center px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Download Contract
          </button>
          <button
            onClick={handleStartNew}
            className="flex items-center px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Create Another
          </button>
        </div>
      </div>
    );
  }

  // Normal flow
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Data Contract</h1>
            {contractContext && (
              <div className="mt-2 flex items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mr-3">
                  Pre-filled from Discovery: {contractContext.dataset.title}
                </span>
                <button
                  onClick={handleClearContext}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear and start fresh
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  </div>
                )}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      currentStep > step.id
                        ? 'bg-indigo-600 text-white'
                        : currentStep === step.id
                        ? 'border-2 border-indigo-600 bg-white text-indigo-600'
                        : 'border-2 border-gray-300 bg-white text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 mb-8">
        {currentStep === 1 && (
          <ProductSelectionStep onProductSelect={setSelectedProduct} selectedProduct={selectedProduct} />
        )}
        {currentStep === 2 && (
          <DeliveryConfigurationStep
            selectedProduct={selectedProduct}
            contractContext={contractContext}
            deliveryOptions={deliveryOptions}
            selectedDeliveryType={selectedDeliveryType}
            onDeliverySelect={setSelectedDeliveryType}
          />
        )}
        {currentStep === 3 && (
          <ColumnSelectionStep selectedProduct={selectedProduct} onColumnsSelect={setSelectedColumns} />
        )}
        {currentStep === 4 && (
          <ReviewStep
            selectedProduct={selectedProduct}
            selectedDeliveryType={selectedDeliveryType}
            selectedColumns={selectedColumns}
            contractContext={contractContext}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleCreateContract}
            className="flex items-center px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Create Contract
          </button>
        )}
      </div>
    </div>
  );
};

// Step 1
const ProductSelectionStep = ({ onProductSelect, selectedProduct }) => {
  const mockProducts = [
    {
      id: 'customer-360',
      name: 'Customer 360',
      description: 'Comprehensive customer data including demographics, transactions, and preferences',
      category: 'Customer',
      frequency: 'Daily',
      quality: 92
    },
    {
      id: 'product-inventory',
      name: 'Product Inventory',
      description: 'Current inventory levels, locations, and product details',
      category: 'Product',
      frequency: 'Real-time',
      quality: 97
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Data Product</h2>
      <p className="text-gray-600 mb-6">Choose the data product you want to create a contract for.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductSelect(product)}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedProduct?.id === product.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <div className="flex items-center mt-3 space-x-4">
              <span className="text-xs text-gray-500">📊 {product.category}</span>
              <span className="text-xs text-gray-500">🔄 {product.frequency}</span>
              <span className="text-xs text-gray-500">Quality: {product.quality}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 2
const DeliveryConfigurationStep = ({
  selectedProduct,
  contractContext,
  deliveryOptions,
  selectedDeliveryType,
  onDeliverySelect
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Delivery</h2>
      {contractContext && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>Selected from Discovery:</strong> {contractContext.dataset.title}
          </p>
          <p className="text-blue-700 text-sm mt-1">
            Recommended delivery type: {contractContext.deliveryType}
          </p>
        </div>
      )}

      <p className="text-gray-600 mb-6">Choose how you want to receive the data.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => onDeliverySelect(option.name)}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedDeliveryType === option.name
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h3 className="font-semibold text-gray-900">{option.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            {contractContext?.deliveryType === option.name && (
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                Recommended from Discovery
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 3
const ColumnSelectionStep = ({ selectedProduct, onColumnsSelect }) => {
  const [selectedColumns, setSelectedColumnsLocal] = useState([]);

  const getColumnsForDataset = (dataset) => {
    if (dataset?.schema) return dataset.schema;
    return [
      { name: 'id', type: 'string', description: 'Unique identifier' },
      { name: 'timestamp', type: 'datetime', description: 'Record timestamp' },
      { name: 'value', type: 'number', description: 'Primary value field' }
    ];
  };

  const availableColumns = getColumnsForDataset(selectedProduct);

  const handleColumnToggle = (column) => {
    const updated = selectedColumns.includes(column.name)
      ? selectedColumns.filter((c) => c !== column.name)
      : [...selectedColumns, column.name];
    setSelectedColumnsLocal(updated);
    onColumnsSelect(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Columns</h2>
      <p className="text-gray-600 mb-2">Choose which data fields you need in your contract.</p>
      {selectedProduct && (
        <p className="text-sm text-blue-600 mb-6">
          Available columns for: <strong>{selectedProduct.title || selectedProduct.name}</strong>
        </p>
      )}

      <div className="space-y-3">
        {availableColumns.map((column) => (
          <label key={column.name} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedColumns.includes(column.name)}
              onChange={() => handleColumnToggle(column)}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <span className="font-medium text-gray-900">{column.name}</span>
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{column.type}</span>
              </div>
              <p className="text-sm text-gray-600">{column.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// Step 4
const ReviewStep = ({ selectedProduct, selectedDeliveryType, selectedColumns, contractContext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Contract</h2>
      <p className="text-gray-600 mb-6">Review your data contract configuration before creating.</p>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Data Product</h3>
          {contractContext ? (
            <div>
              <p className="text-gray-900">{contractContext.dataset.title}</p>
              <p className="text-sm text-gray-600">{contractContext.dataset.description}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                From Discovery Flow
              </span>
            </div>
          ) : (
            <p className="text-gray-900">{selectedProduct?.name}</p>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Delivery Method</h3>
          <p className="text-gray-900">{selectedDeliveryType || '—'}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Selected Columns</h3>
          <p className="text-gray-600">{selectedColumns.length} columns selected</p>
          {selectedColumns.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedColumns.map((column) => (
                <span key={column} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {column}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraditionalContractFlow;