import React from "react";
import BlogCard from "./BlogCard";

const BlogGrid = ({ blogs, role, onStatusChange, onDelete }) => {
  if (!blogs?.length) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg">No blogs found.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          role={role}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
