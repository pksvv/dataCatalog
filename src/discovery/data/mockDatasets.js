// src/discovery/data/mockDatasets.js - Enhanced with regulatory reporting datasets

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
      lastUpdated: '2024-12-15',
      retentionPolicy: '7 years'
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
      lastUpdated: '2024-12-14',
      retentionPolicy: '5 years'
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
      lastUpdated: '2024-11-30',
      retentionPolicy: '12 years'
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
      lastUpdated: '2024-12-15',
      retentionPolicy: '10 years'
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
      lastUpdated: '2024-12-10',
      retentionPolicy: '15 years'
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
      lastUpdated: '2024-12-13',
      retentionPolicy: '20 years'
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
      lastUpdated: '2024-12-15',
      retentionPolicy: '5 years'
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
      lastUpdated: '2024-12-15',
      retentionPolicy: '16 years'
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
  },
  // NEW REGULATORY REPORTING DATASETS
  {
    id: 'ds-009',
    title: 'FIN AR Daily Transaction Overview',
    category: 'Regulatory Reporting',
    description: 'Comprehensive daily transaction data for regulatory reporting including primary and offset account hierarchies, inter-entity transactions, and financial accounting hub integration for compliance and audit purposes.',
    tags: ['Y9C', 'FFIEC 031', 'FR Y-9C', 'Call Report', 'Regulatory Data', 'Daily Transaction Data'],
    coverage: 'US Banking entities and subsidiaries',
    historicalData: 'Historical data from 2018',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time transaction feed' },
      { name: 'Type B Feed', description: 'Daily batch exports for regulatory filing' },
      { name: 'Type C Platform', description: 'Regulatory reporting dashboard' },
      { name: 'Type D Gateway', description: 'Direct FFIEC submission feed' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'JSON, CSV, XML, XBRL',
      coverage: 'All regulated entities',
      regions: 'United States',
      startDate: '2018-01-01',
      lastUpdated: '2024-12-15',
      retentionPolicy: '20 years'
    },
    schema: [
      { name: 'prim_rc_ds', type: 'string', description: 'Description of Primary Responsibility Center' },
      { name: 'cstone_feed_key', type: 'integer', description: 'Unique nine-digit feed key for data provider tracking' },
      { name: 'prim_ent_nm', type: 'string', description: 'Primary Legal Entity Name/Code for regulatory identification' },
      { name: 'trans_dt', type: 'date', description: 'Transaction date for regulatory timeline compliance' },
      { name: 'srce_sys', type: 'string', description: 'Source System from Central Asset Registry' },
      { name: 'ofs_acct_type', type: 'string', description: 'Account type classification (A=Asset, E=Expense, R=Revenue, L=Liability, O=Equity)' },
      { name: 'cyc_cut_dt', type: 'date', description: 'Statement cycle cut date for reporting periods' },
      { name: 'prod_cd', type: 'string', description: 'Product code for regulatory product classification' },
      { name: 'appl_rgn_cd', type: 'string', description: 'Globestar region code for geographic reporting' },
      { name: 'adj_type_cd', type: 'string', description: 'Adjustment type code for transaction classification' }
    ],
    relatedDatasets: ['Card Member Merchant Profitability', 'CCAR Stress Testing Data', 'Basel III Capital Reports'],
    qnaResponse: 'FIN AR Daily Transaction Overview provides comprehensive daily transaction data essential for regulatory compliance, supporting Y9C, FFIEC 031, and other regulatory reporting requirements with detailed account hierarchies and inter-entity tracking.'
  },
  {
    id: 'ds-010',
    title: 'FIN Card Member Merchant Profitability',
    category: 'Regulatory Reporting',
    description: 'Detailed card member and merchant profitability analytics for regulatory capital calculations, stress testing scenarios, and portfolio risk assessment required for banking supervision.',
    tags: ['CCAR', 'DFAST', 'Basel III', 'Stress Testing', 'Portfolio Analytics', 'Capital Planning'],
    coverage: 'Card portfolio and merchant network',
    historicalData: 'Historical data from 2016',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time profitability metrics' },
      { name: 'Type B Feed', description: 'Quarterly stress testing extracts' },
      { name: 'Type C Platform', description: 'CCAR analytics platform' },
      { name: 'Type D Gateway', description: 'Fed supervisory data feeds' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'JSON, CSV, SAS, XBRL',
      coverage: 'Card member portfolio',
      regions: 'United States',
      startDate: '2016-01-01',
      lastUpdated: '2024-12-14',
      retentionPolicy: '30 years'
    },
    schema: [
      { name: 'card_portfo', type: 'string', description: 'Portfolio classification for regulatory segmentation' },
      { name: 'oracle_mer_hier_lvl2', type: 'string', description: 'Merchant industry hierarchy for risk classification' },
      { name: 'oracle_mer_hier_lvl3', type: 'string', description: 'T&E vs G&S classification for regulatory reporting' },
      { name: 'in_pers_disc_revn_usd_am', type: 'number', description: 'In-person discount revenue for income statement reporting' },
      { name: 'in_pers_dbv_usd_am', type: 'number', description: 'In-person discount billed volume for portfolio metrics' },
      { name: 'cm13', type: 'string', description: 'Card member identifier for privacy-compliant analytics' },
      { name: 'acct_tenure', type: 'string', description: 'Account tenure for portfolio vintage analysis' },
      { name: 'fico_score', type: 'string', description: 'FICO score for credit risk assessment' },
      { name: 'acct_seg', type: 'string', description: 'Account segment (MM, LM, GCG) for regulatory classification' },
      { name: 'drm_corp_clnt_seg', type: 'string', description: 'Corporate client segment for business line reporting' }
    ],
    relatedDatasets: ['Daily Transaction Overview', 'Credit Loss Provisioning', 'Liquidity Coverage Ratio'],
    qnaResponse: 'FIN Card Member Merchant Profitability delivers essential portfolio analytics for regulatory stress testing, CCAR submissions, and Basel III capital calculations with detailed card member and merchant profitability metrics.'
  },
  {
    id: 'ds-011',
    title: 'CCAR Stress Testing Data',
    category: 'Regulatory Reporting',
    description: 'Comprehensive Comprehensive Capital Analysis and Review (CCAR) stress testing dataset including baseline, adverse, and severely adverse economic scenarios with projected capital ratios and loss estimates.',
    tags: ['CCAR', 'DFAST', 'Fed Stress Test', 'Capital Planning', 'Scenario Analysis', 'Basel III'],
    coverage: 'All CCAR-subject institutions',
    historicalData: 'Historical data from 2013',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time stress metrics' },
      { name: 'Type B Feed', description: 'Annual CCAR submission extracts' },
      { name: 'Type C Platform', description: 'Stress testing analytics platform' },
      { name: 'Type D Gateway', description: 'Federal Reserve submission portal' }
    ],
    metadata: {
      updateFrequency: 'Quarterly',
      dataFormat: 'CSV, SAS, XBRL, XML',
      coverage: 'Large Bank Holding Companies',
      regions: 'United States',
      startDate: '2013-01-01',
      lastUpdated: '2024-12-10',
      retentionPolicy: '15 years'
    },
    schema: [
      { name: 'institution_id', type: 'string', description: 'Bank holding company identifier' },
      { name: 'scenario_type', type: 'string', description: 'Baseline, Adverse, or Severely Adverse scenario' },
      { name: 'projection_quarter', type: 'string', description: 'Forecast quarter (Q1 2025, etc.)' },
      { name: 'tier1_capital_ratio', type: 'number', description: 'Projected Tier 1 capital ratio' },
      { name: 'common_equity_tier1_ratio', type: 'number', description: 'CET1 ratio projection' },
      { name: 'leverage_ratio', type: 'number', description: 'Supplementary leverage ratio' },
      { name: 'total_losses', type: 'number', description: 'Projected total losses under scenario' },
      { name: 'credit_losses', type: 'number', description: 'Credit loss provisions' },
      { name: 'trading_losses', type: 'number', description: 'Trading and counterparty losses' },
      { name: 'pre_provision_net_revenue', type: 'number', description: 'PPNR under stress scenario' },
      { name: 'unemployment_rate', type: 'number', description: 'Scenario unemployment rate assumption' },
      { name: 'gdp_growth_rate', type: 'number', description: 'Scenario GDP growth assumption' }
    ],
    relatedDatasets: ['Basel III Capital Reports', 'Liquidity Coverage Ratio', 'Resolution Planning Data'],
    qnaResponse: 'CCAR Stress Testing Data provides comprehensive stress testing scenarios and projections required for Federal Reserve CCAR submissions, including capital ratios, loss estimates, and economic scenario modeling.'
  },
  {
    id: 'ds-012',
    title: 'Basel III Capital Reports',
    category: 'Regulatory Reporting',
    description: 'Basel III regulatory capital calculations including Common Equity Tier 1, Tier 1, Total Capital ratios, and regulatory adjustments for international banking supervision compliance.',
    tags: ['Basel III', 'Capital Adequacy', 'BIS', 'Tier 1 Capital', 'RWA', 'International Banking'],
    coverage: 'Internationally active banks',
    historicalData: 'Historical data from 2014',
    deliveryOptions: [
      { name: 'Type A API', description: 'Daily capital ratio monitoring' },
      { name: 'Type B Feed', description: 'Quarterly Basel III submissions' },
      { name: 'Type C Platform', description: 'Capital management dashboard' },
      { name: 'Type D Gateway', description: 'BIS reporting portal integration' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'XML, XBRL, CSV',
      coverage: 'Global systemically important banks',
      regions: 'Global',
      startDate: '2014-01-01',
      lastUpdated: '2024-12-13',
      retentionPolicy: '20 years'
    },
    schema: [
      { name: 'bank_id', type: 'string', description: 'Bank identifier for regulatory reporting' },
      { name: 'reporting_date', type: 'date', description: 'Basel III reporting date' },
      { name: 'cet1_capital', type: 'number', description: 'Common Equity Tier 1 capital amount' },
      { name: 'tier1_capital', type: 'number', description: 'Total Tier 1 capital' },
      { name: 'total_capital', type: 'number', description: 'Total regulatory capital' },
      { name: 'risk_weighted_assets', type: 'number', description: 'Total risk-weighted assets' },
      { name: 'cet1_ratio', type: 'number', description: 'CET1 capital ratio percentage' },
      { name: 'tier1_ratio', type: 'number', description: 'Tier 1 capital ratio percentage' },
      { name: 'total_capital_ratio', type: 'number', description: 'Total capital ratio percentage' },
      { name: 'leverage_ratio', type: 'number', description: 'Basel III leverage ratio' },
      { name: 'credit_risk_rwa', type: 'number', description: 'Credit risk weighted assets' },
      { name: 'operational_risk_rwa', type: 'number', description: 'Operational risk weighted assets' },
      { name: 'market_risk_rwa', type: 'number', description: 'Market risk weighted assets' }
    ],
    relatedDatasets: ['CCAR Stress Testing Data', 'Liquidity Coverage Ratio', 'Net Stable Funding Ratio'],
    qnaResponse: 'Basel III Capital Reports provides comprehensive regulatory capital calculations and ratios required for international banking supervision, ensuring compliance with global capital adequacy standards.'
  },
  {
    id: 'ds-013',
    title: 'FFIEC Call Report Data',
    category: 'Regulatory Reporting',
    description: 'Federal Financial Institutions Examination Council Call Report data including balance sheet, income statement, and regulatory schedules for US banking institutions quarterly filings.',
    tags: ['FFIEC 031', 'FFIEC 041', 'Call Report', 'FDIC', 'OCC', 'Fed Reports', 'Quarterly Filing'],
    coverage: 'All FDIC-insured institutions',
    historicalData: 'Historical data from 2001',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time call report access' },
      { name: 'Type B Feed', description: 'Quarterly filing extracts' },
      { name: 'Type C Platform', description: 'FFIEC central data repository' },
      { name: 'Type D Gateway', description: 'Direct FDIC/OCC submission' }
    ],
    metadata: {
      updateFrequency: 'Quarterly',
      dataFormat: 'SDF, CSV, XML, XBRL',
      coverage: '4,800+ US banks',
      regions: 'United States',
      startDate: '2001-01-01',
      lastUpdated: '2024-09-30',
      retentionPolicy: '12 years'
    },
    schema: [
      { name: 'fdic_cert_id', type: 'string', description: 'FDIC Certificate Number' },
      { name: 'institution_name', type: 'string', description: 'Bank legal name' },
      { name: 'reporting_date', type: 'date', description: 'Call report quarter end date' },
      { name: 'total_assets', type: 'number', description: 'Total assets (RCFD2170)' },
      { name: 'total_deposits', type: 'number', description: 'Total deposits (RCFD2200)' },
      { name: 'total_loans', type: 'number', description: 'Total loans and leases (RCFD1400)' },
      { name: 'tier1_capital', type: 'number', description: 'Tier 1 capital (RCFD8274)' },
      { name: 'net_income', type: 'number', description: 'Net income (RIAD4340)' },
      { name: 'charge_offs', type: 'number', description: 'Net charge-offs (RIAD4635)' },
      { name: 'provision_credit_losses', type: 'number', description: 'Provision for credit losses (RIAD4230)' },
      { name: 'nonperforming_loans', type: 'number', description: 'Nonaccrual loans (RCFD1407)' },
      { name: 'risk_weighted_assets', type: 'number', description: 'Risk-weighted assets (RCFDA223)' }
    ],
    relatedDatasets: ['Y9C Bank Holding Company Reports', 'FDIC SDI Data', 'OCC Quarterly Derivatives Report'],
    qnaResponse: 'FFIEC Call Report Data provides comprehensive quarterly financial and regulatory data for all US banking institutions, essential for supervisory monitoring, peer analysis, and regulatory compliance.'
  },
  {
    id: 'ds-014',
    title: 'FR Y-9C Bank Holding Company Reports',
    category: 'Regulatory Reporting',
    description: 'Federal Reserve Y-9C consolidated financial statements for bank holding companies including parent company only and consolidated subsidiary data for supervision and regulation.',
    tags: ['FR Y-9C', 'Y9C', 'BHC Reports', 'Federal Reserve', 'Bank Holding Company', 'Consolidated Reports'],
    coverage: 'Bank holding companies with $1B+ assets',
    historicalData: 'Historical data from 1986',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time BHC data access' },
      { name: 'Type B Feed', description: 'Quarterly Y-9C submissions' },
      { name: 'Type C Platform', description: 'Federal Reserve reporting portal' },
      { name: 'Type D Gateway', description: 'Supervisory data integration' }
    ],
    metadata: {
      updateFrequency: 'Quarterly',
      dataFormat: 'FRY9C, CSV, XML, XBRL',
      coverage: '250+ large BHCs',
      regions: 'United States',
      startDate: '1986-01-01',
      lastUpdated: '2024-09-30',
      retentionPolicy: '12 years'
    },
    schema: [
      { name: 'rssd_id', type: 'string', description: 'Federal Reserve RSSD identifier' },
      { name: 'bhc_name', type: 'string', description: 'Bank holding company name' },
      { name: 'reporting_date', type: 'date', description: 'Report quarter end date' },
      { name: 'total_assets_bhc', type: 'number', description: 'Total BHC assets consolidated (BHCK2170)' },
      { name: 'total_securities', type: 'number', description: 'Securities held (BHCK1754)' },
      { name: 'total_loans_bhc', type: 'number', description: 'Total loans at BHC level (BHCK1400)' },
      { name: 'goodwill', type: 'number', description: 'Goodwill and intangibles (BHCK3163)' },
      { name: 'total_equity_capital', type: 'number', description: 'Total equity capital (BHCK3210)' },
      { name: 'net_income_bhc', type: 'number', description: 'Net income consolidated (BHCK4340)' },
      { name: 'noninterest_income', type: 'number', description: 'Noninterest income (BHCK4079)' },
      { name: 'trading_revenue', type: 'number', description: 'Trading account revenue (BHCK4069)' },
      { name: 'investment_banking_fees', type: 'number', description: 'Investment banking fees (BHCKA220)' }
    ],
    relatedDatasets: ['FFIEC Call Report Data', 'FR Y-14 CCAR Data', 'FR Y-15 Debt Reports'],
    qnaResponse: 'FR Y-9C Bank Holding Company Reports provide comprehensive consolidated financial data for large bank holding companies, essential for Federal Reserve supervision and systemic risk monitoring.'
  },
  {
    id: 'ds-015',
    title: 'Liquidity Coverage Ratio (LCR) Reports',
    category: 'Regulatory Reporting',
    description: 'Basel III Liquidity Coverage Ratio regulatory reports including high-quality liquid assets, cash outflows, and inflows calculations for liquidity risk management and regulatory compliance.',
    tags: ['LCR', 'Basel III', 'Liquidity Risk', 'HQLA', 'Cash Flows', 'Liquidity Management'],
    coverage: 'Large banking organizations',
    historicalData: 'Historical data from 2015',
    deliveryOptions: [
      { name: 'Type A API', description: 'Daily LCR monitoring' },
      { name: 'Type B Feed', description: 'Monthly LCR regulatory submissions' },
      { name: 'Type C Platform', description: 'Liquidity risk dashboard' },
      { name: 'Type D Gateway', description: 'Central bank reporting integration' }
    ],
    metadata: {
      updateFrequency: 'Daily',
      dataFormat: 'XML, CSV, XBRL',
      coverage: 'Large banks and BHCs',
      regions: 'Global',
      startDate: '2015-01-01',
      lastUpdated: '2024-12-14',
      retentionPolicy: '25 years'
    },
    schema: [
      { name: 'institution_id', type: 'string', description: 'Bank identifier for LCR reporting' },
      { name: 'reporting_date', type: 'date', description: 'LCR calculation date' },
      { name: 'total_hqla', type: 'number', description: 'Total high-quality liquid assets' },
      { name: 'level1_assets', type: 'number', description: 'Level 1 HQLA (0% haircut)' },
      { name: 'level2a_assets', type: 'number', description: 'Level 2A HQLA (15% haircut)' },
      { name: 'level2b_assets', type: 'number', description: 'Level 2B HQLA (25-50% haircut)' },
      { name: 'total_net_cash_outflows', type: 'number', description: 'Total net cash outflows 30-day' },
      { name: 'retail_deposits_outflow', type: 'number', description: 'Retail deposit outflow rate' },
      { name: 'wholesale_funding_outflow', type: 'number', description: 'Wholesale funding outflow' },
      { name: 'lcr_ratio', type: 'number', description: 'LCR ratio percentage' },
      { name: 'currency', type: 'string', description: 'Reporting currency' },
      { name: 'jurisdiction', type: 'string', description: 'Regulatory jurisdiction' }
    ],
    relatedDatasets: ['Net Stable Funding Ratio', 'Basel III Capital Reports', 'Stress Testing Data'],
    qnaResponse: 'Liquidity Coverage Ratio Reports provide essential liquidity risk metrics and regulatory compliance data, ensuring banks maintain adequate liquid assets to meet short-term obligations under stress conditions.'
  },
  {
    id: 'ds-016',
    title: 'AML Transaction Monitoring Data',
    category: 'Regulatory Reporting',
    description: 'Anti-Money Laundering transaction monitoring dataset including suspicious activity detection, customer due diligence records, and regulatory filing requirements for BSA/AML compliance.',
    tags: ['AML', 'BSA', 'SAR', 'CTR', 'OFAC', 'KYC', 'Transaction Monitoring', 'FinCEN'],
    coverage: 'All financial institutions',
    historicalData: 'Historical data from 2010',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time AML monitoring' },
      { name: 'Type B Feed', description: 'Daily transaction surveillance' },
      { name: 'Type C Platform', description: 'AML case management system' },
      { name: 'Type D Gateway', description: 'FinCEN filing integration' }
    ],
    metadata: {
      updateFrequency: 'Real-time',
      dataFormat: 'JSON, XML, CSV',
      coverage: 'All regulated financial institutions',
      regions: 'United States',
      startDate: '2010-01-01',
      lastUpdated: '2024-12-15',
      retentionPolicy: '15 years'
    },
    schema: [
      { name: 'transaction_id', type: 'string', description: 'Unique transaction identifier' },
      { name: 'customer_id', type: 'string', description: 'Customer identifier (encrypted)' },
      { name: 'transaction_amount', type: 'number', description: 'Transaction amount in USD' },
      { name: 'transaction_type', type: 'string', description: 'Wire, ACH, Cash, Check, etc.' },
      { name: 'risk_score', type: 'number', description: 'AML risk score (0-100)' },
      { name: 'alert_triggered', type: 'boolean', description: 'Whether AML alert was triggered' },
      { name: 'ofac_hit', type: 'boolean', description: 'OFAC sanctions list match' },
      { name: 'pep_status', type: 'string', description: 'Politically exposed person status' },
      { name: 'country_risk_rating', type: 'string', description: 'High, Medium, Low country risk' },
      { name: 'sar_filed', type: 'boolean', description: 'Suspicious Activity Report filed' },
      { name: 'ctr_filed', type: 'boolean', description: 'Currency Transaction Report filed' },
      { name: 'investigation_status', type: 'string', description: 'Open, Closed, Escalated' }
    ],
    relatedDatasets: ['Customer Due Diligence Data', 'OFAC Sanctions Lists', 'Correspondent Banking Reports'],
    qnaResponse: 'AML Transaction Monitoring Data provides comprehensive anti-money laundering surveillance and compliance data, supporting BSA/AML regulatory requirements and suspicious activity detection.'
  },
  {
    id: 'ds-017',
    title: 'CECL Credit Loss Modeling Data',
    category: 'Regulatory Reporting',
    description: 'Current Expected Credit Loss (CECL) accounting standard implementation data including lifetime loss estimates, economic forecasts, and credit loss provisioning models for GAAP compliance.',
    tags: ['CECL', 'Credit Losses', 'GAAP', 'FASB', 'Provisioning', 'Lifetime Losses', 'Economic Forecasts'],
    coverage: 'All financial institutions',
    historicalData: 'Historical data from 2020',
    deliveryOptions: [
      { name: 'Type A API', description: 'Real-time CECL calculations' },
      { name: 'Type B Feed', description: 'Monthly CECL provision data' },
      { name: 'Type C Platform', description: 'CECL modeling platform' },
      { name: 'Type D Gateway', description: 'External economic data feeds' }
    ],
    metadata: {
      updateFrequency: 'Monthly',
      dataFormat: 'CSV, JSON, SAS',
      coverage: 'All credit portfolios',
      regions: 'United States',
      startDate: '2020-01-01',
      lastUpdated: '2024-12-10',
      retentionPolicy: '7 years',
      dataClassification: 'Confidential',
      piiData: false,
      regulatoryRequirements: ['CECL', 'GAAP', 'FASB', 'Credit Loss Accounting']
    },
    schema: [
      { name: 'portfolio_segment', type: 'string', description: 'Credit card, mortgage, commercial, etc.' },
      { name: 'vintage', type: 'string', description: 'Loan origination vintage year-month' },
      { name: 'probability_of_default', type: 'number', description: 'Lifetime PD estimate' },
      { name: 'loss_given_default', type: 'number', description: 'LGD assumption percentage' },
      { name: 'exposure_at_default', type: 'number', description: 'EAD at time of default' },
      { name: 'current_balance', type: 'number', description: 'Current outstanding balance' },
      { name: 'lifetime_ecl', type: 'number', description: 'Lifetime expected credit loss' },
      { name: 'economic_scenario', type: 'string', description: 'Base, Adverse, Optimistic scenario' },
      { name: 'unemployment_forecast', type: 'number', description: 'Forecasted unemployment rate' },
      { name: 'gdp_forecast', type: 'number', description: 'GDP growth rate forecast' },
      { name: 'provision_amount', type: 'number', description: 'CECL provision amount' },
      { name: 'calculation_date', type: 'date', description: 'CECL calculation date' }
    ],
    relatedDatasets: ['Credit Risk Analytics', 'Economic Indicators', 'Portfolio Performance Data'],
    qnaResponse: 'CECL Credit Loss Modeling Data provides comprehensive credit loss estimation and provisioning data required for CECL accounting compliance, including lifetime loss calculations and economic scenario modeling.'
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

// Helper functions for intelligent query mapping
export const mapQueryToDatasets = (query) => {
  const queryLower = query.toLowerCase();
  const results = searchDatasets(query);
  
  // Enhanced query mapping patterns
  const queryPatterns = {
    // Regulatory patterns
    'stress testing|ccar|capital planning|adverse scenario': ['ds-011', 'ds-010', 'ds-012'],
    'basel|capital adequacy|tier 1|rwa|leverage ratio': ['ds-012', 'ds-015', 'ds-011'],
    'call report|ffiec|quarterly filing|bank financials': ['ds-013', 'ds-014'],
    'aml|anti money laundering|bsa|suspicious activity|transaction monitoring': ['ds-016'],
    'y9c|bank holding company|bhc|consolidated reports': ['ds-014', 'ds-013'],
    'cecl|credit loss|lifetime losses|provisioning': ['ds-017', 'ds-006'],
    'liquidity|lcr|coverage ratio|liquid assets': ['ds-015', 'ds-012'],
    
    // Market intelligence patterns
    'financial estimates|analyst|consensus|earnings': ['ds-001', 'ds-002'],
    'market data|demographics|economic indicators': ['ds-003', 'ds-007'],
    'derivatives|otc|trading|counterparty risk': ['ds-004', 'ds-006'],
    'esg|sustainability|environmental|governance': ['ds-005'],
    'credit risk|probability default|risk analytics': ['ds-006', 'ds-017'],
    'commodity|pricing|energy|metals|agriculture': ['ds-007'],
    'alternative data|satellite|sentiment|geolocation': ['ds-008']
  };

  // Find matching datasets by patterns
  let matchedDatasets = results;
  
  for (const [pattern, datasetIds] of Object.entries(queryPatterns)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(queryLower)) {
      const patternDatasets = datasetIds.map(id => getDatasetById(id)).filter(Boolean);
      if (patternDatasets.length > 0) {
        matchedDatasets = [...patternDatasets, ...results.filter(r => !datasetIds.includes(r.id))];
        break;
      }
    }
  }

  return matchedDatasets;
};

