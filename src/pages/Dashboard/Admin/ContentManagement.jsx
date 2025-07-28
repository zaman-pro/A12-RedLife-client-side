import { Link } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import BlogGrid from "../../../components/Dashboard/Admin/BlogGrid";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContentManagement = () => {
  const [filter, setFilter] = useState("");
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blogs`, {
        params: { status: filter },
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
      console.log(id);
      toast.success("Blog deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

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
          <StatusFilter
            filter={filter}
            onChange={setFilter}
            filterType="blog"
          />

          <BlogGrid
            blogs={blogs}
            role={role}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteBlog}
          />
        </>
      )}
    </div>
  );
};

export default ContentManagement;
