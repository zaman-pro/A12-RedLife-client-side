import { Link } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import StatusFilter from "../../../components/Dashboard/StatusFilter";

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
      toast.success("Blog deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="p-4 space-y-8">
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

          {blogs.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No blogs found in{" "}
              <span className="font-semibold capitalize">
                {filter || "any"}
              </span>{" "}
              status.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="card shadow p-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p className="text-sm my-2">
                    {blog.content.slice(0, 100)}...
                  </p>

                  <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
                    <span className="badge badge-info capitalize">
                      {blog.status}
                    </span>

                    <div className="flex gap-2 flex-wrap">
                      {blog.status === "draft" && role === "admin" && (
                        <button
                          onClick={() =>
                            handleStatusChange(blog._id, "published")
                          }
                          className="btn btn-sm bg-green-600 text-white"
                        >
                          Publish
                        </button>
                      )}

                      {blog.status === "published" && (
                        <button
                          onClick={() => handleStatusChange(blog._id, "draft")}
                          className="btn btn-sm btn-warning text-white"
                        >
                          Unpublish
                        </button>
                      )}

                      {role === "admin" && (
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContentManagement;