export const generateIntelligentResponse = (query, datasets) => {
  const queryLower = query.toLowerCase();
  
  // Use qnaResponse from matching datasets
  const primaryDataset = datasets[0];
  let baseResponse = primaryDataset?.qnaResponse || "I found relevant datasets for your query.";
  
  // Enhanced response based on query type
  if (queryLower.includes('stress test') || queryLower.includes('ccar')) {
    return {
      summary: baseResponse + " CCAR stress testing requires comprehensive data covering baseline, adverse, and severely adverse economic scenarios for capital planning and regulatory submissions.",
      recommendations: datasets.slice(0, 3).map(d => `${d.title}: ${d.qnaResponse || d.description.substring(0, 100)}...`),
      relatedConcepts: ["DFAST", "Capital Planning", "Fed Submissions", "Stress Scenarios"],
      context: "Large banks must demonstrate capital adequacy under stress conditions through annual CCAR assessments.",
      compliance: ["Annual submission to Federal Reserve", "9-quarter projection period", "Capital actions plan required"]
    };
  }
  
  if (queryLower.includes('basel') || queryLower.includes('capital')) {
    return {
      summary: baseResponse + " Basel III framework establishes international standards for bank capital adequacy, stress testing, and market liquidity risk.",
      recommendations: datasets.slice(0, 3).map(d => `${d.title}: ${d.qnaResponse || d.description.substring(0, 100)}...`),
      relatedConcepts: ["CET1 Ratio", "Risk-Weighted Assets", "Capital Conservation Buffer", "Leverage Ratio"],
      context: "Basel III standards ensure banks maintain adequate capital buffers to absorb losses during financial stress.",
      compliance: ["Minimum CET1 ratio: 4.5%", "Capital conservation buffer: 2.5%", "Phased implementation complete"]
    };
  }
  
  if (queryLower.includes('aml') || queryLower.includes('money laundering')) {
    return {
      summary: baseResponse + " Anti-Money Laundering compliance requires robust transaction monitoring, customer due diligence, and regulatory reporting.",
      recommendations: datasets.slice(0, 3).map(d => `${d.title}: ${d.qnaResponse || d.description.substring(0, 100)}...`),
      relatedConcepts: ["Transaction Monitoring", "SAR Filing", "Customer Due Diligence", "OFAC Screening"],
      context: "Financial institutions must maintain comprehensive AML programs to detect and report suspicious activities.",
      compliance: ["SAR filing within 30 days", "CTR for transactions $10K+", "Customer identification required"]
    };
  }
  
  // Default intelligent response using dataset qnaResponse
  return {
    summary: baseResponse + (datasets.length > 1 ? ` I found ${datasets.length} relevant datasets across multiple categories.` : ""),
    recommendations: datasets.slice(0, 3).map(d => `${d.title}: ${d.qnaResponse || d.description.substring(0, 100)}...`),
    relatedConcepts: [...new Set(datasets.flatMap(d => d.tags))].slice(0, 6),
    context: "Data-driven insights require comprehensive, accurate, and timely information across multiple domains.",
    compliance: datasets.filter(d => d.category === 'Regulatory Reporting').length > 0 ? 
      ["Regulatory compliance varies by jurisdiction", "Consult with compliance teams", "Regular updates required"] : []
  };
};