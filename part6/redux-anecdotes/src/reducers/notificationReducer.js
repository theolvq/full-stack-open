const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data;
    case 'UNSET':
      return action.data;

    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET',
      data: message,
    });
    setTimeout(() => {
      dispatch({
        type: 'UNSET',
        data: '',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
