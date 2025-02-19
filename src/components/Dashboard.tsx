import React from "react";

interface DashboardProps {
  customerNumber: string;
  onLogout: () => void;
  onEnterGenerator: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  customerNumber,
  onLogout,
  onEnterGenerator,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
        <p className="text-gray-700 text-lg">
          Customer Number: <strong>{customerNumber}</strong>
        </p>

        {/* Button to Enter Generator */}
        <button
          onClick={onEnterGenerator}
          className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition"
        >
          Go to Generator
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
