import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (exception) {
    console.log(exception);
  }
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
  } catch (exception) {
    console.log(exception);
  }
};

const update = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const res = await axios.put(`${baseUrl}/${id}`, blogObject, config);
    return res.data;
  } catch (exception) {
    console.log(exception);
  }
};

const deleteOne = async (id) => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  try {
    const req = await axios.delete(`${baseUrl}/${id}`);
    return req.data;
  } catch (exception) {
    console.log(exception);
  }
};

const blogService = {
  getAll,
  create,
  update,
  deleteOne,
  setToken,
};

export default blogService;
