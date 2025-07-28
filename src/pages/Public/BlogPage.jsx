import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Shared/Loading/Loading";

const BlogPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic("/blogs-published");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!blogs.length) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">No blogs available</h2>
        <p className="text-gray-600 mt-2">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Read our blog to uncover the life-saving impact of blood donation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCardPublic key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

// will extract to a component
const BlogCardPublic = ({ blog }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full hover:shadow-accent ">
    {blog.thumbnail && (
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
    )}
    <div className="p-6 flex flex-col flex-grow">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <div
        className="prose prose-sm  mb-4 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <Link
        to={`/blogs/${blog?._id}`}
        className="mt-auto btn btn-secondary w-fit"
      >
        Read More
      </Link>
    </div>
  </div>
);

export default BlogPage;
