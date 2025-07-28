import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useGeoData from "../../hooks/useGeoData";
import Loading from "../../components/Shared/Loading/Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas } = useGeoData();

  const [donationRequest, setDonationRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      donorName: user?.displayName || "",
      donorEmail: user?.email || "",
    },
  });

  // Fetch donation request
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axiosPublic.get(`/donation-request/${id}`);
        setDonationRequest(data);
      } catch (error) {
        console.error("Failed to fetch donation request details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, axiosPublic]);

  // Format district/upazila names
  const getLocation = (districtId, upazilaId) => {
    const districtName =
      districts?.find((d) => String(d.id) === String(districtId))?.name ||
      "Unknown District";
    const upazilaName =
      upazilas?.find((u) => String(u.id) === String(upazilaId))?.name ||
      "Unknown Upazila";
    return `${upazilaName}, ${districtName}`;
  };

  // Confirm donation
  const onSubmit = async () => {
    const confirm = await Swal.fire({
      title: "Confirm Donation",
      html: `Donor Name: <strong>${user?.displayName}</strong><br>Donor Email: <strong>${user?.email}</strong>`,
      showCancelButton: true,
      confirmButtonText: "Confirm Donation",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.put(`/donation-request/${id}`, {
          donationStatus: "inprogress",
          donorEmail: user.email,
          donorName: user.displayName,
        });
        Swal.fire("Success", "Donation request is now in progress!", "success");
        navigate("/dashboard");
      } catch (error) {
        Swal.fire("Error", "Failed to confirm donation.", "error");
        console.error("Error updating donation request:", error);
      }
    }
  };

  if (isLoading || !donationRequest) return <Loading />;

  const {
    requesterName,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    addressLine,
    bloodGroup,
    donationDate,
    donationTime,
    requestMessage,
    donationStatus,
  } = donationRequest;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <button
        className="btn btn-sm btn-outline flex items-center"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-4xl font-semibold text-center">
        Donation Request Details
      </h1>

      <div className="bg-gradient-to-r from-base-100 to-blue-50 p-6 rounded-lg shadow space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <strong>Requester Name:</strong> {requesterName}
          </p>
          <p>
            <strong>Recipient Name:</strong> {recipientName}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {getLocation(recipientDistrict, recipientUpazila)}
          </p>
          <p>
            <strong>Hospital:</strong> {hospitalName}
          </p>
          <p>
            <strong>Address:</strong> {addressLine}
          </p>
          <p>
            <strong>Blood Group:</strong> {bloodGroup}
          </p>
          <p>
            <strong>Donation Date:</strong>{" "}
            {new Date(donationDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Donation Time:</strong> {donationTime}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                donationStatus === "pending"
                  ? "badge-warning"
                  : donationStatus === "inprogress"
                  ? "badge-info"
                  : "badge-success"
              }`}
            >
              {donationStatus}
            </span>
          </p>
        </div>

        <div>
          <p>
            <strong>Message:</strong> {requestMessage}
          </p>
        </div>
      </div>

      {/* Donor Confirm Form */}
      {donationStatus === "pending" && user?.email && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gradient-to-r from-blue-50 to-base-100  p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-lg font-semibold">Confirm Donation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="label">Donor Name</label>
              <input
                {...register("donorName")}
                type="text"
                readOnly
                className="input focus:outline-none w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="label">Donor Email</label>
              <input
                {...register("donorEmail")}
                type="email"
                readOnly
                className="input focus:outline-none w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-secondary text-white mt-4"
          >
            {isSubmitting ? "Submitting" : "Donate Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DonationRequestDetails;
