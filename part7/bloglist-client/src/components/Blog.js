import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../actions/blogActions';

const Blog = ({ blog }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const buttonLabel = areDetailsVisible ? 'hide' : 'view';
  const showDetails = () => {
    setAreDetailsVisible(!areDetailsVisible);
  };

  const dispatch = useDispatch();

  const like = (blog) => {
    const { id } = blog;
    dispatch(likeBlog(id, blog));
  };

  const deleteIt = (blog) => {
    const { id } = blog;
    dispatch(deleteBlog(id));
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
            <button className="like-btn" onClick={() => like(blog)}>
              like
            </button>
          </li>
          <li>{blog.user.name}</li>
          <button className="delete" onClick={() => deleteIt(blog)}>
            remove
          </button>
        </ul>
      )}
    </li>
  );
};

export default Blog;
