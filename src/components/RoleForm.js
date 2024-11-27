import React, { useState, useEffect } from "react";
import RolePermissionPicker from "./RolePermissionPicker"; // Import permission picker

const RoleForm = ({ role, permissions, onSave, onCancel }) => {
  const [roleData, setRoleData] = useState({
    id: role ? role.id : null,
    name: role ? role.name : "",
    description: role ? role.description : "",
    permissions: role ? role.permissions : [],
    customAttributes: role ? role.customAttributes : []
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding custom attributes (e.g., key-value pairs)
  const handleAddCustomAttribute = () => {
    setRoleData((prevData) => ({
      ...prevData,
      customAttributes: [...prevData.customAttributes, { key: "", value: "" }],
    }));
  };

  const handleCustomAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const newAttributes = [...roleData.customAttributes];
    newAttributes[index][name] = value;
    setRoleData((prevData) => ({
      ...prevData,
      customAttributes: newAttributes,
    }));
  };

  // Handle saving the role
  const handleSave = () => {
    onSave(roleData); // Pass the updated role data to the parent component
  };

  return (
    <div className="role-form">
      <h2>{role ? "Edit Role" : "Create Role"}</h2>
      <div>
        <label>Role Name:</label>
        <input
          type="text"
          name="name"
          value={roleData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={roleData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <RolePermissionPicker
          permissions={permissions}
          selectedPermissions={roleData.permissions}
          onChange={(permissionId) => {
            setRoleData((prevData) => {
              const newPermissions = prevData.permissions.includes(permissionId)
                ? prevData.permissions.filter((id) => id !== permissionId)
                : [...prevData.permissions, permissionId];
              return { ...prevData, permissions: newPermissions };
            });
          }}
          onSelectAll={() => setRoleData((prevData) => ({ ...prevData, permissions: permissions.map((perm) => perm.id) }))}
          onDeselectAll={() => setRoleData((prevData) => ({ ...prevData, permissions: [] }))}
        />
      </div>

      <div>
        <h3>Custom Attributes</h3>
        {roleData.customAttributes.map((attr, index) => (
          <div key={index} className="custom-attribute">
            <input
              type="text"
              name="key"
              value={attr.key}
              placeholder="Key"
              onChange={(e) => handleCustomAttributeChange(index, e)}
            />
            <input
              type="text"
              name="value"
              value={attr.value}
              placeholder="Value"
              onChange={(e) => handleCustomAttributeChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddCustomAttribute}>Add Custom Attribute</button>
      </div>

      <div>
        <button onClick={handleSave}>Save Role</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RoleForm;

