import React from "react";
import Title from "./components/Title";
import Imagegallery from "./components/Imagegallery";
import Main from "./components/Main";
import Uploadfrom from "./components/Uploadfrom";
import "./app.css";
function App() {
  return (
    <div className="App">
      <Title />
      <Uploadfrom />
      <Imagegallery />
    </div>
  );
}

export default App;
