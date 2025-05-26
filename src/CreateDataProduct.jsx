import React, { useState } from 'react';
import { ArrowRight, Database, Check, Server, FileText, Clock, Settings, Download, Copy, AlertCircle, PieChart, Play, Code, ChevronDown, ChevronUp, Table, MessageSquare } from 'lucide-react';

const CreateDataProduct = () => {
  // State management
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [contractId, setContractId] = useState('');
  const [deliveryConfig, setDeliveryConfig] = useState({
    mechanism: 'api',
    format: 'json',
    frequency: 'daily',
    visualizationTool: null,
    pubsubConfig: {
      enabled: false,
      topic: '',
      messageFormat: 'json',
      realtimeProcessing: false
    }
  });
  
  const [dataFlowType, setDataFlowType] = useState('standard'); // 'standard', 'pubsub'
  const [dataProductName, setDataProductName] = useState('');
  const [dataProductDescription, setDataProductDescription] = useState('');
  const [isQueryExpanded, setIsQueryExpanded] = useState(true);
  
  // Mock database tables (same data as in Traditional Contract Flow)
  const databaseTables = [
    {
      id: 1,
      name: "customers",
      displayName: "Customer 360",
      description: "Comprehensive customer data including demographics, transactions, and preferences",
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
      name: "products",
      displayName: "Product Inventory",
      description: "Current inventory levels, locations, and product details",
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
      name: "transactions",
      displayName: "Sales Transactions",
      description: "Detailed record of all sales transactions across channels",
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
    },
  {
    id: 4,
    name: "events",
    displayName: "Real-time Events Stream",
    description: "Live user interaction events for pub/sub processing",
    columns: [
      { name: "event_id", type: "string", sensitivity: "low", description: "Unique event identifier" },
      { name: "user_id", type: "string", sensitivity: "medium", description: "User identifier" },
      { name: "event_type", type: "string", sensitivity: "low", description: "Type of event" },
      { name: "timestamp", type: "timestamp", sensitivity: "low", description: "Event timestamp" },
      { name: "properties", type: "json", sensitivity: "medium", description: "Event properties" }
    ]
  }
];
  
  // Sample queries for quick selection
  const sampleQueries = [
    {
      name: "Customer Segment Analysis",
      description: "Analyze customer segments with lifetime value and transaction patterns",
      query: `SELECT 
    c.segment,
    COUNT(*) as customer_count,
    AVG(c.lifetime_value) as avg_lifetime_value,
    AVG(t.total_amount) as avg_transaction_amount,
    COUNT(t.transaction_id) as total_transactions
FROM customers c
LEFT JOIN transactions t ON c.customer_id = t.customer_id
GROUP BY c.segment
ORDER BY avg_lifetime_value DESC`
    },
    {
      name: "Product Performance Dashboard",
      description: "Product sales performance with inventory metrics",
      query: `SELECT 
    p.product_name,
    p.category,
    p.current_stock,
    COUNT(t.transaction_id) as sales_count,
    SUM(t.total_amount) as total_revenue,
    AVG(t.unit_price) as avg_selling_price
FROM products p
LEFT JOIN transactions t ON p.product_id = t.product_id
GROUP BY p.product_id, p.product_name, p.category, p.current_stock
ORDER BY total_revenue DESC`
    },
    {
      name: "Monthly Sales Trends",
      description: "Monthly sales trends with customer and product breakdown",
      query: `SELECT 
    DATE_TRUNC('month', t.transaction_date) as month,
    COUNT(DISTINCT t.customer_id) as unique_customers,
    COUNT(t.transaction_id) as total_transactions,
    SUM(t.total_amount) as total_revenue,
    AVG(t.total_amount) as avg_transaction_value
FROM transactions t
WHERE t.transaction_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', t.transaction_date)
ORDER BY month DESC`
    },
    {
      name: "Inventory Reorder Report",
      description: "Products requiring reorder with supplier information",
      query: `SELECT 
    p.product_name,
    p.category,
    p.current_stock,
    p.reorder_level,
    (p.reorder_level - p.current_stock) as shortage_quantity,
    p.supplier_id,
    p.last_restock_date
FROM products p
WHERE p.current_stock < p.reorder_level
ORDER BY shortage_quantity DESC`
    },
  {
  name: "Real-time User Events",
  description: "Stream user interaction events for real-time processing",
  type: "pubsub",
  query: `SELECT 
    event_id,
    user_id,
    event_type,
    timestamp,
    properties
FROM events 
WHERE timestamp >= NOW() - INTERVAL '1 hour'
ORDER BY timestamp DESC`
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
  
  const handleTableSelect = (table) => {
    if (selectedTables.some(t => t.id === table.id)) {
      setSelectedTables(selectedTables.filter(t => t.id !== table.id));
      // Remove columns from this table from selected columns
      setSelectedColumns(selectedColumns.filter(col => col.tableName !== table.name));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };
  
  const handleColumnSelect = (column, tableName) => {
    const columnWithTable = { ...column, tableName };
    if (selectedColumns.some(col => col.name === column.name && col.tableName === tableName)) {
      setSelectedColumns(selectedColumns.filter(col => !(col.name === column.name && col.tableName === tableName)));
    } else {
      setSelectedColumns([...selectedColumns, columnWithTable]);
    }
  };
  
  const handleSampleQuerySelect = (query) => {
    setSqlQuery(query.query);
    setDataProductName(query.name);
    setDataProductDescription(query.description);
    
    // Simulate query execution
    setTimeout(() => {
      setQueryResult([
        { column1: "Sample Data 1", column2: "Value 1", column3: 100 },
        { column1: "Sample Data 2", column2: "Value 2", column3: 200 },
        { column1: "Sample Data 3", column2: "Value 3", column3: 300 }
      ]);
    }, 1000);
  };
  
  const executeQuery = () => {
    // Simulate query execution
    setTimeout(() => {
      setQueryResult([
        { column1: "Sample Result 1", column2: "Data 1", column3: 150 },
        { column1: "Sample Result 2", column2: "Data 2", column3: 250 },
        { column1: "Sample Result 3", column2: "Data 3", column3: 350 }
      ]);
    }, 1000);
  };
  
  const handleNextStep = () => {
    if (currentStep === 3) {
      setContractId(`DP-${Math.floor(Math.random() * 10000)}-${new Date().getTime().toString().slice(-4)}`);
    }
    setCurrentStep(currentStep + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 1 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
              <Table className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Select Tables</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 2 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
              <Code className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Write Query</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 3 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
              <Settings className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Configure Delivery</span>
          </div>
          <div className={`w-24 h-0.5 ${currentStep >= 4 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= 4 ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm">Review Product</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Step 1: Table Selection
  const renderTableSelection = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Database Tables</h2>
        <p className="text-gray-600 mb-6">Choose the tables you want to use for creating your data product.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {databaseTables.map(table => (
            <div 
              key={table.id} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTables.some(t => t.id === table.id) ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
              onClick={() => handleTableSelect(table)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-medium text-gray-900">{table.displayName}</h3>
                    <span className="ml-2 text-sm text-gray-500">({table.name})</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{table.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Available Columns ({table.columns.length})</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {table.columns.slice(0, 6).map((column, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getSensitivityColor(column.sensitivity).replace('text-', 'bg-').replace('-100', '-600')}`}></div>
                          <span className="truncate">{column.name}</span>
                        </div>
                      ))}
                      {table.columns.length > 6 && (
                        <div className="text-xs text-gray-500">+{table.columns.length - 6} more...</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={selectedTables.some(t => t.id === table.id)}
                    onChange={() => {}}
                    className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedTables.length === 0 && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Please select at least one table to continue.</span>
          </div>
        )}
      </div>
    );
  };
  
  // Step 2: Query Builder
  const renderQueryBuilder = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Build Your Data Product Query</h2>
        <p className="text-gray-600 mb-6">Write SQL queries using the selected tables to define your data product.</p>
        
        {/* Data Product Info */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Product Name</label>
            <input
              type="text"
              value={dataProductName}
              onChange={(e) => setDataProductName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter data product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={dataProductDescription}
              onChange={(e) => setDataProductDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe what this data product provides"
            />
          </div>
        </div>

        {/* Data Flow Type Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Data Flow Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${dataFlowType === 'standard' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
              onClick={() => setDataFlowType('standard')}
            >
              <div className="flex justify-center mb-2">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-center font-medium">Standard Flow</h4>
              <p className="text-xs text-center text-gray-500 mt-1">Traditional API/File delivery</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${dataFlowType === 'pubsub' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-300'}`}
              onClick={() => setDataFlowType('pubsub')}
            >
              <div className="flex justify-center mb-2">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-center font-medium">Pub/Sub Flow</h4>
              <p className="text-xs text-center text-gray-500 mt-1">Real-time streaming</p>
            </div>
          </div>
        </div>
        
        {/* Sample Queries */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Start Templates</h3>
          <div className="grid grid-cols-2 gap-4">
            {sampleQueries.map((query, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                onClick={() => handleSampleQuerySelect(query)}
              >
                <h4 className="font-medium text-gray-900 mb-1">{query.name}</h4>
                <p className="text-sm text-gray-600">{query.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Available Tables and Columns */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Available Tables & Columns</h3>
          <div className="grid grid-cols-1 gap-4">
            {selectedTables.map(table => (
              <div key={table.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Database className="h-4 w-4 mr-2 text-purple-600" />
                  {table.name}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {table.columns.map((column, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                        selectedColumns.some(col => col.name === column.name && col.tableName === table.name)
                          ? 'bg-purple-100 border border-purple-300'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => handleColumnSelect(column, table.name)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{column.name}</span>
                        <span className={`px-1 py-0.5 rounded-full text-xs ${getSensitivityColor(column.sensitivity)}`}>
                          {column.sensitivity[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="text-gray-500 mt-1">{column.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* SQL Query Editor */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">SQL Query</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={executeQuery}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 flex items-center"
              >
                <Play className="h-4 w-4 mr-1" />
                Execute
              </button>
              <button
                onClick={() => setIsQueryExpanded(!isQueryExpanded)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isQueryExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${isQueryExpanded ? 'max-h-96' : 'max-h-32'}`}>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your SQL query here..."
            />
          </div>
        </div>
        
        {/* Query Results Preview */}
        {queryResult.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Query Results Preview</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(queryResult[0]).map((key, index) => (
                      <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResult.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value?.toString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {!sqlQuery.trim() && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Please write a SQL query to continue.</span>
          </div>
        )}
      </div>
    );
  };
  
  // Step 3: Delivery Configuration (similar to Traditional Contract Flow)
  const renderDeliveryConfiguration = () => {
    const visualizationTools = [
      { id: 'powerbi', name: 'Power BI', description: 'Connect directly to Microsoft Power BI' },
      { id: 'tableau', name: 'Tableau', description: 'Integrate with Tableau dashboards' },
      { id: 'looker', name: 'Looker', description: 'Connect to Google Looker Studio' },
      { id: 'quicksight', name: 'QuickSight', description: 'Use with Amazon QuickSight' }
    ];
    
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Delivery</h2>
        <p className="text-gray-600 mb-6">Specify how you want to deliver this data product.</p>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Delivery Mechanism */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Mechanism</label>
            <div className="grid grid-cols-4 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'api' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'api', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <Server className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">REST API</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Query data on-demand with our REST endpoints</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'sftp' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'sftp', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">SFTP Transfer</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Scheduled file delivery to your SFTP server</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'graphql' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'graphql', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 400 400" fill="currentColor">
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
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'visualization' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'visualization', visualizationTool: null})}
              >
                <div className="flex justify-center mb-2">
                  <PieChart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">Visualization Tools</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Direct integration with popular BI platforms</p>
              </div>
            </div>
          </div>

          {/* Pub/Sub Configuration */}
          {dataFlowType === 'pubsub' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pub/Sub Topic Configuration</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Topic Name</label>
                    <input
                      type="text"
                      value={deliveryConfig.pubsubConfig.topic}
                      onChange={(e) => setDeliveryConfig({
                        ...deliveryConfig, 
                        pubsubConfig: {...deliveryConfig.pubsubConfig, topic: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., user-events-stream"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Message Format</label>
                    <select
                      value={deliveryConfig.pubsubConfig.messageFormat}
                      onChange={(e) => setDeliveryConfig({
                        ...deliveryConfig, 
                        pubsubConfig: {...deliveryConfig.pubsubConfig, messageFormat: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="json">JSON</option>
                      <option value="avro">Avro</option>
                      <option value="protobuf">Protocol Buffers</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pub/Sub Features</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">Real-time Processing</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={deliveryConfig.pubsubConfig.realtimeProcessing}
                        onChange={(e) => setDeliveryConfig({
                          ...deliveryConfig, 
                          pubsubConfig: {...deliveryConfig.pubsubConfig, realtimeProcessing: e.target.checked}
                        })}
                        className="text-green-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Process messages as they arrive</p>
                  </div>
                  
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">Message Batching</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="text-green-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Group messages for efficiency</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Visualization Tool Selection */}
          {deliveryConfig.mechanism === 'visualization' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Visualization Tool</label>
              <div className="grid grid-cols-2 gap-4">
                {visualizationTools.map(tool => (
                  <div 
                    key={tool.id}
                    className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.visualizationTool === tool.id ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, visualizationTool: tool.id})}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{tool.name}</h3>
                      {deliveryConfig.visualizationTool === tool.id && (
                        <Check className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Format Options (hide when visualization is selected) */}
          {deliveryConfig.mechanism !== 'visualization' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <div className="flex space-x-4">
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'json' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'json'})}
                >
                  JSON
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'csv' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'csv'})}
                >
                  CSV
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'xml' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'xml'})}
                >
                  XML
                </button>
                <button 
                  className={`px-4 py-2 rounded ${deliveryConfig.format === 'parquet' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, format: 'parquet'})}
                >
                  Parquet
                </button>
              </div>
            </div>
          )}
          
          {/* Refresh Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Frequency</label>
            <div className="grid grid-cols-4 gap-4">
              <button 
                className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'realtime' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'realtime'})}
              >
                <span className="text-sm font-medium">Real-time</span>
                <span className="text-xs mt-1">Live updates</span>
              </button>
              <button 
                className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'daily' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'daily'})}
              >
                <span className="text-sm font-medium">Daily</span>
                <span className="text-xs mt-1">Once per day</span>
              </button>
              <button 
                className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'weekly' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'weekly'})}
              >
                <span className="text-sm font-medium">Weekly</span>
                <span className="text-xs mt-1">Once per week</span>
              </button>
              <button 
                className={`px-4 py-2 rounded-lg flex flex-col items-center ${deliveryConfig.frequency === 'monthly' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, frequency: 'monthly'})}
              >
                <span className="text-sm font-medium">Monthly</span>
                <span className="text-xs mt-1">Once per month</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Step 4: Data Product Summary
  const renderDataProductSummary = () => {
    if (!contractId) return null;
    
    return (
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-green-100 rounded-full p-1 mr-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Data Product Created Successfully!</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">Your data product has been created and is now ready to use. You'll receive an email with the full details.</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Data Product Summary</h3>
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
              <div className="text-sm text-gray-500">Product ID</div>
              <div className="flex items-center mt-1">
                <div className="font-medium text-gray-900">{contractId}</div>
                <button className="ml-2 text-purple-600 hover:text-purple-800">
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
            <h4 className="font-medium text-gray-900 mb-2">Data Product Details</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="mb-2">
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium text-gray-900">{dataProductName || 'Untitled Data Product'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Description</div>
                <div className="text-gray-700">{dataProductDescription || 'No description provided'}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Source Tables</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedTables.map((table, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                    {table.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">SQL Query</h4>
            <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {sqlQuery}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-2">
              {dataFlowType === 'pubsub' ? 'Pub/Sub Configuration' : 'Delivery Configuration'}
            </h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              {dataFlowType === 'pubsub' ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Topic</div>
                    <div className="font-medium text-gray-900 mt-1">{deliveryConfig.pubsubConfig.topic || 'Not set'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Format</div>
                    <div className="font-medium text-gray-900 mt-1 uppercase">{deliveryConfig.pubsubConfig.messageFormat}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Real-time</div>
                    <div className="font-medium text-gray-900 mt-1">{deliveryConfig.pubsubConfig.realtimeProcessing ? 'Enabled' : 'Disabled'}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Mechanism</div>
                    <div className="font-medium text-gray-900 mt-1 capitalize">
                      {deliveryConfig.mechanism === 'visualization' 
                        ? 'Visualization Tools' 
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
                  ) : (
                    <div>
                      <div className="text-sm text-gray-500">Format</div>
                      <div className="font-medium text-gray-900 mt-1 uppercase">{deliveryConfig.format}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-gray-500">Frequency</div>
                    <div className="font-medium text-gray-900 mt-1 capitalize">{deliveryConfig.frequency}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Access Instructions</h3>
          <p className="text-gray-600 mb-4">
            Your data product is now available through the configured delivery mechanism. 
            Use the credentials and connection details below to access your data.
          </p>
          
          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">API Endpoint</div>
                <div className="relative mt-1">
                  <input 
                    type="text" 
                    value={`https://api.enterprise.com/v1/data-products/${contractId}`} 
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded" 
                    readOnly 
                  />
                  <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
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
                  <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  // Main component render
  return (
    <div className="bg-white shadow-sm rounded-lg max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Data Product</h1>
      
      {renderStepIndicator()}
      
      <div className="mt-8">
        {currentStep === 1 && renderTableSelection()}
        {currentStep === 2 && renderQueryBuilder()}
        {currentStep === 3 && renderDeliveryConfiguration()}
        {currentStep === 4 && renderDataProductSummary()}
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
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center"
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && selectedTables.length === 0) || 
              (currentStep === 2 && !sqlQuery.trim()) ||
              (currentStep === 3 && deliveryConfig.mechanism === 'visualization' && !deliveryConfig.visualizationTool) ||
              (currentStep === 3 && dataFlowType === 'pubsub' && !deliveryConfig.pubsubConfig.topic.trim())
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

export default CreateDataProduct;