import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';

const CommentList = () => {
  const comments = useSelector((state) => state.comments);
  if (comments.length > 0) {
    return (
      <div>
        <Typography variant="h5">List of comments</Typography>
        {comments.map((comment) => (
          <List key={comment.id}>{comment.content}</List>
        ))}
      </div>
    );
  }
  return null;
};

export default CommentList;
