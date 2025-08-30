import React from "react";
import Banner from "../components/Banner";
import Features from "../components/Features";
import CallToAction from "../components/CallToAction.jsx";
import { WhyChooseUs } from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider.jsx";
const Home = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();
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
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // already logged in, redirect away
    }
  }, [user, navigate]);
  return (
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
      <Banner
        handleSignUp={handleSignUp}
        isVisible={isVisible}
        scrollToFeatures={scrollToFeatures}
      />
      {/* Features Section */}
      <Features />
      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />
      {/* CTA Section */}
      <CallToAction handleSignUp={handleSignUp} handleLogin={handleLogin} />
      <WhyChooseUs features={features} currentFeature={currentFeature} />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
