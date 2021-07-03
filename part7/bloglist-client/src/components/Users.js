import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr style={{ textAlign: 'left' }}>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
