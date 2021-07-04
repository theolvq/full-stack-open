import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div>
      {user && (
        <>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h5">Added blogs</Typography>
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id} component={Link} to={`/users/${blog.id}`}>
                {blog.title}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default User;
