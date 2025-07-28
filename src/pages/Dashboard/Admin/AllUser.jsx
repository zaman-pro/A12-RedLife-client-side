import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Shared/Loading/Loading";
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import UserRow from "../../../components/Dashboard/Admin/UserRow";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  // Count query
  const { data: itemCount = 0, isLoading: isCountLoading } = useQuery({
    queryKey: ["userCount", filter],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-users-count`, {
        params: { status: filter },
      });
      return data?.count || 0;
    },
  });

  const totalPages = Math.ceil(itemCount / itemPerPage);

  // Users data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-users", {
        params: {
          status: filter,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        },
      });
      return data;
    },
    keepPreviousData: true,
  });

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/user/${id}/status`, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      refetch();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // Handle role update
  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/user/${id}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch {
      toast.error("Failed to update role.");
    }
  };

  if (isLoading || isCountLoading) return <Loading />;

  return (
    <section className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">All Users</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <StatusFilter filter={filter} onChange={setFilter} filterType="user" />
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

      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h2>
            No{" "}
            <span className="font-semibold capitalize">{filter || "any"}</span>{" "}
            users found.
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full text-sm">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserRow
                  key={user._id}
                  index={index}
                  user={user}
                  onStatusChange={handleStatusChange}
                  onRoleChange={handleRoleChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AllUser;
