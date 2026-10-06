import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Bookmark, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';
import { useToast } from '../../context/ToastContext';
import './JobCard.css';

export default function JobCard({ job }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  const saved = isBookmarked(job.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(job);
    if (!saved) {
      showToast(`Saved "${job.title}" to your bookmarks`, 'success');
    } else {
      showToast(`Removed "${job.title}" from bookmarks`, 'info');
    }
  };

  const getExperienceBadgeClass = (level) => {
    switch (level) {
      case 'Entry Level':
        return 'badge-emerald';
      case 'Mid Level':
        return 'badge-sky';
      case 'Senior':
      case 'Lead':
        return 'badge-primary';
      default:
        return 'badge-slate';
    }
  };

  return (
    <article className="job-card card card-hover">
      {/* Top Header: Company Avatar, Title, and Bookmark Button */}
      <div className="job-card-header">
        <div className="job-card-header-left">
          <div
            className="company-logo-badge"
            style={{ backgroundColor: job.companyColor || '#4f46e5' }}
            aria-hidden="true"
          >
            {job.companyLogo || job.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="company-name-row">
              <span className="company-name">{job.company}</span>
              {job.featured && (
                <span className="featured-tag">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
            </div>
            <h2 className="job-title">
              <Link to={`/jobs/${job.id}`} className="job-title-link">
                {job.title}
              </Link>
            </h2>
          </div>
        </div>

        <button
          className={`bookmark-btn ${saved ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={saved ? `Remove ${job.title} from bookmarks` : `Bookmark ${job.title}`}
          title={saved ? 'Remove bookmark' : 'Bookmark job'}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Meta Badges (Location, Employment Type, Experience Level, Salary) */}
      <div className="job-meta-row">
        <span className="job-meta-item">
          <MapPin size={15} className="meta-icon" />
          <span>{job.location}</span>
          {job.workplaceType && (
            <span className="meta-sub-pill">{job.workplaceType}</span>
          )}
        </span>

        <span className="job-meta-item">
          <Briefcase size={15} className="meta-icon" />
          <span>{job.employmentType}</span>
        </span>

        {job.salary && (
          <span className="job-meta-item salary-meta">
            <DollarSign size={15} className="meta-icon" />
            <span>{job.salary}</span>
          </span>
        )}
      </div>

      {/* Description Preview */}
      <p className="job-desc-preview">
        {job.description}
      </p>

      {/* Skills Tags */}
      {job.skills && job.skills.length > 0 && (
        <div className="job-skills-container">
          {job.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="skill-pill skill-pill-more">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer: Posted date & CTA */}
      <div className="job-card-footer">
        <div className="job-posted-time">
          <Clock size={14} className="clock-icon" />
          <span>Posted {job.postedAgo || 'recently'}</span>
          <span className={`badge ${getExperienceBadgeClass(job.experienceLevel)}`}>
            {job.experienceLevel}
          </span>
        </div>

        <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-sm job-details-btn">
          <span>View Details</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
