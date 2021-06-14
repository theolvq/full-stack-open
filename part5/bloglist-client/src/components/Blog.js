const Blog = ({ blog }) => {
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  );
};

export default Blog;
