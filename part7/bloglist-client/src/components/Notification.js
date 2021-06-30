import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  const confirm = {
    border: '3px solid hsla(110, 66%, 47%, 1)',
    background: 'hsla(100, 66%, 47%, 0.8)',
    borderRadius: '10px',
    color: '#d2fcd1',
  };
  const error = {
    border: '3px solid hsla(9, 87%, 47%, 1)',
    background: 'hsla(9, 87%, 47%, 0.8)',
    borderRadius: '10px',
    color: '#fcd1e2',
  };

  if (message !== null) {
    return (
      <div
        className="notification"
        style={message.toLowerCase().includes('error') ? error : confirm}
      >
        <p>{message}</p>
      </div>
    );
  }
  return null;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
