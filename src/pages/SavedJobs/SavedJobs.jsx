import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Search, Trash2 } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';
import JobCard from '../../components/JobCard/JobCard';
import './SavedJobs.css';

export default function SavedJobs() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="saved-jobs-page">
      <section className="saved-jobs-header">
        <div className="container">
          <div className="saved-header-inner">
            <div className="saved-title-box">
              <span className="section-tag">Your Bookmarks</span>
              <h1 className="saved-page-title">Saved Opportunities</h1>
              <p className="saved-page-desc">
                Review, compare, and apply for roles you have bookmarked for later.
              </p>
            </div>
            <div className="saved-count-pill">
              <Bookmark size={18} />
              <span>{bookmarks.length} {bookmarks.length === 1 ? 'Job Saved' : 'Jobs Saved'}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container saved-jobs-content">
        {bookmarks.length === 0 ? (
          <div className="empty-saved-card card">
            <div className="empty-saved-icon">
              <Bookmark size={36} />
            </div>
            <h2 className="empty-saved-title">No Saved Jobs Yet</h2>
            <p className="empty-saved-desc">
              When browsing jobs, click the bookmark icon on any card or detail page to save opportunities to review later.
            </p>
            <Link to="/jobs" className="btn btn-primary mt-4">
              <Search size={18} />
              <span>Browse Tech Jobs</span>
            </Link>
          </div>
        ) : (
          <div className="saved-jobs-grid">
            {bookmarks.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
