import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useGeoData from "../../hooks/useGeoData";
import useFilteredUpazilas from "../../hooks/useFilteredUpazilas";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Shared/Loading/Loading";

const DEFAULT_AVATAR = "https://i.ibb.co/Q3bDs8Rx/test-avatar-2.png";

const DashboardProfile = () => {
  const { user, setUser, updateUser } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { districts, upazilas } = useGeoData();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");

  const filteredUpazilas = useFilteredUpazilas({
    selectedDistrict,
    upazilas,
    setValue,
  });

  useEffect(() => {
    if (!user?.email) return;

    (async () => {
      try {
        const { data } = await axiosSecure.get(`/user/${user.email}`);
        reset(data);
        setAvatarPreview(data.photo || DEFAULT_AVATAR);
      } catch (error) {
        toast.error("Failed to load profile data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.email, axiosSecure, reset]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await imageUpload(file);
      setAvatarPreview(url);
      setValue("photo", url);
      toast.success("Avatar updated");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    const { email, _id, phone, ...payload } = data;

    if (phone && /^\d{11}$/.test(phone)) {
      payload.phone = phone;
    }

    try {
      // 1. Update database
      await axiosSecure.put(`/user/${user.email}`, payload);

      // 2. Update Firebase Auth profile
      await updateUser({ displayName: payload.name, photoURL: payload.photo });

      // 3. Update context
      setUser({
        ...user,
        displayName: payload.name,
        photoURL: payload.photo,
      });

      toast.success("Profile updated");
      setIsEditing(false);
      // navigate("/dashboard/profile");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (loading || !user) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-7xl p-6 bg-base-100 shadow-lg rounded-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={
              isEditing ? handleSubmit(onSubmit) : () => setIsEditing(true)
            }
            className={`btn flex items-center space-x-2 ${
              isEditing ? "bg-accent" : "bg-secondary"
            } text-white`}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            <span>{isEditing ? "Save" : "Edit"}</span>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-32 h-32 rounded-full ring-4 ring-secondary object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <div className="bg-accent text-white rounded-full p-1">
                  <FaEdit />
                </div>
              </label>
            )}
          </div>

          {/* Role below avatar */}
          <p
            className={`capitalize text-xl font-bold mt-3 ${
              role === "admin"
                ? "text-red-500"
                : role === "volunteer"
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {role}
          </p>
        </div>

        <form className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="label mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              readOnly={!isEditing}
              className="input input-bordered w-full focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full focus:outline-none"
            />
          </div>

          {/* Blood Group & Phone */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <label className="label mb-2">Blood Group</label>
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                disabled={!isEditing}
                className="select select-bordered w-full focus:outline-none"
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="label mb-2">Phone</label>
              <input
                type="text"
                {...register("phone", {
                  validate: (value) => {
                    if (!value) return true; // allow empty
                    return /^\d{11}$/.test(value) || "Phone must be 11 digits";
                  },
                })}
                disabled={!isEditing}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* District & Upazila */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <label className="label mb-2">District</label>
              <select
                {...register("district", { required: "District is required" })}
                disabled={!isEditing}
                className="select select-bordered w-full focus:outline-none"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="label mb-2">Upazila</label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                disabled={!isEditing || !selectedDistrict}
                className="select select-bordered w-full focus:outline-none"
              >
                {!selectedDistrict ? (
                  <option value="">Select a district first</option>
                ) : (
                  <option value="">Select Upazila</option>
                )}
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-xs">{errors.upazila.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardProfile;
