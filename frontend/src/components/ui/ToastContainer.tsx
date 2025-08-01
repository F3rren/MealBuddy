import React from 'react'
import { useToast, type Toast, type ToastType } from '../../contexts/ToastContext'
import './Toast.css'

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return 'ℹ️'
  }
}

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast } = useToast()

  return (
    <div className={`toast toast--${toast.type}`}>
      <div className="toast__icon">
        {getToastIcon(toast.type)}
      </div>
      <div className="toast__content">
        <div className="toast__title">{toast.title}</div>
        {toast.message && (
          <div className="toast__message">{toast.message}</div>
        )}
      </div>
      <button 
        className="toast__close"
        onClick={() => removeToast(toast.id)}
        aria-label="Chiudi notifica"
      >
        ×
      </button>
    </div>
  )
}

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer
