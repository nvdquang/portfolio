import React from 'react';
import { X, Download, Printer, Award, Mail, Github, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { language, t, getLocalized, portfolioData } = useLanguage();
  const { personalInfo, resumeInfo, skills, timeline } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(t('resume_download_alert'));
  };

  const researchFieldsList = (language === 'en' && portfolioData.researchFieldsEn) ? portfolioData.researchFieldsEn : portfolioData.researchFields;
  const teachingCoursesList = (language === 'en' && portfolioData.teachingCoursesEn) ? portfolioData.teachingCoursesEn : portfolioData.teachingCourses;
  const competenciesList = (language === 'en' && resumeInfo.competenciesEn) ? resumeInfo.competenciesEn : resumeInfo.competencies;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-bar">
          <div className="resume-modal-actions">
            <button onClick={handleDownload} className="btn btn-primary btn-sm">
              <Download size={16} />
              <span>{t('resume_btn_download')}</span>
            </button>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={16} />
              <span>{t('resume_btn_print')}</span>
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
                {getLocalized(personalInfo, 'degreeTitle')} {language === 'en' ? 'Computer Science' : 'Công nghệ Thông tin'} • {language === 'en' ? 'Lecturer at LHU' : 'Giảng viên ĐH Lạc Hồng'}
              </h2>
              <p className="cv-org">{getLocalized(personalInfo, 'institution')} - {getLocalized(personalInfo, 'department')}</p>
              {personalInfo.birthDate && (
                <p className="cv-sub-info">
                  <strong>{t('resume_dob')}</strong> {personalInfo.birthDate} | <strong>{t('resume_gender')}</strong> {getLocalized(personalInfo, 'gender')}
                </p>
              )}
            </div>
            <div className="cv-header-right">
              <div className="cv-contact-item">
                <Mail size={14} /> <span>{personalInfo.email}</span>
              </div>
              <div className="cv-contact-item">
                <Github size={14} /> <span>github.com/nvdquang</span>
              </div>
              {personalInfo.phone && (
                <div className="cv-contact-item">
                  <ShieldCheck size={14} /> <span>{t('resume_phone')} {personalInfo.phone}</span>
                </div>
              )}
              <div className="cv-contact-item">
                <ShieldCheck size={14} /> <span>{getLocalized(personalInfo, 'location')}</span>
              </div>
            </div>
          </header>

          <div className="cv-divider"></div>

          <section className="cv-section">
            <h3 className="cv-section-title">{t('resume_sec_1')}</h3>
            <p className="cv-text">{getLocalized(resumeInfo, 'summary')}</p>
            {researchFieldsList && (
              <div className="cv-research-box">
                <strong style={{ color: '#003882', display: 'block', marginBottom: '0.4rem' }}>{t('resume_sec_1_focus')}</strong>
                <ul className="cv-bullet-list">
                  {researchFieldsList.map((field, idx) => (
                    <li key={idx}>{field}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="cv-section">
            <h3 className="cv-section-title">{t('resume_sec_2')}</h3>
            <div className="cv-timeline">
              {timeline.map((item, idx) => (
                <div key={idx} className="cv-timeline-item">
                  <div className="cv-timeline-year">{getLocalized(item, 'year')}</div>
                  <div className="cv-timeline-body">
                    <h4 className="cv-timeline-title">{getLocalized(item, 'title')}</h4>
                    <p className="cv-timeline-org">{getLocalized(item, 'organization')}</p>
                    <p className="cv-timeline-desc">{getLocalized(item, 'description')}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {teachingCoursesList && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_3')}</h3>
              <div className="cv-skills-chips">
                {teachingCoursesList.map((course, idx) => (
                  <span key={idx} className="cv-skill-chip" style={{ background: '#eff6ff', color: '#003882', borderColor: '#bfdbfe' }}>
                    📖 {course}
                  </span>
                ))}
              </div>
            </section>
          )}

          {portfolioData.nckhProjects && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_4')}</h3>
              <div className="cv-table-wrapper">
                <table className="cv-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45px' }}>{t('resume_table_stt')}</th>
                      <th>{t('resume_table_title')}</th>
                      <th style={{ width: '180px' }}>{t('resume_table_level')}</th>
                      <th style={{ width: '70px' }}>{t('resume_table_year')}</th>
                      <th style={{ width: '110px' }}>{t('resume_table_role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.nckhProjects.map((proj) => (
                      <tr key={proj.stt}>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{proj.stt}</td>
                        <td style={{ fontWeight: '600' }}>{getLocalized(proj, 'title')}</td>
                        <td><span className="cv-level-badge">{getLocalized(proj, 'level')}</span></td>
                        <td style={{ textAlign: 'center' }}>{proj.year}</td>
                        <td style={{ fontWeight: '600', color: '#003882' }}>{getLocalized(proj, 'role')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {portfolioData.scientificPublications && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_5')}</h3>
              <div className="cv-table-wrapper">
                <table className="cv-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>{t('resume_table_year')}</th>
                      <th>{t('resume_table_title')}</th>
                      <th>{t('resume_table_level')}</th>
                      <th style={{ width: '120px' }}>{t('resume_table_role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.scientificPublications.map((pub, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{pub.year}</td>
                        <td style={{ fontWeight: '600' }}>{getLocalized(pub, 'title')}</td>
                        <td style={{ color: '#003882', fontWeight: '600' }}>{getLocalized(pub, 'journal')}</td>
                        <td>{getLocalized(pub, 'role')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {portfolioData.textbooks && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_6')}</h3>
              <div className="cv-table-wrapper">
                <table className="cv-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>{t('resume_table_year')}</th>
                      <th>{t('resume_table_title')}</th>
                      <th>{t('resume_table_publisher')}</th>
                      <th style={{ width: '120px' }}>{t('resume_table_role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.textbooks.map((tb, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{tb.year}</td>
                        <td style={{ fontWeight: '600' }}>{getLocalized(tb, 'title')}</td>
                        <td>{getLocalized(tb, 'publisher')}</td>
                        <td style={{ color: '#003882', fontWeight: '600' }}>{getLocalized(tb, 'role')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {portfolioData.awards && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_7')}</h3>
              <ul className="cv-bullet-list">
                {portfolioData.awards.map((aw, idx) => (
                  <li key={idx}>
                    <strong>[{aw.year}] {getLocalized(aw, 'award')}:</strong> {getLocalized(aw, 'title')} — <em style={{ color: '#475569' }}>{getLocalized(aw, 'contest')}</em>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {portfolioData.certificates && (
            <section className="cv-section">
              <h3 className="cv-section-title">{t('resume_sec_8')}</h3>
              <ul className="cv-bullet-list">
                {portfolioData.certificates.map((cert, idx) => (
                  <li key={idx}>
                    <strong>[{cert.date}] {getLocalized(cert, 'title')}</strong> ({getLocalized(cert, 'issuer')}) — <span>{getLocalized(cert, 'description')}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <style>{`
        .resume-modal-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 92vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .resume-modal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 56, 130, 0.1);
        }

        .resume-modal-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .cv-document {
          color: #1e293b;
          font-family: inherit;
        }

        .cv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .cv-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: #003882;
          margin-bottom: 0.3rem;
        }

        .cv-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #d97706;
          margin-bottom: 0.2rem;
        }

        .cv-org {
          font-size: 0.92rem;
          color: #475569;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .cv-sub-info {
          font-size: 0.85rem;
          color: #64748b;
        }

        .cv-header-right {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #475569;
        }

        .cv-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cv-divider {
          height: 2px;
          background: linear-gradient(90deg, #003882 0%, #d97706 100%);
          margin: 1.5rem 0;
          border-radius: 2px;
        }

        .cv-section {
          margin-bottom: 2rem;
        }

        .cv-section-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #003882;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 0.4rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .cv-text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #334155;
          margin-bottom: 1rem;
        }

        .cv-research-box {
          background: rgba(0, 56, 130, 0.04);
          border-left: 4px solid #003882;
          padding: 1rem;
          border-radius: 0 8px 8px 0;
          margin-top: 0.8rem;
        }

        .cv-bullet-list {
          margin: 0;
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: #334155;
        }

        .cv-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cv-timeline-item {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 1rem;
        }

        .cv-timeline-year {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.88rem;
          color: #d97706;
        }

        .cv-timeline-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0f172a;

        }

        .cv-timeline-org {
          font-size: 0.88rem;
          font-weight: 600;
          color: #003882;
          margin-bottom: 0.2rem;
        }

        .cv-timeline-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.5;
        }

        .cv-skills-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .cv-skill-chip {
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid;
        }

        .cv-table-wrapper {
          overflow-x: auto;
        }

        .cv-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }

        .cv-table th, .cv-table td {
          padding: 0.65rem 0.8rem;
          border: 1px solid #e2e8f0;
          text-align: left;
        }

        .cv-table th {
          background: #f8fafc;
          color: #003882;
          font-weight: 700;
        }

        .cv-level-badge {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          background: #f1f5f9;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
        }

        @media print {
          .resume-modal-bar {
            display: none !important;
          }
          .resume-modal-container {
            max-width: 100% !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .modal-backdrop {
            position: relative !important;
            background: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
