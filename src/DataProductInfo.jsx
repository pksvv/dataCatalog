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
              Data products are curated, governed, and easily accessible data assets that serve specific business needs. 
              They transform raw data into valuable, reusable resources that drive decision-making across the organization.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Characteristics:</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Self-Service:</strong> Business users can discover and access data without technical expertise</li>
              <li><strong>Governed:</strong> Built-in compliance, security, and quality controls</li>
              <li><strong>Discoverable:</strong> Rich metadata and documentation make data easy to find and understand</li>
              <li><strong>Reliable:</strong> Consistent quality, availability, and performance standards</li>
              <li><strong>Reusable:</strong> Designed to serve multiple use cases and business functions</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Think of data products like apps in an app store</strong> - each one solves a specific problem, 
                has clear documentation, and can be easily installed and used by anyone who needs it.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Dual Approach Strategy</h2>
          
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
                  <li>Browse comprehensive data catalog</li>
                  <li>Select specific tables and columns</li>
                  <li>Configure delivery mechanisms (API, SFTP, GraphQL)</li>
                  <li>Set up automated refresh schedules</li>
                  <li>Full control over data selection and formatting</li>
                </ul>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Data analysts, engineers, and technical stakeholders who need precise control
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
                  <li>Describe data needs in plain English</li>
                  <li>AI automatically identifies relevant sources</li>
                  <li>Generates optimized SQL queries</li>
                  <li>Suggests appropriate delivery methods</li>
                  <li>Creates contracts with zero technical knowledge</li>
                </ul>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Business analysts, product managers, and domain experts focused on outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits and Impact */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits and Expected Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-green-600">80%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Faster Time to Insights</h3>
              <p className="text-sm text-gray-600">Reduce data discovery and access time from weeks to hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">50%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reduced Technical Debt</h3>
              <p className="text-sm text-gray-600">Standardized governance and quality controls</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-purple-600">90%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Adoption</h3>
              <p className="text-sm text-gray-600">Self-service capabilities increase data democratization</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Key Success Metrics</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Number of active data contracts created monthly</li>
              <li>• Average time from data request to first insights</li>
              <li>• Percentage of self-service vs. IT-assisted data requests</li>
              <li>• Data quality scores and governance compliance rates</li>
              <li>• User satisfaction scores for data accessibility</li>
            </ul>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation Roadmap</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phase 1: Foundation (Months 1-3)</h3>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Establish data governance framework</li>
                  <li>Build initial data catalog with core datasets</li>
                  <li>Implement traditional contract creation workflow</li>
                  <li>Set up basic API and delivery mechanisms</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phase 2: AI Enhancement (Months 4-6)</h3>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Develop natural language processing capabilities</li>
                  <li>Train AI models on enterprise data schemas</li>
                  <li>Implement GenAI contract creation workflow</li>
                  <li>Add support for visualization tool integrations</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phase 3: Scale & Optimize (Months 7-12)</h3>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  <li>Expand to all major enterprise data sources</li>
                  <li>Implement advanced analytics and recommendations</li>
                  <li>Add real-time data streaming capabilities</li>
                  <li>Establish center of excellence and training programs</li>
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