const initialMessage = 'Welcome!';

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'NOTIF':
      return [...state, action.message];
    default:
      return state;
  }
};

export const createNotification = message => {
  return {
    type: 'NOTIF',
    message,
  };
};

export default notificationReducer;
