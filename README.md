# 💼 JobFinder – Modern Tech Job Portal Web Application

A responsive **Job Portal Web Application** built with **React.js (ES6+), Vanilla CSS3, React Router v6, and REST APIs**. Designed with a modern, glassmorphic UI aesthetic, JobFinder offers software developers and tech professionals an intuitive platform to browse, filter, search, bookmark, and apply for developer positions.

---

## 🌟 Live Features & Highlights

### 1. 🏠 Home Page
- **Hero Section**: High-impact headline, live statistics counter (1,500+ active roles, 450+ companies, 85% remote/hybrid), and quick search.
- **Unified Search Bar**: Integrated job title/keyword and location search with quick search tags (`React.js`, `Frontend`, `Remote`, `Entry Level`, `Node.js`).
- **Interactive Role Categories**: Browse roles by domain (Frontend Development, Full Stack, Backend, DevOps & Cloud, Mobile, QA, Design) with live job counts.
- **Curated Featured Jobs**: Highlights handpicked top openings with verified salaries and direct application pipelines.
- **Developer Value Pillars**: Highlights key platform advantages (Zero Ghost Jobs, Salary Transparency, Stack-First Matching, Direct Applications).

### 2. 🔍 Advanced Job Search & Filters (`/jobs`)
- **Real-Time Multi-Parameter Filtering**:
  - **Search Query**: Real-time matching across job titles, company names, descriptions, and tech stack tags.
  - **Location**: Filter by specific city, state, or remote keyword.
  - **Workplace Mode**: Remote, Hybrid, and On-site toggles.
  - **Experience Level**: Entry Level (0-2 yrs), Mid Level (2-5 yrs), Senior (5+ yrs), Lead/Principal.
  - **Employment Type**: Full-time, Part-time, Contract, Internship.
- **Dynamic Active Filter Tags**: Visual chips allowing users to view and dismiss active filters with a single click or clear all.
- **Sorting Options**:
  - Most Recent (default)
  - Highest Salary
  - Lowest Salary
  - Job Title (A–Z)
- **URL Parameter Synchronization**: Query parameters (`search`, `location`, `category`, `employmentType`, `experienceLevel`, etc.) are synchronized with the URL for shareable and bookmarkable searches.
- **Empty State**: Thoughtful feedback when no jobs match the query with a quick "Clear All Filters" button.

### 3. 📄 Detailed Job Overview (`/jobs/:id`)
- **Comprehensive Job Breakdown**:
  - Company branding badge, position title, location, work mode, employment type, and posted timestamp.
  - About the Role narrative.
  - Bulleted Key Responsibilities.
  - Qualifications, Requirements, and Skill Tags.
  - Perks & Benefits grid with visual checkmarks.
  - About the Company background.
- **Job Overview Summary Sidebar**: Sticky widget summarizing key job metadata.
- **Interactive "Apply Now" Modal**:
  - Modal form with backdrop blur.
  - Field validation (Full Name, valid Email address, Phone, Experience level, Portfolio/GitHub URL, and Resume upload simulation).
  - Loading animation during submission.
  - Instant success confirmation screen with unique Application Reference ID (`APP-...`) stored in `localStorage`.
- **Recommended Similar Jobs**: Algorithmic suggestion of 3 related jobs sharing the same category or experience level.
- **Share Job Action**: Copies direct job URL to clipboard with an interactive toast notification.

### 4. 🔖 Bookmarked / Saved Jobs (`/saved`)
- Save any job opportunity with a single click from the card or details page.
- Persistent storage using browser `localStorage`.
- Dynamic navbar badge displaying current count of saved jobs.
- Dedicated `/saved` page for reviewing and managing saved applications.

### 5. ⚡ Asynchronous State & Error Resilience
- **Realistic Network Latency Simulation**: 350ms–500ms API response simulation to model authentic cloud API behavior.
- **Skeleton Shimmer Loading Cards**: Modern animated skeleton loaders improve perceived performance during data fetching.
- **Graceful Error Handling**: Styled danger banners with retry action buttons when an error is caught.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 18** | Functional components, custom hooks, and React virtual DOM |
| **React Router v6** | Client-side routing (`BrowserRouter`, `Routes`, `Route`, `useSearchParams`, `useParams`) |
| **JavaScript (ES6+)** | Modern syntax, async/await, closures, promises, array methods |
| **HTML5 & CSS3** | Semantic markup, CSS Custom Properties (Design Tokens), Flexbox, CSS Grid |
| **Lucide React** | Clean, accessible SVG iconography |
| **Vite** | Lightning-fast development server, HMR, and optimized production bundler |
| **LocalStorage API** | Browser persistence for bookmarks and submitted job applications |

---

## 📂 Project Folder Structure

