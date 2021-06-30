import { useSelector } from 'react-redux';
import React from 'react';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );

  return (
    <div>
      <ul className="bloglist">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id ? blog.id : blogs.length + 1} blog={blog} />
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
