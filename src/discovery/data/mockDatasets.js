// src/discovery/data/mockDatasets.js - Enhanced with dataset schemas

export const mockDatasets = [
  {
    id: 'ds-001',
    title: 'Visible Alpha Estimates',
    category: 'Market Intelligence',
    description: 'This dataset includes forecasts, assumptions, and logic from full working sell-side models. This deep consensus data provides a quick understanding of the sell-side view on a company or industry at an unprecedented level of granularity, timeliness, and interactivity.',
    tags: ['Recently Enhanced', 'AI Ready Data'],
    coverage: 'Covers 17,000+ companies globally',
    historicalData: 'Historical data from 2015',
    deliveryOptions: [
      { name: 'Type A API', description: 'REST API with real-time access' },
      { name: 'Type B Feed', description: 'Excel Add-In for bulk downloads' },
      { name: 'Type C Platform', description: 'SFTP SnowFlake integration' },
      { name: 'Type D Gateway', description: 'S&P Capital IQ Pro embedded access' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'JSON, CSV, Excel',
      coverage: '17,000+ companies',
      regions: 'Global',
      startDate: '2015-01-01',
      lastUpdated: '2024-12-15'
    },
    schema: [
      { name: 'company_id', type: 'string', description: 'Unique company identifier' },
      { name: 'company_name', type: 'string', description: 'Company name' },
      { name: 'ticker_symbol', type: 'string', description: 'Stock ticker symbol' },
      { name: 'estimate_date', type: 'date', description: 'Date of the estimate' },
      { name: 'revenue_estimate', type: 'number', description: 'Revenue estimate in millions' },
      { name: 'earnings_per_share', type: 'number', description: 'Estimated earnings per share' },
      { name: 'analyst_count', type: 'integer', description: 'Number of analysts contributing' },
      { name: 'confidence_score', type: 'number', description: 'Confidence level of estimate (0-1)' },
      { name: 'sector', type: 'string', description: 'Industry sector' },
      { name: 'market_cap', type: 'number', description: 'Market capitalization' },
      { name: 'currency', type: 'string', description: 'Currency code (USD, EUR, etc.)' },
      { name: 'last_updated', type: 'datetime', description: 'Last update timestamp' }
    ],
    relatedDatasets: ['S&P Capital IQ Estimates', 'Market Demographics', 'OTC Derivatives Data'],
    qnaResponse: 'This dataset provides deep financial modeling insights from sell-side analysts, offering granular forecasts and assumptions that help understand market consensus at company and industry levels.'
  },
  {
    id: 'ds-002',
    title: 'S&P Capital IQ Estimates',
    category: 'Market Intelligence',
    description: 'Comprehensive global estimates based on market consensus data from multiple sources. Provides detailed financial projections and analyst insights.',
    tags: ['Recently Added', 'Commodity Insights'],
    coverage: 'Global coverage with 15,000+ entities',
    historicalData: 'Historical data from 2010',
    deliveryOptions: [
      { name: 'Type A API', description: 'REST API with real-time access' },
      { name: 'Type C Platform', description: 'Direct S&P Capital IQ integration' },
      { name: 'Type D Gateway', description: 'Custom data feeds' }
    ],
    metadata: {
      updateFrequency: 'Real-time',
      dataFormat: 'JSON, XML',
      coverage: '15,000+ entities',
      regions: 'Global',
      startDate: '2010-01-01',
      lastUpdated: '2024-12-14'
    },
    schema: [
      { name: 'entity_id', type: 'string', description: 'Unique entity identifier' },
      { name: 'entity_name', type: 'string', description: 'Entity name' },
      { name: 'ticker', type: 'string', description: 'Trading ticker symbol' },
      { name: 'estimate_type', type: 'string', description: 'Revenue, EPS, EBITDA, etc.' },
      { name: 'estimate_value', type: 'number', description: 'Estimated value' },
      { name: 'estimate_period', type: 'string', description: 'Q1, Q2, FY2024, etc.' },
      { name: 'consensus_mean', type: 'number', description: 'Mean consensus estimate' },
      { name: 'consensus_median', type: 'number', description: 'Median consensus estimate' },
      { name: 'num_estimates', type: 'integer', description: 'Number of contributing estimates' },
      { name: 'high_estimate', type: 'number', description: 'Highest estimate' },
      { name: 'low_estimate', type: 'number', description: 'Lowest estimate' },
      { name: 'standard_deviation', type: 'number', description: 'Standard deviation of estimates' }
    ],
    relatedDatasets: ['Visible Alpha Estimates', 'Market Demographics'],
    qnaResponse: 'S&P Capital IQ Estimates provides comprehensive financial estimates and projections based on analyst consensus, helping investors make informed decisions with real-time market insights.'
  },
  {
    id: 'ds-003',
    title: 'Market Demographics',
    category: 'Market Intelligence',
    description: 'Demographic data segments for market analysis including population statistics, economic indicators, and consumer behavior patterns.',
    tags: ['Recently Added'],
    coverage: 'Regional and country-level demographics',
    historicalData: 'Historical data from 2005',
    deliveryOptions: [
      { name: 'Type A API', description: 'REST API with filtered access' },
      { name: 'Type B Feed', description: 'Bulk data downloads' },
      { name: 'Type C Platform', description: 'Analytics dashboard access' }
    ],
    metadata: {
      updateFrequency: 'Monthly',
      dataFormat: 'CSV, JSON',
      coverage: '200+ countries',
      regions: 'Global',
      startDate: '2005-01-01',
      lastUpdated: '2024-11-30'
    },
    schema: [
      { name: 'region_id', type: 'string', description: 'Geographic region identifier' },
      { name: 'region_name', type: 'string', description: 'Region name' },
      { name: 'country_code', type: 'string', description: 'ISO country code' },
      { name: 'population', type: 'integer', description: 'Total population' },
      { name: 'age_median', type: 'number', description: 'Median age' },
      { name: 'income_median', type: 'number', description: 'Median household income' },
      { name: 'education_level', type: 'string', description: 'Primary education level' },
      { name: 'urban_percentage', type: 'number', description: 'Percentage living in urban areas' },
      { name: 'gdp_per_capita', type: 'number', description: 'GDP per capita' },
      { name: 'data_year', type: 'integer', description: 'Year of demographic data' }
    ],
    relatedDatasets: ['Visible Alpha Estimates', 'OTC Derivatives Data'],
    qnaResponse: 'Market Demographics dataset offers detailed population and economic data that helps understand market segments and consumer behavior across different regions and time periods.'
  },
  {
    id: 'ds-004',
    title: 'OTC Derivatives Data',
    category: 'Market Intelligence',
    description: 'Over-the-counter derivatives market data including trades, positions, and risk metrics for comprehensive market analysis.',
    tags: ['AI Ready Data'],
    coverage: 'Global OTC derivatives markets',
    historicalData: 'Historical data from 2018',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time derivatives feed' },
      { name: 'Type D Gateway', description: 'Risk analytics platform' }
    ],
    metadata: {
      updateFrequency: 'Real-time',
      dataFormat: 'JSON, FIX Protocol',
      coverage: 'Major OTC markets',
      regions: 'Americas, Europe, Asia',
      startDate: '2018-01-01',
      lastUpdated: '2024-12-15'
    },
    schema: [
      { name: 'trade_id', type: 'string', description: 'Unique trade identifier' },
      { name: 'instrument_type', type: 'string', description: 'Swap, Forward, Option, etc.' },
      { name: 'underlying_asset', type: 'string', description: 'Underlying asset reference' },
      { name: 'notional_amount', type: 'number', description: 'Notional amount' },
      { name: 'trade_date', type: 'date', description: 'Trade execution date' },
      { name: 'maturity_date', type: 'date', description: 'Contract maturity date' },
      { name: 'counterparty_1', type: 'string', description: 'First counterparty identifier' },
      { name: 'counterparty_2', type: 'string', description: 'Second counterparty identifier' },
      { name: 'mark_to_market', type: 'number', description: 'Current market value' },
      { name: 'risk_metrics', type: 'object', description: 'Risk calculation results' }
    ],
    relatedDatasets: ['S&P Capital IQ Estimates', 'Market Demographics'],
    qnaResponse: 'OTC Derivatives Data provides comprehensive insights into over-the-counter derivatives markets, including trade data, positions, and risk metrics for advanced financial analysis.'
  },
  {
    id: 'ds-005',
    title: 'Global ESG Scores',
    category: 'Sustainability Intelligence',
    description: 'Environmental, Social, and Governance (ESG) ratings and scores for public companies worldwide, based on standardized assessment frameworks.',
    tags: ['Recently Added', 'AI Ready Data'],
    coverage: 'Coverage of 8,000+ public companies',
    historicalData: 'Historical data from 2017',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time ESG score access' },
      { name: 'Type B Feed', description: 'Monthly ESG reports' },
      { name: 'Type C Platform', description: 'ESG analytics dashboard' }
    ],
    metadata: {
      updateFrequency: 'Monthly',
      dataFormat: 'JSON, CSV',
      coverage: '8,000+ companies',
      regions: 'Global',
      startDate: '2017-01-01',
      lastUpdated: '2024-12-10'
    },
    schema: [
      { name: 'company_id', type: 'string', description: 'Company identifier' },
      { name: 'company_name', type: 'string', description: 'Company name' },
      { name: 'environmental_score', type: 'number', description: 'Environmental rating (0-100)' },
      { name: 'social_score', type: 'number', description: 'Social rating (0-100)' },
      { name: 'governance_score', type: 'number', description: 'Governance rating (0-100)' },
      { name: 'overall_esg_score', type: 'number', description: 'Combined ESG score' },
      { name: 'carbon_emissions', type: 'number', description: 'Carbon emissions (tonnes CO2)' },
      { name: 'renewable_energy_pct', type: 'number', description: 'Renewable energy percentage' },
      { name: 'board_diversity', type: 'number', description: 'Board diversity score' },
      { name: 'assessment_date', type: 'date', description: 'ESG assessment date' }
    ],
    relatedDatasets: ['S&P Capital IQ Estimates', 'Market Demographics'],
    qnaResponse: 'Global ESG Scores dataset provides standardized environmental, social, and governance ratings that help assess corporate sustainability performance and investment risk factors.'
  },
  {
    id: 'ds-006',
    title: 'Credit Risk Analytics',
    category: 'Risk Intelligence',
    description: 'Comprehensive credit risk assessment data including probability of default, loss given default, and exposure at default for corporate and sovereign entities.',
    tags: ['Recently Enhanced', 'AI Ready Data'],
    coverage: 'Global credit risk coverage',
    historicalData: 'Historical data from 2012',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time risk metrics' },
      { name: 'Type C Platform', description: 'Risk management platform' },
      { name: 'Type D Gateway', description: 'Custom risk feeds' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'JSON, XML',
      coverage: '25,000+ entities',
      regions: 'Global',
      startDate: '2012-01-01',
      lastUpdated: '2024-12-13'
    },
    schema: [
      { name: 'entity_id', type: 'string', description: 'Entity identifier' },
      { name: 'entity_name', type: 'string', description: 'Entity name' },
      { name: 'entity_type', type: 'string', description: 'Corporate, Sovereign, or Municipal' },
      { name: 'probability_of_default', type: 'number', description: 'PD score (0-1)' },
      { name: 'loss_given_default', type: 'number', description: 'LGD percentage' },
      { name: 'exposure_at_default', type: 'number', description: 'EAD amount' },
      { name: 'credit_rating', type: 'string', description: 'Credit rating (AAA, BBB, etc.)' },
      { name: 'risk_score', type: 'number', description: 'Overall risk score (1-100)' },
      { name: 'assessment_date', type: 'date', description: 'Risk assessment date' },
      { name: 'country', type: 'string', description: 'Country of domicile' },
      { name: 'industry', type: 'string', description: 'Industry classification' }
    ],
    relatedDatasets: ['S&P Capital IQ Estimates', 'OTC Derivatives Data'],
    qnaResponse: 'Credit Risk Analytics provides advanced risk assessment metrics and models that help financial institutions evaluate creditworthiness and manage portfolio risk exposure.'
  },
  {
    id: 'ds-007',
    title: 'Commodity Price Intelligence',
    category: 'Commodity Intelligence',
    description: 'Real-time and historical pricing data for global commodities including energy, metals, agriculture, and soft commodities with forward curve analytics.',
    tags: ['Recently Added', 'AI Ready Data'],
    coverage: 'Global commodity markets',
    historicalData: 'Historical data from 2008',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time price feeds' },
      { name: 'Type B Feed', description: 'Historical data exports' },
      { name: 'Type C Platform', description: 'Commodity analytics platform' }
    ],
    metadata: {
      updateFrequency: 'Real-time',
      dataFormat: 'JSON, CSV, XML',
      coverage: '500+ commodities',
      regions: 'Global',
      startDate: '2008-01-01',
      lastUpdated: '2024-12-15'
    },
    schema: [
      { name: 'commodity_id', type: 'string', description: 'Commodity identifier' },
      { name: 'commodity_name', type: 'string', description: 'Commodity name' },
      { name: 'category', type: 'string', description: 'Energy, Metals, Agriculture' },
      { name: 'price', type: 'number', description: 'Current price' },
      { name: 'price_unit', type: 'string', description: 'Price unit ($/barrel, $/oz, etc.)' },
      { name: 'price_date', type: 'datetime', description: 'Price timestamp' },
      { name: 'volume', type: 'number', description: 'Trading volume' },
      { name: 'exchange', type: 'string', description: 'Trading exchange' },
      { name: 'settlement_date', type: 'date', description: 'Settlement date' },
      { name: 'volatility', type: 'number', description: 'Price volatility indicator' }
    ],
    relatedDatasets: ['Market Demographics', 'Global ESG Scores'],
    qnaResponse: 'Commodity Price Intelligence delivers comprehensive pricing data and analytics for global commodity markets, enabling better trading decisions and risk management strategies.'
  },
  {
    id: 'ds-008',
    title: 'Alternative Data Signals',
    category: 'Alternative Intelligence',
    description: 'Curated alternative data including satellite imagery analysis, social sentiment, web scraping insights, and geolocation data for investment research.',
    tags: ['AI Ready Data'],
    coverage: 'Multi-source alternative data',
    historicalData: 'Historical data from 2019',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time signal feeds' },
      { name: 'Type B Feed', description: 'Batch signal processing' },
      { name: 'Type D Gateway', description: 'Custom alternative data' }
    ],
    metadata: {
      updateFrequency: 'Hourly',
      dataFormat: 'JSON, Parquet',
      coverage: '20+ data sources',
      regions: 'Global',
      startDate: '2019-01-01',
      lastUpdated: '2024-12-15'
    },
    schema: [
      { name: 'signal_id', type: 'string', description: 'Signal identifier' },
      { name: 'signal_type', type: 'string', description: 'Satellite, Social, Web, Geolocation' },
      { name: 'entity_reference', type: 'string', description: 'Referenced entity (company, location)' },
      { name: 'signal_value', type: 'number', description: 'Signal strength/value' },
      { name: 'confidence_level', type: 'number', description: 'Data confidence (0-1)' },
      { name: 'source_provider', type: 'string', description: 'Data source provider' },
      { name: 'collection_timestamp', type: 'datetime', description: 'Data collection time' },
      { name: 'geographic_lat', type: 'number', description: 'Latitude coordinate' },
      { name: 'geographic_lng', type: 'number', description: 'Longitude coordinate' },
      { name: 'sentiment_score', type: 'number', description: 'Sentiment analysis score' }
    ],
    relatedDatasets: ['Global ESG Scores', 'Market Demographics'],
    qnaResponse: 'Alternative Data Signals aggregates non-traditional data sources to provide unique market insights and early indicators for investment strategies and business intelligence.'
  }
];

export const trendingDatasets = mockDatasets.filter(ds => 
  ds.tags.includes('Recently Added') || ds.tags.includes('Recently Enhanced')
);

export const getDatasetById = (id) => {
  return mockDatasets.find(dataset => dataset.id === id);
};

export const searchDatasets = (query) => {
  if (!query) return mockDatasets;
  
  const searchTerm = query.toLowerCase();
  return mockDatasets.filter(dataset => 
    dataset.title.toLowerCase().includes(searchTerm) ||
    dataset.description.toLowerCase().includes(searchTerm) ||
    dataset.category.toLowerCase().includes(searchTerm) ||
    dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};