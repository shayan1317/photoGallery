import React from "react";

const CallToAction = ({ handleLogin, handleSignUp }) => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Secure Your Memories?</h2>
          <p className="cta-subtitle">
            Join thousands of users who trust PhotoVault with their precious
            photos
          </p>
          <div className="cta-buttons">
            <button onClick={handleSignUp} className="btn-cta-primary">
              Start Free Today
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button onClick={handleLogin} className="btn-cta-secondary">
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
