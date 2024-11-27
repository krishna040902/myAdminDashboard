import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from '../mock/api';
import UserForm from "./UserForm";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSaveUser = (user) => {
    if (user.id) {
      updateUser(user.id, user).then((updatedUser) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      });
    } else {
      createUser(user).then((newUser) => {
        setUsers((prev) => [...prev, newUser]);
      });
    }
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <button onClick={() => setEditingUser({})}>Add User</button>
      {editingUser && (
        <UserForm user={editingUser} onSave={handleSaveUser} onCancel={() => setEditingUser(null)} />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || "N/A"}</td>
              <td>{user.status || "Active"}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;

