import React, { useState } from 'react';
import { Search, Database, Shield, Clock, User, Info, Star, Tag } from 'lucide-react';

const DataCatalogInterface = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Mock data products
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

  // Filter function for search (simplified)
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = dataProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };
  
  const getSensitivityColor = (level) => {
    switch(level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-blue-800">Data Discoverability</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Data Contract
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Product List */}
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search data products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <span>Filters:</span>
              <button className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Domain: All
              </button>
              <button className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Sensitivity: All
              </button>
            </div>
          </div>
          
          {/* Product List */}
          <div>
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 ${selectedProduct?.id === product.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSensitivityColor(product.sensitivity)}`}>
                    {product.sensitivity}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 mr-1" />
                    <span>{product.domain}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{product.owner}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{product.updateFrequency}</span>
                  </div>
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
        
        {/* Right Panel - Product Details */}
        <div className="w-2/3 bg-white overflow-y-auto">
          {selectedProduct ? (
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Create Contract
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    View Lineage
                  </button>
                </div>
              </div>
              
              <p className="mt-2 text-gray-600">{selectedProduct.description}</p>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>Owner</span>
                  </div>
                  <p className="mt-1 font-medium">{selectedProduct.owner}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Update Frequency</span>
                  </div>
                  <p className="mt-1 font-medium">{selectedProduct.updateFrequency}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Sensitivity</span>
                  </div>
                  <p className={`mt-1 font-medium ${getSensitivityColor(selectedProduct.sensitivity)}`}>
                    {selectedProduct.sensitivity}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Available Columns</h3>
                <div className="mt-4 border border-gray-200 rounded overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                        <tr key={index} className="hover:bg-gray-50">
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
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Usage & Metrics</h3>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-semibold">24</div>
                    <div className="text-sm text-gray-500">Active Contracts</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-semibold">1.2M</div>
                    <div className="text-sm text-gray-500">Monthly Queries</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-semibold">99.8%</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-semibold">42ms</div>
                    <div className="text-sm text-gray-500">Avg. Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Info className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-lg">Select a data product to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCatalogInterface;