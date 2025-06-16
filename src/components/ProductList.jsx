import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Database, User, Clock } from 'lucide-react';
import { getSensitivityColor } from '../utils/searchUtils';

const ProductList = ({ 
  products, 
  selectedProduct, 
  searchTerm, 
  onProductSelect 
}) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    onProductSelect(product);
    navigate(`/dataCatalog/product/${product.id}`);
  };

  if (products.length === 0 && searchTerm) {
    return (
      <div className="p-8 text-center">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No exact matches found</h3>
        <p className="text-gray-500 mb-4">Try rephrasing your search or use one of our suggested queries above.</p>
        <div className="text-sm text-gray-400">
          Searched for: "{searchTerm}"
        </div>
      </div>
    );
  }

  return (
    <div>
      {products.map(product => (
        <div 
          key={product.id} 
          className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors ${
            selectedProduct?.id === product.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
          }`}
          onClick={() => handleProductClick(product)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${getSensitivityColor(product.sensitivity)}`}>
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
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Quality Score</span>
              <span className="text-xs font-medium text-gray-700">{product.quality}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  product.quality >= 95 ? 'bg-green-500' : 
                  product.quality >= 90 ? 'bg-blue-500' : 
                  product.quality >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
                style={{ width: `${product.quality}%` }}
              ></div>
            </div>
          </div>
          
          {/* Show matching columns if search term exists */}
          {searchTerm && (
            <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
              <div className="text-gray-500 mb-1">Matching columns:</div>
              <div className="flex flex-wrap gap-1">
                {product.columns
                  .filter(col => 
                    col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    col.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 3)
                  .map((col, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {col.name}
                    </span>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;