```
jobfinder-portal/
├── index.html                   # HTML5 Entry Point with Google Fonts & SEO tags
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration (port 3000)
├── README.md                    # Project documentation
└── src/
    ├── components/              # Modular, reusable UI components
    │   ├── Navbar/              # Navigation bar with responsive drawer & saved count
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   ├── SearchBar/           # Reusable search bar with keyword & location inputs
    │   │   ├── SearchBar.jsx
    │   │   └── SearchBar.css
    │   ├── JobCard/             # Job card component with badges & save toggle
    │   │   ├── JobCard.jsx
    │   │   └── JobCard.css
    │   ├── JobList/             # Job listings container with sort and empty state
    │   │   ├── JobList.jsx
    │   │   └── JobList.css
    │   ├── FilterPanel/         # Multi-filter sidebar (sticky desktop, drawer mobile)
    │   │   ├── FilterPanel.jsx
    │   │   └── FilterPanel.css
    │   ├── LoadingSpinner/      # Shimmer skeleton loader and spinning indicator
    │   │   ├── LoadingSpinner.jsx
    │   │   └── LoadingSpinner.css
    │   ├── ErrorMessage/        # Error banner with retry mechanism
    │   │   ├── ErrorMessage.jsx
    │   │   └── ErrorMessage.css
    │   ├── ApplyModal/          # Multi-step job application modal with validation
    │   │   ├── ApplyModal.jsx
    │   │   └── ApplyModal.css
    │   └── Footer/              # Footer with brand bio, links, and newsletter demo
    │       ├── Footer.jsx
    │       └── Footer.css
    ├── pages/                   # Application route pages
    │   ├── Home/                # Landing page with hero, categories, & featured roles
    │   │   ├── Home.jsx
    │   │   └── Home.css
    │   ├── Jobs/                # Main job search page with filters & sorting
    │   │   ├── Jobs.jsx
    │   │   └── Jobs.css
    │   ├── JobDetails/          # Deep-dive view of an individual job posting
    │   │   ├── JobDetails.jsx
    │   │   └── JobDetails.css
    │   ├── SavedJobs/           # Saved / bookmarked jobs page
    │   │   ├── SavedJobs.jsx
    │   │   └── SavedJobs.css
    │   └── NotFound/            # 404 Not Found page
    │       ├── NotFound.jsx
    │       └── NotFound.css
    ├── services/
    │   └── jobsApi.js           # REST API client & mock async service
    ├── data/
    │   └── mockJobs.js          # Realistic mock tech jobs dataset
    ├── context/
    │   ├── BookmarkContext.jsx  # Global bookmarking state with localStorage
    │   ├── ToastContext.jsx     # Floating notifications context
    │   └── Toast.css
    ├── App.jsx                  # Main routing configuration
    ├── App.js                   # Compatibility export
    ├── index.jsx                # React root mount
    ├── index.js                 # Compatibility entry
    └── index.css                # Global CSS design system and typography tokens
```

---

## 🔌 API Information & Architecture

The application abstracts all data interactions behind a clean REST service layer located in `src/services/jobsApi.js`. This architecture separates UI presentation from data access.

### API Methods:

1. **`fetchJobs(params)`**:
   - Simulates `GET /api/jobs?search=...&location=...&sortBy=...`
   - Accepts filtering parameters: `search`, `location`, `employmentTypes`, `experienceLevels`, `workplaceTypes`, `category`, and `sortBy`.
   - Simulates 450ms network delay.
   - Returns `{ success: true, total: number, count: number, jobs: [...] }`.

2. **`fetchJobById(id)`**:
   - Simulates `GET /api/jobs/:id`
   - Returns full job object plus 3 algorithmic `similarJobs`.
   - Throws 404 error if ID is invalid.

3. **`fetchFeaturedJobs()`**:
   - Returns curated jobs marked `featured: true` for the Home page.

4. **`fetchJobCategories()`**:
   - Returns categories with dynamic computed job counts.

5. **`submitJobApplication(jobId, applicationData)`**:
   - Simulates `POST /api/jobs/:id/apply`
   - Validates applicant info, prevents duplicate submissions, and generates reference ID `APP-<timestamp>`.
   - Persists submission to `localStorage`.

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js** (v18.x, v20.x, or higher)
- **npm** (v9.x or higher)

### 1. Clone or Open the Repository
```bash
cd sonu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm start
```
*Alternatively, you can run:*
```bash
npm run dev
```

The application will start immediately at:
👉 **`http://localhost:3000`**

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
Production assets will be emitted to the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📱 Responsive Design Verification
The user interface is designed mobile-first and tested across standard viewports:
- **Mobile (< 768px)**: Collapsible hamburger menu, responsive full-width cards, expandable filter toggle accordion.
- **Tablet (768px – 1024px)**: 2-column card grids, responsive search header.
- **Desktop (1024px+)**: Dual-column layout with sticky filter panel, 4-column category grids, and expansive hero showcase.

---

## 📄 License
This project is open-source and free to use for educational and portfolio demonstration purposes.
