import { useState } from 'react';

const Blog = ({ blog, addLike }) => {
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const buttonLabel = areDetailsVisible ? 'hide' : 'view';
  const handleClick = () => {
    setAreDetailsVisible(!areDetailsVisible);
  };

  const blogStyle = {
    padding: '10px 0 2px 5px',
    border: '1px solid black',
    marginBottom: 5,
  };

  return (
    <li style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleClick}>{buttonLabel}</button>
      {areDetailsVisible && (
        <ul>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={() => addLike(blog.id)}>like</button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </li>
  );
};

export default Blog;
