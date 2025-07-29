import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGeoData from "../../hooks/useGeoData";
import useFilteredUpazilas from "../../hooks/useFilteredUpazilas";
import useStatus from "../../hooks/useStatus";
import Loading from "../../components/Shared/Loading/Loading";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";

const DonationRequestForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { status } = useStatus();
  const { districts, upazilas } = useGeoData();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donationDate: new Date(),
    },
  });

  const selectedDistrict = watch("recipientDistrict");
  const selectedUpazila = watch("recipientUpazila");

  const filteredUpazilas = useFilteredUpazilas({
    selectedDistrict,
    selectedUpazila,
    upazilas,
    setValue,
  });

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const { data } = await axiosPublic.get(`/donation-request/${id}`);
          reset({ ...data, donationDate: new Date(data.donationDate) });
        } catch (err) {
          console.error("Error loading donation request:", err);
        }
      })();
    }
  }, [isEdit, id, axiosPublic, reset]);

  const onSubmit = async (formData) => {
    delete formData.upazila;
    const payload = {
      ...formData,
      requesterName: user.displayName,
      requesterEmail: user.email,
    };

    try {
      await toast.promise(
        isEdit
          ? axiosPublic.patch(`/donation-requests/${id}`, payload)
          : axiosSecure.post("/create-donate-request", payload),
        {
          loading: isEdit ? "Updating request..." : "Submitting request...",
          success: isEdit
            ? "Donation request updated successfully!"
            : "Donation request created successfully!",
          error: "Something went wrong. Please try again.",
        }
      );
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (!status) return <Loading />;
  if (status === "blocked") {
    return (
      <div className="text-center text-red-500 mt-12">
        Your account is blocked. You cannot {isEdit ? "edit" : "create"}{" "}
        donation requests.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full bg-base-100 shadow-lg rounded-lg p-6 space-y-6 max-w-7xl mx-auto">
        <button
          className="btn btn-sm btn-outline flex items-center"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
          {isEdit ? "Edit Donation Request" : "Create Donation Request"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Form Fields */}

          <div className="space-y-2">
            <label className="label">Recipient Name</label>
            <input
              type="text"
              {...register("recipientName", { required: "Required" })}
              className="input w-full focus:outline-none"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-xs">
                {errors.recipientName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Required" })}
              className="select select-bordered w-full focus:outline-none"
            >
              <option value="">Select Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-xs">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: "Required" })}
              className="select select-bordered w-full focus:outline-none"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.recipientDistrict && (
              <p className="text-red-500 text-xs">
                {errors.recipientDistrict.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: "Required" })}
              className="select select-bordered w-full focus:outline-none"
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            {errors.recipientUpazila && (
              <p className="text-red-500 text-xs">
                {errors.recipientUpazila.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Hospital Name</label>
            <input
              type="text"
              {...register("hospitalName", { required: "Required" })}
              className="input w-full focus:outline-none"
            />
            {errors.hospitalName && (
              <p className="text-red-500 text-xs">
                {errors.hospitalName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Full Address Line</label>
            <input
              type="text"
              {...register("addressLine", { required: "Required" })}
              className="input w-full focus:outline-none"
            />
            {errors.addressLine && (
              <p className="text-red-500 text-xs">
                {errors.addressLine.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Donation Date</label>
            <div className="relative">
              <FaRegCalendarAlt className="absolute top-3 left-3 z-10" />
              <DatePicker
                selected={watch("donationDate")}
                onChange={(date) => setValue("donationDate", date)}
                minDate={new Date()}
                className="input pl-10 w-full focus:outline-none"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Donation Time (24h)</label>
            <div className="relative">
              <FaClock className="absolute top-3 left-3 z-10" />
              <input
                type="time"
                {...register("donationTime", { required: "Required" })}
                className="input w-full focus:outline-none pl-10"
              />
              {errors.donationTime && (
                <p className="text-red-500 text-xs">
                  {errors.donationTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Requester Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input w-full focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="label">Requester Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input w-full focus:outline-none"
            />
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="label">Request Message</label>
            <textarea
              {...register("requestMessage", { required: "Required" })}
              className="textarea textarea-bordered w-full focus:outline-none"
            ></textarea>
            {errors.requestMessage && (
              <p className="text-red-500 text-xs">
                {errors.requestMessage.message}
              </p>
            )}
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="btn bg-secondary text-white w-full"
            >
              {isEdit ? "Update Request" : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationRequestForm;
