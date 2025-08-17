import React from "react";

const StatCard = ({ icon: Icon, title, value, color }) => {
  // Define color classes mapping
  const colorClasses = {
    "blue-500": "text-blue-500",
    "green-500": "text-green-500",
    "red-500": "text-red-500",
    // Add more colors as needed
  };

  return (
    <div className="relative group card bg-gradient-to-r from-secondary/5 to-accent/5 shadow-md hover:shadow-lg hover:shadow-accent/50 px-6 py-8 text-center transition-shadow duration-300 flex flex-col items-center">
      <div
        className={`text-5xl mb-4 ${
          colorClasses[color] || "text-secondary"
        } transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
