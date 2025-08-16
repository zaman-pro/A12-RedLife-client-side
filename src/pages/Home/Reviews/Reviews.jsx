import React from "react";
import ReviewCard from "./ReviewCard";

const reviewsData = [
  {
    quote:
      "I donated blood last month for the first time. A week later, I received a message that my blood helped save a newborn's life. I can't describe that feeling.",
    rating: 5,
    name: "Areeba Z.",
    role: "First-time Donor",
    date: "07 Jan, 2025",
  },
  {
    quote:
      "We were searching frantically for B-blood for my father. Your platform connected us to a donor within 2 hours. You saved his life.",
    rating: 3,
    name: "Farhan K.",
    role: "Recipient's Son",
    date: "08 Jan, 2025",
  },
  {
    quote:
      "It's not just blood. It's life, and I'm proud to be part of this community.",
    rating: 4,
    name: "Mubashir A.",
    role: "Regular Donor",
    date: "28 Dec, 2024",
  },
];

const Reviews = () => {
  return (
    <div className="bg-base-100 my-12 py-2">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Voices from Our Heroes</h2>
        <p className="mt-4 text-lg">
          Life saving stories from selfless donors and grateful recipients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
