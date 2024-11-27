import React from "react";

const ModalDialog = ({ isOpen, title, children, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
