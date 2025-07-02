// =====================================
// File: LandingPage.jsx
// Purpose: Main landing page component for the loan application system
// Used in: Main router as the home page route
// Features: Hero section, CTA buttons, loan type indicators
// Dependencies: React, react-router-dom, index.css
// =====================================

// Import React for component creation
import React from 'react';
// Import global styles for consistent theming
import '../index.css';

// Main landing page component
export default function LandingPage() {
  return (
    // Hero section with background image
    <div
      className="hero-background"
      style={{ backgroundImage: "url('/loan-hero.jpeg')" }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="landing-overlay">
        {/* Central content container */}
        <div className="landing-box">
          {/* Main heading for the page */}
          <h1>Welcome to GetMeLoan</h1>
          
          {/* Service description paragraph */}
          <p>
            Our platform helps you apply for {' '}
            <strong>Personal</strong>, {' '}
            <strong>Home</strong>, {' '}
            <strong>Education</strong>, and {' '}
            <strong>Business Loans</strong>.
          </p>

          {/* Call-to-action section */}
          <div className="callout">
            To apply for a loan, please <a href="/register">Register</a>.<br />
            Already a user? <a href="/login">Login here</a>.
          </div>

          {/* Loan type indicators using emojis */}
          <div className="icon-row">
            <div className="icon-item">🏠</div> {/* Home loan */}
            <div className="icon-item">📚</div> {/* Education loan */}
            <div className="icon-item">💼</div> {/* Business loan */}
            <div className="icon-item">💳</div> {/* Personal loan */}
          </div>
        </div>
      </div>
    </div>
  );
}// =====================================
// File: LandingPage.jsx
// Purpose: Main landing page component for the loan application system
// Used in: Main router as the home page route
// Features: Hero section, CTA buttons, loan type indicators
// Dependencies: React, react-router-dom, index.css
// =====================================

// Import React for component creation
import React from 'react';
// Import global styles for consistent theming
import '../index.css';

// Main landing page component
export default function LandingPage() {
  return (
    // Hero section with background image
    <div
      className="hero-background"
      style={{ backgroundImage: "url('/loan-hero.jpeg')" }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="landing-overlay">
        {/* Central content container */}
        <div className="landing-box">
          {/* Main heading for the page */}
          <h1>Welcome to GetMeLoan</h1>
          
          {/* Service description paragraph */}
          <p>
            Our platform helps you apply for {' '}
            <strong>Personal</strong>, {' '}
            <strong>Home</strong>, {' '}
            <strong>Education</strong>, and {' '}
            <strong>Business Loans</strong>.
          </p>

          {/* Call-to-action section */}
          <div className="callout">
            To apply for a loan, please <a href="/register">Register</a>.<br />
            Already a user? <a href="/login">Login here</a>.
          </div>

          {/* Loan type indicators using emojis */}
          <div className="icon-row">
            <div className="icon-item">🏠</div> {/* Home loan */}
            <div className="icon-item">📚</div> {/* Education loan */}
            <div className="icon-item">💼</div> {/* Business loan */}
            <div className="icon-item">💳</div> {/* Personal loan */}
          </div>
        </div>
      </div>
    </div>
  );
}