import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Loading from "../../../components/Shared/Loading/Loading";
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import UserRow from "./UserRow";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const { data: itemCount, isLoading: isCountLoading } = useQuery({
    queryKey: ["userCount", filter],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-users-count`, {
        params: { status: filter },
      });
      return data?.count || 0;
    },
  });

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic("/all-users", {
        params: {
          status: filter,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        },
      });
      return data;
    },
  });

  const numberOfPages = Math.ceil(itemCount / itemPerPage);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/user/${id}/status`, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      refetch();
    } catch {
      toast.error("Failed to update status.");
    }
  };

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
    <section className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">All Users</h1>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <StatusFilter value={filter} onChange={setFilter} isUser />
        <PaginationControls
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= numberOfPages) setCurrentPage(page);
          }}
        />
      </div>

      {/* Donation Table */}
      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h2 className="text-lg">
            No{" "}
            <span className="font-semibold capitalize">{filter || "any"}</span>{" "}
            users.
          </h2>
        </div>
      ) : (
        <>
          {/* users table */}
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
        </>
      )}
    </section>
  );
};

export default AllUser;
