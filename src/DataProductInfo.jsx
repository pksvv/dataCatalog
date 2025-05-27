import React, { useState } from 'react';
import { Download, FileText, Clock, User, Sparkles, Volume2, ExternalLink, Play, BookOpen, Presentation, Code } from 'lucide-react';

// Content Components
const PodcastOverviewContent = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Data Products?</h2>
      <p className="text-lg mb-4">
        <strong>"A data product is an autonomous, read-optimized, standardized data unit containing at least one dataset, 
        created for satisfying user needs."</strong>
      </p>
      
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
        <p className="text-amber-800">
          <strong>Data as a Product Mindset:</strong> Just like you wouldn't hand over raw materials as a finished product, 
          data products are designed, packaged, supported, and delivered with the consumer in mind.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Characteristics:</h3>
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
            <p className="text-sm text-gray-600">Clear ownership, data lineage, and quality metrics readily available</p>
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
            <h4 className="font-semibold text-gray-900">🎯 Autonomous</h4>
            <p className="text-sm text-gray-600">Managed by specific domain teams who understand the data best</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Mesh Architecture</h2>
      <p className="text-lg mb-4">
        Data mesh represents a shift from centralized data architectures to a decentralized, domain-driven approach.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p className="text-blue-800">
          <strong>Core Principle:</strong> Domain teams take ownership of the data they generate and understand best, 
          creating data products as the tangible, shareable units of data.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components of Data Products:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Output Ports</h4>
            <p className="text-sm text-gray-600">Defined access points - SQL tables, API endpoints, files in specific formats</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Discovery Port</h4>
            <p className="text-sm text-gray-600">Connects to data catalog with metadata, ownership info, and quality scores</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Pipeline Logic</h4>
            <p className="text-sm text-gray-600">Code for transformations, cleaning, reshaping, and aggregating data</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Data Storage</h4>
            <p className="text-sm text-gray-600">Isolated storage specific to the product, keeping things tidy</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Automated Tests</h4>
            <p className="text-sm text-gray-600">Quality assurance and validation to ensure data reliability</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-600">Observability</h4>
            <p className="text-sm text-gray-600">Monitoring, cost management, and governance policies as code</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Self-Serve Data Platform</h2>
      <p className="text-lg mb-4">
        The platform centralizes common specialized capabilities while maintaining domain team autonomy.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">🏗️ Infrastructure</h3>
          <p className="text-sm text-green-700">Stable, reliable data infrastructure with clear boundaries between teams</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">🔧 Shared Tools</h3>
          <p className="text-sm text-purple-700">Pre-packaged bundles and single-command deployments</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 mb-2">📊 Automation</h3>
          <p className="text-sm text-orange-700">Automatic registration in data catalogs and standardized governance</p>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Measuring Success</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
            <span className="text-lg font-bold text-blue-600">Usage</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Adoption Metrics</h3>
          <p className="text-sm text-gray-600">Active users, query frequency, time to value for new users</p>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
            <span className="text-lg font-bold text-green-600">Value</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Business Impact</h3>
          <p className="text-sm text-gray-600">Revenue increase, cost savings, improved decision speed</p>
        </div>
        
        <div className="text-center">
          <div className="bg-purple-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
            <span className="text-lg font-bold text-purple-600">Quality</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Data Quality</h3>
          <p className="text-sm text-gray-600">Accuracy, completeness, timeliness, consistency metrics</p>
        </div>

        <div className="text-center">
          <div className="bg-orange-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
            <span className="text-lg font-bold text-orange-600">Ops</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Operations</h3>
          <p className="text-sm text-gray-600">Uptime, latency, deployment frequency, recovery time</p>
        </div>
      </div>
    </div>
  </div>
);

