import blogService from '../services/blogs';

export const ADD_COMMENT = 'ADD_COMMENT';
export const INIT_COMMENTS = 'INIT_COMMENTS';

export const addComment = (blogId, comment) => async (dispatch) => {
  const data = await blogService.comment(blogId, comment);
  dispatch({
    type: ADD_COMMENT,
    data,
  });
};

export const initComments = (blogId) => async (dispatch) => {
  const data = await blogService.getAllComments(blogId);
  dispatch({
    type: INIT_COMMENTS,
    data,
  });
};
