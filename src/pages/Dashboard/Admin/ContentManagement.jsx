import { Link } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import BlogGrid from "../../../components/Dashboard/Admin/BlogGrid";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading/Loading";

const ContentManagement = () => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  // Fetch count
  const { data: count = 0 } = useQuery({
    queryKey: ["blogsCount", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-blogs-count", {
        params: { status: filter },
      });
      return data?.count || 0;
    },
  });

  // fetch blogs
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", filter, currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-blogs", {
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
      await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
      toast.success(`Blog status updated to ${newStatus}`);
      refetch();
    } catch {
      toast.error("Failed to update blog status.");
    }
  };

  const handleDeleteBlog = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/blog/${id}`);
      toast.success("Blog deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

  const numberOfPages = Math.ceil(count / itemPerPage);
  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Content Management</h1>
      <div className="flex justify-end">
        <Link to="add-blog" className="btn bg-secondary text-white text-lg">
          Add Blog
        </Link>
      </div>

      {(role === "admin" || role === "volunteer") && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <StatusFilter
              filter={filter}
              onChange={setFilter}
              filterType="blog"
            />
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

          {blogs.length > 0 ? (
            <BlogGrid
              blogs={blogs}
              role={role}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteBlog}
            />
          ) : (
            <div className="text-center py-10 text-gray-500">
              <h2 className="text-lg font-medium">
                No blogs found in
                <span className="font-semibold capitalize">
                  {" "}
                  {filter || "any"}
                </span>
                status.
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContentManagement;
