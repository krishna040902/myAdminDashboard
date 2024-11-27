import React, { useState, useEffect } from "react";
import TableView from "../components/TableView";
import ModalDialog from "../components/ModalDialog";
import FormField from "../components/FormField";
import { fetchPermissions, createPermission, updatePermission, deletePermission } from "../mock/api";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);

  useEffect(() => {
    fetchPermissions().then(setPermissions);
  }, []);

  const handleEdit = (permission) => {
    setCurrentPermission(permission);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deletePermission(id).then(() =>
      setPermissions(permissions.filter((p) => p.id !== id))
    );
  };

  const handleSave = () => {
    if (currentPermission.id) {
      updatePermission(currentPermission).then(() => {
        setPermissions((prev) =>
          prev.map((p) =>
            p.id === currentPermission.id ? currentPermission : p
          )
        );
      });
    } else {
      createPermission(currentPermission).then((newPermission) =>
        setPermissions((prev) => [...prev, newPermission])
      );
    }
    setModalOpen(false);
    setCurrentPermission(null);
  };

  return (
    <div>
      <h1>Permissions</h1>
      <button onClick={() => setModalOpen(true)}>Add Permission</button>
      <TableView
        columns={["Name", "Description"]}
        data={permissions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ModalDialog
        isOpen={modalOpen}
        title={
          currentPermission ? "Edit Permission" : "Add Permission"
        }
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
      >
        <FormField
          label="Name"
          type="text"
          value={currentPermission?.name || ""}
          onChange={(e) =>
            setCurrentPermission({
              ...currentPermission,
              name: e.target.value,
            })
          }
        />
        <FormField
          label="Description"
          type="text"
          value={currentPermission?.description || ""}
          onChange={(e) =>
            setCurrentPermission({
              ...currentPermission,
              description: e.target.value,
            })
          }
        />
      </ModalDialog>
    </div>
  );
};

export default PermissionsPage;
