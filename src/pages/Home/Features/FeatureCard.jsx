import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="relative group card bg-base-200 shadow-xl hover:shadow-lg hover:shadow-accent px-6 py-8 flex flex-col items-center text-center transition-shadow duration-300">
      <div className="text-5xl mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Icon />
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>

      {/* Truncated description */}
      <p className="mt-2 line-clamp-2 relative z-10">{description}</p>
    </div>
  );
};

export default FeatureCard;
