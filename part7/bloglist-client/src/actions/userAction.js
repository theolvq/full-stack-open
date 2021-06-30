import blogService from '../services/blogs';
import loginService from '../services/login';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SETUSER = 'SETUSER';
export const UNSETUSER = 'UNSETUSER';

export const login = (userObject) => async (dispatch) => {
  const user = await loginService.login(userObject);
  window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
  blogService.setToken(user.token);
  dispatch({
    type: LOGIN,
    data: user,
  });
};

export const logout = () => ({
  type: LOGOUT,
  data: null,
});

export const setUser = (userObject) => ({
  type: SETUSER,
  data: userObject,
});

export const unsetUser = () => ({
  type: UNSETUSER,
  data: null,
});
