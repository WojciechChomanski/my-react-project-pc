import React from "react";

interface ShapeSelectorProps {
  setShape: (shape: string) => void;
}

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ setShape }) => (
  <div>
    <h2>Select Furniture Shape</h2>
    <select onChange={(e) => setShape(e.target.value)}>
      <option value="chair">Chair</option>
      <option value="sofa">Sofa</option>
      <option value="table">Table</option>
    </select>
  </div>
);

export default ShapeSelector;
