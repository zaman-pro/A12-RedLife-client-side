// components/Features/Features.jsx
import React from "react";
import FeatureCard from "./FeatureCard";
import { featureData } from "./featureData";

const Features = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Why Donate with Us?</h2>
        <p className="mt-4 text-lg mx-auto">
          Save lives. Build community. Make an impact with every donation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureData.map((item, idx) => (
          <FeatureCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Features;
