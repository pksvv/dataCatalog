import React from 'react';
import { ArrowRight, Database, Sparkles, Code, FileText, Users, TrendingUp, Shield, Clock, ExternalLink } from 'lucide-react';

const ContractHub = ({ setActivePage }) => {
  const contractMethods = [
    {
      id: 'create-product',
      title: 'Create Data Product',
      description: 'Build custom data products by selecting tables, writing SQL queries, and defining data transformations.',
      icon: <Code className="h-12 w-12 text-blue-600" />,
      color: 'blue',
      features: [
        'Multi-table query building',
        'Custom SQL editor with syntax highlighting',
        'Query result preview',
        'Flexible data transformation'
      ],
      useCases: [
        'Creating analytical datasets',
        'Building custom reporting views',
        'Data aggregation and summarization',
        'Complex business logic implementation'
      ],
      targetPage: 'create-product',
      complexity: 'Advanced',
      timeEstimate: '15-30 minutes'
    },
    {
      id: 'traditional',
      title: 'Select Data Product',
      description: 'Browse existing data products, select specific columns, and create contracts through a guided interface.',
      icon: <FileText className="h-12 w-12 text-indigo-600" />,
      color: 'indigo',
      features: [
        'Pre-built data product catalog',
        'Column-level selection',
        'Guided step-by-step process',
        'Multiple delivery options'
      ],
      useCases: [
        'Accessing existing data products',
        'Selecting specific data fields',
        'Standard reporting needs',
        'Quick data access setup'
      ],
      targetPage: 'traditional',
      complexity: 'Beginner',
      timeEstimate: '5-10 minutes'
    },
    {
      id: 'genai',
      title: 'Natural Language Contract',
      description: 'Describe your data needs in plain English and let AI generate the appropriate data contract automatically.',
      icon: <Sparkles className="h-12 w-12 text-purple-600" />,
      color: 'purple',
      features: [
        'Natural language processing',
        'AI-generated SQL queries',
        'Automatic column detection',
        'Smart data suggestions'
      ],
      useCases: [
        'Quick data exploration',
        'Non-technical user access',
        'Rapid prototyping',
        'Ad-hoc analysis requests'
      ],
      targetPage: 'genai',
      complexity: 'Beginner',
      timeEstimate: '2-5 minutes'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hover: 'hover:border-blue-300',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        hover: 'hover:border-indigo-300',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        text: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-800'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hover: 'hover:border-purple-300',
        button: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800'
      }
    };
    return colorMap[color];
  };

  const getComplexityColor = (complexity) => {
    switch(complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Contract Hub</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the method that best fits your needs to create data contracts. Whether you're a technical user building complex data products 
            or a business user looking for quick access to existing data, we have the right approach for you.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Database className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-500">Data Products</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,200+</div>
            <div className="text-sm text-gray-500">Active Contracts</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">98.5%</div>
            <div className="text-sm text-gray-500">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">SOC 2</div>
            <div className="text-sm text-gray-500">Compliant</div>
          </div>
        </div>
      </div>

      {/* Contract Methods Grid - Only showing 2 cards now */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {contractMethods.filter(method => method.id !== 'create-product').map((method) => {
          const colors = getColorClasses(method.color);
          
          return (
            <div
              key={method.id}
              className={`border rounded-lg p-6 transition-all duration-200 ${colors.bg} ${colors.border} ${colors.hover} hover:shadow-lg`}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h2>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>

              {/* Badges */}
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(method.complexity)}`}>
                  {method.complexity}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {method.timeEstimate}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {method.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 ${colors.text.replace('text-', 'bg-')}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Best For</h3>
                <ul className="space-y-1">
                  {method.useCases.slice(0, 2).map((useCase, index) => (
                    <li key={index} className="text-xs text-gray-500">
                      • {useCase}
                    </li>
                  ))}
                </ul>
              </div>


            </div>
          );
        })}
      </div>

      {/* Updated Comparison Table - Only 2 columns now */}
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Select Data Product</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Natural Language</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pre-built Data Products</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Column-level Selection</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">✓</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-yellow-600">Auto-detected</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technical Skills Required</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">Low</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">None</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Setup Time</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">5-10 min</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600">2-5 min</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Flexibility</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-yellow-600">Medium</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-yellow-600">Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Help & Resources Section - Updated to remove Create Data Product references */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Choosing?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">For Business Users</h4>
                <p className="text-sm text-gray-600">Start with Natural Language contracts for quick access to data without technical complexity.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                <Database className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">For Data Analysts</h4>
                <p className="text-sm text-gray-600">Use Select Data Product to access existing data products with column-level control.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources & Support</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h4 className="font-medium text-gray-900">Documentation</h4>
                <p className="text-sm text-gray-600">Complete guides and API references</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h4 className="font-medium text-gray-900">Video Tutorials</h4>
                <p className="text-sm text-gray-600">Step-by-step walkthrough videos</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h4 className="font-medium text-gray-900">Support Portal</h4>
                <p className="text-sm text-gray-600">Get help from our expert team</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractHub;