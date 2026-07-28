import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <Code2 size={20} className="footer-logo-icon" />
              <span>{personalInfo.fullName} ({personalInfo.degreeTitle})</span>
            </div>
            <p className="footer-tagline">
              {personalInfo.institution} • {personalInfo.department}
            </p>
          </div>

          <div className="footer-right">
            <button onClick={scrollToTop} className="back-to-top-btn" title="Về đầu trang">
              <span>Đầu trang</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
          <div className="built-with">
            <span>Thiết kế nhận diện LHU với React + Vite</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 3rem 0 2rem 0;
          border-top: 1px solid rgba(0, 56, 130, 0.1);
          background: #ffffff;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 800;
          font-size: 1.1rem;
          color: #0f172a;
          margin-bottom: 0.3rem;
        }

        .footer-logo-icon {
          color: var(--color-primary);
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.88rem;
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-full);
          background: rgba(0, 56, 130, 0.05);
          border: 1px solid rgba(0, 56, 130, 0.15);
          color: var(--color-primary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .back-to-top-btn:hover {
          color: #ffffff;
          background: var(--color-primary);
          border-color: var(--color-primary);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 56, 130, 0.08);
          font-size: 0.85rem;
          color: var(--text-dim);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .built-with {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
        }
      `}</style>
    </footer>
  );
};
