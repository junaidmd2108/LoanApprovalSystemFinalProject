// =====================================
// File: Chatbot.jsx
// Purpose: Interactive chatbot component for loan inquiries
// Author: Junaid Mohammad
// Dependencies: React, Fuse.js, Chatbot.css
// Features: Real-time messaging, fuzzy search, suggestion chips
// =====================================

// Import essential React hooks for state management, refs, and side effects
import React, { useState, useRef, useEffect } from 'react';
// Import Fuse.js for fuzzy string matching capabilities
import Fuse from 'fuse.js';
// Import component-specific styles
import './Chatbot.css';

export default function Chatbot() {
  // State Management Section
  // Controls visibility of chat window (true = visible, false = hidden)
  const [isOpen, setIsOpen] = useState(false);
  
  // Stores chat message history with initial greeting
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about loans or eligibility.' }
  ]);
  
  // Manages user input field value
  const [input, setInput] = useState('');
  
  // Reference for auto-scrolling to latest message
  const messagesEndRef = useRef(null);

  // Knowledge Base: FAQ mapping with predefined responses
  const faqs = {
    // Loan Type Information
    'personal loan': 'Personal loans usually require a credit score above 700.',
    'home loan':     'Home loans often require a score above 720 and stable income.',
    'education loan':'Education loans may ask for proof of enrollment and a 680+ score.',
    'business loan': 'Business loans typically need a 740+ credit score and business docs.',
    'auto loan':     'Auto loans often start around 4% APR for good credit.',
    
    // General Financial Information
    'credit score':  'Credit scores range from 300–850; the higher, the better!',
    'interest rate': 'Current rates: Personal ~5%, Home ~4%, Auto ~6% (approx).',
    
    // Conversational Responses
    'hello':         'Hi there! How can I help you with loans today?',
    'thanks':        'You re welcome! Anything else on your mind?',
    'bye':           'Goodbye! Come back any time with more questions.',
    
    // Generic Loan Information
    'loan':          'We offer personal, home, auto, education and business loans.',
    'score':         'Credit scores range from 300–850; the higher, the better!',
    'interest':      'Current rates: Personal ~5%, Home ~4%, Auto ~6% (approx).',
  };

  // Extract FAQ keys for suggestions and initialize fuzzy search
  const suggestions = Object.keys(faqs);
  const fuse = new Fuse(suggestions, {
    threshold: 0.6,    // Match sensitivity (0 = exact, 1 = loose)
    distance: 200,     // How far to look for pattern matches
  });

  // Auto-scroll effect: Triggers when messages array updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // UI Interaction Handlers
  
  // Toggle chat window visibility
  const toggleChat = () => setIsOpen(o => !o);

  // Process user message and generate appropriate response
  const handleUserMessage = (text) => {
    const lower = text.toLowerCase();

    // Add user message to chat history
    setMessages(ms => [...ms, { sender: 'user', text }]);

    // Search for exact keyword matches in FAQs
    const exactHits = suggestions.filter(k => lower.includes(k));

    let reply;
    if (exactHits.length) {
      // Combine all matching FAQ responses
      reply = exactHits.map(k => faqs[k]).join(' ');
    } else {
      // Attempt fuzzy matching if no exact matches found
      const results = fuse.search(lower);
      if (results.length) {
        reply = faqs[results[0].item];
      } else {
        // Fallback response when no matches found
        reply = 'Sorry, I didn t catch that. Try clicking one of the suggestions below.';
      }
    }

    // Add bot response to chat history
    setMessages(ms => [...ms, { sender: 'bot', text: reply }]);
  };

  // Handle send button click or Enter key press
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;      // Prevent empty messages
    setInput('');              // Clear input field
    handleUserMessage(trimmed); // Process message
  };

  // Handle suggestion chip clicks
  const handleSuggestionClick = (key) => {
    setInput('');              // Clear input field
    handleUserMessage(key);    // Process suggested query
  };

  // Component Render Section
  return (
    <div className={`chatbot-container${isOpen ? ' open' : ''}`}>
      {/* Chat Toggle Button */}
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '×' : '💬'}
      </button>

      {/* Conditional Chat Window Render */}
      {isOpen && (
        <div className="chatbot-box">
          {/* Chat Header */}
          <div className="chatbot-header">Loan Assistant</div>

          {/* Messages Display Area */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
          </div>

          {/* Suggestion Chips Section */}
          <div className="chatbot-suggestions">
            {suggestions.map(key => (
              <button
                key={key}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(key)}
              >
                {key}
              </button>
            ))}
          </div>

          {/* User Input Section */}
          <div className="chatbot-input">
            <input
              name="chatInput"
              type="text"
              value={input}
              placeholder="Ask a question..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}