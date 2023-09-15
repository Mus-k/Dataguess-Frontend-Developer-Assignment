import React, { useState } from "react";

const COLORS = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33", "#33FFFF"];

const ColorPicker = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div>
      <h2>Select a Color:</h2>
      <div className="color-picker">
        {COLORS.map((color) => (
          <div
            key={color}
            className={`color ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
