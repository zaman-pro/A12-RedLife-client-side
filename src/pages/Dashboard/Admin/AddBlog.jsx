import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import { imageUpload } from "../../../api/utils";
import StatusFilter from "../../../components/Dashboard/StatusFilter";
import BlogGrid from "../../../components/Dashboard/Admin/BlogGrid";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Add Blog</h1>

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

export default AddBlog;
