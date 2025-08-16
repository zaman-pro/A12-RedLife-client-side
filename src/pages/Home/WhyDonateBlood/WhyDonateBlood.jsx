import React from "react";
import BenefitItem from "./BenefitItem";

const WhyDonateBlood = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Why Donate Blood?</h2>
        <p className="mt-4 text-lg">
          Discover how your simple act of kindness creates hope and healing in
          your community.
        </p>
      </div>

      <div className="flex justify-between gap-8 flex-col md:flex-row">
        {/* Left Column - The Need */}
        <div className="">
          <h3 className="text-2xl font-semibold mb-6">The Critical Need</h3>
          <ul className="space-y-4">
            <BenefitItem text="1 donation can save up to 3 lives" />
            <BenefitItem text="Blood cannot be manufactured" />
            <BenefitItem text="Every 2 seconds someone needs blood" />
            <BenefitItem text="Only 3% of eligible people donate annually" />
          </ul>
        </div>

        {/* Divider */}
        <div className="divider divider-horizontal divider-secondary"></div>

        {/* Right Column - Health Benefits */}
        <div className="">
          <h3 className="text-2xl font-semibold mb-6">Benefits For You</h3>
          <ul className="space-y-4">
            <BenefitItem text="Free health screening with each donation" />
            <BenefitItem text="Reduces risk of heart disease and cancer" />
            <BenefitItem text="Burns calories (about 650 per donation)" />
            <BenefitItem text="Gives you a sense of pride and purpose" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyDonateBlood;
