import React from "react";
import Title from "./components/Title";
import Imagegallery from "./components/Imagegallery";
import Main from "./components/Main";
import Uploadfrom from "./components/Uploadfrom";
import { useNavigate } from "react-router-dom"; // Uncomment when using with React Router
import { useState, useEffect } from "react";
// const useNavigate = () => {
//   return (path) => {
//     console.log(`Navigating to: ${path}`);
//     // In your real app, this will actually navigate
//   };
// };

import "./app.css";
function App() {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "📸",
      title: "Upload Photos",
      description: "Easily upload and organize your precious memories",
    },
    {
      icon: "☁️",
      title: "Cloud Storage",
      description: "Secure cloud storage powered by Firebase Firestore",
    },
    {
      icon: "🔍",
      title: "Easy Access",
      description: "View and manage your photos from anywhere, anytime",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Photography Enthusiast",
      text: "This app has revolutionized how I store and organize my photos. The cloud integration is seamless!",
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Travel Blogger",
      text: "Perfect for managing my travel photos. The interface is intuitive and the storage is reliable.",
      avatar: "👨‍💻",
    },
    {
      name: "Emily Davis",
      role: "Family Photographer",
      text: "Love how secure and easy it is to access my family photos from any device. Highly recommended!",
      avatar: "👩‍🎨",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignUp = () => {
    // navigate("/signup");
  };

  const handleLogin = () => {
    // navigate("/login");
  };

  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      {/* <Title />
      <Uploadfrom />
      <Imagegallery />
      <Main /> */}
      <div className="landing-page">
        {/* Navigation Header */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">📷</span>
              <span className="logo-text">PhotoVault</span>
            </div>
            <div className="nav-buttons">
              <button onClick={handleLogin} className="btn-secondary">
                Login
              </button>
              <button onClick={handleSignUp} className="btn-primary">
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
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
                <button
                  onClick={scrollToFeatures}
                  className="btn-hero-secondary"
                >
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

        {/* Features Section */}
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

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What Our Users Say</h2>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">💬</div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <span className="logo-icon">📷</span>
                <span className="logo-text">PhotoVault</span>
              </div>
              <div className="footer-text">
                <p>
                  Secure photo storage made simple. Built with ❤️ and Firebase.
                </p>
                <p>&copy; 2024 PhotoVault. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
