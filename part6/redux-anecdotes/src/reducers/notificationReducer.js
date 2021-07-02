let timeOutId;

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.text;
    case 'UNSET':
      return action.text;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async dispatch => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    dispatch({
      type: 'SET',
      text: message,
      time,
    });
    timeOutId = setTimeout(() => {
      dispatch({
        type: 'UNSET',
        text: '',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
