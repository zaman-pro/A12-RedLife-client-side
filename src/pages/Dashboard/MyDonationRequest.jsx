import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "../../components/Shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGeoData from "../../hooks/useGeoData";

const MyDonationRequest = () => {
  const [filter, setFilter] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  // Load districts and upazilas
  const { districts, upazilas } = useGeoData();

  useEffect(() => {
    axiosPublic
      .get(`/all-my-donation-count`, {
        params: { status: filter, email: user?.email },
      })
      .then(({ data }) => {
        setItemCount(data?.count);
      });
  }, [axiosPublic, filter, user]);

  const {
    data: donationRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donationRequests", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/my-all-donation-request/${user?.email}`,
        {
          params: {
            filter,
            skip: (currentPage - 1) * itemPerPage,
            limit: itemPerPage,
          },
        }
      );
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosPublic.put(`/donation-request/${id}`, {
        donationStatus: newStatus,
      });
      toast.success(`Status updated to ${newStatus}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update status.");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/donation-request/${id}`);
        toast.success("Donation request deleted.");
        refetch();
      } catch (err) {
        toast.error("Failed to delete donation request.");
        console.log(err);
      }
    }
  };

  const getLocation = (districtId, upazilaId) => {
    const district =
      districts.find((d) => d.id === districtId)?.name || "Unknown";
    const upazila = upazilas.find((u) => u.id === upazilaId)?.name || "Unknown";
    return `${district}, ${upazila}`;
  };

  const numberOfPage = Math.ceil(itemCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handelItemParPage = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handelPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handelNextPage = () => {
    if (currentPage < numberOfPage) setCurrentPage(currentPage + 1);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        My Donation Requests
      </h1>

      {/* Filter + Pagination controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="font-medium">
            Filter by Status:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered select-sm w-44"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <label className="font-medium">Items per page:</label>
          <select
            value={itemPerPage}
            onChange={handelItemParPage}
            className="select select-bordered select-sm w-20"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <button onClick={handelPrevPage} className="btn btn-sm">
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`btn btn-sm ${
                currentPage === page + 1 ? "btn-primary text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button onClick={handelNextPage} className="btn btn-sm">
            Next
          </button>
        </div>
      </div>

      {/* Table */}
      {donationRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h2 className="text-lg">
            You have no donation requests in{" "}
            <span className="font-semibold capitalize">{filter || "any"}</span>{" "}
            status.
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="table w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Donor</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map((request, index) => (
                <tr key={request._id}>
                  <td>{index + 1}</td>
                  <td>{request.recipientName}</td>
                  <td>
                    {getLocation(
                      request.recipientDistrict,
                      request.recipientUpazila
                    )}
                  </td>
                  <td>{request?.donorName || "Pending"}</td>
                  <td>{request?.donorEmail || "Pending"}</td>
                  <td>{new Date(request.donationDate).toLocaleDateString()}</td>
                  <td>{request.donationTime}</td>
                  <td>{request.bloodGroup}</td>
                  <td>
                    {request.donationStatus === "inprogress" ? (
                      <select
                        className="select select-bordered select-sm"
                        value={request.donationStatus}
                        onChange={(e) =>
                          handleStatusChange(request._id, e.target.value)
                        }
                      >
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    ) : (
                      <span className="capitalize">
                        {request.donationStatus}
                      </span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info text-white"
                      onClick={() =>
                        navigate(`/dashboard/donation-request/${request._id}`)
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-xs btn-warning text-white"
                      onClick={() =>
                        (window.location.href = `/dashboard/edit-donation-request/${request._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() => handleDelete(request._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;
