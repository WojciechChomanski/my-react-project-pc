import React, { useState } from "react";

interface LoginProps {
  onLogin: (customerNumber: string) => void; // ✅ Accepts a string
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (/^\d{6}$/.test(customerNumber)) {
      localStorage.setItem("customerNumber", customerNumber);
      onLogin(customerNumber); // ✅ Pass the number to MainApp
    } else {
      setError("Invalid customer number. Must be exactly 6 digits.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter 6-digit Customer Number"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2 text-center"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
