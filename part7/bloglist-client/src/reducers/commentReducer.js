import { ADD_COMMENT, INIT_COMMENTS } from '../actions/commentActions';

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.data];
    case INIT_COMMENTS:
      return action.data;
    default:
      return state;
  }
};

export default commentReducer;
