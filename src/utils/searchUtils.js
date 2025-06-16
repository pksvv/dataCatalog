import { dataProducts } from '../data/dataProducts';

// Separate filtering logic
export const filterProducts = (query) => {
  if (!query.trim()) {
    return dataProducts;
  }

  // Enhanced filtering logic
  return dataProducts.filter(product => {
    const queryLower = query.toLowerCase();
    
    // Direct matches
    if (product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.domain.toLowerCase().includes(queryLower)) {
      return true;
    }
    
    // Column-level search
    const columnMatch = product.columns.some(column => 
      column.name.toLowerCase().includes(queryLower) ||
      column.description.toLowerCase().includes(queryLower)
    );
    
    // Intent-based search
    if (queryLower.includes('customer') && 
        (product.name.toLowerCase().includes('customer') || 
         product.columns.some(col => col.name.toLowerCase().includes('customer')))) {
      return true;
    }
    
    if (queryLower.includes('financial') && 
        (product.domain.toLowerCase().includes('finance') || 
         product.name.toLowerCase().includes('balance'))) {
      return true;
    }
    
    if (queryLower.includes('inventory') && 
        product.name.toLowerCase().includes('inventory')) {
      return true;
    }
    
    if (queryLower.includes('transaction') && 
        product.name.toLowerCase().includes('transaction')) {
      return true;
    }
    
    if (queryLower.includes('sensitive') && 
        product.sensitivity.toLowerCase() === 'high') {
      return true;
    }
    
    if (queryLower.includes('regulatory') && 
        product.description.toLowerCase().includes('fr 2052a')) {
      return true;
    }
    
    if (queryLower.includes('derivative') && 
        product.name.toLowerCase().includes('derivative')) {
      return true;
    }
    
    if (queryLower.includes('pricing') && 
        product.columns.some(col => col.name.toLowerCase().includes('price'))) {
      return true;
    }
    
    return columnMatch;
  });
};

// Generate intelligent search suggestions
export const generateSearchSuggestions = (query) => {
  const queryLower = query.toLowerCase();
  const suggestions = [];
  
  if (queryLower.includes('customer') || queryLower.includes('personal')) {
    suggestions.push({
      type: 'table',
      title: 'Customer 360',
      description: 'Based on your query, you might be interested in customer data',
      columns: ['customer_id', 'full_name', 'email', 'segment', 'lifetime_value'],
      reasoning: 'Contains comprehensive customer information including personal details and behavioral data'
    });
  }
  
  if (queryLower.includes('financial') || queryLower.includes('balance') || queryLower.includes('regulatory')) {
    suggestions.push({
      type: 'table',
      title: 'Balance Sheet',
      description: 'Financial reporting data for regulatory compliance',
      columns: ['N_RPT_ID', 'D_RPT_DT', 'V_SBS_PROD_MAP_NM', 'V_LGL_ENT_NM'],
      reasoning: 'FR 2052A regulatory reporting data with balance sheet metrics'
    });
    
    suggestions.push({
      type: 'table',
      title: 'Derivatives and Collaterals',
      description: 'Derivatives and collateral data for financial reporting',
      columns: ['N_RPT_ID', 'D_RPT_DT', 'V_REPORT_TBL_NM', 'F_INTR_IN'],
      reasoning: 'Supplemental derivatives data used in FR 2052A reporting'
    });
  }
  
  if (queryLower.includes('inventory') || queryLower.includes('product')) {
    suggestions.push({
      type: 'table',
      title: 'Product Inventory',
      description: 'Real-time inventory and product information',
      columns: ['product_id', 'current_stock', 'reorder_level', 'cost_price'],
      reasoning: 'Current inventory levels and product details with real-time updates'
    });
  }
  
  if (queryLower.includes('sales') || queryLower.includes('transaction') || queryLower.includes('revenue')) {
    suggestions.push({
      type: 'table',
      title: 'Sales Transactions',
      description: 'Detailed sales transaction records',
      columns: ['transaction_id', 'customer_id', 'total_amount', 'payment_method'],
      reasoning: 'Complete transaction history across all sales channels'
    });
  }
  
  if (queryLower.includes('derivative') || queryLower.includes('collateral')) {
    suggestions.push({
      type: 'table',
      title: 'Derivatives and Collaterals',
      description: 'Derivatives and collateral exposure data',
      columns: ['N_RPT_ID', 'V_REPORT_TBL_NM', 'F_INTR_IN', 'V_LGL_ENT_NM'],
      reasoning: 'Critical for risk management and regulatory reporting'
    });
  }
  
  if (queryLower.includes('pricing') || queryLower.includes('price')) {
    dataProducts.forEach(product => {
      const priceColumns = product.columns.filter(col => 
        col.name.toLowerCase().includes('price') || 
        col.name.toLowerCase().includes('amount') ||
        col.name.toLowerCase().includes('cost')
      );
      if (priceColumns.length > 0) {
        suggestions.push({
          type: 'pricing',
          title: product.name,
          description: 'Contains pricing information',
          columns: priceColumns.map(col => col.name),
          reasoning: `Has ${priceColumns.length} pricing-related columns for financial analysis`
        });
      }
    });
  }
  
  if (queryLower.includes('sensitive') || queryLower.includes('high sensitivity')) {
    dataProducts.forEach(product => {
      if (product.sensitivity.toLowerCase() === 'high') {
        const sensitiveColumns = product.columns.filter(col => col.sensitivity === 'high');
        if (sensitiveColumns.length > 0) {
          suggestions.push({
            type: 'sensitivity',
            title: product.name,
            description: 'High sensitivity data product',
            columns: sensitiveColumns.map(col => col.name),
            reasoning: `Contains ${sensitiveColumns.length} high-sensitivity columns requiring special access controls`
          });
        }
      }
    });
  }
  
  return suggestions.slice(0, 3); // Limit to top 3 suggestions
};

export const getSensitivityColor = (level) => {
  switch(level.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};