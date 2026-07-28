import React, { useState } from 'react';
import { 
  Code, Layout, Server, Terminal, Cpu, Database, 
  Brain, Eye, MessageSquare, BarChart3, Box, GitBranch, 
  Cloud, Network, GraduationCap, BookOpen, Users, Sparkles 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Code, Layout, Server, Terminal, Cpu, Database,
  Brain, Eye, MessageSquare, BarChart3, Box, GitBranch,
  Cloud, Network, GraduationCap, BookOpen, Users
};

export const Skills = () => {
  const { skillCategories, skills } = portfolioData;
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
            <span>Năng lực Chuyên môn</span>
          </div>
          <h2 className="section-title">Kỹ năng & Chuyên môn Công nghệ</h2>
          <p className="section-subtitle">
            Tập hợp các công nghệ, kỹ thuật phát triển hệ thống và phương pháp giảng dạy được tích lũy trong quá trình làm việc và nghiên cứu.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
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
                    <h3 className="skill-name">{skill.name}</h3>
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
      </div>

      <style>{`
        .category-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 3rem;
        }

        .tab-btn {
          padding: 0.6rem 1.3rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.15);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .tab-btn:hover {
          color: var(--color-primary);
          border-color: rgba(0, 56, 130, 0.3);
          background: rgba(0, 56, 130, 0.04);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, rgba(0, 56, 130, 0.1) 0%, rgba(217, 119, 6, 0.12) 100%);
          border-color: rgba(0, 56, 130, 0.4);
          color: var(--color-primary);
          box-shadow: 0 4px 14px rgba(0, 56, 130, 0.12);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.4rem;
        }

        .skill-card {
          padding: 1.25rem 1.5rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
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
          border-radius: var(--radius-md);
          background: rgba(0, 56, 130, 0.06);
          border: 1px solid rgba(0, 56, 130, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .skill-info {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .skill-name {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0f172a;
        }

        .skill-percent {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: rgba(0, 56, 130, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #003882 0%, #0284c7 100%);
          border-radius: var(--radius-full);
          transition: width 1s ease-in-out;
        }
      `}</style>
    </section>
  );
};
