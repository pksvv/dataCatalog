import React, { useState } from 'react';
import { Book, FileText, Search, Layout, Database, Sparkles, Users, Settings, Menu, X, Info, ExternalLink } from 'lucide-react';
import DataCatalogInterface from './DataCatalogInterface';
import DataCatalog from './DataCatalog';
import TraditionalContractFlow from './TraditionalContractFlow';
import GenAIInterface from './GenAIInterface';
import InteractiveArchitecture from './InteractiveArchitecture';

const MainApplication = () => {
  // State for controlling sidebar expansion
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // State for active component/page
  const [activePage, setActivePage] = useState('home');
  
  // Helper function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  // Render the appropriate content based on active page
  const renderContent = () => {
    switch(activePage) {
      case 'catalog2':
        return <DataCatalog />;
      case 'catalog':
        return <DataCatalogInterface />;
      case 'traditional':
        return <TraditionalContractFlow />;
      case 'genai':
        return <GenAIInterface />;
      case 'architecture':
        return <InteractiveArchitecture />;
      case 'home':
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };
  
  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: <Layout className="h-5 w-5" /> },
    //{ id: 'catalog', label: 'Data Discoverability', icon: <Book className="h-5 w-5" /> },
    { id: 'catalog2', label: 'Data Discoverability', icon: <Book className="h-5 w-5" /> },
    { id: 'traditional', label: 'Traditional Flow', icon: <FileText className="h-5 w-5" /> },
    { id: 'genai', label: 'GenAI Flow', icon: <Sparkles className="h-5 w-5" /> },
    { id: 'architecture', label: 'Architecture', icon: <Info className="h-5 w-5" /> }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-900 text-white transition-all duration-300 ${sidebarExpanded ? 'w-72' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-indigo-800">
          <div className={`flex items-center ${sidebarExpanded ? 'justify-start' : 'justify-center w-full'}`}>
            <Database className="h-8 w-8 text-indigo-300" />
            {sidebarExpanded && <span className="ml-3 font-semibold text-xl">Data Marketplace</span>}
          </div>
          <button 
            className={`text-gray-300 hover:text-white ${!sidebarExpanded && 'hidden'}`}
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </button>
          <button 
            className={`text-gray-300 hover:text-white ${sidebarExpanded && 'hidden'}`}
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <div className="py-4">
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center px-4 py-3 hover:bg-indigo-800 transition-colors ${activePage === item.id ? 'bg-indigo-800' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <div className={`${sidebarExpanded ? 'mr-4' : 'mx-auto'}`}>
                    {item.icon}
                  </div>
                  {sidebarExpanded && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="px-4 pt-6 mt-6 border-t border-indigo-800">
            <div className={`text-xs uppercase text-indigo-400 tracking-wider mb-4 ${!sidebarExpanded && 'text-center'}`}>
              {sidebarExpanded ? 'Other Tools' : 'More'}
            </div>
            <ul>
              <li>
                <button className="w-full flex items-center px-4 py-3 hover:bg-indigo-800 transition-colors">
                  <div className={`${sidebarExpanded ? 'mr-4' : 'mx-auto'}`}>
                    <Users className="h-5 w-5 text-indigo-300" />
                  </div>
                  {sidebarExpanded && <span>User Management</span>}
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-3 hover:bg-indigo-800 transition-colors">
                  <div className={`${sidebarExpanded ? 'mr-4' : 'mx-auto'}`}>
                    <Settings className="h-5 w-5 text-indigo-300" />
                  </div>
                  {sidebarExpanded && <span>Configuration</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">{navItems.find(item => item.id === activePage)?.label || 'Home'}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                AL
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Home page component with links to other pages
const HomePage = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Data Product Strategy Prototype</h1>
        <p className="text-lg text-gray-600 mb-6">
          This prototype demonstrates vision for a data product marketplace within the enterprise, 
          showcasing both traditional catalog-based and GenAI-powered natural language approaches to data contracts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer" onClick={() => setActivePage('traditional')}>
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-lg p-2 mr-4">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Traditional Approach</h2>
                <p className="text-gray-600">
                  Browse the data catalog, select specific elements, and create data contracts through a familiar interface.
                </p>
                <div className="mt-4 flex">
                  <button 
                    className="flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                    onClick={() => setActivePage('traditional')}
                  >
                    Explore Traditional Flow
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer" onClick={() => setActivePage('genai')}>
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-lg p-2 mr-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">GenAI Approach</h2>
                <p className="text-gray-600">
                  Describe your data needs in natural language and let AI generate the appropriate data contract for you.
                </p>
                <div className="mt-4 flex">
                  <button 
                    className="flex items-center text-purple-600 font-medium hover:text-purple-800"
                    onClick={() => setActivePage('genai')}
                  >
                    Try GenAI Flow
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <Info className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Architecture Overview</h2>
              <p className="text-gray-600 mb-4">
                This prototype demonstrates how both approaches integrate into a unified data product strategy:
              </p>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="relative">
                  <svg viewBox="0 0 900 300" className="w-full h-auto">
                    <rect width="900" height="300" fill="#f8fafc" />
                    
                    {/* Data Sources */}
                    <rect x="100" y="50" width="700" height="60" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                    <text x="450" y="85" textAnchor="middle" fill="#1e40af" fontSize="14">Data Sources Layer</text>
                    
                    {/* Platform Layer */}
                    <rect x="100" y="130" width="700" height="60" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
                    <text x="450" y="165" textAnchor="middle" fill="#0c4a6e" fontSize="14">Data Product Platform</text>
                    
                    {/* Approaches */}
                    <rect x="160" y="210" width="240" height="60" rx="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
                    <text x="280" y="245" textAnchor="middle" fill="#1e3a8a" fontSize="14">Traditional Approach</text>
                    
                    <rect x="500" y="210" width="240" height="60" rx="5" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
                    <text x="620" y="245" textAnchor="middle" fill="#6b21a8" fontSize="14">GenAI Approach</text>
                    
                    {/* Connecting Lines */}
                    <line x1="280" y1="190" x2="280" y2="210" stroke="#2563eb" strokeWidth="2" />
                    <line x1="620" y1="190" x2="620" y2="210" stroke="#9333ea" strokeWidth="2" />
                    
                    <line x1="450" y1="110" x2="450" y2="130" stroke="#94a3b8" strokeWidth="2" />
                  </svg>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>The diagram above shows how both the traditional catalog-based approach and the GenAI natural language approach 
                  fit into the overall data product architecture. Both approaches leverage the same underlying data governance, 
                  quality control, and delivery mechanisms.</p>
                  <button 
                    className="mt-2 flex items-center text-blue-600 font-medium hover:text-blue-800"
                    onClick={() => setActivePage('architecture')}
                  >
                    Explore Interactive Architecture
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Demo Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Book className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Data Discovery</h3>
            </div>
            <p className="text-gray-600">
              Browse and search enterprise data products through a central Data Discoverability tool with detailed metadata.
            </p>
            <button 
              className="mt-4 text-green-600 font-medium hover:text-green-800"
              onClick={() => setActivePage('catalog')}
            >
              Explore Catalog
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Contract Creation</h3>
            </div>
            <p className="text-gray-600">
              Create data contracts by selecting specific data elements and configuring delivery preferences.
            </p>
            <button 
              className="mt-4 text-blue-600 font-medium hover:text-blue-800"
              onClick={() => setActivePage('traditional')}
            >
              Create Contract
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Natural Language</h3>
            </div>
            <p className="text-gray-600">
              Request data in plain English and let AI handle the technical details of data extraction.
            </p>
            <button 
              className="mt-4 text-purple-600 font-medium hover:text-purple-800"
              onClick={() => setActivePage('genai')}
            >
              Try GenAI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApplication;