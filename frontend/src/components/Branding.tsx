import React, { useEffect, useState } from "react";

interface BrandingData {
  logo: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}

const Branding: React.FC = () => {
  const [branding, setBranding] = useState<BrandingData | null>(null);
  const customerNumber = localStorage.getItem("customerNumber");

  useEffect(() => {
    if (!customerNumber) return;

    fetch(`http://localhost:5000/api/customer/${customerNumber}`)
      .then((res) => res.json())
      .then((data) => setBranding(data))
      .catch(() => setBranding(null)); // If error, reset branding
  }, [customerNumber]);

  // ✅ Only take first 3 letters of the branding logo
  const brandingText = branding?.logo
    ? branding.logo.substring(0, 3).toUpperCase()
    : "STD";

  return (
    <div
      className="fixed top-0 right-0 p-4 text-xl font-bold italic"
      style={{
        color: branding?.textColor || "#000",
        backgroundColor: branding?.backgroundColor || "transparent",
      }}
    >
      {brandingText}
    </div>
  );
};

export default Branding;
