import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Shared/Loading/Loading";
import { FaArrowLeft } from "react-icons/fa";

function BlogDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosPublic(`/blogs/${id}`);
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Blog post not found</h2>
        <button
          className="btn btn-sm btn-outline flex items-center border"
          onClick={() => navigate("/blog")}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <button
        className="btn btn-sm btn-outline flex items-center border"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-96 object-cover object-center"
            loading="lazy"
          />
        )}

        <div className="p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {blog.title}
            </h1>
            {blog.createdAt && (
              <p className="text-gray-500 mt-2">
                Published on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            )}
          </header>

          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
}

export default BlogDetails;
