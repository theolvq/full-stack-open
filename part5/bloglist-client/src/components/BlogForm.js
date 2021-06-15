const BlogForm = ({ title, author, url, handleChange, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <label>
        title:
        <input type="text" value={title} name="title" onChange={handleChange} />
      </label>
      <label>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
        />
      </label>
      <label>
        url:
        <input type="text" value={url} name="url" onChange={handleChange} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default BlogForm;
