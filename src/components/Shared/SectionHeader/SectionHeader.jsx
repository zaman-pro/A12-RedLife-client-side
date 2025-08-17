import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold text-secondary">{title}</h2>
      {subtitle && <p className="mt-2 text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
