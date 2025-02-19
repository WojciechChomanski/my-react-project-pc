import React, { useEffect, useState } from "react";
interface BrandingData {
  logo: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}

const Branding: React.FC = () => {
  const [branding, setBranding] = useState<BrandingData | null>(null);
  const customerNumber = localStorage.getItem("customerNumber"); // Get customer number from storage

  useEffect(() => {
    if (!customerNumber) return;

    fetch(`http://localhost:5000/api/customer/${customerNumber}`)
      .then((res) => res.json())
      .then((data) => setBranding(data))
      .catch(() => setBranding(null)); // If error, set branding to null
  }, [customerNumber]);

  return (
    <div
      className="fixed top-0 right-0 p-4 text-xl font-bold italic"
      style={{
        color: branding?.textColor || "#000",
        backgroundColor: branding?.backgroundColor || "transparent",
      }}
    >
      {branding ? branding.logo : "Standart"}
    </div>
  );
};

export default Branding;
