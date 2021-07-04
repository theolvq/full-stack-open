import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../actions/blogActions';
import { setNotification } from '../actions/notificationActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const BlogForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    dispatch(
      createBlog({
        title,
        author,
        url,
        likes: 0,
        user,
      })
    );
    dispatch(
      setNotification(`You added ${title} by ${author} to the bloglist`)
    );

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';
  };

  return (
    <form onSubmit={addBlog}>
      <Typography variant="h4">Create New Blog</Typography>

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <TextField type="text" name="title" id="title" label="title" />
        <TextField type="text" name="author" id="author" label="author" />
        <TextField type="text" name="url" id="url" label="url" />
        <Button id="submit-btn" type="submit" variant="outlined">
          Add
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
