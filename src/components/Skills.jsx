import React, { useState } from 'react';
import { 
  Code, Layout, Server, Terminal, Cpu, Database, 
  Brain, Eye, MessageSquare, BarChart3, Box, GitBranch, 
  Cloud, Network, GraduationCap, BookOpen, Users, Sparkles, Shield, Lock, Award, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Code, Layout, Server, Terminal, Cpu, Database,
  Brain, Eye, MessageSquare, BarChart3, Box, GitBranch,
  Cloud, Network, GraduationCap, BookOpen, Users, Shield, Lock, Award, ShieldCheck
};

const defaultSkillCategories = [
  { id: 'all', name: 'Tất cả kỹ năng', nameEn: 'All Skills' },
  { id: 'software', name: 'Mạng & Bảo mật', nameEn: 'Network & Security' },
  { id: 'ai', name: 'AI & Học máy', nameEn: 'AI & Machine Learning' },
  { id: 'architecture', name: 'IoT & Định vị', nameEn: 'IoT & Location' },
  { id: 'academic', name: 'NCKH & Đào tạo', nameEn: 'R&D & Teaching' }
];

export const Skills = () => {
  const { language, t, getLocalized, portfolioData } = useLanguage();
  const { skillCategories, skills = [] } = portfolioData;
  const categories = (skillCategories && skillCategories.length) ? skillCategories : defaultSkillCategories;
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>{t('skills_tag')}</span>
          </div>
          <h2 className="section-title">{t('skills_title')}</h2>
          <p className="section-subtitle">
            {t('skills_subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {getLocalized(cat, 'name')}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <div key={index} className="skill-card glass-card">
                <div className="skill-card-top">
                  <div className="skill-icon-wrapper">
                    <IconComponent size={20} className="skill-icon" />
                  </div>
                  <div className="skill-info">
                    <h3 className="skill-name">{getLocalized(skill, 'name')}</h3>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* International Certificates Section */}
        {portfolioData.certificates && (
          <div className="certifications-container" style={{ marginTop: '4rem' }}>
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#003882', fontWeight: 800 }}>{t('skills_certs_title')}</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '0.3rem' }}>{t('skills_certs_subtitle')}</p>
            </div>

            <div className="certs-grid">
              {portfolioData.certificates.map((cert) => (
                <div key={cert.id} className="cert-card glass-card">
                  <div className="cert-badge-tag">{cert.date}</div>
                  <h4 className="cert-title">{getLocalized(cert, 'title')}</h4>
                  <p className="cert-issuer">🏢 {getLocalized(cert, 'issuer')}</p>
                  <p className="cert-desc">{getLocalized(cert, 'description')}</p>
                  {cert.validationNumber && (
                    <div className="cert-val">{cert.validationNumber}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .category-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-full);
          background: rgba(0, 56, 130, 0.04);
          border: 1px solid rgba(0, 56, 130, 0.12);
          color: #475569;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .tab-btn:hover {
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.08);
        }

        .tab-btn.active {
          background: var(--color-primary);
          color: #ffffff;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 56, 130, 0.2);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .skill-card {
          padding: 1.4rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.08);
          transition: var(--transition-smooth);
        }

        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 56, 130, 0.1);
          border-color: rgba(0, 56, 130, 0.2);
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .skill-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0, 56, 130, 0.06);
          border: 1px solid rgba(0, 56, 130, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .skill-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .skill-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
        }

        .skill-percent {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-accent);
        }

        .progress-bar-bg {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(0, 56, 130, 0.08);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
          transition: width 1s ease-out;
        }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .cert-card {
          position: relative;
          padding: 1.5rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
          border-radius: var(--radius-lg);
          transition: var(--transition-smooth);
        }

        .cert-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 56, 130, 0.08);
        }

        .cert-badge-tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: rgba(217, 119, 6, 0.1);
          color: var(--color-accent);
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          margin-bottom: 0.8rem;
          font-family: var(--font-mono);
        }

        .cert-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.4rem;
        }

        .cert-issuer {
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .cert-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
        }

        .cert-val {
          margin-top: 0.8rem;
          padding-top: 0.6rem;
          border-top: 1px dashed rgba(0, 0, 0, 0.1);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #94a3b8;
        }
      `}</style>
    </section>
  );
};
