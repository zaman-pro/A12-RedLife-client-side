import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const { user, register, googleLogin, passwordRegex, updateUser, setUser } =
    useAuth();

  const [ShowPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`${location.state ? location.state : "/"}`);
    }
  }, [user, navigate, location.state]);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const photo = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!passwordRegex.test(password)) {
      toast.dismiss();
      return toast.error("6+ letters with upper, lower & special characters", {
        id: "password-error",
      });
    }

    // Show loading toast
    const toastId = "registerToast";
    toast.dismiss();
    toast.loading("Creating account", { id: toastId });

    register(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });

            toast.success("Account created successfully", {
              id: toastId,
            });
          })
          .catch((err) => {
            console.log(err);
            setUser(user);

            toast.error("Profile update failed. Please try again.", {
              id: toastId,
            });
          });
      })
      .catch((err) => {
        console.log(err);

        toast.error("Unable to create account", {
          id: toastId,
        });
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
    <form onSubmit={handleRegister} className="card-body p-0">
      <fieldset className="fieldset text-sm">
        <label className="label font-semibold">Photo URL</label>
        <input
          name="photo"
          type="text"
          className="input w-full focus:outline-none"
          placeholder="Enter your photo url"
          required
        />

        <label className="label font-semibold">Name</label>
        <input
          name="name"
          type="text"
          className="input w-full focus:outline-none"
          placeholder="Enter your name"
          required
        />

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

        <button
          type="submit"
          className="btn mt-4 bg-secondary/90 text-white hover:bg-accent"
        >
          Register
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
        Already have an account?{" "}
        <Link
          className="link link-hover text-primary"
          state={location.state}
          to="/auth?mode=login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
