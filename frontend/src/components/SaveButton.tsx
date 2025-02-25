import React from "react";

interface SaveButtonProps {
  shape: string;
  material: string;
  stitching: string;
  primaryColor: string;
  submitType: "download" | "email";
  base64Image: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  shape,
  material,
  stitching,
  primaryColor,
  submitType,
  base64Image,
}) => {
  const handleSave = async () => {
    const customerNumber = localStorage.getItem("customerNumber")?.trim();

    if (!customerNumber) {
      alert("❌ No customer number found! Please log in.");
      return;
    }

    const configData = {
      shape,
      material,
      stitching,
      color: primaryColor,
      submitType,
      image: base64Image || null, // ✅ Include Base64 image
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/save/${encodeURIComponent(customerNumber)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(configData),
        }
      );

      if (!response.ok) {
        const errorResult = await response.json();
        console.error("❌ Error saving:", errorResult.message);
        alert(`❌ Error: ${errorResult.message}`);
      } else {
        const result = await response.json();
        alert("✅ Configuration saved successfully!");
        console.log("Saved Configuration:", result);
      }
    } catch (error) {
      console.error("❌ Failed to save:", error);
      alert("❌ Failed to save configuration. Check console for details.");
    }
  };

  return (
    <button
      onClick={handleSave}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all"
    >
      Save Configuration
    </button>
  );
};

export default SaveButton;
