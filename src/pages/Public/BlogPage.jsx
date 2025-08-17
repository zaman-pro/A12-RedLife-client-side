import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Shared/Loading/Loading";
import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";

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
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Our Blog"
        subtitle="  Read our blog to uncover the life-saving impact of blood donation."
      />

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
  <div className="bg-base-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full hover:shadow-accent bg-gradient-to-r from-secondary/5 to-accent/5">
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
