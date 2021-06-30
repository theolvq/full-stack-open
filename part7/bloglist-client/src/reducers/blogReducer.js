import { CREATE, DELETE, INIT, LIKE } from '../actions/blogActions';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case LIKE: {
      const { id } = action.data;
      const blog = state.find((blog) => blog.id === id);
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    }
    case CREATE:
      return [...state, action.data];
    case DELETE: {
      const { id } = action.data;
      const blog = state.find((blog) => blog.id === id);
      const confirmation = window.confirm(
        `Are you sure you want to delete ${blog.title}`
      );
      if (confirmation) {
        return state.filter((blog) => blog.id !== id);
      } else {
        return state;
      }
    }
    case INIT:
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;
