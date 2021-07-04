import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';
import { logout, unsetUser } from '../actions/userAction';
import { useHistory, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
    dispatch(logout());
    dispatch(unsetUser());
    dispatch(setNotification(`${user.username} just logged out`));
  };
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button component={Link} to="/">
            Blogs
          </Button>
          <Button component={Link} to="/users">
            Users
          </Button>
        </div>
        {user && (
          <div style={{ display: 'flex', gap: '1em' }}>
            <Button to={`/users/${user.id}`} component={Link}>
              {user.name} is logged in
            </Button>
            <Button variant="contained" id="logout-btn" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
