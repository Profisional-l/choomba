import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import MainScreen from "./MainScreen.jsx";

function App() {
  window.onload = function() {
    document.querySelector('.background').classList.add('visible');
};

  return (
    <>
      <div  className="background"></div>
      <Navbar />
    </>
  );
}

export default App;
