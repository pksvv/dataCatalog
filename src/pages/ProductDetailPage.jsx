import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Database, Shield, Clock, User, Info, 
  Eye, FileText, BarChart2, DollarSign, 
  AlertTriangle, Activity, CheckSquare, MoreVertical, ArrowRight, Download, Share, Star, Bookmark, Code, Copy
} from 'lucide-react';
import { dataProducts } from '../data/dataProducts';
import { getSensitivityColor } from '../utils/searchUtils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('documentation');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
      case 'documentation':
        return (
          <div className="space-y-8">
            {/* Supporting Documents */}
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Supporting Documents</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Documentation</h3>
                  <ul className="space-y-1 text-blue-600">
                    <li><a href="#" className="hover:underline">Product Overview</a></li>
                    <li><a href="#" className="hover:underline">Coverage & Data Organization</a></li>
                    <li><a href="#" className="hover:underline">Column Definitions</a></li>
                    <li><a href="#" className="hover:underline">Getting started with the API</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Product Overview */}
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description} This data product provides comprehensive information with 
                high quality standards and reliable delivery mechanisms.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Delivery:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Primary Updates: {product.updateFrequency}</li>
                  <li>Quality Score: {product.quality}% accuracy and completeness</li>
                  <li>Data Sensitivity: {product.sensitivity} level security classification</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Benefits & Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>Normalized data format:</strong> Consistent data types and formats across all sources</li>
                <li><strong>Complete coverage:</strong> {product.domain} with comprehensive data points</li>
                <li><strong>High quality:</strong> {product.quality}% quality score with automated validation</li>
                <li><strong>Real-time updates:</strong> {product.updateFrequency} refresh cycle</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Provider</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>{product.owner}</strong> is a leading provider of enterprise data solutions. 
                This data offering is part of our comprehensive suite of products designed to provide 
                significant value to customers in making informed decisions.
              </p>
            </div>
            
            {/* Coverage & Data Organization */}
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coverage & Data Organization</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Coverage</h3>
              <p className="text-gray-700 mb-6">{product.domain} with comprehensive data across all relevant sources.</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Organization</h3>
              <p className="text-gray-700 mb-4">
                This product can be accessed via the Data Platform API.
              </p>
              <p className="text-gray-700 mb-6">
                To programmatically access individual tables in this product, you need the Table Code 
                for the specific table you are interested in. The Table Codes for all tables in this product are listed below.
              </p>
              
              {/* Table Codes */}
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Table</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Table Code</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-sm text-gray-900">{product.name}</td>
                      <td className="py-2 text-sm text-blue-600 font-mono">DP/{product.id}</td>
                      <td className="py-2 text-sm text-gray-700">{product.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'usage':
        return (
          <div className="space-y-8">
            {/* API Usage Examples */}
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
              <p className="text-gray-700 mb-6">
                You can try any of these API calls by pasting them into your browser window. 
                Users with programming experience can use wget or curl to run these calls from the command line.
              </p>
              
              <div className="space-y-6">
                {/* Filter Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">FILTER BY DATE AND CRITERIA</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <code>
                      https://api.dataplatform.com/v1/products/DP/{product.id}?date.eq=2024-03-20&filter.eq=value&api_key=&lt;YOURAPIKEY&gt;
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">FILTER BY DATE RANGE</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <code>
                      https://api.dataplatform.com/v1/products/DP/{product.id}?date.gt=2024-02-01&date.lt=2024-03-20&api_key=&lt;YOURAPIKEY&gt;
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">FILTER COLUMNS</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <code>
                      https://api.dataplatform.com/v1/products/DP/{product.id}?columns={product.columns.slice(0,3).map(c => c.name).join(',')}&api_key=&lt;YOURAPIKEY&gt;
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Parameters Table */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">FILTER OPERATORS</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Filter</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Required</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { filter: '.eq=', required: 'yes', desc: 'Return values equal to the requested value' },
                        { filter: '.lt=', required: 'no', desc: 'Return values less than the requested value' },
                        { filter: '.gt=', required: 'no', desc: 'Return values greater than the requested value' },
                        { filter: '.in[]=', required: 'no', desc: 'Return values equal to specified comma separated values' }
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900 border-b">{row.filter}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">{row.required}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Example Response */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">EXAMPLE RESPONSE</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre>{`{
  "data_product": {
    "code": "DP/${product.id}",
    "status": "SUCCEEDED",
    "total_records": ${product.usage?.monthlyQueries || '1.2M'},
    "schema": {
      "fields": [
${product.columns.slice(0, 4).map(col => `        {
          "name": "${col.name}",
          "type": "${col.type}",
          "description": "${col.description}"
        }`).join(',\n')}
      ]
    },
    "data": [
      // Sample data rows...
    ]
  }
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'api':
        return (
          <div className="space-y-8">
            {/* API Documentation */}
            <div className="bg-white">
              <div className="mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">API</button>
                  <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Python</button>
                  <button className="px-4 py-2 text-gray-500 hover:text-gray-700">R</button>
                  <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Excel</button>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Authentication</h3>
                <p className="text-yellow-800">You must log in to view usage examples and make API calls.</p>
                <div className="mt-3 space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Sign Up</button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Getting started with the API</h3>
                <p className="text-blue-800 mb-2">Free sample enabled</p>
                <p className="text-blue-700 text-sm">A subset of this data is available for testing without a subscription. To view the full data, you must subscribe to the product.</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Subscribe</button>
              </div>
              
              {/* API Examples */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Usage Examples</h3>
                <p className="text-gray-700 mb-6">
                  You can try any of these API calls by pasting them into your browser window. 
                  Users with programming experience can use wget or curl to run these calls from the command line.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">GET Request</span>
                      <button className="text-gray-400 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <code className="text-sm font-mono">
                      curl -X GET "https://api.dataplatform.com/v1/products/DP/{product.id}" \
                      <br className="hidden sm:block" />
                      &nbsp;&nbsp;&nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'overview':
        return null; // Overview tab removed as per Nasdaq structure

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dataCatalog')}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Data Catalog
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 ${
                  isBookmarked ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-300 text-gray-700'
                }`}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
          
          {/* Product Title and Summary */}
          <div className="mt-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Navigation Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>Documentation</span>
              <span className="mx-2">•</span>
              <span>Usage</span>
              <span className="mx-2">•</span>
              <span className={`px-2 py-1 rounded text-xs ${getSensitivityColor(product.sensitivity)}`}>
                {product.sensitivity}
              </span>
            </div>
            
            {/* Summary Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Summary</h2>
              <div className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </div>
              
              {/* Data Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <div className="text-sm font-medium text-gray-500">Delivery Frequency</div>
                  <div className="text-sm text-gray-900 mt-1">{product.updateFrequency}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Data Quality</div>
                  <div className="text-sm text-gray-900 mt-1">{product.quality}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Coverage</div>
                  <div className="text-sm text-gray-900 mt-1">{product.domain}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Owner</div>
                  <div className="text-sm text-gray-900 mt-1">{product.owner}</div>
                </div>
              </div>
            </div>
            
            {/* Premium Badge */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-6">
              <span className="font-medium">Premium</span>
            </div>
            
            {/* Login Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="text-yellow-800">
                <strong>Log in with your Data Platform account to view pricing information</strong>
              </div>
              <div className="mt-3 space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            <TabButton tabId="documentation" label="Documentation" isActive={activeTab === 'documentation'} onClick={setActiveTab} />
            <TabButton tabId="usage" label="Usage" isActive={activeTab === 'usage'} onClick={setActiveTab} />
            <TabButton tabId="schema" label="Schema" isActive={activeTab === 'schema'} onClick={setActiveTab} />
            <TabButton tabId="api" label="API" isActive={activeTab === 'api'} onClick={setActiveTab} />
            <TabButton tabId="lineage" label="Lineage" isActive={activeTab === 'lineage'} onClick={setActiveTab} />
            <TabButton tabId="monitoring" label="Monitoring" isActive={activeTab === 'monitoring'} onClick={setActiveTab} />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
        
        {/* Recommended Datasets Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Datasets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataProducts
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(recommendedProduct => (
                <div key={recommendedProduct.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{recommendedProduct.name}</h3>
                    <div className="flex space-x-1">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Premium</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">API</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recommendedProduct.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Database className="h-4 w-4 mr-1" />
                      <span>{recommendedProduct.domain}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      <span>{recommendedProduct.quality}%</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/dataCatalog/product/${recommendedProduct.id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ))
            }
          </div>
          
          {/* Login CTA */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Log in with your Data Platform account to view more datasets
            </h3>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Login</button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;