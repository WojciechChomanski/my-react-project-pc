import React from "react";

interface MaterialSelectorProps {
  setMaterial: (material: string) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ setMaterial }) => (
  <div>
    <h2>Select Material</h2>
    <select onChange={(e) => setMaterial(e.target.value)}>
      <option value="wood">Wood</option>
      <option value="fabric">Fabric</option>
      <option value="leather">Leather</option>
    </select>
  </div>
);

export default MaterialSelector;
