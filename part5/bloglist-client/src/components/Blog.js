import React, { useState } from 'react';

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const buttonLabel = areDetailsVisible ? 'hide' : 'view';
  const showDetails = () => {
    setAreDetailsVisible(!areDetailsVisible);
  };

  const blogStyle = {
    padding: '10px 0 2px 5px',
    border: '1px solid black',
    marginBottom: 5,
  };

  return (
    <li className="blog-item" style={blogStyle}>
      {blog.title} {blog.author}
      <button className="details" onClick={showDetails}>
        {buttonLabel}
      </button>
      {areDetailsVisible && (
        <ul className="blog-details">
          <li>{blog.url}</li>
          <li className="like">
            {blog.likes}
            <button className="like-btn" onClick={() => addLike(blog.id)}>
              like
            </button>
          </li>
          <li>{blog.user.name}</li>
          <button className="delete" onClick={() => deleteBlog(blog.id)}>
            remove
          </button>
        </ul>
      )}
    </li>
  );
};

export default Blog;
