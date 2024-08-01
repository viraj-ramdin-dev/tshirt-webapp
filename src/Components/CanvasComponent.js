import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import tshirtImage from "../assests/tshirt.png";
import "./CanvasComponent.css";

const CanvasComponent = ({ tshirtColor }) => {
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState("");
  const [selectedObjectColor, setSelectedObjectColor] = useState("#000000");


  let canvasRef = useRef(null);

  //correct code

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 450,
      height: 470,
      selectable: false,
      backgroundColor: `${tshirtColor}`,
    });

    //Add a T-shirt image as a background

    fabricCanvas.setBackgroundImage(
      tshirtImage,
      fabricCanvas.renderAll.bind(fabricCanvas),
      {}
    );

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [tshirtColor]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addText = () => {
    const newText = new fabric.Text(text, {
      left: 100,
      top: 100,
      fill: "#000000",
      fontFamily: "Arial",
      fontSize: 30,
    });
    canvas.add(newText);
    setText("");
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";

    // Append to body and trigger click event
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const deleteObject = () => {
    canvas.remove(canvas.getActiveObject());
  };

  const handleObjectColorChange = (e) => {
    setSelectedObjectColor(e.target.value);
    // selectedObjectColor =e.target.value
  };

  const applyColorToSelectedObject = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      activeObject.set("fill", selectedObjectColor);
      canvas.renderAll();
    }
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
        <button onClick={addText}>Add Text</button>
        <button onClick={deleteObject}>Delete</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
      <div className="object-color-picker">
        <label>Change Object Color:</label>
        <input
          type="color"
          value={selectedObjectColor}
          onChange={handleObjectColorChange}
        />
        <button onClick={applyColorToSelectedObject}>Apply Color</button>
      </div>
    </div>
  );
};

export default CanvasComponent;
