import React from "react";

const ToastNotification = ({ type, message }) => {
  return <div className={`toast ${type}`}>{message}</div>;
};

export default ToastNotification;
