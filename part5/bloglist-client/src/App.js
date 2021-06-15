import { useEffect, useState, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const blogFormRef = useRef();

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

  const addBlog = async newBlog => {
    blogFormRef.current.toggleVisibility();
    try {
      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      setMessage(`${newBlog.title} was added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      setMessage(`${exception}`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const addLike = async id => {
    const blog = blogs.find(blog => blog.id === id);
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const res = await blogService.update(updatedBlog, id);
      setBlogs(blogs.map(blog => (blog.id === id ? res : blog)));
    } catch (exception) {
      setMessage(`${exception}`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const login = async userObject => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage('Thanks for logging in');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      setMessage(`${exception}`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleLogout = e => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    setUser(null);
    blogService.setToken(null);
    setMessage('You are now logged out');
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div>
      <h1>Blog List App</h1>
      {message && <Notification message={message} />}

      {!user ? (
        <>
          <h2>Log in to the app</h2>
          <Togglable buttonLabel="Log in">
            <LoginForm login={login} />
          </Togglable>
        </>
      ) : (
        <>
          <h2>{user.name} is logged in</h2>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
          <ul>
            {blogs.map(blog => (
              <Blog
                key={blog.id ? blog.id : blogs.length + 1}
                blog={blog}
                addLike={addLike}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
