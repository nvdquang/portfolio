import React from 'react';
import { Briefcase, GraduationCap, Clock, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Timeline = () => {
  const { timeline } = portfolioData;

  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Clock size={14} />
            <span>Hành trình sự nghiệp</span>
          </div>
          <h2 className="section-title">Quá trình Đào tạo & Kinh nghiệm</h2>
          <p className="section-subtitle">
            Cột mốc quá trình học tập nâng cao trình độ chuyên môn Thạc sĩ và quá trình công tác tại Đại học Lạc Hồng.
          </p>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {timeline.map((item, index) => {
            const isWork = item.type === 'work';
            const Icon = isWork ? Briefcase : GraduationCap;

            return (
              <div key={index} className="timeline-item">
                <div className="timeline-dot">
                  <Icon size={18} className="dot-icon" />
                </div>

                <div className="timeline-content glass-card">
                  <div className="timeline-header">
                    <span className="timeline-year">
                      <Calendar size={13} /> {item.year}
                    </span>
                    <span className={`badge ${isWork ? 'badge-work' : 'badge-edu'}`}>
                      {isWork ? 'Công tác & Giảng dạy' : 'Đào tạo học vị'}
                    </span>
                  </div>

                  <h3 className="timeline-item-title">{item.title}</h3>
                  <h4 className="timeline-org">{item.organization}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .timeline-wrapper {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(0, 56, 130, 0.6) 0%, rgba(217, 119, 6, 0.6) 100%);
          box-shadow: 0 0 8px rgba(0, 56, 130, 0.15);
        }

        .timeline-item {
          position: relative;
          padding-left: 70px;
          margin-bottom: 2.5rem;
        }

        .timeline-dot {
          position: absolute;
          left: 8px;
          top: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 56, 130, 0.15);
          z-index: 2;
        }

        .timeline-content {
          padding: 1.6rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .timeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .timeline-year {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        .badge-work {
          background: rgba(0, 56, 130, 0.08);
          color: var(--color-primary);
          border-color: rgba(0, 56, 130, 0.2);
        }

        .badge-edu {
          background: rgba(217, 119, 6, 0.1);
          color: var(--color-accent);
          border-color: rgba(217, 119, 6, 0.25);
        }

        .timeline-item-title {
          font-size: 1.25rem;
          margin-bottom: 0.3rem;
          color: #0f172a;
        }

        .timeline-org {
          color: var(--color-primary);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .timeline-desc {
          color: var(--text-muted);
          font-size: 0.94rem;
          line-height: 1.65;
        }

        @media (max-width: 600px) {
          .timeline-item {
            padding-left: 55px;
          }
          .timeline-line {
            left: 20px;
          }
          .timeline-dot {
            left: 0;
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};
