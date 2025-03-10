import React from "react";
import '../styles/toastContainer.css'
const toastTypes = {
  success: { className: "toast success", icon: "✔️" },
  info: { className: "toast info", icon: "ℹ️" },
  failure: { className: "toast failure", icon: "❌" },
};

const ToastContainer = ({ toasts }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const { className, icon } = toastTypes[toast.type] || toastTypes.info;

        return (
          <div key={toast.id} className={className}>
            <span className="toast-icon">{icon}</span>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
