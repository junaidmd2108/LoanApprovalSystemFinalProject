// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about loans or eligibility.' }
  ]);
  const [input, setInput]       = useState('');
  const messagesEndRef          = useRef(null);

  // 1) your full FAQ map
  const faqs = {
    'personal loan': 'Personal loans usually require a credit score above 700.',
    'home loan':     'Home loans often require a score above 720 and stable income.',
    'education loan':'Education loans may ask for proof of enrollment and a 680+ score.',
    'business loan': 'Business loans typically need a 740+ credit score and business docs.',
    'auto loan':     'Auto loans often start around 4% APR for good credit.',
    'credit score':  'Credit scores range from 300–850; the higher, the better!',
    'interest rate': 'Current rates: Personal ~5%, Home ~4%, Auto ~6% (approx).',
    'hello':         'Hi there! How can I help you with loans today?',
    'thanks':        'You’re welcome! Anything else on your mind?',
    'bye':           'Goodbye! Come back any time with more questions.',
    'loan':          'We offer personal, home, auto, education and business loans.',
    'score':         'Credit scores range from 300–850; the higher, the better!',
    'interest':      'Current rates: Personal ~5%, Home ~4%, Auto ~6% (approx).',
  };

  // 2) build suggestions and fuse instance
  const suggestions = Object.keys(faqs);
  const fuse = new Fuse(suggestions, {
    threshold: 0.6,
    distance: 200,
  });

  // auto‐scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(o => !o);

  const handleUserMessage = (text) => {
    const lower = text.toLowerCase();

    // echo user
    setMessages(ms => [...ms, { sender: 'user', text }]);

    // exact substring matches
    const exactHits = suggestions.filter(k => lower.includes(k));

    let reply;
    if (exactHits.length) {
      reply = exactHits.map(k => faqs[k]).join(' ');
    } else {
      // fuzzy fallback
      const results = fuse.search(lower);
      if (results.length) {
        reply = faqs[results[0].item];
      } else {
        reply = 'Sorry, I didn’t catch that. Try clicking one of the suggestions below.';
      }
    }

    setMessages(ms => [...ms, { sender: 'bot', text: reply }]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    handleUserMessage(trimmed);
  };

  const handleSuggestionClick = (key) => {
    setInput('');
    handleUserMessage(key);
  };

  return (
    <div className={`chatbot-container${isOpen ? ' open' : ''}`}>
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '×' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">Loan Assistant</div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

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