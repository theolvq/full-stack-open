import { LOGIN, LOGOUT, SETUSER, UNSETUSER } from '../actions/userAction';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return action.data;
    case SETUSER:
      return action.data;
    case UNSETUSER:
      return action.data;
    default:
      return state;
  }
};

export default loginReducer;
