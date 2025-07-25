import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { saveUserInDb } from "../../api/utils";
import SocialLoginButtons from "./SocialLoginButtons";
import { handleGoogleLogin } from "../../utils/handleGoogleLogin";
import PasswordToggle from "./PasswordToggle";

const LoginForm = () => {
  const { login, googleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await toast.promise(
        async () => {
          const res = await login(email, password);
          const loggedInUser = res.user;

          const userData = {
            name: loggedInUser?.displayName,
            email: loggedInUser?.email,
            photo: loggedInUser?.photoURL,
          };

          await saveUserInDb(userData);
        },
        {
          loading: "Logging in",
          success: "Logged in successfully!",
          error: "Login failed. Please try again.",
        }
      );
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.message || "Unexpected login error.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">
      <fieldset className="fieldset text-sm">
        {/* Email */}
        <label className="label font-semibold">Email</label>
        <input
          type="email"
          className="input w-full focus:outline-none"
          placeholder="Enter your email address"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="label font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full focus:outline-none"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />

          {/* password toggle */}
          <PasswordToggle
            show={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        {/* Forgot Password */}
        <Link
          to="/forgotPassword"
          state={location.state}
          className="link link-hover text-primary text-right text-xs my-1"
        >
          Forgot password?
        </Link>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-secondary/90 text-white hover:bg-accent"
        >
          Login
        </button>

        {/* Divider */}
        <div className="divider text-xs text-primary/60 my-1">
          or continue with
        </div>

        {/* Social logins */}
        <SocialLoginButtons
          onGoogleLogin={() => handleGoogleLogin(googleLogin)}
        />
      </fieldset>

      {/* Register Redirect */}
      <p className="text-xs font-medium text-center text-secondary/90 mt-2">
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
