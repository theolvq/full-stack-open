import React from 'react';
import { deleteBlog, likeBlog } from '../actions/blogActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const like = (blog) => {
    const { id } = blog;
    dispatch(likeBlog(id, blog));
  };

  const deleteIt = (blog) => {
    const { id } = blog;
    dispatch(deleteBlog(id));
    history.push('/');
  };

  return (
    <div>
      {blog && (
        <>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} {blog.likes > 1 ? 'likes' : 'like'}
            <button className="like-btn" onClick={() => like(blog)}>
              like
            </button>
            <button className="delete" onClick={() => deleteIt(blog)}>
              remove
            </button>
          </p>
          <p>added by{blog.user.name}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
