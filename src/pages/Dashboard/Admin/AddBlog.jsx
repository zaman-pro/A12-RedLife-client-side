import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import { imageUpload } from "../../../api/utils";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("");

  const axiosPublic = useAxiosPublic();
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

  const createBlogMutation = useMutation({
    mutationFn: async (blogData) => {
      const res = await axiosSecure.post(`/blogs`, blogData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog created successfully!");
      refetch();
      setTitle("");
      setThumbnail(null);
      setContent("");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Blog creation failed.");
    },
  });

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await imageUpload(file);
      setThumbnail(url);
      toast.success("Thumbnail uploaded!");
    } catch {
      toast.error("Failed to upload thumbnail.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) {
      return toast.error("Please fill in all fields.");
    }
    createBlogMutation.mutate({ title, thumbnail, content });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
      toast.success(`Status changed to ${newStatus}`);
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
      toast.success("Blog deleted.");
      refetch();
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Add Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          className="file-input file-input-bordered w-full"
        />

        <JoditEditor value={content} onChange={setContent} />

        <button type="submit" className="btn bg-secondary text-white">
          Submit Blog
        </button>
      </form>

      <div className="divider my-12 before:bg-secondary after:bg-secondary">
        All Blogs
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
                    className="w-full h-40 object-cover mb-4"
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

export default AddBlog;
