import React from "react";

interface PreviewProps {
  shape: string;
  material: string;
  stitching: string;
  color: string;
  base64Image: string;
}

const Preview: React.FC<PreviewProps> = ({
  shape,
  material,
  stitching,
  color,
  base64Image,
}) => (
  <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">Furniture Preview</h2>

    <div className="w-80 p-4 border rounded-lg bg-gray-100 text-center">
      <p className="text-gray-800">
        Shape: <span className="font-medium">{shape}</span>
      </p>
      <p className="text-gray-800">
        Material: <span className="font-medium">{material}</span>
      </p>
      <p className="text-gray-800">
        Stitching: <span className="font-medium">{stitching}</span>
      </p>
      <p className="text-gray-800">
        Color: <span className="font-medium">{color}</span>
      </p>
    </div>

    {base64Image && (
      <div className="w-80">
        <h3 className="text-lg font-medium mb-2">Uploaded Image:</h3>
        <img
          src={base64Image}
          alt="Uploaded"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    )}
  </div>
);

export default Preview;
