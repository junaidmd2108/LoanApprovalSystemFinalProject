// src/util/openai.js

// Check if OPENAI_API_KEY exists in .env (automatically replaced by Vite/Webpack)
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const USE_OPENAI = process.env.REACT_APP_USE_OPENAI === 'true';

// Exported function to be used in Chatbot.jsx
export async function fetchOpenAIResponse(prompt) {
  // If OpenAI usage is disabled or API key is missing, return null safely (no charge)
  if (!USE_OPENAI || !OPENAI_API_KEY) {
    console.warn('OpenAI support is disabled or API key missing.');
    return null;
  }

  try {
    // Make POST request to OpenAI API with provided prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',        // Use GPT-3.5-Turbo model
        messages: [
          { role: 'system', content: 'You are a helpful loan assistant who answers only questions about loan types, eligibility, credit score, and interest.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7                // Slight randomness for variety
      })
    });

    const data = await response.json();

    // Return the generated reply text from OpenAI
    return data.choices?.[0]?.message?.content?.trim() || null;

  } catch (err) {
    console.error('OpenAI API error:', err);
    return null;
  }
}