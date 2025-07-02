// =====================================
// File: openai.js
// Purpose: OpenAI API integration for chatbot responses
// Used in: Chatbot.jsx for AI-powered responses
// Features: GPT-3.5 integration, error handling, environment config
// Dependencies: OpenAI API, environment variables
// =====================================

// Check environment variables for API configuration
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;  // API key from .env
const USE_OPENAI = process.env.REACT_APP_USE_OPENAI === 'true';  // Feature flag

/**
 * Fetches AI-generated response from OpenAI API
 * @param {string} prompt - User's input question
 * @returns {Promise<string|null>} AI response or null if disabled/error
 */
export async function fetchOpenAIResponse(prompt) {
  // Early return if feature is disabled or API key is missing
  if (!USE_OPENAI || !OPENAI_API_KEY) {
    console.warn('OpenAI support is disabled or API key missing.');
    return null;
  }

  try {
    // Configure and send request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',        // Use GPT-3.5-Turbo model
        messages: [
          // Set AI behavior and context
          { 
            role: 'system', 
            content: 'You are a helpful loan assistant who answers only questions about loan types, eligibility, credit score, and interest.' 
          },
          // User's question
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7                // Control response randomness
      })
    });

    // Parse API response
    const data = await response.json();

    // Extract and return AI's response text
    return data.choices?.[0]?.message?.content?.trim() || null;

  } catch (err) {
    // Log error and return null for graceful failure
    console.error('OpenAI API error:', err);
    return null;
  }
}