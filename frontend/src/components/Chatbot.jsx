import React, { useState } from 'react';
import './Chatbot.css';
import { fetchOpenAIResponse } from '../util/openai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about loans or eligibility.' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen((o) => !o);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((ms) => [...ms, userMessage]);
    setInput('');

    const lower = userMessage.text.toLowerCase();
    const faqs = {
      hi: 'Hello! How can I assist you with your loan questions?',
      hello: 'Hi there! Feel free to ask about loan types, eligibility, or interest.',
      hey: 'Hey! What would you like to know about loans today?',
      thank: 'You’re welcome! Let me know if you have more questions.',
      bye: 'Goodbye! Feel free to come back anytime.',
      'personal loan': 'Personal loans usually require a credit score above 700.',
      'home loan': 'Home loans often require a score above 720 and stable income.',
      'credit score': 'Credit scores range from 300 to 850. Higher is better!',
      interest: 'Interest rates vary by loan type. Personal: ~5%, Home: ~4%.',
    };

    const replies = Object.entries(faqs)
      .filter(([k]) => lower.includes(k))
      .map(([, r]) => r);

    let botReply;
    if (replies.length) {
      botReply = { sender: 'bot', text: replies.join(' ') };
    } else {
      const ai = await fetchOpenAIResponse(userMessage.text);
      botReply = {
        sender: 'bot',
        text:
          ai ||
          'Sorry, I didn’t understand that. Please ask about loan types, credit scores, or interest rates.',
      };
    }

    setMessages((ms) => [...ms, botReply]);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
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
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Ask a question..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}