import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  CheckCircle2,
  Building2,
  Calendar,
  Sparkles,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { fetchJobById, hasAppliedToJob } from '../../services/jobsApi';
import { useBookmarks } from '../../context/BookmarkContext';
import { useToast } from '../../context/ToastContext';
import ApplyModal from '../../components/ApplyModal/ApplyModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import JobCard from '../../components/JobCard/JobCard';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [appliedAlready, setAppliedAlready] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  const loadJob = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchJobById(id);
      setJob(response.job);
      setSimilarJobs(response.similarJobs || []);
      setAppliedAlready(hasAppliedToJob(response.job.id));
    } catch (err) {
      setError(err.message || 'Job not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    } else {
      showToast('Link ready to share', 'info');
    }
  };

  const handleBookmarkToggle = () => {
    if (!job) return;
    toggleBookmark(job);
    const saved = isBookmarked(job.id);
    if (!saved) {
      showToast(`Saved "${job.title}" to bookmarks`, 'success');
    } else {
      showToast(`Removed from bookmarks`, 'info');
    }
  };

  const handleApplicationSuccess = () => {
    setAppliedAlready(true);
  };

  if (loading) {
    return (
      <div className="container job-details-page loading-center">
        <LoadingSpinner message="Loading job specifications..." skeletonCount={2} />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container job-details-page">
        <Link to="/jobs" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Jobs</span>
        </Link>
        <ErrorMessage
          title="Job Listing Unavailable"
          message={error || 'The requested job posting could not be found or has expired.'}
          onRetry={loadJob}
        />
        <div className="mt-4">
          <Link to="/jobs" className="btn btn-primary">
            Explore Other Openings
          </Link>
        </div>
      </div>
    );
  }

  const saved = isBookmarked(job.id);

  return (
    <div className="job-details-page">
      {/* Top Breadcrumb & Navigation */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/jobs" className="breadcrumb-link">Find Jobs</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{job.title}</span>
        </nav>

        <Link to="/jobs" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to All Jobs</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <section className="container job-details-hero-container">
        <div className="job-hero-card card">
          <div className="job-hero-main">
            <div
              className="company-large-badge"
              style={{ backgroundColor: job.companyColor || '#4f46e5' }}
            >
              {job.companyLogo || job.company.slice(0, 2).toUpperCase()}
            </div>

            <div className="job-hero-info">
              <div className="job-hero-company-row">
                <span className="hero-company-name">{job.company}</span>
                {job.featured && (
                  <span className="badge badge-primary">
                    <Sparkles size={12} /> Featured Role
                  </span>
                )}
                {appliedAlready && (
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={12} /> Applied
                  </span>
                )}
              </div>

              <h1 className="job-hero-title">{job.title}</h1>

              <div className="job-hero-meta-row">
                <span className="hero-meta-item">
                  <MapPin size={16} className="meta-icon" />
                  <span>{job.location}</span>
                  {job.workplaceType && (
                    <span className="hero-sub-pill">{job.workplaceType}</span>
                  )}
                </span>
                <span className="hero-meta-item">
                  <Briefcase size={16} className="meta-icon" />
                  <span>{job.employmentType}</span>
                </span>
                <span className="hero-meta-item">
                  <Clock size={16} className="meta-icon" />
                  <span>Posted {job.postedAgo || 'recently'}</span>
                </span>
                {job.salary && (
                  <span className="hero-meta-item hero-salary">
                    <DollarSign size={16} className="meta-icon" />
                    <span>{job.salary}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="job-hero-actions">
            <button
              type="button"
              className={`btn ${appliedAlready ? 'btn-secondary' : 'btn-primary'} btn-lg hero-apply-btn`}
              onClick={() => setIsApplyModalOpen(true)}
            >
              <Zap size={18} />
              <span>{appliedAlready ? 'Application Submitted' : 'Apply Now'}</span>
            </button>

            <button
              type="button"
              className={`btn btn-secondary hero-action-btn ${saved ? 'bookmarked-active' : ''}`}
              onClick={handleBookmarkToggle}
              title={saved ? 'Remove Bookmark' : 'Save Job'}
              aria-label="Bookmark this job"
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary hero-action-btn"
              onClick={handleShare}
              title="Share job link"
              aria-label="Share this job"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Two-Column Content */}
      <section className="container job-details-body-layout">
        {/* Left Column: Full Job Description Details */}
        <div className="job-details-main-content">
          {/* About the Role */}
          <div className="details-section-card card">
            <h2 className="details-section-heading">About the Role</h2>
            <p className="details-paragraph">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="details-section-card card">
              <h2 className="details-section-heading">Key Responsibilities</h2>
              <ul className="details-list">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="details-list-item">
                    <span className="list-bullet">✓</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications & Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="details-section-card card">
              <h2 className="details-section-heading">Qualifications & Skills Required</h2>
              <ul className="details-list">
                {job.requirements.map((req, i) => (
                  <li key={i} className="details-list-item">
                    <span className="list-bullet bullet-primary">●</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="skills-breakdown-wrapper">
                <h3 className="sub-heading">Technologies & Frameworks</h3>
                <div className="details-skills-grid">
                  {job.skills.map((skill) => (
                    <span key={skill} className="skill-pill-large">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="details-section-card card">
              <h2 className="details-section-heading">Perks & Benefits</h2>
              <div className="benefits-grid">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="benefit-item">
                    <CheckCircle2 size={18} className="benefit-check" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Company */}
          {job.aboutCompany && (
            <div className="details-section-card card">
              <h2 className="details-section-heading">About {job.company}</h2>
              <p className="details-paragraph">{job.aboutCompany}</p>
            </div>
          )}
        </div>

        {/* Right Column: Job Summary Sidebar Card */}
        <aside className="job-details-sidebar">
          <div className="job-overview-card card">
            <h3 className="sidebar-card-title">Job Overview</h3>
            <div className="overview-items-list">
              <div className="overview-item">
                <span className="overview-label">Job Title</span>
                <span className="overview-value">{job.title}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Employment Type</span>
                <span className="overview-value">{job.employmentType}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Workplace Mode</span>
                <span className="overview-value">{job.workplaceType || 'On-site'}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Experience Level</span>
                <span className="overview-value">{job.experienceLevel}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Location</span>
                <span className="overview-value">{job.location}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Salary Range</span>
                <span className="overview-value salary-highlight">{job.salary}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Date Posted</span>
                <span className="overview-value">{job.postedAgo}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block mt-4"
              onClick={() => setIsApplyModalOpen(true)}
            >
              {appliedAlready ? 'Review Application' : 'Apply for this Role'}
            </button>
          </div>
        </aside>
      </section>

      {/* Similar Jobs Section */}
      {similarJobs.length > 0 && (
        <section className="container similar-jobs-section">
          <div className="section-header">
            <span className="section-tag">Recommendations</span>
            <h2 className="section-title">Similar Positions You May Like</h2>
          </div>
          <div className="similar-jobs-grid">
            {similarJobs.map((simJob) => (
              <JobCard key={simJob.id} job={simJob} />
            ))}
          </div>
        </section>
      )}

      {/* Application Modal */}
      <ApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onAppliedSuccess={handleApplicationSuccess}
      />
    </div>
  );
}
