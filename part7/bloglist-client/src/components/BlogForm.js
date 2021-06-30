import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

const BlogForm = ({ createBlog, user }) => {
  // const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'url':
        setUrl(value);
        break;
      default:
        return;
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
      likes: 0,
      user,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <label>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
          id="title"
        />
      </label>
      <label>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
          id="author"
        />
      </label>
      <label>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleChange}
          id="url"
        />
      </label>
      <button id="submit-btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default BlogForm;
