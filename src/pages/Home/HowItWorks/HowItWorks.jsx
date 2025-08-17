import React from "react";
import { Link } from "react-router";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const HowItWorksData = [
  {
    id: 1,
    title: "Fill the Form",
    description:
      "Sign up in less than 2 minutes. Tell us your blood type, contact info, and availability.",
  },
  {
    id: 2,
    title: "Get Verified",
    description:
      "Our team or partner clinics may contact you to confirm your eligibility and health status.",
  },
  {
    id: 3,
    title: "Get Matched",
    description:
      "When someone nearby urgently needs your blood type, well send you a request with location and timing.",
  },
  {
    id: 4,
    title: "Donate & Save Lives",
    description:
      "Visit the nearest partner clinic or blood camp, donate safely, and become someone's real-life hero.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <SectionHeader
        title="How It Works?"
        subtitle=" Your blood can save a life. Here's how the process works."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Just <span className="text-secondary">4 Simple Steps</span> to
            <br />
            Help Save a Life
          </h2>
          <p className="text-sm max-w-md">
            We've made it incredibly easy for you to become a blood donor. No
            paperwork, no confusion, just a quick process that makes a real
            difference.
          </p>

          <div>
            <Link
              to="/auth?mode=register"
              className="btn btn-secondary btn-outline text-lg sm:mr-4 mb-4 sm:mb-0"
            >
              Join As a Donor
            </Link>
          </div>

          <small className="text-xs font-medium max-w-sm">
            <span className="text-secondary font-semibold">Bonus:</span> You'll
            get a donation badge and thank-you message every time you donate
            blood.
          </small>
        </div>
        <div className="flex justify-center flex-col gap-3">
          {HowItWorksData.map((step, idx) => (
            <div key={idx}>
              <div className="px-4 py-2 border border-secondary/20 rounded-lg">
                <h3 className="text-xl font-semibold">
                  {step.id}. {step.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
