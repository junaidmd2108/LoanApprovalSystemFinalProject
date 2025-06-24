import React from 'react';
import '../index.css'; // Global CSS styles

export default function LandingPage() {
  return (
    <div
      className="hero-background"
      style={{ backgroundImage: "url('/loan-hero.jpeg')" }} // 👈 This works because the image is in /public
    >
      <div className="landing-overlay">
        <div className="landing-box">
          <h1>Welcome to GetMeLoan</h1>
          <p>
            Our platform helps you apply for <strong>Personal</strong>, <strong>Home</strong>, <strong>Education</strong>, and <strong>Business Loans</strong>.
          </p>
          <div className="callout">
            To apply for a loan, please <a href="/register">Register</a>.<br />
            Already a user? <a href="/login">Login here</a>.
          </div>
          <div className="icon-row">
            <div className="icon-item">🏠</div>
            <div className="icon-item">📚</div>
            <div className="icon-item">💼</div>
            <div className="icon-item">💳</div>
          </div>
        </div>
      </div>
    </div>
  );
}