// src/discovery/components/QnABox.jsx

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  User,
  Bot
} from 'lucide-react';

const QnABox = ({ dataset }) => {
  const [question, setQuestion] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      setShowSuggestions(false);
      // Simulate GenAI processing with animation
      setTimeout(() => {
        setIsLoading(false);
        setShowAnswer(true);
        setCurrentAnswer(getAnswerForQuestion(question));
      }, 2500);
    }
  };

  const handleSuggestionClick = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
    setIsLoading(true);
    setShowSuggestions(false);
    // Simulate GenAI processing
    setTimeout(() => {
      setIsLoading(false);
      setShowAnswer(true);
      setCurrentAnswer(getAnswerForQuestion(suggestedQuestion));
    }, 2500);
  };

  const resetChat = () => {
    setQuestion('');
    setShowAnswer(false);
    setIsLoading(false);
    setShowSuggestions(true);
    setCurrentAnswer('');
  };

  // Enhanced answer generation based on question type
  const getAnswerForQuestion = (questionText) => {
    const lowerQ = questionText.toLowerCase();
    
    if (lowerQ.includes('time period') || lowerQ.includes('data cover')) {
      return `This dataset covers data from ${dataset.metadata.startDate.split('-')[0]} to present, with ${dataset.historicalData}. The data is updated ${dataset.metadata.updateFrequency.toLowerCase()} to ensure you always have access to the most current information available.`;
    }
    
    if (lowerQ.includes('frequently') || lowerQ.includes('updated')) {
      return `The dataset is updated ${dataset.metadata.updateFrequency.toLowerCase()}. Our automated systems ensure data freshness by pulling updates from source systems and applying quality checks. The last update was on ${dataset.metadata.lastUpdated}.`;
    }
    
    if (lowerQ.includes('delivery') || lowerQ.includes('access')) {
      const optionsList = dataset.deliveryOptions.map(opt => opt.name).join(', ');
      return `You can access this dataset through multiple delivery options: ${optionsList}. Each option is designed for different use cases - APIs for real-time access, bulk feeds for large-scale analysis, and platform integrations for seamless workflow integration.`;
    }
    
    if (lowerQ.includes('use it') || lowerQ.includes('how can')) {
      return `${dataset.qnaResponse} You can use this data for financial modeling, risk assessment, market research, and strategic planning. The dataset integrates well with popular analytics tools and provides comprehensive documentation to help you get started quickly.`;
    }
    
    // Default response with enhanced context
    return `${dataset.qnaResponse} This dataset offers ${dataset.coverage} and is particularly valuable for organizations looking to make data-driven decisions in the ${dataset.category.toLowerCase()} space.`;
  };

  const suggestedQuestions = [
    "What's this dataset and how can I use it?",
    "What time period does this data cover?",
    "How frequently is this dataset updated?",
    "What are the delivery options available?"
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Have a question about this Dataset?</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Our AI-powered search engine is continually improving. Ask anything about this dataset and get instant answers.
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this dataset..."
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Suggested Questions */}
      {showSuggestions && !showAnswer && !isLoading && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-3">Quick questions:</p>
          <div className="space-y-2">
            {suggestedQuestions.map((sq, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(sq);
                }}
                className="block w-full text-left p-3 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-100 hover:border-blue-200"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Loading State with better animation */}
      {isLoading && (
        <div className="mb-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex space-x-1 mr-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-blue-900">GenAI is analyzing the dataset...</span>
              <div className="text-xs text-blue-700 mt-1">Processing your question and generating contextual response</div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Answer Display */}
      {showAnswer && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <User className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">You asked:</p>
              <p className="text-sm text-blue-800 mt-1">{question}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Bot className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900 mb-2">AI Assistant:</p>
              <p className="text-sm text-green-800 leading-relaxed">{currentAnswer}</p>
            </div>
          </div>

          {/* Feedback */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Was this answer helpful?</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-green-600 transition-colors duration-200 rounded-full hover:bg-green-50">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-50">
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Related Links */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">For more information:</p>
                <div className="space-y-1">
                  <button className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    → Talk to an Expert
                  </button>
                  <button className="block text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    → Sign in to Marketplace
                  </button>
                </div>
              </div>
              <button 
                onClick={resetChat}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ask Another Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnABox;