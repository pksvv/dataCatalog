import React, { useState } from 'react';
import { ArrowRight, Database, Check, Server, FileText, Clock, Settings, Download, Copy, AlertCircle, PieChart } from 'lucide-react';

const TraditionalContractFlow = () => {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Product Selection
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Step 2: Column Selection
  const [selectedColumns, setSelectedColumns] = useState([]);
  
  // Step 3: Delivery Configuration
  const [deliveryConfig, setDeliveryConfig] = useState({
    mechanism: 'api',
    format: 'json',
    frequency: 'daily',
    visualizationTool: null // Added for visualization tools
  });
  
  // Step 4: Contract Summary
  const [contractId, setContractId] = useState('');
  
  // Mock data products (same as in Data Catalog Interface)
  const dataProducts = [
    {
      id: 1,
      name: "Customer 360",
      description: "Comprehensive customer data including demographics, transactions, and preferences",
      owner: "Customer Analytics Team",
      updateFrequency: "Daily",
      sensitivity: "High",
      quality: 92,
      domain: "Customer",
      columns: [
        { name: "customer_id", type: "string", sensitivity: "low", description: "Unique identifier for the customer" },
        { name: "full_name", type: "string", sensitivity: "medium", description: "Customer's full name" },
        { name: "email", type: "string", sensitivity: "high", description: "Customer's email address" },
        { name: "phone", type: "string", sensitivity: "high", description: "Customer's phone number" },
        { name: "address", type: "string", sensitivity: "high", description: "Customer's physical address" },
        { name: "segment", type: "string", sensitivity: "medium", description: "Customer segment category" },
        { name: "lifetime_value", type: "number", sensitivity: "medium", description: "Calculated lifetime value of customer" },
        { name: "acquisition_date", type: "date", sensitivity: "low", description: "Date when customer was acquired" },
        { name: "last_purchase_date", type: "date", sensitivity: "low", description: "Date of customer's most recent purchase" }
      ]
    },
    {
      id: 2,
      name: "Product Inventory",
      description: "Current inventory levels, locations, and product details",
      owner: "Supply Chain Management",
      updateFrequency: "Real-time",
      sensitivity: "Medium",
      quality: 97,
      domain: "Product",
      columns: [
        { name: "product_id", type: "string", sensitivity: "low", description: "Unique identifier for the product" },
        { name: "product_name", type: "string", sensitivity: "low", description: "Name of the product" },
        { name: "category", type: "string", sensitivity: "low", description: "Product category" },
        { name: "current_stock", type: "number", sensitivity: "medium", description: "Current inventory level" },
        { name: "warehouse_id", type: "string", sensitivity: "low", description: "Identifier for warehouse location" },
        { name: "reorder_level", type: "number", sensitivity: "low", description: "Level at which reordering is triggered" },
        { name: "supplier_id", type: "string", sensitivity: "medium", description: "Identifier for the supplier" },
        { name: "cost_price", type: "number", sensitivity: "high", description: "Cost price of the product" },
        { name: "last_restock_date", type: "date", sensitivity: "low", description: "Date of last inventory restock" }
      ]
    },
    {
      id: 3,
      name: "Sales Transactions",
      description: "Detailed record of all sales transactions across channels",
      owner: "Finance Department",
      updateFrequency: "Hourly",
      sensitivity: "High",
      quality: 95,
      domain: "Sales",
      columns: [
        { name: "transaction_id", type: "string", sensitivity: "low", description: "Unique identifier for the transaction" },
        { name: "customer_id", type: "string", sensitivity: "medium", description: "Identifier of the customer" },
        { name: "product_id", type: "string", sensitivity: "low", description: "Identifier of the product" },
        { name: "quantity", type: "number", sensitivity: "low", description: "Quantity of products purchased" },
        { name: "unit_price", type: "number", sensitivity: "medium", description: "Price per unit" },
        { name: "discount", type: "number", sensitivity: "medium", description: "Discount applied to the transaction" },
        { name: "total_amount", type: "number", sensitivity: "high", description: "Total transaction amount" },
        { name: "payment_method", type: "string", sensitivity: "medium", description: "Method of payment" },
        { name: "transaction_date", type: "date", sensitivity: "low", description: "Date and time of the transaction" },
        { name: "store_id", type: "string", sensitivity: "low", description: "Identifier of the store where transaction occurred" }
      ]
    }
  ];
  
  // Helper functions
  const getSensitivityColor = (level) => {
    switch(level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedColumns([]);
  };
  
  const handleColumnToggle = (column) => {
    if (selectedColumns.some(col => col.name === column.name)) {
      setSelectedColumns(selectedColumns.filter(col => col.name !== column.name));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedProduct) return;
    if (currentStep === 2 && selectedColumns.length === 0) return;
    
    if (currentStep === 3) {
      // Generate a random contract ID for demonstration
      setContractId(`DC-${Math.floor(Math.random() * 10000)}-${new Date().getTime().toString().slice(-4)}`);
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Visualization tools selection
  const handleVisToolSelect = (tool) => {
    setDeliveryConfig({...deliveryConfig, visualizationTool: tool});
  };
  
  // Render functions for each step
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              <Database className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Select Product</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              <Check className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Select Columns</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              <Settings className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Configure Delivery</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 4 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Review Contract</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderProductSelection = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Data Product</h2>
        <p className="text-gray-600 mb-6">Choose the data product you want to create a contract for.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {dataProducts.map(product => (
            <div 
              key={product.id} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedProduct?.id === product.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-1" />
                      <span>{product.domain}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{product.updateFrequency}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getSensitivityColor(product.sensitivity)}`}>
                  {product.sensitivity}
                </span>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full" 
                    style={{ width: `${product.quality}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Quality Score</span>
                  <span>{product.quality}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderColumnSelection = () => {
    if (!selectedProduct) return null;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Select Columns</h2>
          <div className="text-sm text-gray-600">
            {selectedColumns.length} of {selectedProduct.columns.length} columns selected
          </div>
        </div>
        <p className="text-gray-600 mb-6">Choose the specific data elements you want to include in your contract.</p>
        
        <div className="mb-4">
          <button 
            className="px-3 py-1 text-sm border border-gray-300 rounded mr-2 hover:bg-gray-50"
            onClick={() => setSelectedColumns(selectedProduct.columns)}
          >
            Select All
          </button>
          <button 
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
            onClick={() => setSelectedColumns([])}
          >
            Clear All
          </button>
        </div>
        
        <div className="border border-gray-200 rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Select
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sensitivity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedProduct.columns.map((column, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleColumnToggle(column)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedColumns.some(col => col.name === column.name)}
                        onChange={() => {}}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {column.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSensitivityColor(column.sensitivity)}`}>
                      {column.sensitivity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {column.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedColumns.length === 0 && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Please select at least one column to continue.</span>
          </div>
        )}
      </div>
    );
  };
  
  const renderDeliveryConfiguration = () => {
    // Visualization tools options
    const visualizationTools = [
      { id: 'powerbi', name: 'Power BI', description: 'Connect directly to Microsoft Power BI' },
      { id: 'tableau', name: 'Tableau', description: 'Integrate with Tableau dashboards' },
      { id: 'looker', name: 'Looker', description: 'Connect to Google Looker Studio' },
      { id: 'quicksight', name: 'QuickSight', description: 'Use with Amazon QuickSight' }
    ];
    
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Delivery</h2>
        <p className="text-gray-600 mb-6">Specify how you want to receive the data from this contract.</p>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Delivery Mechanism */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Mechanism</label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'api' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'api', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <Server className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-center font-medium">REST API</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Query data on-demand with our REST endpoints</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'sftp' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'sftp', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <Download className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-center font-medium">SFTP Transfer</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Scheduled file delivery to your SFTP server</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'graphql' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'graphql', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 400 400" fill="currentColor">
                    <path d="M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z" />
                    <path d="M39.8 272.2h320.3v16.6H39.8z" />
                    <path d="M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z" />
                    <path d="M54.482 132.883l-8.3-14.375 160.21-92.5 8.3 14.376z" />
                    <path d="M342.568 302.663l-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5zM330.9 107.5h16.6v185h-16.6z" />
                    <path d="M203.522 367l-7.25-12.558 139.34-80.45 7.25 12.557z" />
                    <path d="M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9" />
                  </svg>
                </div>
                <h3 className="text-center font-medium">GraphQL</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Flexible querying with GraphQL schema</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Pub/Sub Messaging */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'pubsub' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'pubsub', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h.01"/>
                    <path d="M12 10h.01"/>
                    <path d="M16 10h.01"/>
                  </svg>
                </div>
                <h3 className="text-center font-medium">Pub/Sub Messaging</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Real-time event-driven data streaming</p>
              </div>
              
              {/* Visualization Tools Button */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'visualization' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'visualization', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <PieChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-center font-medium">Visualization Tools</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Direct integration with popular BI platforms</p>
              </div>
            </div>
          </div>
          
          {/* Visualization Tool Selection (only shown when visualization mechanism is selected) */}
          {deliveryConfig.mechanism === 'visualization' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Visualization Tool</label>
              <div className="grid grid-cols-2 gap-4">
                {visualizationTools.map(tool => (
                  <div 
                    key={tool.id}
                    className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.visualizationTool === tool.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                    onClick={() => handleVisToolSelect(tool.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{tool.name}</h3>
                      {deliveryConfig.visualizationTool === tool.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Visualization Tool Configuration */}
              {deliveryConfig.visualizationTool && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {visualizationTools.find(t => t.id === deliveryConfig.visualizationTool)?.name} Configuration
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Connection Method</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Direct Connection</option>
                        <option>OAuth 2.0</option>
                        <option>API Key</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Refresh Schedule</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Automatic</option>
                        <option>On-Demand</option>
                        <option>Scheduled</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Only show Format Options if not using visualization tools or pub/sub */}
          {deliveryConfig.mechanism !== 'visualization' && deliveryConfig.mechanism !== 'pubsub' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'json'})}
                >
                  JSON
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'csv' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'csv'})}
                >
                  CSV
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'xml' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'xml'})}
                >
                  XML
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'parquet' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'parquet'})}
                >
                  Parquet
                </button>
              </div>
            </div>
          )}
          
          {/* Only show Refresh Frequency if not using visualization tools or pub/sub */}
          {deliveryConfig.mechanism !== 'visualization' && deliveryConfig.mechanism !== 'pubsub' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Frequency</label>
              <div className="grid grid-cols-4 gap-4">
                <button 
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'realtime' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'realtime'})}
                >
                  <span className="text-sm font-medium">Daily</span>
                  <span className="text-xs mt-1">Once per day</span>
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'weekly'})}
                >
                  <span className="text-sm font-medium">Weekly</span>
                  <span className="text-xs mt-1">Once per week</span>
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'monthly'})}
                >
                  <span className="text-sm font-medium">Monthly</span>
                  <span className="text-xs mt-1">Once per month</span>
                </button>
              </div>
            </div>
          )}
          
          {deliveryConfig.mechanism === 'sftp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SFTP Connection Details</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Server Address</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="sftp.yourdomain.com" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Port</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="22" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Username</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Authentication Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>SSH Key</option>
                    <option>Password</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {deliveryConfig.mechanism === 'pubsub' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pub/Sub Configuration</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Message Broker</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Apache Kafka</option>
                    <option>Azure Service Bus</option>
                    <option>AWS SQS/SNS</option>
                    <option>Google Pub/Sub</option>
                    <option>RabbitMQ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Topic/Queue Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="data-product-updates"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Message Format</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>JSON</option>
                    <option>Avro</option>
                    <option>Protobuf</option>
                    <option>XML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Delivery Guarantee</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>At Least Once</option>
                    <option>At Most Once</option>
                    <option>Exactly Once</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-medium text-gray-800 mb-2">Pub/Sub Event Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Trigger Events</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Data Updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Schema Changes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Quality Alerts</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Batch Size</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="1000"
                      defaultValue="1000"
                    />
                    <label className="block text-xs text-gray-500 mb-1 mt-2">Max Wait Time (seconds)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="30"
                      defaultValue="30"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional config details based on mechanism selected */}
          {deliveryConfig.mechanism === 'api' && (
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-2">API Access Details</h3>
              <p className="text-sm text-gray-600 mb-4">
                You'll receive API credentials once the contract is created. The API follows RESTful principles
                and includes authentication, rate limiting, and detailed documentation.
              </p>
              <div className="text-sm text-gray-700">
                <div className="mb-1"><strong>Authentication:</strong> OAuth 2.0 / API Key</div>
                <div className="mb-1"><strong>Rate Limits:</strong> 1000 requests per hour</div>
                <div><strong>Documentation:</strong> Will be provided with your contract</div>
              </div>
            </div>
          )}

          {deliveryConfig.mechanism === 'graphql' && (
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-2">GraphQL Schema Preview</h3>
              <p className="text-sm text-gray-600 mb-2">
                Here's a preview of the GraphQL schema based on your selected data:
              </p>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`type Query {
  ${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') : 'Product'}(
    id: ID!
  ): ${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') : 'Product'}
  
  ${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') + 's' : 'Products'}(
    limit: Int
    offset: Int
    filter: ${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') : 'Product'}FilterInput
  ): [${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') : 'Product'}!]!
}

type ${selectedProduct ? selectedProduct.name.replace(/\s+/g, '') : 'Product'} {
${selectedColumns.map(col => `  ${col.name}: ${col.type === 'string' ? 'String' : col.type === 'number' ? 'Float' : 'String'}!`).join('\n')}
}`}
              </pre>
            </div>
          )}

          {deliveryConfig.mechanism === 'pubsub' && (
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-2">Pub/Sub Message Preview</h3>
              <p className="text-sm text-gray-600 mb-2">
                Here's a sample of the message format you'll receive:
              </p>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "eventType": "data_update",
  "timestamp": "2025-05-25T10:30:00Z",
  "contractId": "sample-contract-id",
  "dataProduct": "${selectedProduct ? selectedProduct.name : 'Product Name'}",
  "messageId": "msg-12345-abcde",
  "payload": {
${selectedColumns.map(col => `    "${col.name}": "sample_value"`).join(',\n')}
  },
  "metadata": {
    "source": "data-platform",
    "version": "1.0",
    "batchSize": 1000
  }
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderContractSummary = () => {
    if (!selectedProduct || !contractId) return null;
    
    return (
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-green-100 rounded-full p-1 mr-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Contract Created Successfully!</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">Your data contract has been created and is now ready to use. You'll receive an email with the full details.</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Contract Summary</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Share
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Contract ID</div>
              <div className="flex items-center mt-1">
                <div className="font-medium text-gray-900">{contractId}</div>
                <button className="ml-2 text-blue-600 hover:text-blue-800">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="mt-1">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Created</div>
              <div className="font-medium text-gray-900 mt-1">{new Date().toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Expires</div>
              <div className="font-medium text-gray-900 mt-1">No expiration</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Data Product</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedProduct.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getSensitivityColor(selectedProduct.sensitivity)}`}>
                  {selectedProduct.sensitivity}
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Selected Columns</h4>
              <span className="text-sm text-gray-500">{selectedColumns.length} columns</span>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {selectedColumns.map((column, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getSensitivityColor(column.sensitivity).replace('text-', 'bg-').replace('-100', '-600')}`}></div>
                    <span className="text-sm">{column.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Delivery Configuration</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Mechanism</div>
                  <div className="font-medium text-gray-900 mt-1 capitalize">
                    {deliveryConfig.mechanism === 'visualization' 
                      ? 'Visualization Tools' 
                      : deliveryConfig.mechanism === 'pubsub'
                      ? 'Pub/Sub Messaging'
                      : deliveryConfig.mechanism}
                  </div>
                </div>
                
                {deliveryConfig.mechanism === 'visualization' ? (
                  <div>
                    <div className="text-sm text-gray-500">Tool</div>
                    <div className="font-medium text-gray-900 mt-1">
                      {deliveryConfig.visualizationTool === 'powerbi' && 'Power BI'}
                      {deliveryConfig.visualizationTool === 'tableau' && 'Tableau'}
                      {deliveryConfig.visualizationTool === 'looker' && 'Looker'}
                      {deliveryConfig.visualizationTool === 'quicksight' && 'QuickSight'}
                    </div>
                  </div>
                ) : deliveryConfig.mechanism === 'pubsub' ? (
                  <div>
                    <div className="text-sm text-gray-500">Broker</div>
                    <div className="font-medium text-gray-900 mt-1">Apache Kafka</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-gray-500">Format</div>
                    <div className="font-medium text-gray-900 mt-1 uppercase">{deliveryConfig.format}</div>
                  </div>
                )}
                
                {deliveryConfig.mechanism !== 'visualization' && deliveryConfig.mechanism !== 'pubsub' && (
                  <div>
                    <div className="text-sm text-gray-500">Frequency</div>
                    <div className="font-medium text-gray-900 mt-1 capitalize">{deliveryConfig.frequency}</div>
                  </div>
                )}
                
                {deliveryConfig.mechanism === 'visualization' && (
                  <div>
                    <div className="text-sm text-gray-500">Connection</div>
                    <div className="font-medium text-gray-900 mt-1">Direct Connection</div>
                  </div>
                )}

                {deliveryConfig.mechanism === 'pubsub' && (
                  <div>
                    <div className="text-sm text-gray-500">Message Format</div>
                    <div className="font-medium text-gray-900 mt-1">JSON</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Access Instructions</h3>
          
          {deliveryConfig.mechanism === 'api' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Your API Credentials</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">API Key</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value="••••••••••••••••••••••••••" 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Secret</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value="••••••••••••••••••••••••••" 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sample API Request</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`curl -X GET "https://api.enterprise.com/v1/${selectedProduct.name.toLowerCase().replace(/\s+/g, '-')}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </div>
              </div>
            </div>
          )}
          
          {deliveryConfig.mechanism === 'graphql' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">GraphQL Endpoint</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    value={`https://graphql.enterprise.com/v1`} 
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded" 
                    readOnly 
                  />
                  <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sample Query</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`query {
  ${selectedProduct.name.replace(/\s+/g, '')}s(limit: 10) {
${selectedColumns.map(col => `    ${col.name}`).join('\n')}
  }
}`}
                </div>
              </div>
            </div>
          )}
          
          {deliveryConfig.mechanism === 'sftp' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">SFTP Information</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">File Path</div>
                      <div className="font-medium text-gray-900 mt-1">/incoming/{contractId}/</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">File Name Pattern</div>
                      <div className="font-medium text-gray-900 mt-1">{selectedProduct.name.toLowerCase().replace(/\s+/g, '_')}_{`{YYYY-MM-DD}`}.{deliveryConfig.format}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">SSH Public Key</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                  <code className="break-all">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6X7kNHW/aT1so/GkrMjv6YdsknI1aA9sjkBIwCmg0Y6BQHcVmPOLQM+7IFPGA7lqF0JgX7ReSWRq7r1D3dX5J0Jgn4iVWv/5VRZj9sTgNh/Bzv6wH8jKbW0H/MXuT/EFu7Ibvi88CyjKfOEYjrxlpH+Q3fDW4xEFYGla/Lb2U49CFxRPXnDlGUZxSsABbdVFgTGEF/DnJcCpFc0BI4LdDbR+7nJITZ+F9p1k6XrQqL5MPREQftB2a+qgKnDRSKWLxVXPz3SvjOw3EERPXX6p5XTW4dQzKUHjyqT4CUYVFJNxS/XJ...</code>
                </div>
              </div>
            </div>
          )}
          
          {deliveryConfig.mechanism === 'pubsub' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Pub/Sub Connection Details</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Topic Name</div>
                      <div className="font-medium text-gray-900 mt-1">data-product-{contractId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Message Broker</div>
                      <div className="font-medium text-gray-900 mt-1">Apache Kafka</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Subscription ID</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value={`sub-${contractId}`} 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Access Token</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value="••••••••••••••••••••••••••" 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Message Schema</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "eventType": "data_update",
  "timestamp": "2025-05-25T10:30:00Z",
  "contractId": "${contractId}",
  "dataProduct": "${selectedProduct.name}",
  "payload": {
${selectedColumns.map(col => `    "${col.name}": "value"`).join(',\n')}
  },
  "metadata": {
    "source": "data-platform",
    "version": "1.0",
    "batchSize": 1000
  }
}`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Consumer Setup Instructions</h4>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Configure your Kafka consumer with the provided topic name</li>
                    <li>Use the subscription ID for tracking consumption progress</li>
                    <li>Authenticate using the provided access token</li>
                    <li>Process incoming messages according to the schema above</li>
                    <li>Implement proper error handling and acknowledgment</li>
                  </ol>
                  
                  <div className="mt-4">
                    <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'data-product-${contractId}',
    bootstrap_servers=['kafka.enterprise.com:9092'],
    security_protocol='SASL_SSL',
    sasl_mechanism='PLAIN',
    sasl_plain_username='${contractId}',
    sasl_plain_password='YOUR_ACCESS_TOKEN',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

for message in consumer:
    data = message.value
    print(f"Received: {data['eventType']} at {data['timestamp']}")
    # Process your data here
    process_data(data['payload'])`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Visualization Tool Access Instructions */}
          {deliveryConfig.mechanism === 'visualization' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Connection Details</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Data Source Name</div>
                      <div className="font-medium text-gray-900 mt-1">{selectedProduct.name} Data Source</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Connection Type</div>
                      <div className="font-medium text-gray-900 mt-1">Direct Connection</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Connection ID</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value={`vis-${contractId}`} 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Access Token</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value="••••••••••••••••••••••••••" 
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Integration Steps</h4>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Open your {deliveryConfig.visualizationTool === 'powerbi' ? 'Power BI Desktop' : 
                                  deliveryConfig.visualizationTool === 'tableau' ? 'Tableau Desktop' : 
                                  deliveryConfig.visualizationTool === 'looker' ? 'Looker Studio' : 
                                  'QuickSight'} application</li>
                    <li>Navigate to "Add Data Source" or "Connect to Data"</li>
                    <li>Select "Enterprise Data Contract" from the connectors list</li>
                    <li>Enter the Connection ID and Access Token provided above</li>
                    <li>Select the tables/fields you want to include in your visualization</li>
                    <li>Create your reports and dashboards using the connected data</li>
                  </ol>
                </div>
              </div>
              
              {/* Sample visualization preview based on selected tool */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Sample Dashboard Preview</h4>
                <div className="bg-gray-100 border border-gray-200 rounded h-48 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-500">
                      {`A preview of your ${selectedProduct.name} data in ${
                        deliveryConfig.visualizationTool === 'powerbi' ? 'Power BI' : 
                        deliveryConfig.visualizationTool === 'tableau' ? 'Tableau' : 
                        deliveryConfig.visualizationTool === 'looker' ? 'Looker Studio' : 
                        'QuickSight'} will appear here after connection`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Main component render
  return (
    <div className="bg-white shadow-sm rounded-lg max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Data Contract</h1>
      
      {renderStepIndicator()}
      
      <div className="mt-8">
        {currentStep === 1 && renderProductSelection()}
        {currentStep === 2 && renderColumnSelection()}
        {currentStep === 3 && renderDeliveryConfiguration()}
        {currentStep === 4 && renderContractSummary()}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        {currentStep > 1 ? (
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 4 ? (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !selectedProduct) || 
              (currentStep === 2 && selectedColumns.length === 0) ||
              (currentStep === 3 && deliveryConfig.mechanism === 'visualization' && !deliveryConfig.visualizationTool)
            }
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default TraditionalContractFlow;