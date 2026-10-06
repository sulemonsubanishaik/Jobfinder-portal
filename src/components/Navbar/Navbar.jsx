import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Briefcase, Bookmark, Menu, X, Sparkles } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookmarkedCount } = useBookmarks();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon-box">
            <Briefcase className="brand-icon" size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">JobFinder</span>
            <span className="brand-sub">Career Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Find Jobs
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) => `nav-link nav-link-saved ${isActive ? 'active' : ''}`}
          >
            <Bookmark size={16} />
            <span>Saved Jobs</span>
            {bookmarkedCount > 0 && (
              <span className="nav-badge" aria-label={`${bookmarkedCount} saved jobs`}>
                {bookmarkedCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Right CTA */}
        <div className="navbar-actions desktop-actions">
          <Link to="/jobs" className="btn btn-primary btn-sm nav-cta">
            <Sparkles size={16} />
            <span>Explore Openings</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Find Jobs
            </NavLink>
            <NavLink
              to="/saved"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="flex-row items-center gap-2">
                <Bookmark size={18} />
                Saved Jobs
              </span>
              {bookmarkedCount > 0 && (
                <span className="nav-badge">{bookmarkedCount}</span>
              )}
            </NavLink>
            <div className="mobile-drawer-cta">
              <Link to="/jobs" className="btn btn-primary btn-block" onClick={closeMenu}>
                Explore All Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
