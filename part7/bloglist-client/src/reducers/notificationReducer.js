import { SET, UNSET } from '../actions/notificationActions';

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case SET:
      return action.data;
    case UNSET:
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
