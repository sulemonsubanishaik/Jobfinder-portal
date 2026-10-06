import React, { useState } from 'react';
import { X, CheckCircle, Upload, Loader2, Send } from 'lucide-react';
import { submitJobApplication } from '../../services/jobsApi';
import { useToast } from '../../context/ToastContext';
import './ApplyModal.css';

export default function ApplyModal({ job, isOpen, onClose, onAppliedSuccess }) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    experienceYears: '1-2',
    coverLetter: '',
    resumeName: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }
    if (!formData.resumeName) {
      errs.resumeName = 'Please upload your resume (PDF/DOCX)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeName: file.name }));
      if (errors.resumeName) {
        setErrors((prev) => ({ ...prev, resumeName: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await submitJobApplication(job.id, formData);
      setSuccessResult(response);
      showToast(`Application submitted to ${job.company}!`, 'success');
      if (onAppliedSuccess) onAppliedSuccess(response);
    } catch (err) {
      showToast(err.message || 'Failed to submit application', 'error');
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessResult(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-overlay" onClick={handleClose} />
      <div className="modal-card">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 id="modal-title" className="modal-title">
              Apply for {job.title}
            </h2>
            <p className="modal-subtitle">
              at <strong>{job.company}</strong> • {job.location}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {successResult ? (
            <div className="application-success-view">
              <div className="success-icon-box">
                <CheckCircle size={48} />
              </div>
              <h3 className="success-title">Application Submitted!</h3>
              <p className="success-desc">
                Your application for <strong>{job.title}</strong> has been received by the recruiting team at <strong>{job.company}</strong>.
              </p>
              <div className="success-meta-card">
                <div>
                  <span className="success-label">Application Reference:</span>
                  <span className="success-val">{successResult.applicationId}</span>
                </div>
                <div>
                  <span className="success-label">Confirmation Sent To:</span>
                  <span className="success-val">{formData.email}</span>
                </div>
              </div>
              <p className="success-hint">
                You will receive status updates directly in your email inbox within 3-5 business days.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-block mt-4"
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="apply-form" noValidate>
              {errors.submit && (
                <div className="form-error-banner" role="alert">
                  {errors.submit}
                </div>
              )}

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                  placeholder="e.g. Alex Johnson"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="field-error-msg">{errors.fullName}</p>}
              </div>

              {/* Email & Phone grid */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="field-error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="field-error-msg">{errors.phone}</p>}
                </div>
              </div>

              {/* Portfolio / GitHub & Experience */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="portfolioUrl" className="form-label">
                    Portfolio / GitHub URL
                  </label>
                  <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    className="form-input"
                    placeholder="https://github.com/alex"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experienceYears" className="form-label">
                    Years of Experience
                  </label>
                  <select
                    id="experienceYears"
                    name="experienceYears"
                    className="form-input"
                    value={formData.experienceYears}
                    onChange={handleChange}
                  >
                    <option value="0-1">0 - 1 years (Entry)</option>
                    <option value="1-2">1 - 2 years</option>
                    <option value="3-5">3 - 5 years (Mid)</option>
                    <option value="5+">5+ years (Senior)</option>
                  </select>
                </div>
              </div>

              {/* Resume File Upload Simulation */}
              <div className="form-group">
                <label className="form-label">
                  Resume / CV <span className="required-star">*</span>
                </label>
                <div className={`file-upload-box ${errors.resumeName ? 'has-error' : ''}`}>
                  <input
                    type="file"
                    id="resumeUpload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="file-input-hidden"
                  />
                  <label htmlFor="resumeUpload" className="file-upload-label">
                    <Upload size={22} className="upload-icon" />
                    <div className="file-upload-text">
                      {formData.resumeName ? (
                        <span className="file-selected-name">
                          Selected: <strong>{formData.resumeName}</strong>
                        </span>
                      ) : (
                        <>
                          <span className="upload-main-text">Click to upload resume</span>
                          <span className="upload-sub-text">PDF, DOCX up to 5MB</span>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                {errors.resumeName && <p className="field-error-msg">{errors.resumeName}</p>}
              </div>

              {/* Cover Letter / Note */}
              <div className="form-group">
                <label htmlFor="coverLetter" className="form-label">
                  Cover Note / Why are you a good fit? (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={3}
                  className="form-input form-textarea"
                  placeholder="Tell the hiring manager why you are passionate about this role..."
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary submit-app-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
