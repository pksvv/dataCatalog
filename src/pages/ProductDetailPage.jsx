import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Database, Shield, Clock, User, Info, 
  Eye, FileText, BarChart2, DollarSign, 
  AlertTriangle, Activity, CheckSquare, MoreVertical, ArrowRight, Download, Share, Star
} from 'lucide-react';
import { dataProducts } from '../data/dataProducts';
import { getSensitivityColor } from '../utils/searchUtils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  useEffect(() => {
    const foundProduct = dataProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const LineageNode = ({ node, type }) => {
    const getNodeColor = (nodeType) => {
      switch(nodeType) {
        case 'source': return 'bg-blue-100 border-blue-300';
        case 'process': return 'bg-purple-100 border-purple-300';
        case 'target': return 'bg-green-100 border-green-300';
        default: return 'bg-gray-100 border-gray-300';
      }
    };
    
    return (
      <div className={`p-3 rounded-lg border ${getNodeColor(node.type)} mb-2`}>
        <div className="font-medium">{node.name}</div>
        <div className="text-xs text-gray-500 capitalize">{node.type}</div>
      </div>
    );
  };

  const TabButton = ({ tabId, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tabId)}
      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
        isActive 
          ? 'border-blue-500 text-blue-600 bg-blue-50' 
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Quality Score</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{product.quality}%</p>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    product.quality >= 95 ? 'bg-green-100' : 
                    product.quality >= 90 ? 'bg-blue-100' : 
                    'bg-yellow-100'
                  }`}>
                    <BarChart2 className={`w-8 h-8 ${
                      product.quality >= 95 ? 'text-green-600' : 
                      product.quality >= 90 ? 'text-blue-600' : 
                      'text-yellow-600'
                    }`} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Queries</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{product.usage?.monthlyQueries || 'N/A'}</p>
                  </div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Contracts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{product.usage?.activeContracts || 'N/A'}</p>
                  </div>
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Cost</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{product.cost?.monthlyTotal || 'N/A'}</p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>Owner</span>
                  </div>
                  <p className="font-medium text-gray-900">{product.owner}</p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Update Frequency</span>
                  </div>
                  <p className="font-medium text-gray-900">{product.updateFrequency}</p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Sensitivity Level</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSensitivityColor(product.sensitivity)}`}>
                    {product.sensitivity}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        );

      case 'schema':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Data Schema</h3>
              <p className="text-sm text-gray-600 mt-1">Column definitions and metadata</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Column Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sensitivity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.columns.map((column, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {column.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-mono">
                          {column.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${getSensitivityColor(column.sensitivity)}`}>
                          {column.sensitivity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {column.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'lineage':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Lineage</h3>
            
            {product.lineage ? (
              <div className="flex justify-between items-start">
                {/* Upstream Sources */}
                <div className="w-1/3 pr-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Database className="h-4 w-4 mr-1 text-blue-500" />
                    Upstream Sources
                  </h4>
                  <div className="space-y-2">
                    {product.lineage.upstream.map(node => (
                      <LineageNode key={node.id} node={node} type="source" />
                    ))}
                  </div>
                </div>
                
                {/* Transformations */}
                <div className="w-1/3 px-4 flex flex-col items-center">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-1 text-purple-500" />
                    Transformations
                  </h4>
                  
                  {/* Flow arrows */}
                  <div className="flex justify-between w-full mb-4">
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                  </div>
                  
                  <div className="space-y-2 w-full">
                    {product.lineage.transformations.map(node => (
                      <LineageNode key={node.id} node={node} type="process" />
                    ))}
                  </div>
                  
                  {/* Flow arrows */}
                  <div className="flex justify-between w-full mt-4">
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                    <ArrowRight className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                
                {/* Downstream Targets */}
                <div className="w-1/3 pl-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Database className="h-4 w-4 mr-1 text-green-500" />
                    Downstream Systems
                  </h4>
                  <div className="space-y-2">
                    {product.lineage.downstream.map(node => (
                      <LineageNode key={node.id} node={node} type="target" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Lineage information not available</p>
              </div>
            )}
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            {/* Usage Metrics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-700">{product.usage?.activeContracts || 'N/A'}</div>
                  <div className="text-sm text-indigo-600">Active Data Contracts</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-700">{product.usage?.monthlyQueries || 'N/A'}</div>
                  <div className="text-sm text-indigo-600">Monthly Queries</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            {product.metrics && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{product.metrics.uptime}</div>
                    <div className="text-sm text-blue-600">Uptime</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{product.metrics.avgResponseTime}</div>
                    <div className="text-sm text-blue-600">Avg Response Time</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{product.metrics.dataQuality}</div>
                    <div className="text-sm text-blue-600">Data Quality</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{product.metrics.completeness}</div>
                    <div className="text-sm text-blue-600">Completeness</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            {/* Data Quality Metrics */}
            {product.dataQuality && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.dataQuality.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{item.metric}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.trend === "up" ? "bg-green-100 text-green-800" : 
                          item.trend === "down" ? "bg-red-100 text-red-800" : 
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"} {item.trend}
                        </span>
                      </div>
                      <div className="mt-2 text-2xl font-semibold">{item.score}%</div>
                      <div className="mt-1 text-xs text-gray-500">{item.description}</div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.score >= 90 ? "bg-green-500" : 
                            item.score >= 80 ? "bg-yellow-500" : 
                            "bg-red-500"
                          }`} 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Logs */}
            {product.logs && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Logs</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {product.logs.map((log, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              log.level === "INFO" ? "bg-blue-100 text-blue-800" : 
                              log.level === "WARN" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }`}>
                              {log.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Catalog
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{product.domain}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <Star className="h-4 w-4 mr-2" />
                Bookmark
              </button>
              <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>
              <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Data Contract
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <TabButton tabId="overview" label="Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton tabId="schema" label="Schema" isActive={activeTab === 'schema'} onClick={setActiveTab} />
            <TabButton tabId="lineage" label="Lineage" isActive={activeTab === 'lineage'} onClick={setActiveTab} />
            <TabButton tabId="usage" label="Usage & Performance" isActive={activeTab === 'usage'} onClick={setActiveTab} />
            <TabButton tabId="monitoring" label="Monitoring" isActive={activeTab === 'monitoring'} onClick={setActiveTab} />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductDetailPage;