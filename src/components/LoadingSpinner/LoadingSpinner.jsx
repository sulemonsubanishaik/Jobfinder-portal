import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

export default function LoadingSpinner({
  message = 'Loading opportunities...',
  skeletonCount = 3,
  showSkeleton = true
}) {
  return (
    <div className="loading-spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner-center">
        <Loader2 className="spinner-icon animate-spin" size={36} />
        <p className="spinner-text">{message}</p>
      </div>

      {showSkeleton && (
        <div className="skeleton-grid">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={index} className="skeleton-card card">
              <div className="skeleton-header">
                <div className="skeleton-badge skeleton-box" />
                <div className="skeleton-header-lines">
                  <div className="skeleton-box skeleton-line-sm" />
                  <div className="skeleton-box skeleton-line-md" />
                </div>
              </div>
              <div className="skeleton-box skeleton-line-desc" />
              <div className="skeleton-box skeleton-line-desc short" />
              <div className="skeleton-tags-row">
                <div className="skeleton-box skeleton-pill" />
                <div className="skeleton-box skeleton-pill" />
                <div className="skeleton-box skeleton-pill" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
