import React from "react";
import { FaHeartbeat, FaUsers, FaHandsHelping } from "react-icons/fa";
import teamImage from "../../assets/team.svg";
import missionImage from "../../assets/mission.svg";
import impactImage from "../../assets/impact.svg";
import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <div className="mb-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-secondary mb-2">RedLife</h1>
        <p className="text-xl mx-auto">
          Connecting donors with those in need to create a lifeline for our
          community.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt="RedLife team"
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              Founded in 2015, RedLife began as a small initiative to address
              blood shortages in local hospitals. What started with just a
              handful of dedicated volunteers has now grown into a nationwide
              movement.
            </p>
            <p>
              Today, we've facilitated over 250,000 donations and saved
              countless lives. Our platform connects donors directly with
              patients in need, making the process simple, transparent, and
              impactful.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mb-16 bg-secondary/10 rounded-lg p-8">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src={missionImage}
              alt="Blood donation process"
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="mb-6 text-lg">
              To create a sustainable blood donation ecosystem where no patient
              dies due to lack of blood.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <FaHeartbeat className="text-secondary text-2xl mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Life-Saving Impact</h3>
                  <p>
                    Every donation can save up to 3 lives through separation
                    into components.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUsers className="text-secondary text-2xl mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Community Focus</h3>
                  <p>
                    We prioritize local needs while maintaining national
                    standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaHandsHelping className="text-secondary text-2xl mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">
                    Donor-Centric Approach
                  </h3>
                  <p>
                    We make donation easy, rewarding, and impactful for our
                    donors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="mb-16">
        <SectionHeader
          title="Our Impact"
          subtitle="Numbers that tell our story of saving lives"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-secondary/5 p-8 rounded-lg">
            <h3 className="text-5xl font-bold text-secondary mb-2">250K+</h3>
            <p className="text-lg font-medium">Donations Collected</p>
          </div>
          <div className="bg-secondary/5 p-8 rounded-lg">
            <h3 className="text-5xl font-bold text-secondary mb-2">750K+</h3>
            <p className="text-lg font-medium">Lives Impacted</p>
          </div>
          <div className="bg-secondary/5 p-8 rounded-lg">
            <h3 className="text-5xl font-bold text-secondary mb-2">120+</h3>
            <p className="text-lg font-medium">Partner Hospitals</p>
          </div>
        </div>
      </section>

      {/* Team/Volunteers */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src={impactImage}
              alt="RedLife volunteers"
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Community</h2>
            <p className="mb-4 text-lg">
              RedLife is powered by thousands of regular donors, volunteers, and
              healthcare partners who share our vision of a world with safe,
              adequate blood for all.
            </p>
            <p className="text-lg">
              From students organizing campus drives to retired professionals
              managing donor centers, our community represents the best of
              humanity - people helping people.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-secondary/5 py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of lifesavers today. Your blood could give someone
          another chance at life.
        </p>
        <Link
          to="/auth?mode=register"
          className="btn btn-secondary btn-outline btn-lg"
        >
          Become a Donor
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
