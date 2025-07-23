import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { user, login, googleLogin } = useAuth();

  const [ShowPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`${location.state ? location.state : "/"}`);
    }
  }, [user, navigate, location.state]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Show loading toast
    const toastId = "loginToast";
    toast.dismiss();
    toast.loading("Logging in", { id: toastId });

    login(email, password)
      .then(() => {
        toast.success("Logged in successfully", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed. Please try again.", { id: toastId });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google login failed");
      });
  };
  const handleGithubLogin = () => {};
  const handleFacebookLogin = () => {};
  return (
    <form onSubmit={handleLogin} className="card-body p-0">
      <fieldset className="fieldset text-sm">
        <label className="label font-semibold">Email</label>
        <input
          name="email"
          type="email"
          className="input w-full focus:outline-none"
          placeholder="Enter your email address"
          required
        />

        <label className="label font-semibold">Password</label>
        <div className="relative">
          <input
            name="password"
            type={ShowPassword ? "text" : "password"}
            className="input w-full focus:outline-none"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!ShowPassword)}
            className="hover:bg-accent/20 rounded-full p-1.5 text-base text-secondary absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ease-in-out"
          >
            {ShowPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Link
          to="/forgotPassword"
          state={location.state}
          className="link link-hover text-primary text-right text-xs my-1"
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          className="btn bg-secondary/90 text-white hover:bg-accent"
        >
          Login
        </button>

        <div className="divider text-xs text-primary/60 my-1">
          or continue with
        </div>

        <div className="flex justify-around gap-2">
          <button
            type="button"
            onClick={handleGithubLogin}
            className="btn bg-none border-[#e5e5e5] flex-1"
          >
            <FaGithub size={20} />
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-none border-[#e5e5e5] flex-1"
          >
            <FcGoogle size={20} />
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin}
            className="btn bg-none border-[#e5e5e5] flex-1"
          >
            <FaFacebook size={20} />
          </button>
        </div>
      </fieldset>
      <p className="text-xs font-medium text-center text-secondary/90">
        Don't have an account?{" "}
        <Link
          className="link link-hover text-primary"
          state={location.state}
          to="/auth?mode=register"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
