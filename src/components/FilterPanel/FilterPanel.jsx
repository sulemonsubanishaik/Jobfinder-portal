import React, { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp, Check, SlidersHorizontal } from 'lucide-react';
import './FilterPanel.css';

const EMPLOYMENT_TYPES = [
  { id: 'Full-time', label: 'Full-time' },
  { id: 'Part-time', label: 'Part-time' },
  { id: 'Contract', label: 'Contract' },
  { id: 'Internship', label: 'Internship' }
];

const EXPERIENCE_LEVELS = [
  { id: 'Entry Level', label: 'Entry Level (0-2 yrs)' },
  { id: 'Mid Level', label: 'Mid Level (2-5 yrs)' },
  { id: 'Senior', label: 'Senior (5+ yrs)' },
  { id: 'Lead', label: 'Lead / Principal' }
];

const WORKPLACE_TYPES = [
  { id: 'Remote', label: 'Remote' },
  { id: 'Hybrid', label: 'Hybrid' },
  { id: 'On-site', label: 'On-site' }
];

export default function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  totalJobs = 0
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Helper to toggle checkbox array
  const handleCheckboxToggle = (category, value) => {
    const current = filters[category] || [];
    let updated;
    if (current.includes(value)) {
      updated = current.filter((item) => item !== value);
    } else {
      updated = [...current, value];
    }
    onFilterChange({ ...filters, [category]: updated });
  };

  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  // Count how many filters are active
  const activeCount =
    (filters.employmentTypes?.length || 0) +
    (filters.experienceLevels?.length || 0) +
    (filters.workplaceTypes?.length || 0) +
    (filters.location?.trim() ? 1 : 0);

  return (
    <aside className="filter-panel-wrapper" aria-label="Job Filters">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="filter-mobile-toggle"
        onClick={() => setIsOpenMobile((prev) => !prev)}
        aria-expanded={isOpenMobile}
      >
        <div className="filter-toggle-left">
          <SlidersHorizontal size={18} />
          <span>Filters</span>
          {activeCount > 0 && <span className="active-pill">{activeCount}</span>}
        </div>
        {isOpenMobile ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Main Filter Content */}
      <div className={`filter-panel-card card ${isOpenMobile ? 'mobile-expanded' : ''}`}>
        {/* Header */}
        <div className="filter-header">
          <div className="filter-title-row">
            <Filter size={18} className="filter-title-icon" />
            <h3 className="filter-title">Filter Openings</h3>
            {activeCount > 0 && (
              <span className="filter-active-count">({activeCount})</span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={onClearFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Filter Section: Location */}
        <div className="filter-section">
          <h4 className="filter-section-title">Location</h4>
          <input
            type="text"
            className="filter-text-input"
            placeholder="e.g. Remote, New York..."
            value={filters.location || ''}
            onChange={handleLocationChange}
          />
        </div>

        {/* Filter Section: Workplace Type */}
        <div className="filter-section">
          <h4 className="filter-section-title">Workplace Mode</h4>
          <div className="filter-checkbox-group">
            {WORKPLACE_TYPES.map((type) => {
              const checked = filters.workplaceTypes?.includes(type.id);
              return (
                <label key={type.id} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxToggle('workplaceTypes', type.id)}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-text">{type.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Filter Section: Experience Level */}
        <div className="filter-section">
          <h4 className="filter-section-title">Experience Level</h4>
          <div className="filter-checkbox-group">
            {EXPERIENCE_LEVELS.map((exp) => {
              const checked = filters.experienceLevels?.includes(exp.id);
              return (
                <label key={exp.id} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxToggle('experienceLevels', exp.id)}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-text">{exp.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Filter Section: Employment Type */}
        <div className="filter-section">
          <h4 className="filter-section-title">Employment Type</h4>
          <div className="filter-checkbox-group">
            {EMPLOYMENT_TYPES.map((type) => {
              const checked = filters.employmentTypes?.includes(type.id);
              return (
                <label key={type.id} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxToggle('employmentTypes', type.id)}
                    className="custom-checkbox"
                  />
                  <span className="checkbox-text">{type.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Mobile Close Button */}
        {isOpenMobile && (
          <button
            type="button"
            className="btn btn-primary btn-block filter-apply-mobile"
            onClick={() => setIsOpenMobile(false)}
          >
            Apply Filters
          </button>
        )}
      </div>
    </aside>
  );
}
