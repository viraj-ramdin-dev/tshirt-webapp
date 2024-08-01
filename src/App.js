import React, { useState } from "react";
import CanvasComponent from "./Components/CanvasComponent";
import "./App.css"; // Import the CSS file

const App = () => {
  const [tshirtColor, setTshirtColor] = useState("#ffffff");
  // const [selectedColor, setSelectedColor] = useState("grey");
  let selectedColor = tshirtColor;

  const handleColorChange = (color) => {
    selectedColor = color;
  };

  const applyColorChange = () => {
    setTshirtColor(selectedColor);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Your T-shirt Design</h1>
        <p>Select a color and start designing your custom T-shirt!</p>
      </header>
      <main className="App-main">
        <div className="color-picker">
          <label>Choose Color:</label>
          <input
            type="color"
            value={tshirtColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          <button onClick={applyColorChange}>Apply Color</button>
        </div>
        <CanvasComponent tshirtColor={tshirtColor} />
      </main>
    </div>
  );
};

export default App;
