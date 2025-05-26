import React from 'react';
import { Download, FileText, Info, Clock, User, Tag, Check, X, Sparkles, Volume2, ExternalLink, Play } from 'lucide-react';

const DataProductInfo = () => {
  // Audio resources configuration - easy to add more files
  const audioResources = [
    {
      id: 1,
      title: "Data Product Strategy Overview",
      description: "Comprehensive introduction to data products and our dual approach strategy",
      duration: "~15 minutes",
      presenter: "Data Strategy Team",
      topics: ["Data Products Fundamentals", "Traditional vs GenAI Approaches", "Implementation Roadmap"],
      fileUrl: "https://github.com/pksvv/dataCatalogAssets/blob/main/public/audio/sample.mp3",
      type: "Overview"
    },
    {
      id: 2,
      title: "Technical Deep Dive",
      description: "Detailed technical architecture and implementation considerations",
      duration: "~20 minutes",
      presenter: "Technical Architecture Team",
      topics: ["System Architecture", "API Design", "Security & Governance"],
      fileUrl: "https://your-username.github.io/data-product-assets/audio/technical-deep-dive.mp3",
      type: "Technical",
      comingSoon: true
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
      comingSoon: true
    }
  ];

  const handleDownload = (audioUrl, fileName) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = fileName || 'audio-file.mp3';
    link.target = '_blank'; // Open in new tab as fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePlayExternal = (audioUrl) => {
    window.open(audioUrl, '_blank');
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Overview': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Business': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Learn about our comprehensive approach to data products through audio presentations, documentation, and interactive demos.
            </p>
          </div>
          <div className="bg-indigo-100 rounded-lg p-3">
            <Volume2 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Audio Resources Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Audio Presentations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audioResources.map((audio) => (
            <div key={audio.id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(audio.type)}`}>
                    {audio.type}
                  </span>
                  {audio.comingSoon && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{audio.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{audio.description}</p>
                
                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{audio.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>{audio.presenter}</span>
                  </div>
                </div>
                
                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {audio.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                {audio.comingSoon ? (
                  <div className="flex items-center justify-center py-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Available Soon
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePlayExternal(audio.fileUrl)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </button>
                    <button
                      onClick={() => handleDownload(audio.fileUrl, `${audio.title.replace(/\s+/g, '-').toLowerCase()}.mp3`)}
                      className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePlayExternal(audio.fileUrl)}
                      className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
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

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-World Example:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                <strong>Traditional Approach:</strong> Analytics team requests user demographic data → 
                Engineering team extracts from registration tables → Manual process, delays, explanations needed
              </p>
              <p className="text-gray-700">
                <strong>Data Product Approach:</strong> Registration team proactively creates "Registered Users Data Product" → 
                Marketing team self-serves clean, documented demographic data → Faster, more reliable, higher quality
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

          {/* Data Product Canvas */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">🎨 Data Product Canvas Integration</h3>
            <p className="text-sm text-yellow-700 mb-2">
              Both approaches leverage our data product canvas framework with eight key building blocks:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-yellow-700">
              <span>• Domain & Product Name</span>
              <span>• Consumer & Use Cases</span>
              <span>• Data Contract & SLAs</span>
              <span>• Data Sources & Architecture</span>
              <span>• Ubiquitous Language</span>
              <span>• Classification</span>
              <span>• Quality Metrics</span>
              <span>• Governance Policies</span>
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

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Measuring Success: Four Key Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">📊 Usage & Adoption</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Daily/monthly active users of data products</li>
                  <li>• Query frequency and data volume pulled</li>
                  <li>• Time to value for new consumers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">💰 Business Impact</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Revenue increase from data-driven decisions</li>
                  <li>• Cost savings from process automation</li>
                  <li>• Time saved enabling faster decision-making</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">✅ Data Quality</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Consistency, accuracy, completeness scores</li>
                  <li>• Data contract compliance rates</li>
                  <li>• SLA adherence and timeliness metrics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">⚡ Operational Efficiency</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Platform uptime and query latency</li>
                  <li>• Deployment frequency and cycle time</li>
                  <li>• Mean time to recovery from failures</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Success Measurement Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Customer Dimension:</strong>
                <br />User satisfaction surveys, problem-solving effectiveness
              </div>
              <div>
                <strong>Technology Dimension:</strong>
                <br />Platform reliability, performance metrics, DevOps indicators
              </div>
              <div>
                <strong>Business Dimension:</strong>
                <br />ROI analysis, cost reduction, revenue impact alignment
              </div>
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
                  <li>Set up standardized output ports (APIs, file exports, streaming)</li>
                  <li>Deploy automated data quality validation and "shift-left" testing</li>
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
                  <li>Add ubiquitous language management and business glossary</li>
                  <li>Establish data product owner roles and responsibilities</li>
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
                  <li>Establish center of excellence for data product best practices</li>
                  <li>Implement cross-product analytics and recommendation systems</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">🎯 Critical Success Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <strong>Organizational:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Clear domain ownership and accountability</li>
                  <li>Data product owner role definition</li>
                  <li>Cross-functional collaboration workflows</li>
                </ul>
              </div>
              <div>
                <strong>Technical:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Robust self-serve platform capabilities</li>
                  <li>Automated governance and quality controls</li>
                  <li>Interoperability through standard contracts</li>
                </ul>
              </div>
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
      </div>
    </div>
  );
};

export default DataProductInfo;