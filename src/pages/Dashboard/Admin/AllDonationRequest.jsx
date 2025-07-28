import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Shared/Loading/Loading";
import useGeoData from "../../../hooks/useGeoData";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import DonationTable from "../../../components/Dashboard/DonationTable";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";

const AllDonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas } = useGeoData();
  const { role } = useRole();
  const { user } = useAuth();
  const [filter, setFilter] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  // Calculate total pages
  const totalPages = Math.ceil(itemCount / itemPerPage);

  // Fetch count whenever filter changes
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data } = await axiosPublic.get(`/all-donation-count`, {
          params: { status: filter },
        });
        setItemCount(data?.count || 0);
      } catch (err) {
        console.error("Failed to fetch count", err);
      }
    };
    fetchCount();
  }, [axiosPublic, filter]);

  // Fetch donation data
  const {
    data: donationRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donationRequests", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-blood-donation-request`, {
        params: {
          filter,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        },
      });
      return data;
    },
    keepPreviousData: true,
  });

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axiosPublic.put(`/donation-request/${id}`, {
        donationStatus: newStatus,
      });

      if (data?.modifiedCount > 0) {
        toast.success(`Status updated to ${newStatus}`);
        refetch();
      }
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status.");
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    if (role !== "admin") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosPublic.delete(`/donation-request/${id}`);
      if (
        data?.deletedCount > 0 ||
        data?.success ||
        data?.message === "Deleted"
      ) {
        toast.success("Donation request deleted successfully.");
        refetch();
      }
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Failed to delete request.");
    }
  };

  // Location formatter
  const getLocation = (districtId, upazilaId) => {
    const districtName =
      districts?.find((d) => String(d.id) === String(districtId))?.name ||
      "Unknown District";
    const upazilaName =
      upazilas?.find((u) => String(u.id) === String(upazilaId))?.name ||
      "Unknown Upazila";
    return `${upazilaName}, ${districtName}`;
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">All Donation Requests</h1>

      {/* Filter + Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <StatusFilter
          filter={filter}
          onChange={setFilter}
          filterType="donation"
        />
        <PaginationControls
          itemPerPage={itemPerPage}
          setItemPerPage={(num) => {
            setItemPerPage(num);
            setCurrentPage(1);
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
        />
      </div>

      {/* Table */}
      {donationRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h2>
            No donation requests in{" "}
            <span className="font-semibold capitalize">{filter || "any"}</span>{" "}
            status.
          </h2>
        </div>
      ) : (
        <DonationTable
          data={donationRequests}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getLocation={getLocation}
          role={role}
          currentUserEmail={user?.email}
        />
      )}
    </div>
  );
};

export default AllDonationRequests;
