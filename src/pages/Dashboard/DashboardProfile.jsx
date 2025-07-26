import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import axios from "axios";
import Loading from "../../components/Shared/Loading/Loading";

const DashboardProfile = () => {
  const { user, updateUser, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const DEFAULT_AVATAR = "https://i.ibb.co/Q3bDs8Rx/test-avatar-2.png";

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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

  // Load user profile after geo data
  useEffect(() => {
    if (!user?.email || upazilas.length === 0) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/user/${user.email}`);
        const userData = res.data;

        setAvatarPreview(userData.photo || DEFAULT_AVATAR);

        const relatedUpazilas = upazilas.filter(
          (u) => u.district_id === userData.district
        );
        setFilteredUpazilas(relatedUpazilas);

        reset({
          ...userData,
          upazila:
            relatedUpazilas.find((u) => u.id === userData.upazila)?.id || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
        console.error("User load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email, axiosSecure, upazilas, reset, setValue]);

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
    const { email, _id, ...payload } = data;

    try {
      // 1. Update in database
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
      navigate("/dashboard/profile");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-3xl p-6 bg-base-100 shadow-lg rounded-lg">
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
              value={user?.email || ""}
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
                {...register("phone")}
                readOnly={!isEditing}
                className="input input-bordered w-full focus:outline-none"
              />
            </div>
          </div>

          {/* District */}
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

            {/* Upazila */}
            <div className="w-full">
              <label className="label mb-2">Upazila</label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                disabled={!isEditing}
                className="select select-bordered w-full focus:outline-none"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardProfile;
