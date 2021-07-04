import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  const isError = message && message.toLowerCase().includes('error');
  if (message !== null) {
    return (
      <Snackbar autoHideDuration={5000} open={message}>
        <Alert
          className="notification"
          severity={isError ? 'error' : 'success'}
        >
          <AlertTitle>{isError ? 'Error' : 'Success'}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    );
  }
  return null;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
