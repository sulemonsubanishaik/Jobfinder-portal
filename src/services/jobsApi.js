import { mockJobs, jobCategories } from '../data/mockJobs';

// Helper for simulated network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retrieve user applied jobs from localStorage
const getStoredApplications = () => {
  try {
    const raw = localStorage.getItem('jobfinder_applications');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * Fetch jobs with optional filtering, search, and sorting.
 * Simulates a REST API GET /api/jobs endpoint.
 */
export async function fetchJobs(params = {}) {
  await delay(450); // Simulate network latency

  const {
    search = '',
    location = '',
    employmentTypes = [],
    experienceLevels = [],
    workplaceTypes = [],
    category = '',
    sortBy = 'recent',
    simulateError = false
  } = params;

  if (simulateError) {
    throw new Error('Failed to retrieve jobs from the server. Please try again.');
  }

  let results = [...mockJobs];

  // 1. Search Query (Title, Company, Skills, Description)
  if (search.trim()) {
    const query = search.trim().toLowerCase();
    results = results.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(query);
      const matchCompany = job.company.toLowerCase().includes(query);
      const matchDesc = job.description.toLowerCase().includes(query);
      const matchSkills = job.skills.some((s) => s.toLowerCase().includes(query));
      const matchCategory = job.category.toLowerCase().includes(query);
      return matchTitle || matchCompany || matchDesc || matchSkills || matchCategory;
    });
  }

  // 2. Location filter
  if (location.trim()) {
    const locQuery = location.trim().toLowerCase();
    results = results.filter((job) =>
      job.location.toLowerCase().includes(locQuery) ||
      (locQuery === 'remote' && (job.workplaceType.toLowerCase() === 'remote' || job.location.toLowerCase().includes('remote')))
    );
  }

  // 3. Employment Type filter
  if (employmentTypes && employmentTypes.length > 0) {
    results = results.filter((job) =>
      employmentTypes.some((type) => type.toLowerCase() === job.employmentType.toLowerCase())
    );
  }

  // 4. Experience Level filter
  if (experienceLevels && experienceLevels.length > 0) {
    results = results.filter((job) =>
      experienceLevels.some((exp) => exp.toLowerCase() === job.experienceLevel.toLowerCase())
    );
  }

  // 5. Workplace Type (Remote / Hybrid / On-site)
  if (workplaceTypes && workplaceTypes.length > 0) {
    results = results.filter((job) =>
      workplaceTypes.some((wp) => wp.toLowerCase() === job.workplaceType.toLowerCase())
    );
  }

  // 6. Category filter
  if (category && category !== 'All') {
    results = results.filter((job) => job.category.toLowerCase() === category.toLowerCase());
  }

  // 7. Sorting
  if (sortBy === 'recent') {
    results.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  } else if (sortBy === 'salary-desc') {
    results.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sortBy === 'salary-asc') {
    results.sort((a, b) => a.salaryMin - b.salaryMin);
  } else if (sortBy === 'title-asc') {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return {
    success: true,
    total: mockJobs.length,
    count: results.length,
    jobs: results
  };
}

/**
 * Fetch a single job by its ID.
 * Simulates a REST API GET /api/jobs/:id endpoint.
 */
export async function fetchJobById(id) {
  await delay(350);

  const job = mockJobs.find((j) => j.id === id);
  if (!job) {
    const error = new Error(`Job with ID "${id}" was not found.`);
    error.statusCode = 404;
    throw error;
  }

  // Find 2-3 similar jobs based on category or skills
  const similarJobs = mockJobs
    .filter((j) => j.id !== id && (j.category === job.category || j.experienceLevel === job.experienceLevel))
    .slice(0, 3);

  return {
    success: true,
    job,
    similarJobs
  };
}

/**
 * Fetch featured jobs for the landing page.
 */
export async function fetchFeaturedJobs() {
  await delay(300);
  const featured = mockJobs.filter((j) => j.featured).slice(0, 6);
  return {
    success: true,
    jobs: featured
  };
}

/**
 * Fetch job categories with dynamic job counts.
 */
export async function fetchJobCategories() {
  await delay(200);
  const categoriesWithCounts = jobCategories.map((cat) => {
    const count = mockJobs.filter((j) => j.category === cat.name).length;
    return { ...cat, count };
  });

  return {
    success: true,
    categories: categoriesWithCounts
  };
}

/**
 * Submit a job application.
 * Simulates a REST API POST /api/jobs/:id/apply endpoint.
 */
export async function submitJobApplication(jobId, applicationData) {
  await delay(600); // Simulate network latency

  const job = mockJobs.find((j) => j.id === jobId);
  if (!job) {
    throw new Error('Cannot apply: Job no longer exists.');
  }

  const existingApps = getStoredApplications();
  const alreadyApplied = existingApps.some((a) => a.jobId === jobId && a.email.toLowerCase() === applicationData.email.toLowerCase());

  if (alreadyApplied) {
    throw new Error('You have already submitted an application for this position.');
  }

  const newApplication = {
    id: `APP-${Date.now()}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    appliedAt: new Date().toISOString(),
    ...applicationData
  };

  const updatedApps = [newApplication, ...existingApps];
  localStorage.setItem('jobfinder_applications', JSON.stringify(updatedApps));

  return {
    success: true,
    applicationId: newApplication.id,
    message: 'Application submitted successfully!'
  };
}

/**
 * Check if the user has already applied for a specific job.
 */
export function hasAppliedToJob(jobId, email = '') {
  const apps = getStoredApplications();
  if (email) {
    return apps.some((a) => a.jobId === jobId && a.email.toLowerCase() === email.toLowerCase());
  }
  return apps.some((a) => a.jobId === jobId);
}

/**
 * Get all submitted applications.
 */
export function getUserApplications() {
  return getStoredApplications();
}
