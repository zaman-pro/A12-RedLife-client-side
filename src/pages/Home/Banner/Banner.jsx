import React from "react";
import { Link } from "react-router";
import banner from "../../../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="hero min-h-[70vh] bg-cover bg-center bg-no-repeat bg-gray-950/50 bg-blend-overlay rounded-xl mb-12 bg-[url(https://i.ibb.co/PsJ7WTSD/banner.jpg)]"
      //   style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">RedLife</h1>
          <p className="mb-8">
            Changing lives is just a drop away. Join our safe and easy blood
            donation movement today.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Link
              to="/auth?mode=register"
              className="btn btn-outline text-lg sm:mr-4 mb-4 sm:mb-0"
            >
              Join As a Donor
            </Link>
            <Link to="/search-donor" className="btn btn-outline text-lg">
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
