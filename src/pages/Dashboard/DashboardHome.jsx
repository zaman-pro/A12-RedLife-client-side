import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Shared/Loading/Loading";
import DonationTable from "../../components/Dashboard/DonationTable";
import useGeoData from "../../hooks/useGeoData";
import useRole from "../../hooks/useRole";
import DashboardHomeAdmin from "./Admin/DashboardHomeAdmin";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { role } = useRole();

  // Load districts and upazilas
  const { districts, upazilas } = useGeoData();

  // Fetch donation requests
  const {
    data: donationRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["dashboardRecentDonationRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/donation-request`, {
        params: { email: user?.email, limit: 3 },
      });
      return data;
    },
    enabled: !!user?.email,
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
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update status.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
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
      console.error("Delete failed", err);
      toast.error("Failed to delete request.");
    }
  };

  // Format location
  const getLocation = (districtId, upazilaId) => {
    const districtName =
      districts?.find((d) => String(d.id) === String(districtId))?.name ||
      "Unknown District";
    const upazilaName =
      upazilas?.find((u) => String(u.id) === String(upazilaId))?.name ||
      "Unknown Upazila";

    return `${upazilaName}, ${districtName}`;
  };

  if (!role) return <Loading />;

  if (isLoading) return <Loading />;

  if (role === "admin" || role === "volunteer") return <DashboardHomeAdmin />;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-16 h-16 rounded-full ring-2 ring-secondary"
        />
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.displayName}!
        </h1>
      </div>

      {/* Donation Table */}
      {donationRequests.length > 0 ? (
        <DonationTable
          data={donationRequests}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getLocation={getLocation}
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
          <h2 className="text-lg">No donation requests yet.</h2>
        </div>
      )}

      {/* View All Button */}
      {donationRequests.length > 0 && (
        <div className="text-center">
          <Link
            to="my-donation-requests"
            className="btn bg-secondary text-white mt-4"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
