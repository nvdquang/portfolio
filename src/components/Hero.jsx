import React, { useState, useEffect } from 'react';
import { Mail, Github, FileText, ArrowRight, ShieldCheck, Award, GraduationCap, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero = ({ onOpenResume }) => {
  const { personalInfo } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Thạc sĩ Khoa học Máy tính / CNTT",
    "Giảng viên Khoa CNTT - ĐH Lạc Hồng",
    "Kỹ sư Phần mềm Senior & AI Systems"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Bio Column */}
          <div className="hero-content">
            <div className="hero-badge">
              <GraduationCap size={16} className="badge-icon" />
              <span>{personalInfo.institution}</span>
            </div>

            <h1 className="hero-title">
              Xin chào, Tôi là <br />
              <span className="gradient-text">{personalInfo.fullName}</span>
            </h1>

            <div className="role-typing-box">
              <Code size={18} className="role-icon" />
              <span className="role-text">{roles[roleIndex]}</span>
              <span className="cursor-blink">|</span>
            </div>

            <p className="hero-bio">
              {personalInfo.bioLong}
            </p>

            <div className="hero-cta-group">
              <a href="#contact" className="btn btn-primary">
                <span>Liên hệ công việc</span>
                <ArrowRight size={18} />
              </a>

              <a href="#projects" className="btn btn-secondary">
                <span>Xem dự án</span>
              </a>

              <button onClick={onOpenResume} className="btn btn-secondary">
                <FileText size={18} />
                <span>Xem CV</span>
              </button>
            </div>

            <div className="social-links-bar">
              <a
                href={`mailto:${personalInfo.email}`}
                className="social-btn"
                title={`Gửi email: ${personalInfo.email}`}
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
                {/* Generative SVG Avatar fallback with initials & LHU brand gradient */}
                <div className="avatar-graphic">
                  <div className="avatar-glow"></div>
                  <div className="avatar-circle">
                    <span className="avatar-initials">NV</span>
                  </div>
                </div>

                <div className="verified-badge">
                  <ShieldCheck size={18} />
                  <span>Giảng viên LHU</span>
                </div>
              </div>

              <div className="avatar-info">
                <h3 className="profile-name">{personalInfo.fullName}</h3>
                <p className="profile-degree">
                  <Award size={14} /> {personalInfo.degreeTitle} Công nghệ Thông tin
                </p>
                <p className="profile-org">{personalInfo.department}</p>
              </div>

              {/* Stats Matrix Grid */}
              <div className="stats-grid">
                {personalInfo.stats.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 8.5rem;
          padding-bottom: 5.5rem;
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
          gap: 0.6rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          background: rgba(0, 56, 130, 0.08);
          border: 1px solid rgba(0, 56, 130, 0.2);
          color: var(--color-primary);
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
        }

        .badge-icon {
          color: var(--color-primary);
        }

        .hero-title {
          font-size: 3.25rem;
          line-height: 1.15;
          margin-bottom: 1rem;
          color: #0f172a;
        }

        .role-typing-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.15);
          box-shadow: 0 4px 12px rgba(0, 56, 130, 0.05);
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          width: fit-content;
          color: var(--color-primary);
          font-family: var(--font-mono);
          font-size: 1.02rem;
          font-weight: 700;
        }

        .role-icon {
          color: var(--color-accent);
        }

        .cursor-blink {
          animation: blink 1s step-end infinite;
          color: var(--color-accent);
          font-weight: 700;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .hero-bio {
          color: var(--text-muted);
          font-size: 1.08rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.2rem;
        }

        .social-links-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 56, 130, 0.1);
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-md);
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.12);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.88rem;
          font-family: var(--font-mono);
          transition: var(--transition-smooth);
        }

        .social-btn:hover {
          color: var(--color-primary);
          border-color: rgba(0, 56, 130, 0.3);
          background: rgba(0, 56, 130, 0.05);
          transform: translateY(-2px);
        }

        /* Avatar Card */
        .avatar-glass-card {
          padding: 2rem;
          text-align: center;
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.12);
          box-shadow: 0 15px 35px -5px rgba(0, 44, 108, 0.08);
        }

        .avatar-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto 1.5rem auto;
        }

        .avatar-graphic {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;
          padding: 4px;
          background: linear-gradient(135deg, #003882 0%, #0284c7 50%, #d97706 100%);
        }

        .avatar-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.2) 0%, rgba(255,255,255,0) 70%);
          filter: blur(15px);
          z-index: 0;
        }

        .avatar-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .avatar-initials {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #003882 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .verified-badge {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.8rem;
          background: #ffffff;
          border: 1px solid rgba(5, 150, 105, 0.3);
          color: var(--color-emerald);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .profile-name {
          font-size: 1.4rem;
          margin-bottom: 0.3rem;
          color: #0f172a;
        }

        .profile-degree {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: var(--color-primary);
          font-size: 0.92rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .profile-org {
          color: var(--text-muted);
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(0, 56, 130, 0.1);
        }

        .stat-card {
          padding: 0.8rem;
          background: rgba(0, 56, 130, 0.03);
          border: 1px solid rgba(0, 56, 130, 0.08);
          border-radius: var(--radius-md);
        }

        .stat-value {
          display: block;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-primary);
          font-family: var(--font-mono);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-title {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </section>
  );
};
