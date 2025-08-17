import React from "react";
import { Link } from "react-router";
import error404 from "../../assets/error404.svg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
        <img
          src={error404}
          alt="404 Error - Page Not Found"
          className="w-full h-auto"
        />
      </div>

      <Link to="/" className="btn btn-outline btn-secondary mt-8">
        Back to RedLife
      </Link>
    </div>
  );
};

export default ErrorPage;
