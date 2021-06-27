const notificationReducer = (state = null, action) => {
  const timeoutID = setTimeout(() => {
    return action.text;
  }, action.time * 1000);
  switch (action.type) {
    case 'SET' && state === action.text:
      clearTimeout(timeoutID);
      return action.text;
    case 'SET' && state !== action.text:
      return action.text;
    case 'UNSET':
      return null;
    case 'NEW':
      return state;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET',
      text: message,
      time,
    });
    dispatch({
      type: 'UNSET',
    });

    console.log(message);
  };
};

export default notificationReducer;
