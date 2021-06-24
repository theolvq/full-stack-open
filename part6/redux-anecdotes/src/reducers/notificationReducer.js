const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE':
      return action.message;
    case 'DELETE':
      return action.message;
    default:
      return state;
  }
};

export const createNotification = message => {
  return {
    type: 'CREATE',
    message,
  };
};

export const deleteNotification = () => {
  return {
    type: 'DELETE',
    message: '',
  };
};

export default notificationReducer;
