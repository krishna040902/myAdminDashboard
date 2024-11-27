import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UsersPage from './pages/UserPage';
import RolesPage from './pages/RolesPage';
import PermissionsPage from './pages/PermissionsPage';
import ToastNotification from './components/ToastNotification';
import ModalDialog from './components/ModalDialog';
import './App.css';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState('users'); // Default page

  // Show toast notification with a custom message and type
  const handleShowNotification = (message, type = 'info') => {
    const id = new Date().getTime(); // Unique ID for each notification
    setNotifications((prev) => [
      ...prev,
      { id, message, type }
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter(notification => notification.id !== id));
    }, 3000); // Auto-close after 3 seconds
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Admin Panel</h1>
          <nav>
            <Link to="/users" className="nav-link">Users</Link>
            <Link to="/roles" className="nav-link">Roles</Link>
            <Link to="/permissions" className="nav-link">Permissions</Link>
          </nav>
          <button onClick={() => handleShowNotification("This is an info notification!")}>
            Show Info Notification
          </button>
          <button onClick={() => handleShowNotification("This is a success notification!", "success")}>
            Show Success Notification
          </button>
          <button onClick={() => handleShowNotification("This is an error notification!", "error")}>
            Show Error Notification
          </button>
          <button onClick={handleShowModal}>Open Modal</button>
        </header>

        <main>
          {/* Routes for different pages */}
          <Switch>
            <Route path="/users" component={UsersPage} />
            <Route path="/roles" component={RolesPage} />
            <Route path="/permissions" component={PermissionsPage} />
          </Switch>
        </main>

        {/* Toast Notification Component */}
        {notifications.map((notification) => (
          <ToastNotification key={notification.id} message={notification.message} type={notification.type} />
        ))}

        {/* Modal Dialog Component */}
        {showModal && <ModalDialog onClose={handleHideModal} />}
      </div>
    </Router>
  );
}

export default App;


