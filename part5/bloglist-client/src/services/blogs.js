import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (blogObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, blogObject, config);
  return res.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.delete(`${baseUrl}/${id}`, config);
  return req.data;
};

const blogService = {
  getAll,
  create,
  update,
  deleteOne,
  setToken,
};

export default blogService;
