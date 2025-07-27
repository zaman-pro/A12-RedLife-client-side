import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import toast from "react-hot-toast";

import Loading from "../../../components/Shared/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import StatusFilter from "../../../components/Dashboard/StatusFilter";

const AllUsers = () => {
  const [filter, setFilter] = useState("");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  useEffect(() => {
    axiosPublic
      .get(`/all-users-count`, { params: { status: filter } })
      .then(({ data }) => {
        setItemCount(data?.count);
      });
  }, [axiosPublic, filter]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic(`/all-users`, {
        params: {
          status: filter,
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        },
      });
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/user/${id}/status`, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user status.");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/user/${id}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role.");
    }
  };

  const numberOfPages = Math.ceil(itemCount / itemPerPage);

  if (users.length === 0) return <Loading />;

  return (
    <section>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <StatusFilter value={filter} onChange={setFilter} isUser={true} />

          <PaginationControls
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
            currentPage={currentPage}
            totalPages={numberOfPages}
            onPageChange={(page) => {
              if (page >= 1 && page <= numberOfPages) {
                setCurrentPage(page);
              }
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Avatar</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full ring-2 ring-blood "
                    />
                  </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="capitalize border px-4 py-2">{user.role}</td>
                  <td className="capitalize border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn btn-sm btn-ghost">
                        <FaEllipsisV />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        {user.status === "active" && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange(user._id, "blocked")
                              }
                            >
                              Block
                            </button>
                          </li>
                        )}
                        {user.status === "blocked" && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange(user._id, "active")
                              }
                            >
                              Unblock
                            </button>
                          </li>
                        )}
                        {user.role !== "volunteer" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "volunteer")
                              }
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "admin")
                              }
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                        {user.role !== "donor" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "donor")
                              }
                            >
                              Make Donor
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center flex justify-center gap-2 pt-8"></div>
    </section>
  );
};

export default AllUsers;
