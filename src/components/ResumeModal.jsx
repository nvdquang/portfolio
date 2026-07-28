import React from 'react';
import { X, Download, Printer, Award, Mail, Github, CheckCircle2, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { personalInfo, resumeInfo, skills, timeline } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Hồ sơ CV (PDF) của Thạc sĩ Nguyễn Vũ Duy Quang đang được tải xuống...");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-bar">
          <div className="resume-modal-actions">
            <button onClick={handleDownload} className="btn btn-primary btn-sm">
              <Download size={16} />
              <span>Tải file CV (PDF)</span>
            </button>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={16} />
              <span>In hồ sơ</span>
            </button>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Printable CV Document Content */}
        <div className="cv-document">
          <header className="cv-header">
            <div className="cv-header-left">
              <h1 className="cv-name">{personalInfo.fullName}</h1>
              <h2 className="cv-title">
                {personalInfo.degreeTitle} Công nghệ Thông tin • Giảng viên ĐH Lạc Hồng
              </h2>
              <p className="cv-org">{personalInfo.institution} - {personalInfo.department}</p>
            </div>
            <div className="cv-header-right">
              <div className="cv-contact-item">
                <Mail size={14} /> <span>{personalInfo.email}</span>
              </div>
              <div className="cv-contact-item">
                <Github size={14} /> <span>github.com/nvdquang</span>
              </div>
              <div className="cv-contact-item">
                <ShieldCheck size={14} /> <span>{personalInfo.location}</span>
              </div>
            </div>
          </header>

          <div className="cv-divider"></div>

          <section className="cv-section">
            <h3 className="cv-section-title">I. TÓM TẮT NĂNG LỰC CHUYÊN MÔN</h3>
            <p className="cv-text">{resumeInfo.summary}</p>
            <div className="cv-competencies-grid">
              {resumeInfo.competencies.map((comp, idx) => (
                <div key={idx} className="cv-comp-item">
                  <CheckCircle2 size={15} className="cv-comp-icon" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <h3 className="cv-section-title">II. QUÁ TRÌNH ĐÀO TẠO & CÔNG TÁC</h3>
            <div className="cv-timeline">
              {timeline.map((item, idx) => (
                <div key={idx} className="cv-timeline-item">
                  <div className="cv-timeline-year">{item.year}</div>
                  <div className="cv-timeline-body">
                    <h4 className="cv-timeline-title">{item.title}</h4>
                    <p className="cv-timeline-org">{item.organization}</p>
                    <p className="cv-timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <h3 className="cv-section-title">III. KỸ NĂNG CÔNG NGHỆ CHÍNH</h3>
            <div className="cv-skills-chips">
              {skills.map((s, idx) => (
                <span key={idx} className="cv-skill-chip">
                  {s.name} ({s.level}%)
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .resume-modal-container {
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2rem;
          background: #ffffff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .resume-modal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.8rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 56, 130, 0.1);
        }

        .resume-modal-actions {
          display: flex;
          gap: 0.8rem;
        }

        .cv-document {
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.12);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        .cv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .cv-name {
          font-size: 1.8rem;
          margin-bottom: 0.3rem;
          color: var(--color-primary);
        }

        .cv-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.2rem;
        }

        .cv-org {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .cv-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          margin-bottom: 0.4rem;
        }

        .cv-divider {
          height: 2px;
          background: linear-gradient(90deg, #003882 0%, #d97706 100%);
          margin-bottom: 1.8rem;
        }

        .cv-section {
          margin-bottom: 1.8rem;
        }

        .cv-section-title {
          font-size: 1.05rem;
          color: var(--color-primary);
          letter-spacing: 0.04em;
          margin-bottom: 0.8rem;
          font-family: var(--font-mono);
          font-weight: 800;
        }

        .cv-text {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
          font-size: 0.94rem;
        }

        .cv-competencies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 0.6rem;
        }

        .cv-comp-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #0f172a;
          font-weight: 500;
        }

        .cv-comp-icon {
          color: var(--color-emerald);
          flex-shrink: 0;
        }

        .cv-timeline-item {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .cv-timeline-year {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        .cv-timeline-title {
          font-size: 0.98rem;
          margin-bottom: 0.2rem;
          color: #0f172a;
        }

        .cv-timeline-org {
          font-size: 0.85rem;
          color: var(--color-accent);
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .cv-timeline-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .cv-skills-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .cv-skill-chip {
          padding: 0.3rem 0.6rem;
          background: rgba(0, 56, 130, 0.05);
          border: 1px solid rgba(0, 56, 130, 0.12);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .cv-document, .cv-document * {
            visibility: visible;
          }
          .cv-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            color: black;
          }
        }
      `}</style>
    </div>
  );
};
