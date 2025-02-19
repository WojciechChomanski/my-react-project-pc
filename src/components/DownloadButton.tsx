import React from "react";

interface DownloadButtonProps {
  primaryColor: string;
  submitType: "download" | "email";
  recipient?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  primaryColor,
  submitType,
  recipient,
}) => {
  const handleDownload = () => {
    const customerNumber = localStorage.getItem("customerNumber") || "unknown"; // Get customer number from storage
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_"); // Generate timestamp

    const jsonData = {
      client: {
        theme: {
          primaryColor,
          logoUri: "/static/default/PaletteCAD_mit claim_auf schwarz_rgb.webp",
        },
      },
      instance: {
        submitFlow: {
          type: submitType,
          recipient: submitType === "email" ? recipient : undefined,
          includePrice: true,
        },
      },
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${customerNumber}_${timestamp}.json`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all"
    >
      Download JSON
    </button>
  );
};

export default DownloadButton;
