import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import ParticleConstellation from "./components/ParticleConstellation";
import CursorTrail from "./components/CursorTrail";
import "./App.css";

function App() {
  const [activeField, setActiveField] = useState("default");

  return (
    <>
      <ParticleConstellation activeField={activeField} />
      <CursorTrail />
      <Chatbot onFieldChange={setActiveField} />
    </>
  );
}

export default App;
