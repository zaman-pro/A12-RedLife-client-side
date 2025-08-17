import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGeoData from "../../hooks/useGeoData";
import StatusFilter from "../../components/Dashboard/StatusFilter";
import Loading from "../../components/Shared/Loading/Loading";
import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";

const BloodDonationRequests = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas } = useGeoData();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bloodDonationRequests", filter],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donation-requests", {
        params: {
          donationStatus: "pending",
          sort: filter,
        },
      });
      return data;
    },
    keepPreviousData: true,
  });

  const getDistrictName = (id) =>
    districts.find((d) => d.id === id)?.name || "Unknown District";

  const getUpazilaName = (id) =>
    upazilas.find((u) => u.id === id)?.name || "Unknown Upazila";

  const handleViewDetails = (id) => {
    navigate(`/donation-request/${id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <SectionHeader title="Blood Donation Requests" />

      {/* Sort Filter */}
      <StatusFilter
        filter={filter}
        onChange={setFilter}
        filterType="donationPublic"
      />

      {/* Requests Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-secondary">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  <Loading message="Loading requests..." />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-error">
                  Failed to load requests.
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No pending donation requests found.
                </td>
              </tr>
            ) : (
              requests.map((req, idx) => (
                <tr key={req._id} className="hover:bg-base-200 transition">
                  <td>{idx + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>
                    {getUpazilaName(req.recipientUpazila)},{" "}
                    {getDistrictName(req.recipientDistrict)}
                  </td>
                  <td>{req.bloodGroup}</td>
                  <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                  <td>{req.donationTime}</td>
                  <td>
                    <button
                      className="btn btn-sm bg-secondary text-white"
                      onClick={() => handleViewDetails(req._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodDonationRequests;
