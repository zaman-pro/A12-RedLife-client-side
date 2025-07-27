import React from "react";

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div
      className={
        "relative group card bg-gradient-to-r from-base-100 to-blue-50 shadow-md hover:shadow-lg hover:shadow-accent px-6 py-8 text-center transition-shadow duration-300 flex flex-col items-center "
      }
    >
      <div
        className={`text-5xl mb-4 text-${color} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-neutral">{title}</h3>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
