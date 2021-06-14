const LoginForm = ({ handleChange, handleLogin, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleChange}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
