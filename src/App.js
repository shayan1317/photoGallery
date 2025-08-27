import React from "react";
import Title from "./components/Title";
import Imagegallery from "./components/Imagegallery";
import Main from "./components/Main";
import Uploadfrom from "./components/Uploadfrom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUP from "./components/SignUP";
import { useNavigate } from "react-router-dom"; // Uncomment when using with React Router
import { useState, useEffect } from "react";
// const useNavigate = () => {
//   return (path) => {
//     console.log(`Navigating to: ${path}`);
//     // In your real app, this will actually navigate
//   };
// };

import "./app.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
function App() {
  // const navigate = useNavigate();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Sign Up Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Sign In Page */}
          <Route path="/signin" element={<SignIn />} />

          {/* Dashboard Page */}
          <Route path="/dashboard" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
