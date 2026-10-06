import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container notfound-container">
      <div className="notfound-card card">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/jobs" className="btn btn-secondary">
            <Compass size={18} />
            <span>Browse Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
