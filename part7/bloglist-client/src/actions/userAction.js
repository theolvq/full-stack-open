import blogService from '../services/blogs';
import loginService from '../services/login';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SETUSER = 'SETUSER';
export const UNSETUSER = 'UNSETUSER';

export const login = (userObject) => async (dispatch) => {
  const user = await loginService.login(userObject);
  console.log(user);
  if (user) {
    window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: LOGIN,
      data: user,
    });
  }
  return;
};

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedInBlogAppUser');
  blogService.setToken(null);
  dispatch({
    type: LOGOUT,
    data: null,
  });
};

export const setUser = (userObject) => ({
  type: SETUSER,
  data: userObject,
});

export const unsetUser = () => ({
  type: UNSETUSER,
  data: null,
});
