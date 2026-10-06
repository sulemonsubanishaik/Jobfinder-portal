import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorMessage.css';

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Failed to load data from the server. Please check your connection and try again.',
  onRetry
}) {
  return (
    <div className="error-message-card card" role="alert">
      <div className="error-icon-wrapper">
        <AlertCircle size={28} className="error-icon" />
      </div>

      <div className="error-content">
        <h3 className="error-title">{title}</h3>
        <p className="error-desc">{message}</p>
      </div>

      {onRetry && (
        <button type="button" className="btn btn-secondary btn-sm error-retry-btn" onClick={onRetry}>
          <RefreshCw size={15} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
