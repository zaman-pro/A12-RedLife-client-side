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
import PaginationControls from "../../../components/Dashboard/PaginationControls";
import Loading from "../../../components/Shared/Loading/Loading";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: count = 0 } = useQuery({
    queryKey: ["blogsCount", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-blogs-count", {
        params: { status: filter },
      });
      return data?.count || 0;
    },
  });

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

  const numberOfPages = Math.ceil(count / itemPerPage);

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

  if (isLoading) return <Loading />;

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

export default AddBlog;
