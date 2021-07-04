import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import Typography from '@material-ui/core/Typography';

const Main = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  return (
    <div>
      <Typography variant="h1" style={{ display: 'inline-block' }}>
        Blog List App
      </Typography>
      {!user ? (
        <>
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable>
        </>
      ) : (
        <>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default Main;
