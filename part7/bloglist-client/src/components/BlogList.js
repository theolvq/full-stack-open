import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

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
            <li className="blog-item" key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
