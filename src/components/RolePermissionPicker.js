import React, { useState } from "react";

const RolePermissionPicker = ({
  permissions,
  selectedPermissions,
  onChange,
  onSelectAll,
  onDeselectAll,
}) => {
  // State to manage the toggle all functionality
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  // Handle individual permission toggle
  const handlePermissionChange = (permissionId) => {
    onChange(permissionId);
  };

  // Handle select all permissions
  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  return (
    <div className="permission-picker">
      <div className="select-all">
        <label>
          <input
            type="checkbox"
            checked={isSelectAllChecked}
            onChange={handleSelectAll}
          />
          Select All Permissions
        </label>
      </div>

      {permissions.map((perm) => (
        <div key={perm.id} className="permission-item">
          <label>
            <input
              type="checkbox"
              checked={selectedPermissions.includes(perm.id)}
              onChange={() => handlePermissionChange(perm.id)}
            />
            {perm.name}
          </label>
        </div>
      ))}

      <div className="selected-count">
        {selectedPermissions.length} of {permissions.length} permissions selected
      </div>
    </div>
  );
};

export default RolePermissionPicker;

