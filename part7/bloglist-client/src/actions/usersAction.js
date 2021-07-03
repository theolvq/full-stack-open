export const GET = 'GET';
import userService from '../services/users';

export const getThemAll = () => async (dispatch) => {
  const res = await userService.getAll();
  dispatch({
    type: GET,
    data: res,
  });
};
