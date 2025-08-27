import React from "react";

const Banner = ({ isVisible, scrollToFeatures, handleSignUp }) => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      <div className="hero-content">
        <div className={`hero-text ${isVisible ? "visible" : ""}`}>
          <h1 className="hero-title">
            Store Your Memories
            <span className="highlight"> Safely</span> in the Cloud
          </h1>
          <p className="hero-subtitle">
            Upload, organize, and access your photos from anywhere with our
            secure cloud-based photo storage solution powered by Firebase.
          </p>

          <div className="hero-buttons">
            <button onClick={handleSignUp} className="btn-hero-primary">
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button onClick={scrollToFeatures} className="btn-hero-secondary">
              Learn More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 13L12 18L17 13M7 6L12 11L17 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Photos Stored</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        <div className={`hero-visual ${isVisible ? "visible" : ""}`}>
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="photo-grid">
                <div className="photo-item photo1">🏔️</div>
                <div className="photo-item photo2">🌅</div>
                <div className="photo-item photo3">🌊</div>
                <div className="photo-item photo4">🌸</div>
                <div className="photo-item photo5">🏙️</div>
                <div className="photo-item photo6">🌲</div>
              </div>
              <div className="upload-indicator">
                <div className="upload-icon">⬆️</div>
                <span>Uploading...</span>
              </div>
            </div>
          </div>

          {/* Floating Action Cards */}
          <div className="floating-card card1">
            <div className="card-icon">📤</div>
            <span>Upload</span>
          </div>
          <div className="floating-card card2">
            <div className="card-icon">🔒</div>
            <span>Secure</span>
          </div>
          <div className="floating-card card3">
            <div className="card-icon">⚡</div>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
