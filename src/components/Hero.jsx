import React, { useState, useEffect } from 'react';
import { Mail, Github, FileText, ArrowRight, ShieldCheck, Award, GraduationCap, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import avatarImg from '../assets/QuangNVD.jpg';

export const Hero = ({ onOpenResume }) => {
  const { language, t, getLocalized, portfolioData } = useLanguage();
  const { personalInfo } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = t('hero_roles') || [
    "Thạc sĩ Khoa học Máy tính / CNTT",
    "Giảng viên Khoa CNTT - ĐH Lạc Hồng",
    "Chuyên gia phát triển phần mềm, Tư vấn công nghệ, Thiết kế hệ thống mạng, an toàn thông tin."
  ];

  const avatarSrc = personalInfo.avatarUrl || avatarImg;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const statsList = personalInfo.stats || [];

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Bio Column */}
          <div className="hero-content">
            <div className="hero-badge">
              <GraduationCap size={16} className="badge-icon" />
              <span>{getLocalized(personalInfo, 'institution')}</span>
            </div>

            <h1 className="hero-title">
              {t('hero_greeting')} <br />
              <span className="gradient-text">{personalInfo.fullName}</span>
            </h1>

            <div className="role-typing-box">
              <Code size={18} className="role-icon" />
              <span className="role-text">{roles[roleIndex % roles.length]}</span>
              <span className="cursor-blink">|</span>
            </div>

            <p className="hero-bio">
              {getLocalized(personalInfo, 'bioLong')}
            </p>

            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">
                <span>{t('hero_contact_btn')}</span>
                <ArrowRight size={18} />
              </a>

              <a href="#projects" className="btn btn-secondary">
                <span>{t('hero_projects_btn')}</span>
              </a>

              <button onClick={onOpenResume} className="btn btn-secondary">
                <FileText size={18} />
                <span>{t('hero_cv_btn')}</span>
              </button>
            </div>

            <div className="social-links-bar">
              <a
                href={`mailto:${personalInfo.email}`}
                className="social-btn"
                title={`Email: ${personalInfo.email}`}
              >
                <Mail size={18} />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="GitHub Profile"
              >
                <Github size={18} />
                <span>github.com/nvdquang</span>
              </a>
            </div>
          </div>

          {/* Right Visual / Avatar Card Column */}
          <div className="hero-visual">
            <div className="avatar-glass-card glass-card">
              <div className="avatar-wrapper">
                <div className="avatar-graphic">
                  <div className="avatar-glow"></div>
                  <div className="avatar-circle">
                    <img src={avatarSrc} alt={personalInfo.fullName} className="avatar-img-element" />
                  </div>
                </div>

                <div className="verified-badge">
                  <ShieldCheck size={18} />
                  <span>{t('hero_badge_lhu')}</span>
                </div>
              </div>

              <div className="avatar-info">
                <h3 className="profile-name">{personalInfo.fullName}</h3>
                <p className="profile-degree">
                  <Award size={14} /> {getLocalized(personalInfo, 'degreeTitle')} {t('hero_degree_sub')}
                </p>
                <p className="profile-org">{getLocalized(personalInfo, 'department')}</p>
              </div>

              {/* Stats Matrix Grid */}
              <div className="stats-grid">
                {statsList.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <span className="stat-value">{getLocalized(stat, 'value')}</span>
                    <span className="stat-label">{getLocalized(stat, 'label')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 8.5rem 0 5rem 0;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          background: rgba(0, 56, 130, 0.06);
          border: 1px solid rgba(0, 56, 130, 0.15);
          color: var(--color-primary);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3rem;
          line-height: 1.15;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin-bottom: 1.2rem;
        }

        .role-typing-box {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          max-width: 100%;
        }

        .role-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .cursor-blink {
          color: var(--color-accent);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-bio {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 2.2rem;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.2rem;
        }

        .social-links-bar {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .social-btn:hover {
          color: var(--color-primary);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .avatar-glass-card {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          border-radius: 24px;
          text-align: center;
          box-shadow: var(--shadow-glass);
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
        }

        .avatar-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .avatar-graphic {
          position: relative;
          width: 130px;
          height: 130px;
          margin: 0 auto;
        }

        .avatar-glow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
          opacity: 0.6;
          filter: blur(10px);
        }

        .avatar-circle {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #003882 0%, #d97706 100%);
          border: 4px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 56, 130, 0.2);
          overflow: hidden;
        }

        .avatar-img-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-initials {
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .verified-badge {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .avatar-info {
          margin-bottom: 1.5rem;
        }

        .profile-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.3rem;
        }

        .profile-degree {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          color: var(--color-accent);
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .profile-org {
          font-size: 0.84rem;
          color: #64748b;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(0, 56, 130, 0.1);
        }

        .stat-card {
          padding: 0.8rem;
          border-radius: var(--radius-md);
          background: rgba(0, 56, 130, 0.03);
          border: 1px solid rgba(0, 56, 130, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--color-primary);
        }

        .stat-label {
          font-size: 0.74rem;
          color: #64748b;
          margin-top: 0.2rem;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};
