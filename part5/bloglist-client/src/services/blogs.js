import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };
  const res = axios.post(baseUrl, newBlog, config);
  return res.data;
};

const blogService = {
  getAll,
  create,
  setToken,
};

export default blogService;
