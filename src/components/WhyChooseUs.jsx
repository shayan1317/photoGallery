import React from "react";

export const WhyChooseUs = ({ features, currentFeature }) => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose PhotoVault?</h2>
          <p className="section-subtitle">
            Experience the perfect blend of security, simplicity, and
            accessibility
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                currentFeature === index ? "active" : ""
              }`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="feature-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">🚀</div>
            <div className="highlight-content">
              <h4>Lightning Fast</h4>
              <p>Upload and access photos in seconds</p>
            </div>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">🛡️</div>
            <div className="highlight-content">
              <h4>Enterprise Security</h4>
              <p>Bank-level encryption for your memories</p>
            </div>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">📱</div>
            <div className="highlight-content">
              <h4>Cross-Platform</h4>
              <p>Access from any device, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
