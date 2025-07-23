import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  return (
    <div>
      <h1>This is RedLife Home</h1>
      {toast.success("This is RedLife Home")}
    </div>
  );
};

export default Home;
