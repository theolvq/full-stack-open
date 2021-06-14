import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(initialList => setBlogs(initialList));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
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

  const addBlog = async e => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('error', exception);
    }
  };

  const handleLogout = e => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <h1>Blog List App</h1>
      {!user ? (
        <>
          <h2>Log in to the app</h2>
          <LoginForm
            handleChange={handleChange}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </>
      ) : (
        <>
          <h2>{user.name} is logged in</h2>
          <button onClick={handleLogout}>Log out</button>
          <BlogForm
            author={author}
            title={title}
            url={url}
            addBlog={addBlog}
            handleChange={handleChange}
          />
          <ul>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
