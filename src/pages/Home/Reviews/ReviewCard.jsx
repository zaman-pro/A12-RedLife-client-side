import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  // Create an array with length equal to rating for star display
  const stars = Array.from({ length: 5 }, (_, i) => i < review?.rating);

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <FaQuoteLeft className="text-secondary text-2xl mb-3" />
      <p className="mb-4 italic">"{review?.quote}"</p>
      <div className="flex mb-3">
        {stars.map((filled, i) => (
          <FaStar
            key={i}
            className={filled ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      <div className="border-t pt-3 border-secondary/50">
        <p className="font-semibold">{review?.name}</p>
        <p className="text-sm text-gray-400">
          {review?.role} • {review?.date}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
