import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Main = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to the app</h2>
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
