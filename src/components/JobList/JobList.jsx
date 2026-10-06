import React from 'react';
import JobCard from '../JobCard/JobCard';
import { SearchX, ArrowUpDown } from 'lucide-react';
import './JobList.css';

export default function JobList({
  jobs = [],
  totalCount = 0,
  sortBy = 'recent',
  onSortChange,
  onResetFilters
}) {
  if (jobs.length === 0) {
    return (
      <div className="empty-job-list card">
        <div className="empty-icon-box">
          <SearchX size={38} />
        </div>
        <h3 className="empty-title">No Jobs Found</h3>
        <p className="empty-description">
          We couldn't find any opportunities matching your active filters or keywords. Try broadening your criteria or reset your filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-primary btn-sm mt-3"
            onClick={onResetFilters}
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="job-list-container">
      {/* Top Controls: Result Count & Sort Selector */}
      <div className="job-list-header">
        <div className="job-count-text">
          Showing <strong>{jobs.length}</strong> {jobs.length === 1 ? 'opportunity' : 'opportunities'}
          {totalCount > jobs.length && (
            <span className="total-count-sub"> of {totalCount} total</span>
          )}
        </div>

        {onSortChange && (
          <div className="job-sort-wrapper">
            <label htmlFor="job-sort-select" className="sort-label">
              <ArrowUpDown size={15} />
              <span>Sort by:</span>
            </label>
            <select
              id="job-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="salary-desc">Highest Salary</option>
              <option value="salary-asc">Lowest Salary</option>
              <option value="title-asc">Job Title (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid of Job Cards */}
      <div className="job-cards-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
