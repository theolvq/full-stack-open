export const SET = 'SET';
export const UNSET = 'UNSET';

export const setNotification = (message) => ({
  type: SET,
  data: message,
});

export const unsetNotification = () => ({
  type: UNSET,
  data: null,
});
