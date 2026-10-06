import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Code,
  Layers,
  Server,
  Cloud,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Building2,
  Users,
  Compass
} from 'lucide-react';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobCard from '../../components/JobCard/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchFeaturedJobs, fetchJobCategories } from '../../services/jobsApi';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [jobsRes, catsRes] = await Promise.all([
        fetchFeaturedJobs(),
        fetchJobCategories()
      ]);
      setFeaturedJobs(jobsRes.jobs);
      setCategories(catsRes.categories);
    } catch (err) {
      setError(err.message || 'Failed to load home page content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = ({ search, location }) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Layout':
        return <Code size={22} />;
      case 'Layers':
        return <Layers size={22} />;
      case 'Server':
        return <Server size={22} />;
      case 'Cloud':
        return <Cloud size={22} />;
      case 'Smartphone':
        return <Smartphone size={22} />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      default:
        return <Code size={22} />;
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-sparkle" />
            <span>Over 1,500+ Verified Tech Jobs Added Weekly</span>
          </div>

          <h1 className="hero-title">
            Find Your Next <span className="highlight-text">Tech Career</span> Move With Confidence
          </h1>

          <p className="hero-subtitle">
            Browse verified developer positions across leading startups and enterprise tech giants.
            Transparent salaries, clear skill expectations, and direct hiring loops.
          </p>

          {/* Search Bar */}
          <div className="hero-search-wrapper">
            <SearchBar onSearch={handleSearch} variant="hero" showQuickTags={true} />
          </div>

          {/* Key Metrics / Stats */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-num">1,500+</span>
              <span className="stat-lbl">Active Roles</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">450+</span>
              <span className="stat-lbl">Tech Companies</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">85%</span>
              <span className="stat-lbl">Remote & Hybrid</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">100%</span>
              <span className="stat-lbl">Verified Salaries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore By Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Role Categories</span>
            <h2 className="section-title">Explore Opportunities by Specialty</h2>
            <p className="section-desc centered-desc">
              Whether you are passionate about React frontends, scalable Node.js microservices, or cloud DevOps pipelines, discover roles tailored to your stack.
            </p>
          </div>

          <div className="categories-grid">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.name}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="category-card card card-hover"
              >
                <div className="category-icon-box">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div className="category-details">
                  <h3 className="category-title">{cat.name}</h3>
                  <span className="category-count">{cat.count} open roles</span>
                </div>
                <div className="category-arrow">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-section-header">
            <div>
              <span className="section-tag">Hand-Picked Openings</span>
              <h2 className="section-title">Featured Tech Positions</h2>
              <p className="section-desc">
                High-priority developer openings with active response times and verified perks.
              </p>
            </div>
            <Link to="/jobs" className="btn btn-secondary view-all-btn">
              <span>View All Openings</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching featured opportunities..." skeletonCount={3} />
          ) : error ? (
            <ErrorMessage
              title="Unable to load featured jobs"
              message={error}
              onRetry={loadData}
            />
          ) : (
            <div className="featured-jobs-grid">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="featured-bottom-cta">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              <span>Browse All {featuredJobs.length > 0 ? '15+' : ''} Open Positions</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose JobFinder / Feature Highlights */}
      <section className="why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">The JobFinder Advantage</span>
            <h2 className="section-title">Why Developers Choose JobFinder</h2>
            <p className="section-desc centered-desc">
              We cut through the noise of spam listings and ghost postings to connect you directly with hiring teams.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card card">
              <div className="why-icon-box">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="why-title">Zero Ghost Jobs</h3>
              <p className="why-desc">
                Every listing is verified active within the last 14 days directly from company careers APIs.
              </p>
            </div>

            <div className="why-card card">
              <div className="why-icon-box">
                <TrendingUp size={24} />
              </div>
              <h3 className="why-title">Salary Transparency</h3>
              <p className="why-desc">
                No guessing games. Transparent base compensation, hourly ranges, and equity expectations listed upfront.
              </p>
            </div>

            <div className="why-card card">
              <div className="why-icon-box">
                <Code size={24} />
              </div>
              <h3 className="why-title">Stack-First Matching</h3>
              <p className="why-desc">
                Filter directly by the libraries, languages, and frameworks you love: React, Node, Python, and cloud tools.
              </p>
            </div>

            <div className="why-card card">
              <div className="why-icon-box">
                <Building2 size={24} />
              </div>
              <h3 className="why-title">Direct Applications</h3>
              <p className="why-desc">
                Submit your profile and resume directly to company recruiting pipelines with instant tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to take the next step in your career?</h2>
              <p className="cta-subtitle">
                Explore hundreds of entry-level, mid-level, and senior software engineering roles right now.
              </p>
              <div className="cta-actions">
                <Link to="/jobs" className="btn btn-primary btn-lg">
                  Explore All Jobs
                </Link>
                <Link to="/jobs?experienceLevel=Entry+Level" className="btn btn-secondary btn-lg">
                  Entry Level & Internships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
