import React from "react";
import { FaTrash, FaUpload, FaEyeSlash } from "react-icons/fa";

const BlogCard = ({ blog, role, onStatusChange, onDelete }) => {
  return (
    <div className="card shadow-lg bg-gradient-to-r from-secondary/5 to-accent/5 p-4 hover:shadow-lg hover:shadow-accent/50 transition-shadow duration-300">
      <figure className="mb-4">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-40 object-cover rounded"
        />
      </figure>
      <div className="card-body p-0">
        <h2 className="card-title text-lg font-bold">{blog.title}</h2>
        <p className="text-sm text-gray-600 my-2">
          {blog.content.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center flex-wrap gap-3 mt-4">
          <span className="badge badge-info capitalize">{blog.status}</span>
          <div className="flex gap-2 flex-wrap">
            {blog.status === "draft" && role === "admin" && (
              <button
                onClick={() => onStatusChange(blog._id, "published")}
                className="btn btn-sm bg-green-600 text-white"
              >
                <FaUpload className="mr-1" /> Publish
              </button>
            )}
            {blog.status === "published" && (
              <button
                onClick={() => onStatusChange(blog._id, "draft")}
                className="btn btn-sm btn-warning text-white"
              >
                <FaEyeSlash className="mr-1" /> Unpublish
              </button>
            )}
            {role === "admin" && (
              <button
                onClick={() => onDelete(blog._id)}
                className="btn btn-sm btn-error text-white"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
