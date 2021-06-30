import blogService from '../services/blogs';

export const LIKE = 'LIKE';
export const CREATE = 'CREATE';
export const SHOWDETAILS = 'SHOWDETAILS';
export const INIT = 'INIT';
export const DELETE = 'DELETE';

export const likeBlog = (id, blog) => async (dispatch) => {
  const likedBlog = await blogService.update(id, blog);
  dispatch({
    type: LIKE,
    data: likedBlog,
  });
};

export const createBlog = (content) => async (dispatch) => {
  const newBlog = await blogService.create(content);
  dispatch({
    type: CREATE,
    data: newBlog,
  });
};

export const showDetails = () => ({ type: SHOWDETAILS });

export const initBloglist = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: INIT,
    data: blogs,
  });
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteOne(id);
  dispatch({
    type: DELETE,
    data: { id },
  });
};
