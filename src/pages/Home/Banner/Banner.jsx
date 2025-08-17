import React from "react";
import { Link } from "react-router";
import banner from "../../../assets/banner.svg";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading/Loading";
import CountUp from "react-countup";

const Banner = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
        <div className="md:w-1/2 ">
          <h1 className="mb-5 text-6xl max-w-md font-bold">
            Donate Blood, <span className="text-secondary">Save Lives.</span>
          </h1>
          <p className="mb-6 md:mb-8 max-w-md">
            Changing lives is just a drop away. Join our safe and easy blood
            donation movement today.
          </p>
          <div className="">
            <Link
              to="/auth?mode=register"
              className={`btn btn-outline text-lg sm:mr-4 mb-4 sm:mb-0 ${
                user && "hidden"
              }`}
            >
              Join As a Donor
            </Link>
            <Link to="/search-donor" className="btn btn-outline text-lg">
              Search Donors
            </Link>
          </div>
        </div>

        {/* img */}
        <div className="md:w-1/2 flex justify-end">
          <img className="w-lg" src={banner} alt="" />
        </div>
      </div>

      {/* Statistics Banner */}
      <div className="bg-base-200 rounded">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-secondary mb-2">
                <CountUp
                  end={12460}
                  duration={2.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </h3>
              <p className="font-medium">Units Donated</p>
            </div>

            <div className="p-6">
              <h3 className="text-4xl font-bold text-secondary mb-2">
                <CountUp
                  end={35200}
                  duration={2.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </h3>
              <p className="font-medium">Lives Saved</p>
            </div>

            <div className="p-6">
              <h3 className="text-4xl font-bold text-secondary mb-2">
                <CountUp
                  end={7800}
                  duration={2.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </h3>
              <p className="font-medium">Registered Donors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
