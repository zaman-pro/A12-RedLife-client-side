import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  //   routes mode check
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      navigate(`${location.state ? location.state : "/"}`);
    }
  }, [user, navigate, location.state]);

  return (
    <div className="md:min-h-screen flex justify-center md:items-center mb-12">
      <div className="relative rounded-lg w-full max-w-md shadow-md p-4 overflow-hidden min-h-[900px]">
        {/* tab toggle with sliding bg */}
        <div className="relative flex mb-6 bg-primary/20 rounded overflow-hidden">
          {/* sliding bg */}
          <div
            className={`absolute top-0 h-full w-1/2 bg-secondary transition-all duration-500 ${
              isLogin ? "left-0" : "left-1/2"
            }`}
          ></div>

          {/* toggle btns */}
          <Link
            className="flex-1 py-2 font-medium z-10 transition-colors duration-300 text-white text-center inline-block"
            state={location.state}
            to="/auth?mode=login"
          >
            Login
          </Link>

          <Link
            className="flex-1 py-2 font-medium z-10 transition-colors duration-300 text-white text-center inline-block"
            state={location.state}
            to="/auth?mode=register"
          >
            Register
          </Link>
        </div>

        {/* forms wrapper */}
        <div className="relative w-full h-full">
          {/* login form */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
              isLogin
                ? "translate-x-0 opacity-100 z-10"
                : "-translate-x-full opacity-0 z-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              Login to <span className="text-secondary">RedLife</span>
            </h2>
            <LoginForm />
          </div>

          {/* register form */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
              !isLogin
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              Welcome to <span className="text-secondary">RedLife</span>
            </h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
