import React, { useState } from 'react';
import { Info } from 'lucide-react';
import SearchInterface from '../components/SearchInterface';
import ProductList from '../components/ProductList';
import { dataProducts } from '../data/dataProducts';
import { filterProducts } from '../utils/searchUtils';

const DataCatalogPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = filterProducts(searchTerm);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
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
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
          <SearchInterface 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onProductSelect={handleProductSelect}
            dataProducts={dataProducts}
          />
          
          <ProductList 
            products={filteredProducts}
            selectedProduct={selectedProduct}
            searchTerm={searchTerm}
            onProductSelect={handleProductSelect}
          />
        </div>
        
        {/* Right Panel - Welcome Message */}
        <div className="w-2/3 bg-white overflow-y-auto flex-shrink-0">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500 max-w-md mx-auto">
              <Info className="h-16 w-16 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Data Catalog</h2>
              <p className="text-lg text-gray-600 mb-6">
                Discover and explore your organization's data products. Click on any data product from the list to view detailed information.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-medium text-blue-900 mb-2">Getting Started:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use the search bar to find specific data products</li>
                  <li>• Browse by domain or sensitivity level</li>
                  <li>• Click on any product to see schema, lineage, and usage details</li>
                  <li>• Create data contracts directly from product pages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCatalogPage;