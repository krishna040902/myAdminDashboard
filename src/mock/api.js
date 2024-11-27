// src/mock/api.js

// Example data (modify as needed)
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, name: 'Aksh Tiwari', email: 'aksh@example.com', roles: [1], createdAt: Date.now() },
  { id: 2, name: 'Aman Gupta', email: 'aman@example.com', roles: [2], createdAt: Date.now() },
];

let roles = JSON.parse(localStorage.getItem('roles')) || [
  { id: 1, name: 'Admin', permissions: [1, 2], createdAt: Date.now() },
  { id: 2, name: 'Editor', permissions: [2], createdAt: Date.now() },
];

let permissions = JSON.parse(localStorage.getItem('permissions')) || [
  { id: 1, name: 'View Dashboard' },
  { id: 2, name: 'Edit Content' },
];

// Utility function to save data to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('roles', JSON.stringify(roles));
  localStorage.setItem('permissions', JSON.stringify(permissions));
};

// Fetch users
export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000);
  });
};

// Create a new user
export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (!user.name || !user.email) {
        reject('Name and Email are required');
        return;
      }

      const newUser = { id: users.length + 1, ...user, createdAt: Date.now() };
      users.push(newUser);
      saveToLocalStorage();
      resolve(newUser);
    }, 1000);
  });
};

// Update an existing user
export const updateUser = (id, updatedUser) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        reject('User not found');
        return;
      }

      users[index] = { ...users[index], ...updatedUser, updatedAt: Date.now() };
      saveToLocalStorage();
      resolve(users[index]);
    }, 1000);
  });
};

// Delete a user
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        reject('User not found');
        return;
      }

      users = users.filter((user) => user.id !== id);
      saveToLocalStorage();
      resolve(id);
    }, 1000);
  });
};

// Fetch roles
export const fetchRoles = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roles), 1000);
  });
};

// Create a new role
export const createRole = (role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (!role.name) {
        reject('Role name is required');
        return;
      }

      const newRole = { id: roles.length + 1, ...role, createdAt: Date.now() };
      roles.push(newRole);
      saveToLocalStorage();
      resolve(newRole);
    }, 1000);
  });
};

// Update an existing role
export const updateRole = (id, updatedRole) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roles.findIndex((role) => role.id === id);
      if (index === -1) {
        reject('Role not found');
        return;
      }

      roles[index] = { ...roles[index], ...updatedRole, updatedAt: Date.now() };
      saveToLocalStorage();
      resolve(roles[index]);
    }, 1000);
  });
};

// Delete a role
export const deleteRole = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roles.findIndex((role) => role.id === id);
      if (index === -1) {
        reject('Role not found');
        return;
      }

      roles = roles.filter((role) => role.id !== id);
      saveToLocalStorage();
      resolve(id);
    }, 1000);
  });
};

// Fetch permissions
export const fetchPermissions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(permissions), 1000);
  });
};

// Create a new permission
export const createPermission = (permission) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!permission.name) {
        reject('Permission name is required');
        return;
      }

      const newPermission = { id: permissions.length + 1, ...permission };
      permissions.push(newPermission);
      saveToLocalStorage();
      resolve(newPermission);
    }, 1000);
  });
};

// Update an existing permission
export const updatePermission = (id, updatedPermission) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = permissions.findIndex((permission) => permission.id === id);
      if (index === -1) {
        reject('Permission not found');
        return;
      }

      permissions[index] = { ...permissions[index], ...updatedPermission };
      saveToLocalStorage();
      resolve(permissions[index]);
    }, 1000);
  });
};

// Delete a permission
export const deletePermission = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = permissions.findIndex((permission) => permission.id === id);
      if (index === -1) {
        reject('Permission not found');
        return;
      }

      permissions = permissions.filter((permission) => permission.id !== id);
      saveToLocalStorage();
      resolve(id);
    }, 1000);
  });
};

// Example: Get users with pagination
export const fetchUsersWithPagination = (page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const paginatedUsers = users.slice(startIndex, startIndex + limit);
      resolve(paginatedUsers);
    }, 1000);
  });
};

// Example: Get roles filtered by name
export const fetchRolesByName = (searchTerm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredRoles = roles.filter((role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filteredRoles);
    }, 1000);
  });
};

