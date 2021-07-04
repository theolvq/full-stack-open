import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addComment } from '../actions/commentActions';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.comment.value);
    const comment = {
      content: e.target.comment.value,
    };
    dispatch(addComment(blog.id, comment));
    e.target.comment.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Add a comment</Typography>
      <TextField label="Comment" name="comment" />
      <Button variant="contained" color="secondary" type="submit">
        Add comment
      </Button>
    </form>
  );
};

export default Comments;
