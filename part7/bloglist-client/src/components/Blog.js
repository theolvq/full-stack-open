import React, { useEffect } from 'react';
import { deleteBlog, likeBlog } from '../actions/blogActions';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { initComments } from '../actions/commentActions';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initComments(blog.id));
  }, []);

  const like = (blog) => {
    const { id } = blog;
    dispatch(likeBlog(id, blog));
  };

  const deleteIt = (blog) => {
    const { id } = blog;
    dispatch(deleteBlog(id));
    history.push('/');
  };

  return (
    <div>
      {blog && (
        <Container>
          <Typography variant="h2">{blog.title}</Typography>
          <Link href={blog.url}>{blog.url}</Link>
          <Typography variant="body1">
            {blog.likes} {blog.likes > 1 ? 'likes' : 'like'}
            <Button className="like-btn" onClick={() => like(blog)}>
              like
            </Button>
            <Button className="delete" onClick={() => deleteIt(blog)}>
              remove
            </Button>
          </Typography>
          <Typography variant="body2">
            added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </Typography>
          <CommentForm blog={blog} />
          <CommentList />
        </Container>
      )}
    </div>
  );
};

export default Blog;
