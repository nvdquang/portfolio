import React, { useState } from 'react';
import { Send, Mail, Github, MapPin, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { language, t, getLocalized, portfolioData } = useLanguage();
  const { personalInfo } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert(t('contact_form_validation'));
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section bg-alt-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Send size={14} />
            <span>{t('contact_tag')}</span>
          </div>
          <h2 className="section-title">{t('contact_title')}</h2>
          <p className="section-subtitle">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Direct Info Cards */}
          <div className="contact-info">
            <div className="info-card glass-card">
              <div className="info-icon-box">
                <Mail size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">{t('contact_email_label')}</span>
                <a href={`mailto:${personalInfo.email}`} className="info-val">
                  {personalInfo.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="copy-btn"
                title="Copy Email"
              >
                {copied ? <Check size={18} className="copy-success" /> : <Copy size={18} />}
              </button>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon-box">
                <Github size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">{t('contact_github_label')}</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-val"
                >
                  github.com/nvdquang
                </a>
              </div>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon-box">
                <MapPin size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">{t('contact_office_label')}</span>
                <span className="info-val-static">
                  {getLocalized(personalInfo, 'officeAddress') || `${getLocalized(personalInfo, 'institution')} - Dong Nai`}
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="contact-form-container glass-card">
            {submitted ? (
              <div className="success-toast">
                <div className="toast-icon">
                  <Sparkles size={28} />
                </div>
                <h3>{t('contact_form_success_title')}</h3>
                <p>{t('contact_form_success_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-heading">{t('contact_form_title')}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact_form_name')}</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('contact_form_email')}</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact_form_subject')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact_form_msg')}</label>
                  <textarea
                    rows={4}
                    className="form-input form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn">
                  <span>{t('contact_form_send')}</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .info-card {
          padding: 1.4rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          gap: 1.2rem;
          position: relative;
        }

        .info-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(0, 56, 130, 0.06);
          border: 1px solid rgba(0, 56, 130, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .info-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .info-label {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;

        }

        .info-val {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
        }

        .info-val:hover {
          text-decoration: underline;
        }

        .info-val-static {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
        }

        .copy-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: var(--transition-smooth);
        }

        .copy-btn:hover {
          background: rgba(0, 56, 130, 0.08);
          color: var(--color-primary);
        }

        .copy-success {
          color: #10b981;
        }

        .contact-form-container {
          padding: 2rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .form-heading {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.4rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(0, 56, 130, 0.18);
          font-size: 0.92rem;
          transition: var(--transition-smooth);
          outline: none;
        }

        .form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(0, 56, 130, 0.1);
        }

        .form-textarea {
          resize: vertical;
        }

        .form-submit-btn {
          margin-top: 0.5rem;
          width: 100%;
          justify-content: center;
        }

        .success-toast {
          text-align: center;
          padding: 2.5rem 1.5rem;
        }

        .toast-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.2rem auto;
        }

        .success-toast h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .success-toast p {
          color: #64748b;
          font-size: 0.95rem;
        }

        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
