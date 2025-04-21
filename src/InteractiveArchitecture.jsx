// src/InteractiveArchitecture.jsx
import React, { useState } from 'react';
import { Info, Sparkles, FileText, Check, X } from 'lucide-react';

const InteractiveArchitecture = () => {
  const [activeApproach, setActiveApproach] = useState('traditional');

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Interactive Architecture Visualization
        </h2>
        <p className="text-gray-600">
          This visualization demonstrates how the traditional and GenAI approaches integrate into
          the overall data product strategy. Click on an approach to see the active components and
          data flow.
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
            activeApproach === 'traditional'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveApproach('traditional')}
        >
          <FileText className="h-5 w-5 mr-2" />
          Traditional Approach
        </button>

        <button
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
            activeApproach === 'genai'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveApproach('genai')}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          GenAI Approach
        </button>
      </div>

      {/* Diagram */}
      <div className="border border-gray-200 rounded-lg p-4 relative">
        <svg viewBox="0 0 900 500" className="w-full h-auto">
          {/* ========== defs: arrow markers ========== */}
          <defs>
            <marker
              id="arrowBlue"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0 0 L6 3 L0 6 Z" fill="#2563eb" />
            </marker>
            <marker
              id="arrowPurple"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0 0 L6 3 L0 6 Z" fill="#9333ea" />
            </marker>
          </defs>

          {/* Background grid */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" />
          </pattern>
          <rect width="900" height="500" fill="url(#grid)" />

          {/* --------- Data Sources --------- */}
          <g>
            <rect
              x="50"
              y="50"
              width="800"
              height="80"
              rx="5"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <text
              x="450"
              y="35"
              textAnchor="middle"
              fill="#64748b"
              fontWeight="bold"
              fontSize="14"
            >
              Data Sources
            </text>

            <rect
              x="100"
              y="70"
              width="180"
              height="40"
              rx="5"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text x="190" y="95" textAnchor="middle" fill="#1e40af" fontSize="12">
              Enterprise Data Lake
            </text>

            <rect
              x="360"
              y="70"
              width="180"
              height="40"
              rx="5"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text x="450" y="95" textAnchor="middle" fill="#1e40af" fontSize="12">
              Data Warehouse
            </text>

            <rect
              x="620"
              y="70"
              width="180"
              height="40"
              rx="5"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text x="710" y="95" textAnchor="middle" fill="#1e40af" fontSize="12">
              Third-party Data
            </text>
          </g>

          {/* --------- Metadata & Governance --------- */}
          <g>
            <rect
              x="50"
              y="160"
              width="800"
              height="80"
              rx="5"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <text
              x="450"
              y="145"
              textAnchor="middle"
              fill="#64748b"
              fontWeight="bold"
              fontSize="14"
            >
              Metadata &amp; Governance
            </text>

            <rect
              x="100"
              y="180"
              width="220"
              height="40"
              rx="5"
              fill="#e0f2fe"
              stroke="#0ea5e9"
              strokeWidth="1"
            />
            <text x="210" y="205" textAnchor="middle" fill="#0c4a6e" fontSize="12">
              Metadata Management
            </text>

            <rect
              x="380"
              y="180"
              width="140"
              height="40"
              rx="5"
              fill="#e0f2fe"
              stroke="#0ea5e9"
              strokeWidth="1"
            />
            <text x="450" y="205" textAnchor="middle" fill="#0c4a6e" fontSize="12">
              Data Catalog
            </text>

            <rect
              x="580"
              y="180"
              width="220"
              height="40"
              rx="5"
              fill="#e0f2fe"
              stroke="#0ea5e9"
              strokeWidth="1"
            />
            <text x="690" y="205" textAnchor="middle" fill="#0c4a6e" fontSize="12">
              Data Governance
            </text>
          </g>

          {/* --------- Contract Creation --------- */}
          <g>
            <rect
              x="100"
              y="270"
              width="700"
              height="100"
              rx="5"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <text
              x="450"
              y="255"
              textAnchor="middle"
              fill="#64748b"
              fontWeight="bold"
              fontSize="14"
            >
              Contract Creation
            </text>

            {/* Traditional box */}
            <rect
              x="150"
              y="290"
              width="250"
              height="60"
              rx="5"
              fill={activeApproach === 'traditional' ? '#bfdbfe' : '#f1f5f9'}
              stroke={activeApproach === 'traditional' ? '#2563eb' : '#cbd5e1'}
              strokeWidth={activeApproach === 'traditional' ? '2' : '1'}
            />
            <text
              x="275"
              y="325"
              textAnchor="middle"
              fill={activeApproach === 'traditional' ? '#1e3a8a' : '#64748b'}
              fontWeight={activeApproach === 'traditional' ? 'bold' : 'normal'}
              fontSize="12"
            >
              Traditional Catalog-Based Flow
            </text>
            {activeApproach === 'traditional' && (
              <circle cx="140" cy="320" r="8" fill="#2563eb">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* GenAI box */}
            <rect
              x="500"
              y="290"
              width="250"
              height="60"
              rx="5"
              fill={activeApproach === 'genai' ? '#f3e8ff' : '#f1f5f9'}
              stroke={activeApproach === 'genai' ? '#9333ea' : '#cbd5e1'}
              strokeWidth={activeApproach === 'genai' ? '2' : '1'}
            />
            <text
              x="625"
              y="325"
              textAnchor="middle"
              fill={activeApproach === 'genai' ? '#6b21a8' : '#64748b'}
              fontWeight={activeApproach === 'genai' ? 'bold' : 'normal'}
              fontSize="12"
            >
              GenAI Natural Language Flow
            </text>
            {activeApproach === 'genai' && (
              <circle cx="490" cy="320" r="8" fill="#9333ea">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>

          {/* --------- Quality & Security --------- */}
          <g>
            <rect
              x="50"
              y="400"
              width="800"
              height="80"
              rx="5"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <text
              x="450"
              y="385"
              textAnchor="middle"
              fill="#64748b"
              fontWeight="bold"
              fontSize="14"
            >
              Quality &amp; Security
            </text>

            <rect
              x="100"
              y="420"
              width="300"
              height="40"
              rx="5"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="250" y="445" textAnchor="middle" fill="#065f46" fontSize="12">
              Data Quality &amp; Validation
            </text>

            <rect
              x="500"
              y="420"
              width="300"
              height="40"
              rx="5"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="650" y="445" textAnchor="middle" fill="#065f46" fontSize="12">
              Security &amp; Access Control
            </text>
          </g>

          {/* ===== Connection lines ===== */}
          {/* grey dashed (always visible) */}
          <line
            x1="190"
            y1="110"
            x2="210"
            y2="180"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={activeApproach === 'traditional' ? '0' : '5'}
          />
          <line
            x1="450"
            y1="110"
            x2="450"
            y2="180"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={activeApproach === 'traditional' ? '0' : '5'}
          />
          <line
            x1="710"
            y1="110"
            x2="690"
            y2="180"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={activeApproach === 'traditional' ? '0' : '5'}
          />
          <line
            x1="320"
            y1="200"
            x2="380"
            y2="200"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={activeApproach === 'traditional' ? '0' : '5'}
          />
          <line
            x1="520"
            y1="200"
            x2="580"
            y2="200"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={activeApproach === 'traditional' ? '0' : '5'}
          />
          <line x1="400" y1="440" x2="500" y2="440" stroke="#94a3b8" strokeWidth="2" />

          {/* animated active flow lines */}
          {activeApproach === 'traditional' ? (
            <>
              <path
                d="M450 220 Q450 255 275 290"
                stroke="#2563eb"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowBlue)"
              >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
              <path
                d="M275 350 Q275 385 250 420"
                stroke="#2563eb"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowBlue)"
              >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
            </>
          ) : (
            <>
              <path
                d="M690 220 Q690 255 625 290"
                stroke="#9333ea"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowPurple)"
              >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
              <path
                d="M625 350 Q625 385 650 420"
                stroke="#9333ea"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowPurple)"
              >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.2s" repeatCount="indefinite" />
              </path>
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 max-w-xs bg-white p-4 rounded-lg border border-gray-200 text-sm">
        <div className="font-medium mb-2">Legend:</div>
        <div className="flex items-center mb-1">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
          <span className="text-gray-700">Traditional Flow</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="h-3 w-3 rounded-full bg-purple-500 mr-2" />
          <span className="text-gray-700">GenAI Flow</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-8 border-t-2 border-gray-400 border-dashed mr-2" />
          <span className="text-gray-700">Inactive Connection</span>
        </div>
      </div>

      {/* Explanations */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Traditional */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="flex items-center font-medium text-gray-900 mb-2">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Traditional Approach
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Browse and search data products in a centralized catalog
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Select specific columns from available data products
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Configure delivery mechanism, format, and frequency
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Enforces governance and security policies
            </li>
            <li className="flex items-start">
              <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              Requires technical knowledge of data structures
            </li>
          </ul>
        </div>

        {/* GenAI */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="flex items-center font-medium text-gray-900 mb-2">
            <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
            GenAI Approach
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Describe data needs in natural language
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              AI automatically identifies relevant data sources
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Generates optimized SQL queries based on request
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              Still follows governance rules and security policies
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              No technical knowledge required for end users
            </li>
          </ul>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-yellow-700">
          <p className="font-medium mb-1">Key Insight:</p>
          <p>
            Both approaches leverage the same underlying infrastructure, governance, and delivery
            mechanisms. The GenAI approach simply provides an alternate, more accessible entry
            point for business users who may not have the technical knowledge to navigate data
            structures directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveArchitecture;
