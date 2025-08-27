import React from "react";

const Features = () => {
  return (
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
  );
};

export default Features;
