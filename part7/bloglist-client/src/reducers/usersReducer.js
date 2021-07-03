import { GET } from '../actions/usersAction';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET:
      return action.data;
    default:
      return state;
  }
};

export default usersReducer;
