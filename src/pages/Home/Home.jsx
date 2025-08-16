import React from "react";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import ContactUs from "./ContactUs/ContactUs";
import HowItWorks from "./HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HowItWorks />
      <ContactUs />
    </div>
  );
};

export default Home;
