import React from "react";
import FeatureCard from "./FeatureCard";
import { featureData } from "./featureData";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const Features = () => {
  // Split data into rows
  const splitIntoRows = (data, pattern = [3, 2]) => {
    const rows = [];
    for (let i = 0, p = 0; i < data.length; p++) {
      const count = pattern[p % pattern.length];
      rows.push(data.slice(i, i + count));
      i += count;
    }
    return rows;
  };

  const rows = splitIntoRows(featureData);

  return (
    <div className="bg-base-100 my-12 py-2">
      <SectionHeader
        title="Why Donate with Us?"
        subtitle="Save lives. Build community. Make an impact with every donation."
      />

      <div className="space-y-6">
        {rows.map((row, idx) => (
          <div key={idx} className="flex justify-center flex-wrap gap-6">
            {row.map((item, index) => (
              <div key={index} className="w-[340px]">
                <FeatureCard {...item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
