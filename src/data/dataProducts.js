export const dataProducts = [
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
        { id: "src1", name: "Regulatory Reporting System", type: "source" },
        { id: "src2", name: "Balance Sheet Engine", type: "source" },
        { id: "src3", name: "Risk Management Platform", type: "source" }
      ],
      transformations: [
        { id: "etl1", name: "FR 2052A Data Processing", type: "process" },
        { id: "etl2", name: "Regulatory Validation", type: "process" }
      ],
      downstream: [
        { id: "tgt1", name: "Federal Reserve Reporting", type: "target" },
        { id: "tgt2", name: "Risk Analytics Dashboard", type: "target" },
        { id: "tgt3", name: "Compliance Monitoring", type: "target" }
      ]
    },
    logs: [
      { timestamp: "2025-06-05T08:12:34", level: "INFO", message: "Daily FR 2052A refresh completed successfully" },
      { timestamp: "2025-06-05T02:15:22", level: "WARN", message: "Risk data source delayed by 15 minutes" },
      { timestamp: "2025-06-04T08:14:12", level: "INFO", message: "Daily refresh completed successfully" }
    ],
    failedJobs: [
      { id: "job1", timestamp: "2025-06-03T08:22:17", name: "Regulatory Validation", status: "FAILED", reason: "Data quality threshold not met" },
      { id: "job2", timestamp: "2025-05-28T02:45:12", name: "Balance Sheet Integration", status: "FAILED", reason: "Schema validation error" }
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
      { name: "F_INTR_IN", type: "date", sensitivity: "low", description: "Interest rate indicator." },
      { name: "V_LGL_ENT_NM", type: "date", sensitivity: "low", description: "Legal entity name." }
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
        { id: "src1", name: "Derivatives Trading System", type: "source" },
        { id: "src2", name: "Collateral Management", type: "source" },
        { id: "src3", name: "Market Data Provider", type: "source" }
      ],
      transformations: [
        { id: "etl1", name: "Derivatives Data Processing", type: "process" },
        { id: "etl2", name: "Collateral Valuation", type: "process" }
      ],
      downstream: [
        { id: "tgt1", name: "Risk Exposure Reports", type: "target" },
        { id: "tgt2", name: "Regulatory Submissions", type: "target" },
        { id: "tgt3", name: "Credit Risk Analytics", type: "target" }
      ]
    },
    logs: [
      { timestamp: "2025-06-05T08:12:34", level: "INFO", message: "Daily derivatives refresh completed successfully" },
      { timestamp: "2025-06-05T02:15:22", level: "WARN", message: "Market data source delayed by 15 minutes" },
      { timestamp: "2025-06-04T08:14:12", level: "INFO", message: "Daily refresh completed successfully" }
    ],
    failedJobs: [
      { id: "job1", timestamp: "2025-06-03T08:22:17", name: "Collateral Valuation", status: "FAILED", reason: "Market data unavailable" },
      { id: "job2", timestamp: "2025-05-28T02:45:12", name: "Derivatives Integration", status: "FAILED", reason: "Schema validation error" }
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
  },
  {
    id: 5,
    name: "Customer 360",
    description: "Comprehensive customer profiles with demographic, behavioral, and transaction history",
    owner: "Customer Analytics Team",
    updateFrequency: "Daily",
    sensitivity: "High",
    quality: 93,
    domain: "Customer",
    columns: [
      { name: "customer_id", type: "string", sensitivity: "medium", description: "Unique identifier for the customer" },
      { name: "full_name", type: "string", sensitivity: "high", description: "Customer's full name" },
      { name: "email", type: "string", sensitivity: "high", description: "Customer's email address" },
      { name: "phone", type: "string", sensitivity: "high", description: "Customer's phone number" },
      { name: "address", type: "string", sensitivity: "high", description: "Customer's address" },
      { name: "segment", type: "string", sensitivity: "medium", description: "Customer segment classification" },
      { name: "lifetime_value", type: "number", sensitivity: "medium", description: "Total customer lifetime value" },
      { name: "acquisition_date", type: "date", sensitivity: "low", description: "Date customer was acquired" },
      { name: "last_purchase_date", type: "date", sensitivity: "low", description: "Date of last purchase" }
    ],
    usage: {
      activeContracts: 28,
      monthlyQueries: "1.8M"
    },
    metrics: {
      uptime: "99.5%",
      avgResponseTime: "52ms",
      dataQuality: "93%",
      completeness: "94%"
    },
    cost: {
      storagePerMonth: "$150",
      queryPerMillion: "$0.38",
      apiCallsPerThousand: "$0.30",
      monthlyTotal: "$980"
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
    }
  }
];

export const exampleQueries = [
  "Show me all customer data with personal information",
  "I need financial data for regulatory reporting",
  "Where can I find derivative and collateral information?",
  "What data do we have about product inventory levels?",
  "Show me sales transaction data with customer details",
  "I'm looking for balance sheet data for FR 2052A compliance",
  "Find data products with high sensitivity levels",
  "What data sources contain pricing information?"
];