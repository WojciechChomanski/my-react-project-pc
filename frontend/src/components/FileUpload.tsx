import React from "react";
import { JsonDataType } from "../types";

interface FileUploadProps {
  setJsonData: (data: JsonDataType) => void;
  setBase64Image: React.Dispatch<React.SetStateAction<string>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setJsonData,
  setBase64Image,
}) => {
  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/json") {
      console.error("Please upload a valid JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;

      try {
        const parsedData: unknown = JSON.parse(fileContent);
        if (isValidJsonData(parsedData)) {
          setJsonData(parsedData);
        } else {
          console.error("Invalid JSON structure.");
        }
      } catch (error) {
        console.error("Error parsing the file:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      console.error("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setBase64Image(base64Image);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Upload Files</h2>

      <label className="w-80 p-4 border-2 border-dashed border-blue-500 rounded-lg bg-white text-center cursor-pointer hover:bg-gray-100">
        <input
          type="file"
          onChange={handleJsonUpload}
          accept=".json"
          className="hidden"
        />
        <span className="text-blue-600 font-medium">Upload JSON File</span>
      </label>

      <label className="w-80 p-4 border-2 border-dashed border-green-500 rounded-lg bg-white text-center cursor-pointer hover:bg-gray-100">
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <span className="text-green-600 font-medium">Upload Image</span>
      </label>
    </div>
  );
};

// ✅ Ensures `parsedData` matches `JsonDataType`
function isValidJsonData(data: unknown): data is JsonDataType {
  return (
    typeof data === "object" &&
    data !== null &&
    "shape" in data &&
    "material" in data &&
    "stitching" in data &&
    "color" in data &&
    typeof (data as JsonDataType).shape === "string" &&
    typeof (data as JsonDataType).material === "string" &&
    typeof (data as JsonDataType).stitching === "string" &&
    typeof (data as JsonDataType).color === "string"
  );
}

export default FileUpload;