const TechnicalCanvasContent = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Data Product?</h2>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p className="text-blue-800 text-lg">
          <strong>Definition:</strong> "A data product is an autonomous, read-optimized, standardized 
          data unit containing at least one dataset (Domain Dataset), created for satisfying user needs."
        </p>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Sociotechnical Architecture?</h2>
      <p className="text-lg mb-4">
        Data architecture needs a balanced approach that focuses on People, Processes, and Technology working together.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Balance 3 Pillars</h3>
          <p className="text-sm text-blue-700">People, Processes, and Technology</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Focus on Accessibility</h3>
          <p className="text-sm text-green-700">Easy to find, access and use</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Ensures Quality</h3>
          <p className="text-sm text-purple-700">Meet consumer expectations for reliable data</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 mb-2">Drives Product Thinking</h3>
          <p className="text-sm text-orange-700">Treat data as products aligned with user needs</p>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Product Canvas Framework</h2>
      <p className="text-lg mb-4">
        A visual framework that guides teams through collaborative data product specification. 
        It consists of <strong>eight essential building blocks</strong>.
      </p>
      
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <p className="text-purple-800">
          <strong>Purpose:</strong> Teams fill out this canvas collaboratively to ensure clear 
          ownership, consumer focus, and technical specifications.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Eight Building Blocks:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">1. Domain</h4>
            <p className="text-sm text-gray-600">Who is accountable? Who specifies requirements? Who fixes when it breaks?</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">2. Data Product Name</h4>
            <p className="text-sm text-gray-600">Unique name following common naming strategy for identification and access</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">3. Consumer & Use Cases</h4>
            <p className="text-sm text-gray-600">Product thinking philosophy - always start with consumer needs</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">4. Data Contract</h4>
            <p className="text-sm text-gray-600">Interface, metadata, terms of use, data model, and semantics</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">5. Sources</h4>
            <p className="text-sm text-gray-600">Input data from operational systems and other data products</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">6. Data Product Architecture</h4>
            <p className="text-sm text-gray-600">Core design: ingestion, storage, transport, wrangling, transformations</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">7. Ubiquitous Language</h4>
            <p className="text-sm text-gray-600">Context-specific domain terminology shared between all stakeholders</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-purple-600">8. Classification</h4>
            <p className="text-sm text-gray-600">Source-aligned, aggregate, or consumer-aligned data product type</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Product Classifications</h2>
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

    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Canvas Example: IoT Devices</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Error Prone Device Revisions Data Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Domain:</strong> IoT Devices</p>
            <p><strong>Consumer:</strong> IT/Operations Hardware Application Team</p>
            <p><strong>Classification:</strong> Consumer-aligned</p>
          </div>
          <div>
            <p><strong>Processing:</strong> Streaming Batch with dbt, Databricks, Java</p>
            <p><strong>Storage:</strong> BigQuery tables and files</p>
            <p><strong>Monitoring:</strong> CI/CD with Airflow orchestration</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BusinessContent = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
      <p className="text-gray-600">Business Impact & ROI content will be available soon.</p>
    </div>
  </div>
);

// Main Component
const DataProductInfo = () => {
  const learningResources = [
    {
      id: 1,
      title: "Data Product Strategy Podcast",
      description: "Deep dive podcast discussion on data products within data mesh architecture",
      duration: "~45 minutes",
      presenter: "Data Mesh Experts",
      topics: ["Data Product Definition", "Data Mesh Principles", "Canvas Framework", "Self-Serve Platforms", "Governance"],
      fileUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/audio/sample.mp3",
      transcriptUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/transcripts/strategy-overview.md",
      type: "Overview",
      icon: Presentation,
      contentType: "audio"
    },
    {
      id: 2,
      title: "Designing Data Products",
      description: "Comprehensive guide to Data Product Canvas framework and sociotechnical architecture",
      duration: "~20 minutes",
      presenter: "Technology Architecture Team",
      topics: ["Data Product Canvas", "Eight Building Blocks", "Sociotechnical Approach", "Product Classification"],
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
      case 'Overview': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Business': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSelectedColor = (type) => {
    switch(type) {
      case 'Overview': return 'bg-blue-600 text-white';
      case 'Technical': return 'bg-purple-600 text-white';
      case 'Business': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const renderContent = () => {
    switch(selectedResource.id) {
      case 1:
        return <PodcastOverviewContent />;
      case 2:
        return <TechnicalCanvasContent />;
      case 3:
        return <BusinessContent />;
      default:
        return <PodcastOverviewContent />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 mb-4">Data Product Strategy Resources</h1>
            <p className="text-lg text-gray-600">
              Learn about our comprehensive approach to data products through learning materials, documentation, and interactive demos.
            </p>
          </div>
          <div className="bg-indigo-100 rounded-lg p-3">
            <Volume2 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Learning Materials Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Materials</h2>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {learningResources.map((resource) => {
            const IconComponent = resource.icon;
            const isSelected = selectedResource.id === resource.id;
            
            return (
              <div 
                key={resource.id} 
                className={`flex-shrink-0 w-80 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? `${getSelectedColor(resource.type)} shadow-lg` 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isSelected 
                          ? 'bg-white bg-opacity-20 text-white' 
                          : getTypeColor(resource.type)
                      }`}>
                        {resource.type}
                      </span>
                    </div>
                    {resource.comingSoon && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  {/* Title and Description */}
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
                          handleDownload(resource.fileUrl, `${resource.title}.${resource.contentType === 'audio' ? 'mp3' : 'pdf'}`);
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

      {/* Selected Content */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor(selectedResource.type)}`}>
              <selectedResource.icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedResource.title}</h2>
              <p className="text-gray-600">{selectedResource.description}</p>
            </div>
          </div>
        </div>
        
        {renderContent()}
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
    </div>
  );
};

export default DataProductInfo;