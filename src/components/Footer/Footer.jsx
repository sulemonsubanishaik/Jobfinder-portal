import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Send, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './Footer.css';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to job alerts!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-inner">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <div className="footer-brand-icon">
                <Briefcase size={20} />
              </div>
              <span className="footer-brand-name">JobFinder</span>
            </Link>
            <p className="footer-bio">
              A modern, transparent career portal designed to connect ambitious software developers and tech talent with forward-thinking companies.
            </p>
            <div className="footer-stats-tag">
              <span>🚀 1,500+ Verified Tech Jobs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Find Opportunities</Link>
              </li>
              <li>
                <Link to="/saved">Saved Jobs</Link>
              </li>
              <li>
                <Link to="/jobs?experienceLevel=Entry+Level">Entry Level Roles</Link>
              </li>
              <li>
                <Link to="/jobs?location=Remote">Remote Positions</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/jobs?category=Frontend+Development">Frontend Development</Link>
              </li>
              <li>
                <Link to="/jobs?category=Full+Stack+Development">Full Stack Engineering</Link>
              </li>
              <li>
                <Link to="/jobs?category=Backend+Development">Backend & APIs</Link>
              </li>
              <li>
                <Link to="/jobs?category=DevOps+%26+Cloud">DevOps & Cloud</Link>
              </li>
              <li>
                <Link to="/jobs?category=Mobile+Development">Mobile App Development</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Job Alerts</h4>
            <p className="footer-newsletter-desc">
              Subscribe to weekly curated tech openings, resume tips, and interview insights.
            </p>
            {subscribed ? (
              <div className="newsletter-success-tag">
                <Check size={16} />
                <span>You're subscribed for updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  aria-label="Email for job alerts"
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} JobFinder Portal. Built with React.js, REST APIs & Modern CSS.
          </p>
          <div className="footer-bottom-links">
            <span>Portfolio Project for Software Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
