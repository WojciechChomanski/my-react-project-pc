import React from "react";

interface StitchingSelectorProps {
  setStitching: (stitching: string) => void;
}

const StitchingSelector: React.FC<StitchingSelectorProps> = ({
  setStitching,
}) => (
  <div>
    <h2>Select Stitching</h2>
    <select onChange={(e) => setStitching(e.target.value)}>
      <option value="none">None</option>
      <option value="single">Single</option>
      <option value="double">Double</option>
    </select>
  </div>
);

export default StitchingSelector;
