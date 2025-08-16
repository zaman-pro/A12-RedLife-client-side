import React from "react";
import BenefitItem from "./BenefitItem";

const benefitData = [
  {
    title: "The Critical Need",
    items: [
      "1 donation can save up to 3 lives",
      "Blood cannot be manufactured",
      "Every 2 seconds someone needs blood",
      "Only 3% of eligible people donate annually",
    ],
  },
  {
    title: "Benefits For You",
    items: [
      "Free health screening with each donation",
      "Reduces risk of heart disease and cancer",
      "Burns calories (about 650 per donation)",
      "Gives you a sense of pride and purpose",
    ],
  },
];

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
        {benefitData.map((section, index) => (
          <React.Fragment key={section.title}>
            <div className="">
              <h3 className="text-2xl font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item, idx) => (
                  <BenefitItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            {/* Add divider between sections except after last one */}
            {index < benefitData.length - 1 && (
              <div className="divider divider-horizontal divider-secondary hidden md:flex"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WhyDonateBlood;
