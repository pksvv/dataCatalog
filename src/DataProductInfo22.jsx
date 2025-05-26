import React, { useState } from 'react';
import { Download, FileText, Info, Clock, User, Tag, Check, X, Sparkles, Volume2, ExternalLink, Play, BookOpen, Presentation, Code } from 'lucide-react';

const DataProductInfo = () => {
  // Learning resources configuration
  const learningResources = [
    {
      id: 1,
      title: "Data Product Strategy Overview",
      description: "Comprehensive introduction to data products and our dual approach strategy",
      duration: "~15 minutes",
      presenter: "Data Strategy Team",
      topics: ["Data Products Fundamentals", "Traditional vs GenAI Approaches", "Implementation Roadmap"],
      fileUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/audio/sample.mp3",
      transcriptUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/transcripts/strategy-overview.md",
      type: "Overview",
      icon: Presentation,
      contentType: "audio"
    },
    {
      id: 2,
      title: "Technical Deep Dive",
      description: "Data Product Canvas framework and implementation architecture",
      duration: "~20 minutes",
      presenter: "Technical Architecture Team",
      topics: ["Data Product Canvas", "Framework Structure", "Implementation Components"],
      fileUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/docs/technical-deep-dive.pdf",
      type: "Technical",
      icon: Code,
      contentType: "presentation"
    },
    {
      id: 3,
      title: "Business Impact & ROI",
      description: "Business case, expected benefits, and success metrics",
      duration: "~12 minutes",
      presenter: "Business Strategy Team",
      topics: ["ROI Analysis", "Success Metrics", "Change Management"],
      fileUrl: "https://your-username.github.io/data-product-assets/audio/business-impact.mp3",
      type: "Business",
      icon: BookOpen,
      contentType: "audio",
      comingSoon: true
    }
  ];

  const [selectedResource, setSelectedResource] = useState(learningResources[0]);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'resource-file';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePlayExternal = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Overview': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Technical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Business': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSelectedTypeColor = (type) => {
    switch(type) {
      case 'Overview': return 'bg-blue-600 text-white border-blue-600';
      case 'Technical': return 'bg-purple-600 text-white border-purple-600';
      case 'Business': return 'bg-green-600 text-white border-green-600';
      default: return 'bg-gray-600 text-white border-gray-600';
    }
  };

  // Technical Deep Dive content based on the PDF
  const getTechnicalContent = () => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Product Canvas Framework</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg mb-4">
            The Data Product Canvas is a visual framework that guides teams through data product specification. 
            It consists of <strong>eight essential building blocks</strong> that teams fill out collaboratively.
          </p>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
            <p className="text-purple-800">
              <strong>Canvas Purpose:</strong> Provides a structured approach to designing data products with clear 
              ownership, consumer focus, and technical specifications.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Eight Building Blocks:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">1. Domain</h4>
                <p className="text-sm text-gray-600">Identifies the domain team responsible for the data product - who owns, specifies, and maintains it</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">2. Data Product Name</h4>
                <p className="text-sm text-gray-600">Unique identifier following organizational naming strategy for discovery and access</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">3. Consumer & Use Cases</h4>
                <p className="text-sm text-gray-600">Describes who will use this data product and what problems it solves</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">4. Data Contract</h4>
                <p className="text-sm text-gray-600">Defines interface, metadata, terms of use, data model, and semantic definitions</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">5. Sources</h4>
                <p className="text-sm text-gray-600">Input data sources - operational systems and other data products</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">6. Data Product Architecture</h4>
                <p className="text-sm text-gray-600">Core technical design including ingestion, storage, transformations, and platform services</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">7. Ubiquitous Language</h4>
                <p className="text-sm text-gray-600">Common domain terminology shared between all stakeholders</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-600">8. Classification</h4>
                <p className="text-sm text-gray-600">Data product type: source-aligned, aggregate, or consumer-aligned</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sociotechnical Architecture Approach</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg mb-4">
            Our data architecture balances three quality pillars through a <strong>sociotechnical approach</strong> 
            that focuses on People, Processes, and Technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🏗️ Balance 3 Pillars</h3>
              <p className="text-sm text-blue-700">People, Processes, and Technology working together harmoniously</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Ensures Quality</h3>
              <p className="text-sm text-green-700">Meet consumer expectations for reliable, accessible data</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Drives Product Thinking</h3>
              <p className="text-sm text-purple-700">Treat data as products aligned with user needs</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Implementation Components:</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-blue-600">Processing Framework</h4>
              <p className="text-sm text-gray-600">Batch/Streaming capabilities using RRDD (PySpark) & R2CE (Java) frameworks with dbt transformations</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-green-600">Storage & Query Engine</h4>
              <p className="text-sm text-gray-600">BigQuery, PySpark, R2CE integration with tables, files, and topic-based storage</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-purple-600">Scheduling & Monitoring</h4>
              <p className="text-sm text-gray-600">CI/CD pipelines with Composer (Airflow) orchestration and comprehensive monitoring</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Product Classification</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h3 className="font-semibold text-orange-800 mb-2">Source-Aligned</h3>
            <p className="text-sm text-orange-700">Operational data from source systems, domain-specific, minimal transformation</p>
          </div>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">Aggregate</h3>
            <p className="text-sm text-blue-700">Combined data from multiple sources, analytical use cases, cross-domain insights</p>
          </div>
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-2">Consumer-Aligned</h3>
            <p className="text-sm text-green-700">Tailored for specific consumer needs, optimized for particular use cases</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getOverviewContent = () => (
    <div className="space-y-8">
      {/* What are Data Products */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Data Products?</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg mb-4">
            A data product is <strong>an autonomous, read-optimized, standardized data unit containing at least one dataset, 
            created for satisfying user needs</strong>. It's not just raw data - it's data treated with the same care and focus 
            as any other product your company makes.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
            <p className="text-amber-800">
              <strong>Key Insight:</strong> Just like you wouldn't hand over raw materials as a finished product, 
              data products are designed, packaged, supported, and delivered with the consumer in mind.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Characteristics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">🔍 Discoverable</h4>
                <p className="text-sm text-gray-600">Easily findable through data catalogs with rich metadata</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">🎯 Addressable</h4>
                <p className="text-sm text-gray-600">Unique, stable identifier - like a web address you can always point to</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">🤝 Trustworthy</h4>
                <p className="text-sm text-gray-600">Clear ownership, data lineage, and quality metrics</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">📖 Self-Describing</h4>
                <p className="text-sm text-gray-600">Comes with documentation, metadata, and data contracts</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">🔗 Interoperable</h4>
                <p className="text-sm text-gray-600">Uses standard formats to connect with other data products</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">🛡️ Secure</h4>
                <p className="text-sm text-gray-600">Built-in security and governance compliance</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">⚡ Read-Optimized</h4>
                <p className="text-sm text-gray-600">Structured for easy access and consumption, not just storage</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">🎯 Purpose-Built</h4>
                <p className="text-sm text-gray-600">Created to solve specific problems or answer specific questions</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p className="text-blue-800">
              <strong>Data Mesh Context:</strong> Data products are the core building blocks of a decentralized data mesh, 
              where domain teams take ownership of the data they understand best and package it for others to use.
            </p>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Dual Approach Strategy</h2>
        
        <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Built on Data Mesh Principles</h3>
          <p className="text-gray-700 text-sm">
            Our approach embraces <strong>domain-driven ownership</strong> where teams closest to the data create and maintain 
            data products. This decentralized model uses a <strong>self-serve data platform</strong> with 
            <strong>federated computational governance</strong> to balance autonomy with organizational standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Approach */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-lg p-2 mr-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Traditional Catalog Approach</h3>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p>Perfect for technical users who understand data structures:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Browse comprehensive data catalog with rich metadata</li>
                <li>Select specific tables and columns using data contracts</li>
                <li>Configure output ports (API, SFTP, GraphQL)</li>
                <li>Set up automated refresh schedules with SLAs</li>
                <li>Full control over data pipelines and transformations</li>
                <li>Built-in data quality validation and monitoring</li>
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Data analysts, engineers, and technical stakeholders who need precise control over data products
              </p>
            </div>
          </div>

          {/* GenAI Approach */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-lg p-2 mr-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">GenAI Natural Language</h3>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p>Designed for business users who speak in outcomes:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Describe data needs using business language</li>
                <li>AI maps requirements to available data products</li>
                <li>Automatically generates data contracts and schemas</li>
                <li>Suggests optimal pipeline architectures</li>
                <li>Creates discoverable, self-describing data products</li>
                <li>Ensures governance and quality standards compliance</li>
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Domain experts, product managers, and business analysts focused on solving user problems
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits and Impact */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits and Expected Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-green-600">80%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Faster Time to Value</h3>
            <p className="text-sm text-gray-600">Self-service discovery reduces data access time from weeks to hours</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-blue-600">50%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reduced Technical Debt</h3>
            <p className="text-sm text-gray-600">Standardized governance and quality controls eliminate data silos</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-purple-600">90%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Domain Autonomy</h3>
            <p className="text-sm text-gray-600">Teams self-serve without central bottlenecks or delays</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-orange-600">95%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Quality</h3>
            <p className="text-sm text-gray-600">Built-in validation and clear ownership improve reliability</p>
          </div>
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation Roadmap</h2>
        
        <div className="mb-6 bg-indigo-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">🏗️ Platform-First Approach</h3>
          <p className="text-indigo-800 text-sm">
            Our implementation prioritizes building a <strong>self-serve data platform</strong> that centralizes common capabilities 
            while maintaining domain team autonomy. This prevents the "reinventing the wheel" problem and ensures consistency.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 1: Platform Foundation (Months 1-3)</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>Establish federated computational governance framework</li>
                <li>Build self-serve platform with stable data infrastructure</li>
                <li>Implement data catalog with discovery ports and metadata management</li>
                <li>Create data contract specification and validation system</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 2: Domain Enablement & AI (Months 4-6)</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>Onboard first domain teams with data product canvas workshops</li>
                <li>Deploy standardized data pipeline orchestration tools</li>
                <li>Implement natural language processing for GenAI contract creation</li>
                <li>Train AI models on enterprise schemas and business language</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phase 3: Scale & Advanced Features (Months 7-12)</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>Expand to all domain teams with comprehensive data mesh architecture</li>
                <li>Implement advanced observability and cost management components</li>
                <li>Add real-time streaming capabilities and event-driven data products</li>
                <li>Deploy comprehensive success metrics across four dimensions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getBusinessContent = () => (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600">Business Impact & ROI content will be available soon.</p>
      </div>
    </div>
  );

  const renderSelectedContent = () => {
    console.log('Selected Resource ID:', selectedResource.id); // Debug line
    switch(selectedResource.id) {
      case 1:
        return getOverviewContent();
      case 2:
        return getTechnicalContent();
      case 3:
        return getBusinessContent();
      default:
        return getOverviewContent();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 mb-4">Data Product Strategy Resources</h1>
            <p className="text-lg text-gray-600 mb-6">
              Learn about our comprehensive approach to data products through learning materials, documentation, and interactive demos.
            </p>
          </div>
          <div className="bg-indigo-100 rounded-lg p-3">
            <Volume2 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Learning Resources Horizontal Scrollable */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Materials</h2>
        
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="text-red-500 text-sm p-2 border border-red-300">
            DEBUG: Total resources: {learningResources.length}
          </div>
          {learningResources.map((resource, index) => {
            const IconComponent = resource.icon;
            const isSelected = selectedResource.id === resource.id;
            
            console.log(`Rendering card ${index}:`, resource.title, 'Selected:', isSelected);
            
            return (
              <div 
                key={resource.id} 
                className={`flex-shrink-0 w-80 bg-white shadow-sm rounded-lg border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                  isSelected 
                    ? getSelectedTypeColor(resource.type)
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  console.log('Clicking resource:', resource.id, resource.title);
                  setSelectedResource(resource);
                }}
              >
                {/* Debug info on each card */}
                <div className="text-xs bg-yellow-100 p-1">
                  Card {index + 1}: {resource.title} (ID: {resource.id})
                </div>
                
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : ''}`} />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isSelected 
                          ? 'bg-white bg-opacity-20 text-white' 
                          : getTypeColor(resource.type)
                      }`}>
                        {resource.type}
                      </span>
                  <h3 className={`text-lg font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {resource.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isSelected ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                    {resource.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center text-sm ${isSelected ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isSelected ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                      <User className="h-4 w-4 mr-2" />
                      <span>{resource.presenter}</span>
                    </div>
                  </div>
                  
                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className={`text-xs font-medium mb-2 ${isSelected ? 'text-white text-opacity-90' : 'text-gray-700'}`}>
                      Topics Covered:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.topics.map((topic, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 text-xs rounded ${
                            isSelected 
                              ? 'bg-white bg-opacity-20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                    {resource.comingSoon && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {resource.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isSelected ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                    {resource.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center text-sm ${isSelected ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className={`flex items-center text-sm ${isSelected ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                      <User className="h-4 w-4 mr-2" />
                      <span>{resource.presenter}</span>
                    </div>
                  </div>
                  
                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className={`text-xs font-medium mb-2 ${isSelected ? 'text-white text-opacity-90' : 'text-gray-700'}`}>
                      Topics Covered:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.topics.map((topic, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 text-xs rounded ${
                            isSelected 
                              ? 'bg-white bg-opacity-20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className={`px-6 py-4 border-t ${
                  isSelected 
                    ? 'border-white border-opacity-20' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  {resource.comingSoon ? (
                    <div className={`flex items-center justify-center py-2 text-sm ${
                      isSelected ? 'text-white text-opacity-80' : 'text-gray-500'
                    }`}>
                      <Clock className="h-4 w-4 mr-1" />
                      Available Soon
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayExternal(resource.fileUrl);
                        }}
                        className={`flex-1 flex items-center justify-center px-3 py-2 rounded transition-colors text-sm ${
                          isSelected
                            ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {resource.contentType === 'audio' ? (
                          <Play className="h-4 w-4 mr-1" />
                        ) : (
                          <ExternalLink className="h-4 w-4 mr-1" />
                        )}
                        {resource.contentType === 'audio' ? 'Play' : 'View'}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(
                            resource.fileUrl, 
                            `${resource.title.replace(/\s+/g, '-').toLowerCase()}.${resource.contentType === 'audio' ? 'mp3' : 'pdf'}`
                          );
                        }}
                        className={`flex items-center justify-center px-3 py-2 rounded transition-colors ${
                          isSelected
                            ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                      </button>

                      {resource.transcriptUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayExternal(resource.transcriptUrl);
                          }}
                          className={`flex items-center justify-center px-3 py-2 rounded transition-colors ${
                            isSelected
                              ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Based on Selection */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor(selectedResource.type)}`}>
              {React.createElement(selectedResource.icon, { className: 'h-6 w-6' })}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedResource.title}</h2>
              <p className="text-gray-600">{selectedResource.description}</p>
            </div>
          </div>
        </div>
        
        <div className="min-h-96 p-4">
          <h3 className="text-red-600 font-bold mb-4">DEBUG INFO:</h3>
          <p className="text-red-600 mb-2">Selected Resource ID: {selectedResource.id}</p>
          <p className="text-red-600 mb-4">Selected Resource Title: {selectedResource.title}</p>
          
          <div className="space-y-4">
            {selectedResource.id === 1 && (
              <div className="border-2 border-green-500 p-4 bg-green-50">
                <h4 className="text-green-800 font-bold mb-4">OVERVIEW CONTENT</h4>
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Data Products?</h2>
                  <p className="text-lg mb-4">
                    A data product is <strong>an autonomous, read-optimized, standardized data unit</strong> containing at least one dataset, 
                    created for satisfying user needs. It's not just raw data - it's data treated with the same care and focus 
                    as any other product your company makes.
                  </p>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                    <p className="text-amber-800">
                      <strong>Key Insight:</strong> Just like you wouldn't hand over raw materials as a finished product, 
                      data products are designed, packaged, supported, and delivered with the consumer in mind.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Characteristics:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">🔍 Discoverable</h4>
                        <p className="text-sm text-gray-600">Easily findable through data catalogs with rich metadata</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">🎯 Addressable</h4>
                        <p className="text-sm text-gray-600">Unique, stable identifier - like a web address you can always point to</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">🔗 Interoperable</h4>
                        <p className="text-sm text-gray-600">Uses standard formats to connect with other data products</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">🛡️ Secure</h4>
                        <p className="text-sm text-gray-600">Built-in security and governance compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedResource.id === 2 && (
              <div className="border-2 border-blue-500 p-4 bg-blue-50">
                <h4 className="text-blue-800 font-bold mb-4">TECHNICAL CONTENT</h4>
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Product Canvas Framework</h2>
                  <p className="text-lg mb-4">
                    The Data Product Canvas is a visual framework that guides teams through data product specification. 
                    It consists of <strong>eight essential building blocks</strong> that teams fill out collaboratively.
                  </p>
                  
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                    <p className="text-purple-800">
                      <strong>Canvas Purpose:</strong> Provides a structured approach to designing data products with clear 
                      ownership, consumer focus, and technical specifications.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Eight Building Blocks:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-600">1. Domain</h4>
                        <p className="text-sm text-gray-600">Identifies the domain team responsible for the data product</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-600">2. Data Product Name</h4>
                        <p className="text-sm text-gray-600">Unique identifier following organizational naming strategy</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-600">3. Consumer & Use Cases</h4>
                        <p className="text-sm text-gray-600">Describes who will use this data product and what problems it solves</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-600">4. Data Contract</h4>
                        <p className="text-sm text-gray-600">Defines interface, metadata, terms of use, data model</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedResource.id === 3 && (
              <div className="border-2 border-purple-500 p-4 bg-purple-50">
                <h4 className="text-purple-800 font-bold mb-4">BUSINESS CONTENT</h4>
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                  <p className="text-gray-600">Business Impact & ROI content will be available soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore the Demo?</h2>
        <p className="text-lg mb-6 opacity-90">
          Try our interactive prototype to see both traditional and AI-powered approaches in action.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Try Traditional Flow
          </button>
          <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors">
            Try GenAI Flow
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DataProductInfo;