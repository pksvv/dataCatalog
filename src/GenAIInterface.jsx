import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, Check, Server, FileText, Clock, Settings, Download, Copy, AlertCircle, Search, Sparkles, Code, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const GenAIInterface = () => {
  // State for query input and processing
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [dataPreview, setDataPreview] = useState([]);
  const [derivedColumns, setDerivedColumns] = useState([]);
  const [error, setError] = useState('');
  
  // State for contract configuration with added visualizationTool and pubsub config
  const [deliveryConfig, setDeliveryConfig] = useState({
    mechanism: 'api',
    format: 'json',
    frequency: 'daily',
    visualizationTool: '', // For visualization tools
    // Pub/Sub specific configuration
    pubsubConfig: {
      broker: 'apache_kafka',
      topicName: 'data-product-updates',
      messageFormat: 'json',
      deliveryGuarantee: 'at_least_once',
      triggerEvents: {
        dataUpdates: true,
        schemaChanges: true,
        qualityAlerts: false
      },
      batchSize: 1000,
      maxWaitTime: 30
    }
  });
  
  // State for tracking creation progress
  const [contractCreated, setContractCreated] = useState(false);
  const [contractId, setContractId] = useState('');
  
  // Example suggestions for the user
  const exampleQueries = [
    "Show me all customers who made a purchase in the last 30 days",
    "Get the inventory levels for products with stock below reorder point",
    "List transactions with total amount greater than $1000",
    "Show me customer demographics by segment with lifetime value"
  ];
  
  // Mock data sources (same as in previous components)
  const dataSources = [
    {
      id: 1,
      name: "Customer 360",
      tableName: "customers",
      columns: [
        { name: "customer_id", type: "string", sensitivity: "low" },
        { name: "full_name", type: "string", sensitivity: "medium" },
        { name: "email", type: "string", sensitivity: "high" },
        { name: "phone", type: "string", sensitivity: "high" },
        { name: "address", type: "string", sensitivity: "high" },
        { name: "segment", type: "string", sensitivity: "medium" },
        { name: "lifetime_value", type: "number", sensitivity: "medium" },
        { name: "acquisition_date", type: "date", sensitivity: "low" },
        { name: "last_purchase_date", type: "date", sensitivity: "low" }
      ]
    },
    {
      id: 2,
      name: "Product Inventory",
      tableName: "products",
      columns: [
        { name: "product_id", type: "string", sensitivity: "low" },
        { name: "product_name", type: "string", sensitivity: "low" },
        { name: "category", type: "string", sensitivity: "low" },
        { name: "current_stock", type: "number", sensitivity: "medium" },
        { name: "warehouse_id", type: "string", sensitivity: "low" },
        { name: "reorder_level", type: "number", sensitivity: "low" },
        { name: "supplier_id", type: "string", sensitivity: "medium" },
        { name: "cost_price", type: "number", sensitivity: "high" },
        { name: "last_restock_date", type: "date", sensitivity: "low" }
      ]
    },
    {
      id: 3,
      name: "Sales Transactions",
      tableName: "transactions",
      columns: [
        { name: "transaction_id", type: "string", sensitivity: "low" },
        { name: "customer_id", type: "string", sensitivity: "medium" },
        { name: "product_id", type: "string", sensitivity: "low" },
        { name: "quantity", type: "number", sensitivity: "low" },
        { name: "unit_price", type: "number", sensitivity: "medium" },
        { name: "discount", type: "number", sensitivity: "medium" },
        { name: "total_amount", type: "number", sensitivity: "high" },
        { name: "payment_method", type: "string", sensitivity: "medium" },
        { name: "transaction_date", type: "date", sensitivity: "low" },
        { name: "store_id", type: "string", sensitivity: "low" }
      ]
    }
  ];
  
  // Mock function to simulate GenAI processing
  const processNaturalLanguageQuery = async (queryText) => {
    setIsProcessing(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Simple pattern matching for demo purposes
      let sql = '';
      let previewData = [];
      let columns = [];
      
      // Simplified pattern matching logic for the demo
      if (queryText.toLowerCase().includes('customer') && queryText.toLowerCase().includes('purchase') && queryText.toLowerCase().includes('last 30 days')) {
        sql = `SELECT c.customer_id, c.full_name, c.email, c.segment, 
       t.transaction_id, t.total_amount, t.transaction_date
FROM customers c
JOIN transactions t ON c.customer_id = t.customer_id
WHERE t.transaction_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY t.transaction_date DESC`;

        columns = [
          { name: "customer_id", type: "string", sensitivity: "low", source: "customers" },
          { name: "full_name", type: "string", sensitivity: "medium", source: "customers" },
          { name: "email", type: "string", sensitivity: "high", source: "customers" },
          { name: "segment", type: "string", sensitivity: "medium", source: "customers" },
          { name: "transaction_id", type: "string", sensitivity: "low", source: "transactions" },
          { name: "total_amount", type: "number", sensitivity: "high", source: "transactions" },
          { name: "transaction_date", type: "date", sensitivity: "low", source: "transactions" }
        ];
        
        previewData = [
          { customer_id: "C1001", full_name: "John Smith", email: "john.smith@example.com", segment: "Premium", transaction_id: "T5002", total_amount: 249.99, transaction_date: "2025-04-15" },
          { customer_id: "C1002", full_name: "Emma Johnson", email: "emma.j@example.com", segment: "Standard", transaction_id: "T5010", total_amount: 59.95, transaction_date: "2025-04-12" },
          { customer_id: "C1015", full_name: "Michael Brown", email: "mbrown@example.com", segment: "Premium", transaction_id: "T5023", total_amount: 325.50, transaction_date: "2025-04-10" },
          { customer_id: "C1001", full_name: "John Smith", email: "john.smith@example.com", segment: "Premium", transaction_id: "T5045", total_amount: 129.99, transaction_date: "2025-04-02" }
        ];
      } 
      else if (queryText.toLowerCase().includes('inventory') && (queryText.toLowerCase().includes('below') || queryText.toLowerCase().includes('reorder'))) {
        sql = `SELECT p.product_id, p.product_name, p.category, 
       p.current_stock, p.reorder_level, 
       (p.current_stock - p.reorder_level) AS stock_deficit
FROM products p
WHERE p.current_stock < p.reorder_level
ORDER BY (p.current_stock - p.reorder_level) ASC`;

        columns = [
          { name: "product_id", type: "string", sensitivity: "low", source: "products" },
          { name: "product_name", type: "string", sensitivity: "low", source: "products" },
          { name: "category", type: "string", sensitivity: "low", source: "products" },
          { name: "current_stock", type: "number", sensitivity: "medium", source: "products" },
          { name: "reorder_level", type: "number", sensitivity: "low", source: "products" },
          { name: "stock_deficit", type: "number", sensitivity: "low", source: "calculated" }
        ];
        
        previewData = [
          { product_id: "P1012", product_name: "Wireless Earbuds", category: "Electronics", current_stock: 5, reorder_level: 20, stock_deficit: -15 },
          { product_id: "P1045", product_name: "Smart Watch", category: "Electronics", current_stock: 12, reorder_level: 25, stock_deficit: -13 },
          { product_id: "P1078", product_name: "USB-C Cable", category: "Accessories", current_stock: 30, reorder_level: 40, stock_deficit: -10 },
          { product_id: "P1023", product_name: "Laptop Sleeve", category: "Accessories", current_stock: 8, reorder_level: 15, stock_deficit: -7 }
        ];
      }
      else if (queryText.toLowerCase().includes('transaction') && queryText.toLowerCase().includes('amount') && queryText.toLowerCase().includes('1000')) {
        sql = `SELECT t.transaction_id, t.transaction_date, 
       c.customer_id, c.full_name, 
       t.total_amount, t.payment_method
FROM transactions t
JOIN customers c ON t.customer_id = c.customer_id
WHERE t.total_amount > 1000
ORDER BY t.total_amount DESC`;

        columns = [
          { name: "transaction_id", type: "string", sensitivity: "low", source: "transactions" },
          { name: "transaction_date", type: "date", sensitivity: "low", source: "transactions" },
          { name: "customer_id", type: "string", sensitivity: "medium", source: "customers" },
          { name: "full_name", type: "string", sensitivity: "medium", source: "customers" },
          { name: "total_amount", type: "number", sensitivity: "high", source: "transactions" },
          { name: "payment_method", type: "string", sensitivity: "medium", source: "transactions" }
        ];
        
        previewData = [
          { transaction_id: "T4089", transaction_date: "2025-04-18", customer_id: "C1056", full_name: "Alexander Wilson", total_amount: 2499.99, payment_method: "Credit Card" },
          { transaction_id: "T4023", transaction_date: "2025-04-15", customer_id: "C1022", full_name: "Sarah Martinez", total_amount: 1899.00, payment_method: "Bank Transfer" },
          { transaction_id: "T4102", transaction_date: "2025-04-12", customer_id: "C1007", full_name: "David Lee", total_amount: 1345.50, payment_method: "Credit Card" },
          { transaction_id: "T4067", transaction_date: "2025-04-05", customer_id: "C1035", full_name: "Jennifer Taylor", total_amount: 1099.95, payment_method: "Debit Card" }
        ];
      }
      else if (queryText.toLowerCase().includes('customer') && queryText.toLowerCase().includes('segment') && queryText.toLowerCase().includes('lifetime value')) {
        sql = `SELECT c.segment, 
       COUNT(*) AS customer_count,
       AVG(c.lifetime_value) AS avg_lifetime_value,
       MAX(c.lifetime_value) AS max_lifetime_value,
       MIN(c.lifetime_value) AS min_lifetime_value
FROM customers c
GROUP BY c.segment
ORDER BY avg_lifetime_value DESC`;

        columns = [
          { name: "segment", type: "string", sensitivity: "medium", source: "customers" },
          { name: "customer_count", type: "number", sensitivity: "low", source: "calculated" },
          { name: "avg_lifetime_value", type: "number", sensitivity: "medium", source: "calculated" },
          { name: "max_lifetime_value", type: "number", sensitivity: "medium", source: "calculated" },
          { name: "min_lifetime_value", type: "number", sensitivity: "medium", source: "calculated" }
        ];
        
        previewData = [
          { segment: "Premium", customer_count: 256, avg_lifetime_value: 4250.75, max_lifetime_value: 12500.00, min_lifetime_value: 1000.00 },
          { segment: "Plus", customer_count: 623, avg_lifetime_value: 1875.25, max_lifetime_value: 5000.00, min_lifetime_value: 500.00 },
          { segment: "Standard", customer_count: 1248, avg_lifetime_value: 825.50, max_lifetime_value: 2500.00, min_lifetime_value: 100.00 },
          { segment: "Basic", customer_count: 902, avg_lifetime_value: 325.25, max_lifetime_value: 1000.00, min_lifetime_value: 50.00 }
        ];
      }
      else {
        // Default fallback for demo
        sql = `-- Generated SQL based on your query:
-- "${queryText}"

SELECT *
FROM customers
LIMIT 100`;

        columns = dataSources[0].columns.map(col => ({ ...col, source: "customers" }));
        
        previewData = [
          { customer_id: "C1001", full_name: "John Smith", email: "john.smith@example.com", segment: "Premium", lifetime_value: 2450.75 },
          { customer_id: "C1002", full_name: "Emma Johnson", email: "emma.j@example.com", segment: "Standard", lifetime_value: 890.25 },
          { customer_id: "C1003", full_name: "Michael Brown", email: "mbrown@example.com", segment: "Premium", lifetime_value: 3254.50 }
        ];
      }
      
      setGeneratedSQL(sql);
      setDataPreview(previewData);
      setDerivedColumns(columns);
    } catch (err) {
      setError('An error occurred while processing your query. Please try again or rephrase your request.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      processNaturalLanguageQuery(query);
    }
  };
  
  const handleExampleQuery = (exampleQuery) => {
    setQuery(exampleQuery);
    processNaturalLanguageQuery(exampleQuery);
  };
  
  const handleCreateContract = () => {
    // Simulate contract creation
    setIsProcessing(true);
    
    setTimeout(() => {
      setContractId(`NL-${Math.floor(Math.random() * 10000)}-${new Date().getTime().toString().slice(-4)}`);
      setContractCreated(true);
      setIsProcessing(false);
    }, 1500);
  };
  
  // Helper functions
  const getSensitivityColor = (level) => {
    switch(level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSourceColor = (source) => {
    switch(source.toLowerCase()) {
      case 'customers': return 'bg-blue-100 text-blue-800';
      case 'products': return 'bg-purple-100 text-purple-800';
      case 'transactions': return 'bg-indigo-100 text-indigo-800';
      case 'calculated': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // UI Components
  const QueryInputSection = () => (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Ask for Data in Plain English</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Describe the data you need and our AI will generate a query and create a contract for you.
      </p>
      
      <form onSubmit={handleQuerySubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="What data would you like to access? (e.g., 'Show me all customers who made a purchase in the last 30 days')"
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isProcessing || contractCreated}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 p-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
            disabled={isProcessing || !query.trim() || contractCreated}
          >
            {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </form>
      
      {!generatedSQL && !isProcessing && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Try one of these examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((exampleQuery, index) => (
              <button
                key={index}
                className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                onClick={() => handleExampleQuery(exampleQuery)}
              >
                {exampleQuery}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  const SQLPreviewSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      generatedSQL ? (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <Code className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-900">Generated SQL Query</h3>
            </div>
            <button 
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
          <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-32'} overflow-auto`}>
            <pre className="p-4 text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
              {generatedSQL}
            </pre>
          </div>
        </div>
      ) : null
    );
  };
  
  const DataPreviewSection = () => (
    dataPreview.length > 0 ? (
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-2">Data Preview</h3>
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(dataPreview[0]).map((key, index) => (
                  <th 
                    key={index}
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataPreview.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : null
  );
  
  const ColumnSelectionSection = () => (
    derivedColumns.length > 0 ? (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-900">Columns Derived from Query</h3>
          <div className="text-sm text-gray-600">
            {derivedColumns.length} columns identified
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Include
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sensitivity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {derivedColumns.map((column, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        defaultChecked={true}
                        disabled={contractCreated}
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
                    <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(column.source)}`}>
                      {column.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSensitivityColor(column.sensitivity)}`}>
                      {column.sensitivity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : null
  );
  
  const DeliveryConfigurationSection = () => (
    derivedColumns.length > 0 && !contractCreated ? (
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4">Delivery Configuration</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Delivery Mechanism */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Mechanism</label>
            <div className="grid grid-cols-5 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'api' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'api'})}
              >
                <div className="flex justify-center mb-2">
                  <Server className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">REST API</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Query data on-demand with our REST endpoints</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'sftp' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'sftp'})}
              >
                <div className="flex justify-center mb-2">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-center font-medium">SFTP Transfer</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Scheduled file delivery to your SFTP server</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'graphql' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'graphql'})}
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
              
              {/* Pub/Sub Messaging */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'pubsub' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'pubsub'})}
              >
                <div className="flex justify-center mb-2">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M9 21l1.5-1.5L9 18l-1.5 1.5L9 21z"></path>
                    <path d="M15 3l1.5 1.5L15 6l-1.5-1.5L15 3z"></path>
                  </svg>
                </div>
                <h3 className="text-center font-medium">Pub/Sub Messaging</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Real-time event-driven data streaming</p>
              </div>
              
              {/* Visualisation Tools button */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.mechanism === 'visualization' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => setDeliveryConfig({...deliveryConfig, mechanism: 'visualization', visualizationTool: ''})}
              >
                <div className="flex justify-center mb-2">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-center font-medium">Visualisation Tools</h3>
                <p className="text-xs text-center text-gray-500 mt-1">Connect with visualization platforms</p>
              </div>
            </div>
          </div>
          
          {/* Pub/Sub Configuration (only shows when pubsub is selected) */}
          {deliveryConfig.mechanism === 'pubsub' && (
            <div className="space-y-6">
              {/* Message Broker Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Broker</label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer ${deliveryConfig.pubsubConfig.broker === 'apache_kafka' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, broker: 'apache_kafka'}})}
                  >
                    <div className="flex justify-center mb-2">
                      <Server className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-center font-medium text-sm">Apache Kafka</h4>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer ${deliveryConfig.pubsubConfig.broker === 'rabbitmq' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, broker: 'rabbitmq'}})}
                  >
                    <div className="flex justify-center mb-2">
                      <Database className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-center font-medium text-sm">RabbitMQ</h4>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer ${deliveryConfig.pubsubConfig.broker === 'azure_service_bus' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, broker: 'azure_service_bus'}})}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-5.12 5.12a.8.8 0 01-1.136 0l-2.56-2.56a.8.8 0 111.136-1.136L12 11.696l4.432-4.432a.8.8 0 111.136 1.136z"/>
                      </svg>
                    </div>
                    <h4 className="text-center font-medium text-sm">Azure Service Bus</h4>
                  </div>
                </div>
              </div>
              
              {/* Topic/Queue Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Queue Name</label>
                  <input
                    type="text"
                    value={deliveryConfig.pubsubConfig.topicName}
                    onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, topicName: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="data-product-updates"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Format</label>
                  <select
                    value={deliveryConfig.pubsubConfig.messageFormat}
                    onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, messageFormat: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="json">JSON</option>
                    <option value="avro">Avro</option>
                    <option value="protobuf">Protocol Buffers</option>
                  </select>
                </div>
              </div>
              
              {/* Delivery Guarantee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Guarantee</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${deliveryConfig.pubsubConfig.deliveryGuarantee === 'at_most_once' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, deliveryGuarantee: 'at_most_once'}})}
                  >
                    At Most Once
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${deliveryConfig.pubsubConfig.deliveryGuarantee === 'at_least_once' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, deliveryGuarantee: 'at_least_once'}})}
                  >
                    At Least Once
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${deliveryConfig.pubsubConfig.deliveryGuarantee === 'exactly_once' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, deliveryGuarantee: 'exactly_once'}})}
                  >
                    Exactly Once
                  </button>
                </div>
              </div>
              
              {/* Trigger Events */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Events</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryConfig.pubsubConfig.triggerEvents.dataUpdates}
                      onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, triggerEvents: {...deliveryConfig.pubsubConfig.triggerEvents, dataUpdates: e.target.checked}}})}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Data Updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryConfig.pubsubConfig.triggerEvents.schemaChanges}
                      onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, triggerEvents: {...deliveryConfig.pubsubConfig.triggerEvents, schemaChanges: e.target.checked}}})}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Schema Changes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryConfig.pubsubConfig.triggerEvents.qualityAlerts}
                      onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, triggerEvents: {...deliveryConfig.pubsubConfig.triggerEvents, qualityAlerts: e.target.checked}}})}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Quality Alerts</span>
                  </label>
                </div>
              </div>
              
              {/* Batch Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                  <input
                    type="number"
                    value={deliveryConfig.pubsubConfig.batchSize}
                    onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, batchSize: parseInt(e.target.value)}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                    max="10000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Wait Time (seconds)</label>
                  <input
                    type="number"
                    value={deliveryConfig.pubsubConfig.maxWaitTime}
                    onChange={(e) => setDeliveryConfig({...deliveryConfig, pubsubConfig: {...deliveryConfig.pubsubConfig, maxWaitTime: parseInt(e.target.value)}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                    max="300"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Visualization Tool Selection (only shows when visualization is selected) */}
          {deliveryConfig.mechanism === 'visualization' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Visualization Tool</label>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.visualizationTool === 'power_bi' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, visualizationTool: 'power_bi'})}
                >
                  <div className="flex justify-center mb-2">
                    <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M7.5,18C5.6,18,4,16.4,4,14.5S5.6,11,7.5,11S11,12.6,11,14.5S9.4,18,7.5,18z M11,10H4V6h7V10z M21,14h-7v-2h7V14z M21,10h-7V6h7V10z"/>
                    </svg>
                  </div>
                  <h3 className="text-center font-medium">Power BI</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Microsoft's analytics platform</p>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.visualizationTool === 'tableau' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, visualizationTool: 'tableau'})}
                >
                  <div className="flex justify-center mb-2">
                    <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  </div>
                  <h3 className="text-center font-medium">Tableau</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Salesforce's visual analytics</p>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${deliveryConfig.visualizationTool === 'looker' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                  onClick={() => setDeliveryConfig({...deliveryConfig, visualizationTool: 'looker'})}
                >
                  <div className="flex justify-center mb-2">
                    <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <h3 className="text-center font-medium">Looker</h3>
                  <p className="text-xs text-center text-gray-500 mt-1">Google's BI platform</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Format Options (hide when visualization or pubsub is selected) */}
          {deliveryConfig.mechanism !== 'visualization' && deliveryConfig.mechanism !== 'pubsub' && (
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
          
          {/* Refresh Frequency (hide when pubsub is selected since it's real-time) */}
          {deliveryConfig.mechanism !== 'pubsub' && (
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
          )}
          
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center w-full"
              onClick={handleCreateContract}
              disabled={isProcessing || (deliveryConfig.mechanism === 'visualization' && !deliveryConfig.visualizationTool)}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                  Creating Contract...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Create Data Contract
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
  
  const ContractSummarySection = () => (
    contractCreated ? (
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
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
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
            <h4 className="font-medium text-gray-900 mb-2">Natural Language Query</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-gray-800">{query}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Generated SQL</h4>
            <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {generatedSQL}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Included Columns</h4>
              <span className="text-sm text-gray-500">{derivedColumns.length} columns</span>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {derivedColumns.map((column, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getSensitivityColor(column.sensitivity).replace('text-', 'bg-').replace('-100', '-600')}`}></div>
                    <span className="text-sm">{column.name}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${getSourceColor(column.source)}`}>
                      {column.source}
                    </span>
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
                    {deliveryConfig.mechanism === 'visualization' ? 'Visualisation Tools' : 
                     deliveryConfig.mechanism === 'pubsub' ? 'Pub/Sub Messaging' : 
                     deliveryConfig.mechanism}
                  </div>
                </div>
                {deliveryConfig.mechanism === 'visualization' ? (
                  <div>
                    <div className="text-sm text-gray-500">Tool</div>
                    <div className="font-medium text-gray-900 mt-1 capitalize">
                      {deliveryConfig.visualizationTool.replace('_', ' ')}
                    </div>
                  </div>
                ) : deliveryConfig.mechanism === 'pubsub' ? (
                  <div>
                    <div className="text-sm text-gray-500">Broker</div>
                    <div className="font-medium text-gray-900 mt-1 capitalize">
                      {deliveryConfig.pubsubConfig.broker.replace('_', ' ')}
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
                  <div className="font-medium text-gray-900 mt-1 capitalize">
                    {deliveryConfig.mechanism === 'pubsub' ? 'Real-time' : deliveryConfig.frequency}
                  </div>
                </div>
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
                        <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
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
                        <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
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
{`curl -X GET "https://api.enterprise.com/v1/contracts/${contractId}/data" \\
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
                  <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sample Query</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`query {
  contract(id: "${contractId}") {
    data {
${derivedColumns.map(col => `      ${col.name}`).join('\n')}
    }
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
                      <div className="font-medium text-gray-900 mt-1">nl_query_{`{YYYY-MM-DD}`}.{deliveryConfig.format}</div>
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
          
          {/* Pub/Sub Access Instructions */}
          {deliveryConfig.mechanism === 'pubsub' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Pub/Sub Connection Details</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Topic Name</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value={`data-product-${contractId}`}
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
                          readOnly 
                        />
                        <button className="absolute right-2 top-2 text-purple-600 hover:text-purple-800">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Message Broker</div>
                      <div className="font-medium text-gray-900 mt-1 capitalize">
                        {deliveryConfig.pubsubConfig.broker.replace('_', ' ')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Subscription ID</div>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          value={`sub-${contractId}`}
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded bg-gray-50" 
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
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Message Schema</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "eventType": "data_update",
  "timestamp": "${new Date().toISOString()}",
  "contractId": "${contractId}",
  "dataProduct": "Customer 360",
  "messageId": "msg-12345-abcde",
  "payload": {
${derivedColumns.map(col => `    "${col.name}": "value"`).join(',\n')}
  },
  "metadata": {
    "source": "data-platform",
    "version": "1.0",
    "batchSize": ${deliveryConfig.pubsubConfig.batchSize}
  }
}`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Consumer Setup Instructions</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li>Configure your {deliveryConfig.pubsubConfig.broker.replace('_', ' ')} consumer with the provided topic name</li>
                  <li>Use the subscription ID for tracking consumption progress</li>
                  <li>Authenticate using the provided access token</li>
                  <li>Process incoming messages according to the schema above</li>
                  <li>Implement proper error handling and acknowledgment</li>
                </ol>
                
                {deliveryConfig.pubsubConfig.broker === 'apache_kafka' && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Kafka Consumer Code Sample</h5>
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
                )}
              </div>
            </div>
          )}
          
          {/* Visualization Tools Access Instructions */}
          {deliveryConfig.mechanism === 'visualization' && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Visualization Connection Details</h4>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Connection Name</div>
                      <div className="font-medium text-gray-900 mt-1">NL-Query-{contractId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Connection Type</div>
                      <div className="font-medium text-gray-900 mt-1">Direct Query</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Connection String</h4>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto relative">
                  <code>{`Server=data-hub.enterprise.com;Database=${contractId};Auth=OAuth;ClientId=viz_client;`}</code>
                  <button className="absolute right-2 top-2 text-white hover:text-gray-200">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {deliveryConfig.visualizationTool === 'power_bi' && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Power BI Connection Steps</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                    <li>Open Power BI Desktop</li>
                    <li>Click "Get Data" → "Database" → "SQL Server"</li>
                    <li>Paste the connection string above</li>
                    <li>Select "DirectQuery" mode</li>
                    <li>Use OAuth authentication when prompted</li>
                  </ol>
                </div>
              )}
              
              {deliveryConfig.visualizationTool === 'tableau' && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tableau Connection Steps</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                    <li>Open Tableau Desktop</li>
                    <li>Under "Connect" → "To a Server" → "SQL Server"</li>
                    <li>Enter connection details from above</li>
                    <li>Select "Use OAuth" authentication method</li>
                  </ol>
                </div>
              )}
              
              {deliveryConfig.visualizationTool === 'looker' && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Looker Connection Steps</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                    <li>Contact your Looker admin to add this connection</li>
                    <li>Provide them with the connection details above</li>
                    <li>Once added, create a new LookML model using this connection</li>
                    <li>Explore your data using the Looker interface</li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ) : null
  );
  
  // Main component render
  return (
    <div className="bg-white shadow-sm rounded-lg max-w-5xl mx-auto p-8">
      <div className="flex items-center mb-6">
        <Sparkles className="h-7 w-7 text-purple-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">GenAI Data Contract Creator</h1>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}
      
      <QueryInputSection />
      
      {generatedSQL && (
        <>
          <SQLPreviewSection />
          <DataPreviewSection />
          <ColumnSelectionSection />
          <DeliveryConfigurationSection />
          <ContractSummarySection />
        </>
      )}
    </div>
  );
};

export default GenAIInterface;