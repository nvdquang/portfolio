import React, { useState } from 'react';
import { Layers, Github, ExternalLink, CheckCircle2, X, Sparkles, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all'
    ? projects
    : filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section bg-alt-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Sản phẩm & Đề tài</span>
          </div>
          <h2 className="section-title">Dự án & Nghiên cứu Nổi bật</h2>
          <p className="section-subtitle">
            Các hệ thống phần mềm, giải pháp công nghệ và mô hình ứng dụng AI tiêu biểu được xây dựng thực tế.
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả dự án
          </button>
          <button
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            ⭐ Nổi bật
          </button>
          <button
            className={`filter-btn ${filter === 'software' ? 'active' : ''}`}
            onClick={() => setFilter('software')}
          >
            Phần mềm & Web
          </button>
          <button
            className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            Trí tuệ nhân tạo (AI)
          </button>
          <button
            className={`filter-btn ${filter === 'academic' ? 'active' : ''}`}
            onClick={() => setFilter('academic')}
          >
            Hệ thống Đào tạo LHU
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-card">
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-img-overlay"></div>
                {project.featured && (
                  <span className="featured-badge">
                    <Sparkles size={12} /> Nổi bật
                  </span>
                )}
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Code2 size={15} />
                    <span>Chi tiết</span>
                  </button>

                  <div className="external-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link-btn"
                        title="Xem mã nguồn trên GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-link-btn"
                        title="Trải nghiệm Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-cover-img"
                />
              </div>

              <div className="modal-body">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-desc">{selectedProject.description}</p>

                <div className="modal-section-title">
                  <CheckCircle2 size={16} className="highlight-icon" /> Điểm nổi bật & Kết quả:
                </div>
                <ul className="modal-highlights">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Github size={18} />
                    <span>Mã nguồn trên GitHub</span>
                  </a>
                  {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <ExternalLink size={18} />
                      <span>Truy cập hệ thống</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .bg-alt-section {
          background-color: var(--bg-section-alt);
        }

        .project-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.5rem 1.2rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.15);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-btn:hover {
          color: var(--color-primary);
          border-color: rgba(0, 56, 130, 0.3);
        }

        .filter-btn.active {
          background: rgba(0, 56, 130, 0.08);
          border-color: rgba(0, 56, 130, 0.4);
          color: var(--color-primary);
          font-weight: 700;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }

        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .project-img-wrapper {
          position: relative;
          height: 190px;
          overflow: hidden;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 56, 130, 0) 40%, rgba(0, 44, 108, 0.4) 100%);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
          background: rgba(217, 119, 6, 0.9);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .project-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-title {
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
          line-height: 1.35;
          color: #0f172a;
        }

        .project-desc {
          color: var(--text-muted);
          font-size: 0.92rem;
          margin-bottom: 1.2rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          margin-top: auto;
        }

        .project-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 56, 130, 0.08);
        }

        .btn-sm {
          padding: 0.45rem 0.9rem;
          font-size: 0.85rem;
        }

        .external-links {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .icon-link-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: rgba(0, 56, 130, 0.04);
          border: 1px solid rgba(0, 56, 130, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: var(--transition-smooth);
          text-decoration: none;
        }

        .icon-link-btn:hover {
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.08);
          border-color: rgba(0, 56, 130, 0.25);
        }

        /* Modal styling */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-content {
          width: 100%;
          max-width: 650px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 0;
          background: #ffffff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .modal-cover-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-title {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          color: #0f172a;
        }

        .modal-desc {
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .modal-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
        }

        .highlight-icon {
          color: var(--color-primary);
        }

        .modal-highlights {
          list-style: none;
          margin-bottom: 1.5rem;
        }

        .modal-highlights li {
          position: relative;
          padding-left: 1.4rem;
          margin-bottom: 0.5rem;
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .modal-highlights li::before {
          content: "▹";
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: bold;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
