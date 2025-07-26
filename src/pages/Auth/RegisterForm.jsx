import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { imageUpload, saveUserInDb } from "../../api/utils";
import SocialLoginButtons from "./SocialLoginButtons";
import { handleGoogleLogin } from "../../utils/handleGoogleLogin";
import PasswordToggle from "./PasswordToggle";

const RegisterForm = () => {
  const {
    register: registerUser,
    googleLogin,
    passwordRegex,
    updateUser,
    setUser,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const location = useLocation();
  const DEFAULT_AVATAR = "https://i.ibb.co/Q3bDs8Rx/test-avatar-2.png";
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [profilePic, setProfilePic] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  // Load districts and upazilas
  useEffect(() => {
    const loadGeoData = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          axios("/districts.json"),
          axios("/upazilas.json"),
        ]);
        setDistricts(districtRes.data);
        setUpazilas(upazilaRes.data);
      } catch (error) {
        toast.error("Failed to load location data");
        console.error("Geo data load error:", error);
      }
    };
    loadGeoData();
  }, []);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (!selectedDistrict) {
      setFilteredUpazilas([]);
      setValue("upazila", "");
      return;
    }

    const related = upazilas.filter(
      (u) => u.district_id === selectedDistrict.toString()
    );
    setFilteredUpazilas(related);

    if (!related.find((u) => u.id === selectedUpazila)) {
      setValue("upazila", "");
    }
  }, [selectedDistrict, selectedUpazila, upazilas, setValue]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await imageUpload(file);
      if (!url) throw new Error("Invalid image response");

      setProfilePic(url);
      setAvatarPreview(url);

      toast.success("Avatar uploaded");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
      setAvatarPreview(DEFAULT_AVATAR);
    }
  };

  const onSubmit = async (data) => {
    if (!profilePic) {
      return toast.error("Please upload a profile image.", {
        id: "imageError",
      });
    }

    if (!passwordRegex.test(data.password)) {
      return toast.error("6+ letters with upper, lower & special characters", {
        id: "password-error",
      });
    }

    try {
      await toast.promise(
        async () => {
          const res = await registerUser(data.email, data.password);
          const createdUser = res.user;

          await updateUser({ displayName: data.name, photoURL: profilePic });
          setUser({
            ...createdUser,
            displayName: data.name,
            photoURL: profilePic,
          });

          const userData = {
            name: data.name,
            email: data.email,
            photo: profilePic,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
          };
          await saveUserInDb(userData);
        },
        {
          loading: "Creating account...",
          success: "Account created successfully!",
          error: "Something went wrong. Please try again.",
        }
      );
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.message || "Registration failed.");
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
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        {/* Name */}
        <label className="label font-semibold">Name</label>
        <input
          type="text"
          className="input w-full focus:outline-none"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        {/* Photo */}
        <label className="label font-semibold">Photo</label>
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            onChange={(e) => {
              handleAvatarUpload(e);
              setValue("photo", e.target.files[0]);
            }}
            className="file-input w-full focus:outline-none"
          />
          {errors.photo && (
            <p className="text-red-500 text-xs">{errors.photo.message}</p>
          )}
          <img
            src={avatarPreview}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Blood Group */}
        <label className="label font-semibold">Blood Group</label>
        <select
          className="select w-full focus:outline-none"
          {...register("bloodGroup", { required: "Blood group is required" })}
        >
          <option value="">Select Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {errors.bloodGroup && (
          <p className="text-red-500 text-xs">{errors.bloodGroup.message}</p>
        )}

        {/* District */}
        <label className="label font-semibold">District</label>
        <select
          className="select w-full focus:outline-none"
          {...register("district", { required: "District is required" })}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="text-red-500 text-xs">{errors.district.message}</p>
        )}

        {/* Upazila */}
        <label className="label font-semibold">Upazila</label>
        <select
          className="select w-full focus:outline-none"
          {...register("upazila", { required: "Upazila is required" })}
          disabled={!selectedDistrict}
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {errors.upazila && (
          <p className="text-red-500 text-xs">{errors.upazila.message}</p>
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

        {/* Confirm Password */}
        <label className="label font-semibold">Confirm Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full focus:outline-none"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {/* password toggle */}
          <PasswordToggle
            show={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn mt-4 bg-secondary/90 text-white hover:bg-accent"
        >
          Register
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

      <p className="text-xs font-medium text-center text-secondary/90 mt-2">
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
