import React, { useState, useEffect } from "react";
import RoleForm from "../components/RoleForm";
import { fetchPermissions, fetchRoles, createRole, updateRole } from "../mock/api"; // Mock API calls

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    // Fetch permissions and roles (mocked API calls)
    fetchPermissions().then(setPermissions);
    fetchRoles().then(setRoles);
  }, []);

  // Handle role creation or editing
  const handleSaveRole = (roleData) => {
    if (roleData.id) {
      // Update the role
      updateRole(roleData).then((updatedRole) => {
        setRoles((prevRoles) =>
          prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
        );
      });
    } else {
      // Create a new role
      createRole(roleData).then((newRole) => {
        setRoles((prevRoles) => [...prevRoles, newRole]);
      });
    }
    setEditingRole(null); // Close the form after saving
  };

  // Handle editing an existing role
  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const handleCancelEdit = () => {
    setEditingRole(null); // Close the form without saving
  };

  return (
    <div className="container">
      <h1>Roles</h1>
      <button onClick={() => setEditingRole({})}>Create New Role</button>

      <div>
        {roles.map((role) => (
          <div key={role.id}>
            <span>{role.name}</span>
            <button onClick={() => handleEditRole(role)}>Edit</button>
          </div>
        ))}
      </div>

      {editingRole && (
        <RoleForm
          role={editingRole}
          permissions={permissions}
          onSave={handleSaveRole}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default RolesPage;
