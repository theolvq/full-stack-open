import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNotification,
  unsetNotification,
} from '../actions/notificationActions';
import { logout, unsetUser } from '../actions/userAction';
import { useHistory } from 'react-router-dom';

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
      {user && (
        <>
          <h2>{user.name} is logged in</h2>
          <button id="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
