import React from "react";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import ContactUs from "./ContactUs/ContactUs";
import HowItWorks from "./HowItWorks/HowItWorks";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HowItWorks />
      <Reviews />
      <ContactUs />
    </div>
  );
};

export default Home;
