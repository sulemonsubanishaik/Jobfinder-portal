import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import JobList from '../../components/JobList/JobList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchJobs } from '../../services/jobsApi';
import { Briefcase, SlidersHorizontal, X } from 'lucide-react';
import './Jobs.css';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filter state from URL params
  const [filters, setFilters] = useState(() => {
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
    const empTypes = searchParams.getAll('employmentType');
    const expLevels = searchParams.getAll('experienceLevel');
    const workTypes = searchParams.getAll('workplaceType');

    return {
      search,
      location,
      category,
      employmentTypes: empTypes.length ? empTypes : [],
      experienceLevels: expLevels.length ? expLevels : [],
      workplaceTypes: workTypes.length ? workTypes : []
    };
  });

  const [sortBy, setSortBy] = useState('recent');
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state to URL search parameters for shareable URLs
  const updateUrlParams = useCallback((currentFilters, currentSort) => {
    const params = new URLSearchParams();
    if (currentFilters.search) params.set('search', currentFilters.search);
    if (currentFilters.location) params.set('location', currentFilters.location);
    if (currentFilters.category) params.set('category', currentFilters.category);

    currentFilters.employmentTypes.forEach((t) => params.append('employmentType', t));
    currentFilters.experienceLevels.forEach((e) => params.append('experienceLevel', e));
    currentFilters.workplaceTypes.forEach((w) => params.append('workplaceType', w));

    if (currentSort !== 'recent') params.set('sort', currentSort);

    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Fetch jobs whenever filters or sortBy change
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchJobs({
        search: filters.search,
        location: filters.location,
        employmentTypes: filters.employmentTypes,
        experienceLevels: filters.experienceLevels,
        workplaceTypes: filters.workplaceTypes,
        category: filters.category,
        sortBy
      });
      setJobs(response.jobs);
      setTotalCount(response.total);
    } catch (err) {
      setError(err.message || 'Failed to load jobs. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    loadJobs();
    updateUrlParams(filters, sortBy);
  }, [loadJobs, updateUrlParams, filters, sortBy]);

  // SearchBar submit handler
  const handleSearchBarSubmit = ({ search, location }) => {
    setFilters((prev) => ({
      ...prev,
      search,
      location
    }));
  };

  // FilterPanel change handler
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      employmentTypes: [],
      experienceLevels: [],
      workplaceTypes: []
    });
    setSortBy('recent');
  };

  // Remove individual active filter pill
  const removeFilterTag = (type, value) => {
    if (type === 'search') {
      setFilters((prev) => ({ ...prev, search: '' }));
    } else if (type === 'location') {
      setFilters((prev) => ({ ...prev, location: '' }));
    } else if (type === 'category') {
      setFilters((prev) => ({ ...prev, category: '' }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value)
      }));
    }
  };

  const hasActiveFilters =
    Boolean(filters.search?.trim()) ||
    Boolean(filters.location?.trim()) ||
    Boolean(filters.category) ||
    filters.employmentTypes.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.workplaceTypes.length > 0;

  return (
    <div className="jobs-page-wrapper">
      {/* Top Banner & Search */}
      <section className="jobs-hero-header">
        <div className="container">
          <div className="jobs-header-intro">
            <span className="section-tag">Explore Opportunities</span>
            <h1 className="jobs-page-title">Find Your Next Tech Role</h1>
            <p className="jobs-page-desc">
              Filter through verified full-time, contract, internship, and remote software engineering jobs.
            </p>
          </div>

          <div className="jobs-search-box">
            <SearchBar
              initialSearch={filters.search}
              initialLocation={filters.location}
              onSearch={handleSearchBarSubmit}
              showQuickTags={false}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area: Two Column Layout */}
      <main className="container jobs-main-layout">
        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="active-filters-bar">
            <span className="active-filters-label">Active Filters:</span>
            <div className="active-tags-list">
              {filters.search && (
                <span className="active-tag-chip">
                  Keyword: "{filters.search}"
                  <button
                    type="button"
                    onClick={() => removeFilterTag('search')}
                    aria-label="Remove keyword filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="active-tag-chip">
                  Location: "{filters.location}"
                  <button
                    type="button"
                    onClick={() => removeFilterTag('location')}
                    aria-label="Remove location filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="active-tag-chip">
                  Category: {filters.category}
                  <button
                    type="button"
                    onClick={() => removeFilterTag('category')}
                    aria-label="Remove category filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}
              {filters.workplaceTypes.map((val) => (
                <span key={val} className="active-tag-chip">
                  {val}
                  <button
                    type="button"
                    onClick={() => removeFilterTag('workplaceTypes', val)}
                    aria-label={`Remove ${val} filter`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
              {filters.employmentTypes.map((val) => (
                <span key={val} className="active-tag-chip">
                  {val}
                  <button
                    type="button"
                    onClick={() => removeFilterTag('employmentTypes', val)}
                    aria-label={`Remove ${val} filter`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
              {filters.experienceLevels.map((val) => (
                <span key={val} className="active-tag-chip">
                  {val}
                  <button
                    type="button"
                    onClick={() => removeFilterTag('experienceLevels', val)}
                    aria-label={`Remove ${val} filter`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="clear-all-chips-btn"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="jobs-content-grid">
          {/* Left Column: Filter Panel (Sticky on desktop) */}
          <div className="jobs-sidebar">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalJobs={jobs.length}
            />
          </div>

          {/* Right Column: Job List & Status */}
          <div className="jobs-results-column">
            {loading ? (
              <LoadingSpinner message="Searching opportunities..." skeletonCount={4} />
            ) : error ? (
              <ErrorMessage
                title="Error Loading Jobs"
                message={error}
                onRetry={loadJobs}
              />
            ) : (
              <JobList
                jobs={jobs}
                totalCount={totalCount}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onResetFilters={handleClearFilters}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
