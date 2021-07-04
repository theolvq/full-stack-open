import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ textAlign: 'left' }}>
              <TableCell>User</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
