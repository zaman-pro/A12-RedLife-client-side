import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="relative flex flex-col items-center text-center bg-base-100 border border-secondary/20 rounded-lg p-6">
      <div className="text-3xl mb-4 text-secondary">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Truncated description */}
      <p className="mt-2 line-clamp-2 relative z-10">{description}</p>
    </div>
  );
};

export default FeatureCard;
