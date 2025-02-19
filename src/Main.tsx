import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FileUpload from "./components/FileUpload";
import ShapeSelector from "./components/ShapeSelector";
import MaterialSelector from "./components/MaterialSelector";
import StitchingSelector from "./components/StitchingSelector";
import Preview from "./components/Preview";
import DownloadButton from "./components/DownloadButton";
import { JsonDataType } from "./types";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Branding from "./components/Branding"; // Branding Feature

// Fetches default configuration from a JSON file
const fetchConfig = async () => {
  try {
    const response = await fetch("/config.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

const MainApp = () => {
  // State for managing customer login
  const [customerNumber, setCustomerNumber] = useState<string | null>(
    localStorage.getItem("customerNumber")
  );
  const [onDashboard, setOnDashboard] = useState(true);

  // States for furniture configuration
  const [shape, setShape] = useState("");
  const [material, setMaterial] = useState("");
  const [stitching, setStitching] = useState("");
  const [color, setColor] = useState("#000000");
  const [base64Image, setBase64Image] = useState("");
  const [submitType, setSubmitType] = useState<"download" | "email">(
    "download"
  );
  const [recipient, setRecipient] = useState("");

  // Load default configuration on mount
  useEffect(() => {
    fetchConfig().then((data) => {
      if (data) {
        setShape(data.shape);
        setMaterial(data.material);
        setStitching(data.stitching);
        setColor(data.color);
      }
    });
  }, []);

  // Update state when JSON data is uploaded
  const setJsonData = (data: JsonDataType) => {
    setShape(data.shape);
    setMaterial(data.material);
    setStitching(data.stitching);
    setColor(data.color);
  };

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem("customerNumber");
    setCustomerNumber(null);
    setOnDashboard(true);
  };

  // Display login page if user is not logged in
  if (!customerNumber) {
    return <Login onLogin={(num) => setCustomerNumber(num)} />;
  }

  // Show dashboard before entering the generator
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
      <Branding /> {/* ✅ Branding added to top-right corner */}
      <h1>Furniture Generator</h1>
      {/* File upload for importing configurations */}
      <FileUpload setJsonData={setJsonData} setBase64Image={setBase64Image} />
      {/* Selection inputs for furniture configuration */}
      <ShapeSelector setShape={setShape} />
      <MaterialSelector setMaterial={setMaterial} />
      <StitchingSelector setStitching={setStitching} />
      {/* Color picker */}
      <div>
        <h2>Pick a Color</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {/* Preview section */}
      <Preview
        shape={shape}
        material={material}
        stitching={stitching}
        color={color}
        base64Image={base64Image}
      />
      {/* Submission options */}
      <div>
        <h2>Submit Type</h2>
        <select
          onChange={(e) =>
            setSubmitType(e.target.value as "download" | "email")
          }
        >
          <option value="download">Download</option>
          <option value="email">Email</option>
        </select>
      </div>
      {/* Email input field if email submission is selected */}
      {submitType === "email" && (
        <div>
          <h2>Email Recipient</h2>
          <input
            type="email"
            value={recipient} // ✅ Fixed value reference
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
      )}
      {/* Download button */}
      <DownloadButton
        primaryColor={color}
        submitType={submitType}
        recipient={recipient}
      />
    </div>
  );
};

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
