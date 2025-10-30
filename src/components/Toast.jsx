// src/components/Toast.jsx
// 🔥 Beautiful toast notifications

import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
};

// ============================================
// Toast Container - Multiple toasts handle karne ke liye
// ============================================
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// ============================================
// Custom Hook - Easy toast management
// ============================================
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export default Toast;

// ============================================
// USAGE EXAMPLE:
// ============================================

// In your component:
/*
import { useToast, ToastContainer } from './Toast';

function MyComponent() {
  const { toasts, addToast, removeToast } = useToast();

  const handleSuccess = () => {
    addToast('Review submitted successfully!', 'success');
  };

  const handleError = () => {
    addToast('Failed to submit review', 'error');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Submit</button>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
*/