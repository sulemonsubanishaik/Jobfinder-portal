import React, { useState, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({
  initialSearch = '',
  initialLocation = '',
  onSearch,
  showQuickTags = true,
  variant = 'default'
}) {
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);

  // Sync state if props change (e.g. from URL params)
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ search: search.trim(), location: location.trim() });
    }
  };

  const handleQuickTagClick = (tagQuery) => {
    setSearch(tagQuery);
    if (onSearch) {
      onSearch({ search: tagQuery, location: location.trim() });
    }
  };

  const clearSearch = () => {
    setSearch('');
    if (onSearch) {
      onSearch({ search: '', location });
    }
  };

  const clearLocation = () => {
    setLocation('');
    if (onSearch) {
      onSearch({ search, location: '' });
    }
  };

  const popularTags = ['React.js', 'Frontend', 'Remote', 'Node.js', 'Entry Level', 'Full Stack'];

  return (
    <div className={`searchbar-container ${variant === 'hero' ? 'searchbar-hero' : ''}`}>
      <form className="searchbar-form" onSubmit={handleSubmit} role="search">
        {/* Keyword / Title / Company Input */}
        <div className="searchbar-field">
          <Search className="field-icon" size={20} />
          <input
            type="text"
            className="searchbar-input"
            placeholder="Job title, keyword, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Job title, keyword, or company"
          />
          {search && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={clearSearch}
              aria-label="Clear search keyword"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="searchbar-divider" />

        {/* Location Input */}
        <div className="searchbar-field">
          <MapPin className="field-icon" size={20} />
          <input
            type="text"
            className="searchbar-input"
            placeholder="City, state, or 'Remote'..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="City, state, or remote location"
          />
          {location && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={clearLocation}
              aria-label="Clear location input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary searchbar-submit">
          <Search size={18} />
          <span>Search Jobs</span>
        </button>
      </form>

      {/* Quick Suggestions / Popular Tags */}
      {showQuickTags && (
        <div className="quick-tags-container">
          <span className="quick-tags-label">Popular Searches:</span>
          <div className="quick-tags-list">
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`quick-tag-btn ${search.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleQuickTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
