import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGeoData from "../../hooks/useGeoData";
import useFilteredUpazilas from "../../hooks/useFilteredUpazilas";
import useStatus from "../../hooks/useStatus";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { status } = useStatus();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donationDate: new Date(),
    },
  });

  const selectedDistrict = watch("recipientDistrict");
  const selectedUpazila = watch("recipientUpazila");

  const { districts, upazilas } = useGeoData();
  const filteredUpazilas = useFilteredUpazilas({
    selectedDistrict,
    selectedUpazila,
    upazilas,
    setValue,
  });

  const onSubmit = async (data) => {
    // Remove stray "upazila" field
    delete data.upazila;

    const donationRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      ...data,
    };

    console.log(donationRequest);

    try {
      await toast.promise(
        axiosSecure.post("/create-donate-request", donationRequest),
        {
          loading: "Submitting request",
          success: "Donation request created successfully!",
          error: "Failed to submit. Please try again.",
        }
      );
    } catch (err) {
      console.error("Donation request error:", err);
    }
  };

  if (status === "blocked")
    return (
      <div className="text-center text-red-500 mt-12">
        Your account is blocked. You cannot create donation requests.
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-4xl p-6 bg-base-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Donation Request
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Recipient Name */}
          <div className="space-y-2">
            <label className="label">Recipient Name</label>
            <input
              type="text"
              {...register("recipientName", { required: "Required" })}
              className="input w-full"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-xs">
                {errors.recipientName.message}
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div className="space-y-2">
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Required" })}
              className="select select-bordered w-full"
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

          {/* District */}
          <div className="space-y-2">
            <label className="label">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: "Required" })}
              className="select select-bordered w-full"
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

          {/* Upazila */}
          <div className="space-y-2">
            <label className="label">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: "Required" })}
              className="select select-bordered w-full"
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

          {/* Hospital Name */}
          <div className="space-y-2">
            <label className="label">Hospital Name</label>
            <input
              type="text"
              {...register("hospitalName", { required: "Required" })}
              className="input w-full"
            />
            {errors.hospitalName && (
              <p className="text-red-500 text-xs">
                {errors.hospitalName.message}
              </p>
            )}
          </div>

          {/* Address Line */}
          <div className="space-y-2">
            <label className="label">Full Address Line</label>
            <input
              type="text"
              {...register("addressLine", { required: "Required" })}
              className="input w-full"
            />
            {errors.addressLine && (
              <p className="text-red-500 text-xs">
                {errors.addressLine.message}
              </p>
            )}
          </div>

          {/* Donation Date */}
          <div className="space-y-2">
            <label className="label">Donation Date</label>
            <div className="relative">
              <FaRegCalendarAlt className="absolute top-3 left-3 z-10" />
              <DatePicker
                selected={watch("donationDate")}
                onChange={(date) => setValue("donationDate", date)}
                minDate={new Date()}
                className="input pl-10 w-full"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Donation Time */}
          <div className="space-y-2">
            <label className="label">Donation Time (24h)</label>
            <div className="relative">
              <FaClock className="absolute top-3 left-3 text-gray-500" />
              <input
                type="time"
                {...register("donationTime", { required: "Required" })}
                className="input w-full pl-10"
              />
              {errors.donationTime && (
                <p className="text-red-500 text-xs">
                  {errors.donationTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Requester Info */}
          <div className="space-y-2">
            <label className="label">Requester Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="label">Requester Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input w-full"
            />
          </div>

          {/* Request Message */}
          <div className="space-y-2 lg:col-span-2">
            <label className="label">Request Message</label>
            <textarea
              {...register("requestMessage", { required: "Required" })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.requestMessage && (
              <p className="text-red-500 text-xs">
                {errors.requestMessage.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="btn bg-secondary text-white w-full"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
