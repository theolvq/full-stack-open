import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNotification,
  unsetNotification,
} from '../actions/notificationActions';
import { logout, unsetUser } from '../actions/userAction';
import { useHistory, Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
    dispatch(logout());
    dispatch(unsetUser());
    dispatch(setNotification(`${user.username} just logged out`));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
  };
  return (
    <div>
      <nav>
        <Link to="/">blogs</Link>
        <Link to="/users">Users</Link>
        {user && (
          <>
            <span>{user.name} is logged in</span>
            <button id="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
