import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ Angepasst auf Frontend-Ordner
import FileUpload from "./components/FileUpload";
import ShapeSelector from "./components/ShapeSelector";
import MaterialSelector from "./components/MaterialSelector";
import StitchingSelector from "./components/StitchingSelector";
import Preview from "./components/Preview";
import SaveButton from "./components/SaveButton";
import { JsonDataType } from "./types"; // ✅ Import aus Frontend src/types
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Branding from "./components/Branding";

// Fetches configuration from the backend based on customer ID
const fetchConfig = async (customerNumber: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/config/${customerNumber}`
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

const MainApp: React.FC = () => {
  // ✅ State for managing customer login
  const [customerNumber, setCustomerNumber] = useState<string | null>(
    localStorage.getItem("customerNumber")
  );
  const [onDashboard, setOnDashboard] = useState(true);

  // ✅ States for furniture configuration
  const [shape, setShape] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [stitching, setStitching] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [base64Image, setBase64Image] = useState<string>("");
  const [submitType, setSubmitType] = useState<"download" | "email">(
    "download"
  );

  // ✅ Fetch saved configuration when customer logs in
  useEffect(() => {
    if (customerNumber) {
      fetchConfig(customerNumber).then((data) => {
        if (data) {
          setShape(data.shape || "");
          setMaterial(data.material || "");
          setStitching(data.stitching || "");
          setColor(data.color || "#000000");
          setBase64Image(data.image || ""); // ✅ Load image from database
        }
      });
    }
  }, [customerNumber]);

  // ✅ Update state when a new JSON file is uploaded
  const setJsonData = (data: JsonDataType) => {
    setShape(data.shape || "");
    setMaterial(data.material || "");
    setStitching(data.stitching || "");
    setColor(data.color || "#000000");
  };

  // ✅ Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("customerNumber");
    setCustomerNumber(null);
    setOnDashboard(true);
  };

  // ✅ Display login screen if not logged in
  if (!customerNumber) {
    return <Login onLogin={(num) => setCustomerNumber(num)} />;
  }

  // ✅ Show dashboard first before entering the generator
  if (onDashboard) {
    return (
      <Dashboard
        customerNumber={customerNumber}
        onLogout={handleLogout}
        onEnterGenerator={() => setOnDashboard(false)}
      />
    );
  }

  return (
    <div className="App">
      <Branding />

      {/* ✅ Logout button inside the generator */}
      <button
        onClick={handleLogout}
        className="absolute top-8 right-20 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-center">Furniture Generator</h1>

      <div className="flex flex-col items-center space-y-4">
        {/* ✅ File Upload */}
        <FileUpload setJsonData={setJsonData} setBase64Image={setBase64Image} />

        {/* ✅ Furniture Shape Selection */}
        <ShapeSelector setShape={setShape} />

        {/* ✅ Material Selection */}
        <MaterialSelector setMaterial={setMaterial} />

        {/* ✅ Stitching Selection */}
        <StitchingSelector setStitching={setStitching} />

        {/* ✅ Color Picker */}
        <h2 className="text-lg font-semibold text-center">Pick a Color</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 rounded-lg"
        />

        {/* ✅ Preview */}
        <Preview
          shape={shape}
          material={material}
          stitching={stitching}
          color={color}
          base64Image={base64Image}
        />

        {/* ✅ Submission Type Selection */}
        <h2 className="text-lg font-semibold text-center">Submit Type</h2>
        <select
          onChange={(e) =>
            setSubmitType(e.target.value as "download" | "email")
          }
          className="border p-2 rounded-lg"
        >
          <option value="download">Download</option>
          <option value="email">Email</option>
        </select>

        {/* ✅ Save Button */}
        <SaveButton
          shape={shape}
          material={material}
          stitching={stitching}
          primaryColor={color}
          submitType={submitType}
          base64Image={base64Image} // ✅ Ensure image data is passed correctly
        />
      </div>
    </div>
  );
};

// ✅ Renders the application in the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

export default MainApp;

/*  
📌 **Project Overview**  
- Manages furniture configuration (shape, material, stitching, color).  
- Supports JSON uploads to auto-fill selections.  
- Provides real-time previews of selections.  
- Allows users to download or email their configurations.  
- Uses React's **useState** for state management.  
- Fetches default settings on startup via **useEffect**.  
- Renders UI components (dropdowns, color picker, file uploader, preview).  
- Uses **ReactDOM** to render the app into the webpage.  

📌 **Feature Summary**  
✅ **Fetch Config** → Loads default settings on startup.  
✅ **useState** → Tracks user selections.  
✅ **useEffect** → Loads initial configuration.  
✅ **File Upload** → Imports JSON settings.  
✅ **Preview** → Displays selected options.  
✅ **Download** → Saves configuration as JSON.  
✅ **Email Submission** → Sends JSON via email (if selected).  
*/
