import React from "react";
import benefit1 from "../../../assets/benefit1.svg";
import benefit2 from "../../../assets/benefit2.svg";
import { FaCheck } from "react-icons/fa";

const benefitData = [
  {
    title: "Health Boosts",
    items: [
      {
        heading: "Improves Heart Health",
        description:
          "Regular donations help reduce harmful iron levels and lower the risk of heart disease.",
      },
      {
        heading: "Stimulates Blood Cell Production",
        description:
          "Your body replenishes lost blood, promoting the growth of new, healthy cells.",
      },
      {
        heading: "Free Mini Health Check",
        description:
          "Each donation includes a check of your blood pressure, hemoglobin, and more all for free.",
      },
    ],
  },
  {
    title: "Emotional Uplift",
    items: [
      {
        heading: "Feel-Good Hormones",
        description:
          "Giving to others releases dopamine and oxytocin, improving your mood and reducing stress.",
      },
      {
        heading: "Sense of Purpose",
        description:
          "Knowing you saved a life gives you deep personal satisfaction - something no app notification can match.",
      },
    ],
  },
];

const BenefitItem = ({ heading, description }) => {
  return (
    <li className="flex items-start">
      <span className="mt-1 mr-3 text-red-500">
        <FaCheck />
      </span>
      <div>
        <span className="font-bold">{heading}:</span> {description}
      </div>
    </li>
  );
};

const BloodDonationBenefits = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Benefits of Donating Blood</h2>
        <p className="mt-4 text-lg">
          Every drop heals a life and you. Discover health benefits and the joy
          of giving.
        </p>
      </div>

      {/* Health Boosts Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <img
            className="w-full"
            src={benefit1}
            alt="Health benefits illustration"
          />
        </div>
        <div className="md:w-1/2">
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {benefitData[0].title}
            </h3>
            <ul className="space-y-4">
              {benefitData[0].items.map((item, idx) => (
                <BenefitItem
                  key={idx}
                  heading={item.heading}
                  description={item.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Emotional Uplift Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 order-1 md:order-2">
          <img
            className="w-full"
            src={benefit2}
            alt="Emotional benefits illustration"
          />
        </div>
        <div className="md:w-1/2 order-2 md:order-1">
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {benefitData[1].title}
            </h3>
            <ul className="space-y-4">
              {benefitData[1].items.map((item, idx) => (
                <BenefitItem
                  key={idx}
                  heading={item.heading}
                  description={item.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationBenefits;
