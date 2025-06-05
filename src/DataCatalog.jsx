import React, { useState } from 'react';
import { 
  Search, Database, Shield, Clock, User, Info, File, 
  Tag, Eye, FileText, BarChart2, DollarSign, 
  AlertTriangle, Activity, CheckSquare, MoreVertical, ArrowRight, ArrowLeft
} from 'lucide-react';

const DataCatalogInterface = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [showLineage, setShowLineage] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showFailedJobs, setShowFailedJobs] = useState(false);
  const [showDataQuality, setShowDataQuality] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  // Updated data products from paste.txt
  const dataProducts = [
    {
      id: 1,
      name: "Balance Sheet",
      description: "Supplemental Balance Sheet data for FR 2052A reporting. Captures maturity, collateral, valuation, and counterparty metrics.",
      owner: "Finance Analytics Team",
      updateFrequency: "Daily",
      sensitivity: "High",
      quality: 92,
      domain: "Balance Sheet, Collateral, Maturity",
      columns: [
        { name: "T_LOAD_TS", type: "string", sensitivity: "low", description: "Timestamp when the record was loaded" },
        { name: "N_VERSION_ID", type: "string", sensitivity: "medium", description: "Version identifier for the record" },
        { name: "N_RUN_SKEY", type: "string", sensitivity: "high", description: "Unique run key for tracking data ingestion from Source" },
        { name: "N_RPT_ID", type: "string", sensitivity: "high", description: "Report ID for 2052A instance" },
        { name: "D_RPT_DT", type: "string", sensitivity: "high", description: "Report date" },
        { name: "N_AGG_EXTRACT_ID", type: "string", sensitivity: "medium", description: "Extract identifier for aggregation" },
        { name: "V_SBS_PROD_MAP_NM", type: "number", sensitivity: "medium", description: "Mapped supplemental balance sheet product name" },
        { name: "V_LGL_ENT_NM", type: "date", sensitivity: "low", description: "Legal entity name" },
        { name: "V_CMNT_TX", type: "date", sensitivity: "low", description: "Comment or notes text" }
      ],
      usage: {
        activeContracts: 24,
        monthlyQueries: "1.2M"
      },
      metrics: {
        uptime: "99.8%",
        avgResponseTime: "42ms",
        dataQuality: "95%",
        completeness: "98%"
      },
      cost: {
        storagePerMonth: "$120",
        queryPerMillion: "$0.35",
        apiCallsPerThousand: "$0.25",
        monthlyTotal: "$850"
      },
      lineage: {
        upstream: [
          { id: "src1", name: "CRM System", type: "source" },
          { id: "src2", name: "Web Analytics", type: "source" },
          { id: "src3", name: "Mobile App", type: "source" }
        ],
        transformations: [
          { id: "etl1", name: "Customer Data Integration", type: "process" },
          { id: "etl2", name: "Identity Resolution", type: "process" }
        ],
        downstream: [
          { id: "tgt1", name: "Marketing Segments", type: "target" },
          { id: "tgt2", name: "Personalization Engine", type: "target" },
          { id: "tgt3", name: "Customer Service Dashboard", type: "target" }
        ]
      },
      logs: [
        { timestamp: "2025-05-06T08:12:34", level: "INFO", message: "Daily refresh completed successfully" },
        { timestamp: "2025-05-06T02:15:22", level: "WARN", message: "Web Analytics source delayed by 15 minutes" },
        { timestamp: "2025-05-05T08:14:12", level: "INFO", message: "Daily refresh completed successfully" }
      ],
      failedJobs: [
        { id: "job1", timestamp: "2025-05-04T08:22:17", name: "Identity Resolution", status: "FAILED", reason: "Timeout after 120 seconds" },
        { id: "job2", timestamp: "2025-04-28T02:45:12", name: "Mobile App Integration", status: "FAILED", reason: "Schema validation error" }
      ],
      dataQuality: [
        { metric: "Completeness", score: 97, trend: "up", description: "Percentage of non-null values" },
        { metric: "Accuracy", score: 94, trend: "stable", description: "Correctness of data values" },
        { metric: "Consistency", score: 96, trend: "up", description: "Consistency across related data elements" },
        { metric: "Timeliness", score: 92, trend: "down", description: "How up-to-date the data is" }
      ]
    },
    {
      id: 2,
      name: "Derivatives and Collaterals",
      description: "Supplemental Derivatives and Collateral data used in FR 2052A reporting for capturing exposures, netting, encumbrance, and valuation details.",
      owner: "Finance Analytics Team",
      updateFrequency: "Daily",
      sensitivity: "High",
      quality: 92,
      domain: "Finance/Derivatives, Finance/Collaterals",
      columns: [
        { name: "T_LOAD_TS", type: "string", sensitivity: "low", description: "Timestamp when the record was loaded." },
        { name: "N_VERSION_ID", type: "string", sensitivity: "medium", description: "Version identifier for the record." },
        { name: "N_RUN_SKEY", type: "string", sensitivity: "high", description: "Unique run key for tracking data ingestion from Source." },
        { name: "N_RPT_ID", type: "string", sensitivity: "high", description: "Report ID for the associated 2052A record." },
        { name: "D_RPT_DT", type: "string", sensitivity: "high", description: "Report as-of date." },
        { name: "N_AGG_EXTRACT_ID", type: "string", sensitivity: "medium", description: "Aggregate extract identifier." },
        { name: "V_REPORT_TBL_NM", type: "number", sensitivity: "medium", description: "Internal counterparty indicator." },
        { name: "F_INTR_IN", type: "date", sensitivity: "low", description: "Name of the legal entity." },
        { name: "V_LGL_ENT_NM", type: "date", sensitivity: "low", description: "Mapped product name." }
      ],
      usage: {
        activeContracts: 24,
        monthlyQueries: "1.2M"
      },
      metrics: {
        uptime: "99.8%",
        avgResponseTime: "42ms",
        dataQuality: "95%",
        completeness: "98%"
      },
      cost: {
        storagePerMonth: "$120",
        queryPerMillion: "$0.35",
        apiCallsPerThousand: "$0.25",
        monthlyTotal: "$850"
      },
      lineage: {
        upstream: [
          { id: "src1", name: "CRM System", type: "source" },
          { id: "src2", name: "Web Analytics", type: "source" },
          { id: "src3", name: "Mobile App", type: "source" }
        ],
        transformations: [
          { id: "etl1", name: "Customer Data Integration", type: "process" },
          { id: "etl2", name: "Identity Resolution", type: "process" }
        ],
        downstream: [
          { id: "tgt1", name: "Marketing Segments", type: "target" },
          { id: "tgt2", name: "Personalization Engine", type: "target" },
          { id: "tgt3", name: "Customer Service Dashboard", type: "target" }
        ]
      },
      logs: [
        { timestamp: "2025-05-06T08:12:34", level: "INFO", message: "Daily refresh completed successfully" },
        { timestamp: "2025-05-06T02:15:22", level: "WARN", message: "Web Analytics source delayed by 15 minutes" },
        { timestamp: "2025-05-05T08:14:12", level: "INFO", message: "Daily refresh completed successfully" }
      ],
      failedJobs: [
        { id: "job1", timestamp: "2025-05-04T08:22:17", name: "Identity Resolution", status: "FAILED", reason: "Timeout after 120 seconds" },
        { id: "job2", timestamp: "2025-04-28T02:45:12", name: "Mobile App Integration", status: "FAILED", reason: "Schema validation error" }
      ],
      dataQuality: [
        { metric: "Completeness", score: 97, trend: "up", description: "Percentage of non-null values" },
        { metric: "Accuracy", score: 94, trend: "stable", description: "Correctness of data values" },
        { metric: "Consistency", score: 96, trend: "up", description: "Consistency across related data elements" },
        { metric: "Timeliness", score: 92, trend: "down", description: "How up-to-date the data is" }
      ]
    },
    {
      id: 3,
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
      ],
      usage: {
        activeContracts: 18,
        monthlyQueries: "850K"
      },
      metrics: {
        uptime: "99.9%",
        avgResponseTime: "38ms",
        dataQuality: "97%",
        completeness: "99%"
      },
      cost: {
        storagePerMonth: "$90",
        queryPerMillion: "$0.30",
        apiCallsPerThousand: "$0.22",
        monthlyTotal: "$520"
      },
      lineage: {
        upstream: [
          { id: "src1", name: "ERP System", type: "source" },
          { id: "src2", name: "Warehouse Management", type: "source" }
        ],
        transformations: [
          { id: "etl1", name: "Inventory Consolidation", type: "process" }
        ],
        downstream: [
          { id: "tgt1", name: "E-commerce Platform", type: "target" },
          { id: "tgt2", name: "Purchasing Recommendations", type: "target" }
        ]
      }
    },
    {
      id: 4,
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
      ],
      usage: {
        activeContracts: 32,
        monthlyQueries: "2.4M"
      },
      metrics: {
        uptime: "99.7%",
        avgResponseTime: "45ms",
        dataQuality: "95%",
        completeness: "96%"
      },
      cost: {
        storagePerMonth: "$180",
        queryPerMillion: "$0.32",
        apiCallsPerThousand: "$0.28",
        monthlyTotal: "$1,250"
      },
      lineage: {
        upstream: [
          { id: "src1", name: "POS System", type: "source" },
          { id: "src2", name: "E-commerce Platform", type: "source" },
          { id: "src3", name: "Mobile App Purchases", type: "source" }
        ],
        transformations: [
          { id: "etl1", name: "Transaction Normalization", type: "process" },
          { id: "etl2", name: "Revenue Calculation", type: "process" }
        ],
        downstream: [
          { id: "tgt1", name: "Financial Reporting", type: "target" },
          { id: "tgt2", name: "Sales Analytics", type: "target" },
          { id: "tgt3", name: "Customer 360", type: "target" }
        ]
      }
    }
  ];

  // Filter function for search
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = dataProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowMetadata(false);
    setShowDescription(false);
    setShowUsage(false);
    setShowMetrics(false);
    setShowCost(false);
    setShowLineage(false);
    setShowLogs(false);
    setShowFailedJobs(false);
    setShowDataQuality(false);
    setShowMoreOptions(false);
  };
  
  const getSensitivityColor = (level) => {
    switch(level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Toggle functions
  const toggleMetadata = () => setShowMetadata(!showMetadata);
  const toggleDescription = () => setShowDescription(!showDescription);
  const toggleUsage = () => setShowUsage(!showUsage);
  const toggleMetrics = () => setShowMetrics(!showMetrics);
  const toggleCost = () => setShowCost(!showCost);
  const toggleLineage = () => {
    setShowLineage(!showLineage);
    // Close other views when opening lineage
    if (!showLineage) {
      setShowLogs(false);
      setShowFailedJobs(false);
      setShowDataQuality(false);
      setShowMetadata(false);
      setShowUsage(false);
      setShowMetrics(false);
      setShowCost(false);
    }
  };
  const toggleLogs = () => {
    setShowLogs(!showLogs);
    setShowMoreOptions(false);
  };
  const toggleFailedJobs = () => {
    setShowFailedJobs(!showFailedJobs);
    setShowMoreOptions(false);
  };
  const toggleDataQuality = () => {
    setShowDataQuality(!showDataQuality);
    setShowMoreOptions(false);
  };
  const toggleMoreOptions = () => setShowMoreOptions(!showMoreOptions);
  
  // Lineage node component
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
                <div className="flex items-center space-x-2 relative">
                  {/* Primary Buttons - Always Visible */}
                  <button 
                    className={`px-3 py-1 text-sm border ${showMetadata ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} text-gray-700 rounded hover:bg-gray-50 flex items-center`}
                    onClick={toggleMetadata}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Metadata
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm border ${showUsage ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} text-gray-700 rounded hover:bg-gray-50 flex items-center`}
                    onClick={toggleUsage}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Usage
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm border ${showMetrics ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} text-gray-700 rounded hover:bg-gray-50 flex items-center`}
                    onClick={toggleMetrics}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" />
                    View Metrics
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm border ${showCost ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} text-gray-700 rounded hover:bg-gray-50 flex items-center`}
                    onClick={toggleCost}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    View Cost
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm border ${showLineage ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} text-gray-700 rounded hover:bg-gray-50 flex items-center`}
                    onClick={toggleLineage}
                  >
                    <ArrowRight className="h-4 w-4 mr-1" />
                    View Lineage
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Create Contract
                  </button>
                  
                  {/* More Options Button */}
                  <button 
                    className="px-2 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                    onClick={toggleMoreOptions}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  
                  {/* More Options Dropdown */}
                  {showMoreOptions && (
                    <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={toggleLogs}
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          View Logs
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={toggleFailedJobs}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          View Failed Jobs
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={toggleDataQuality}
                        >
                          <CheckSquare className="h-4 w-4 mr-2" />
                          View Data Quality
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Lineage View - Toggle screen */}
              {showLineage && selectedProduct.lineage && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data Lineage</h3>
                  
                  <div className="flex justify-between items-start">
                    {/* Upstream Sources */}
                    <div className="w-1/3 pr-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Database className="h-4 w-4 mr-1 text-blue-500" />
                        Upstream Sources
                      </h4>
                      <div className="space-y-2">
                        {selectedProduct.lineage.upstream.map(node => (
                          <LineageNode key={node.id} node={node} type="source" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Transformations */}
                    <div className="w-1/3 px-4 flex flex-col items-center">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <ArrowRight className="h-4 w-4 mr-1 text-purple-500" />
                        Transformations
                      </h4>
                      
                      {/* Flow arrows */}
                      <div className="flex justify-between w-full mb-4">
                        <ArrowRight className="h-6 w-6 text-blue-400" />
                        <ArrowRight className="h-6 w-6 text-blue-400" />
                      </div>
                      
                      <div className="space-y-2 w-full">
                        {selectedProduct.lineage.transformations.map(node => (
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
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Database className="h-4 w-4 mr-1 text-green-500" />
                        Downstream Systems
                      </h4>
                      <div className="space-y-2">
                        {selectedProduct.lineage.downstream.map(node => (
                          <LineageNode key={node.id} node={node} type="target" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Logs View */}
              {showLogs && selectedProduct.logs && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Logs</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedProduct.logs.map((log, idx) => (
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
              
              {/* Failed Jobs View */}
              {showFailedJobs && selectedProduct.failedJobs && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Failed Jobs</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedProduct.failedJobs.map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {job.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(job.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {job.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-red-500">
                              {job.reason}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Data Quality View */}
              {showDataQuality && selectedProduct.dataQuality && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data Quality Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.dataQuality.map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{item.metric}</span>
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
              
              {showMetadata && (
                <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
              )}
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded flex flex-col items-center text-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>Owner</span>
                  </div>
                  <p className="mt-1 font-medium">{selectedProduct.owner}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded flex flex-col items-center text-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Update Frequency</span>
                  </div>
                  <p className="mt-1 font-medium">{selectedProduct.updateFrequency}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded flex flex-col items-center text-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Sensitivity</span>
                  </div>
                  <p className={`mt-1 font-medium px-2 py-1 rounded-full ${getSensitivityColor(selectedProduct.sensitivity)}`}>
                    {selectedProduct.sensitivity}
                  </p>
                </div>
              </div>
              
              {/* Usage Section */}
              {showUsage && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Usage</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-indigo-700">{selectedProduct.usage.activeContracts}</div>
                      <div className="text-sm text-indigo-500">Active Contracts</div>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-indigo-700">{selectedProduct.usage.monthlyQueries}</div>
                      <div className="text-sm text-indigo-500">Monthly Queries</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Metrics Section */}
              {showMetrics && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Metrics</h3>
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-blue-700">{selectedProduct.metrics.uptime}</div>
                      <div className="text-sm text-blue-500">Uptime</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-blue-700">{selectedProduct.metrics.avgResponseTime}</div>
                      <div className="text-sm text-blue-500">Avg. Response Time</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-blue-700">{selectedProduct.metrics.dataQuality}</div>
                      <div className="text-sm text-blue-500">Data Quality</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-blue-700">{selectedProduct.metrics.completeness}</div>
                      <div className="text-sm text-blue-500">Completeness</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Cost Section */}
              {showCost && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Cost Information</h3>
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-green-700">{selectedProduct.cost.storagePerMonth}</div>
                      <div className="text-sm text-green-500">Storage Cost/Month</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-green-700">{selectedProduct.cost.queryPerMillion}</div>
                      <div className="text-sm text-green-500">Cost per 1M Queries</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-green-700">{selectedProduct.cost.apiCallsPerThousand}</div>
                      <div className="text-sm text-green-500">Cost per 1K API Calls</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-semibold text-green-700">{selectedProduct.cost.monthlyTotal}</div>
                      <div className="text-sm text-green-500">Total Monthly Cost</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Columns Table */}
              {!showLineage && (
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
                          {showDescription && (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedProduct.columns.map((column, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                              <a 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleDescription();
                                }}
                                title={column.description}
                              >
                                {column.name}
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full ${getSensitivityColor(column.sensitivity)}`}>
                                {column.sensitivity}
                              </span>
                            </td>
                            {showDescription && (
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {column.description}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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