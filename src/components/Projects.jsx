import React, { useState } from 'react';
import { Layers, Github, ExternalLink, CheckCircle2, X, Sparkles, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { language, t, getLocalized, portfolioData } = useLanguage();
  const { projects = [] } = portfolioData;
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
            <span>{t('projects_tag')}</span>
          </div>
          <h2 className="section-title">{t('projects_title')}</h2>
          <p className="section-subtitle">
            {t('projects_subtitle')}
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('projects_filter_all')}
          </button>
          <button
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            {t('projects_filter_featured')}
          </button>
          <button
            className={`filter-btn ${filter === 'software' ? 'active' : ''}`}
            onClick={() => setFilter('software')}
          >
            {t('projects_filter_software')}
          </button>
          <button
            className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            {t('projects_filter_ai')}
          </button>

          <button
            className={`filter-btn ${filter === 'architecture' ? 'active' : ''}`}
            onClick={() => setFilter('architecture')}
          >
            {t('projects_filter_academic')}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const projectTitle = getLocalized(project, 'title');
            const projectDesc = getLocalized(project, 'description');
            const projectTags = (language === 'en' && project.tagsEn && project.tagsEn.length) ? project.tagsEn : project.tags;

            return (
              <div key={project.id} className="project-card glass-card">
                <div className="project-img-wrapper">
                  <img src={project.image} alt={projectTitle} className="project-img" />
                  <div className="project-img-overlay"></div>
                  {project.featured && (
                    <span className="featured-badge">
                      <Sparkles size={12} /> {t('projects_badge_featured')}
                    </span>
                  )}
                </div>

                <div className="project-body">
                  <h3 className="project-title">{projectTitle}</h3>
                  <p className="project-desc">{projectDesc}</p>

                  <div className="project-tags">
                    {projectTags.map((tag, idx) => (
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
                      <span>{t('projects_btn_details')}</span>
                    </button>

                    <div className="external-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-icon-btn"
                          title={t('projects_modal_github')}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-icon-btn"
                          title={t('projects_modal_demo')}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div
              className="project-modal-container glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <h3 className="modal-project-title">
                  {getLocalized(selectedProject, 'title')}
                </h3>
              </div>

              <div className="modal-body">
                <img
                  src={selectedProject.image}
                  alt={getLocalized(selectedProject, 'title')}
                  className="modal-img"
                />

                <p className="modal-desc">
                  {getLocalized(selectedProject, 'description')}
                </p>

                {/* Highlights List */}
                {((language === 'en' && selectedProject.highlightsEn) || selectedProject.highlights) && (
                  <div className="modal-highlights">
                    <h4>{t('projects_modal_highlights')}</h4>
                    <ul>
                      {((language === 'en' && selectedProject.highlightsEn) ? selectedProject.highlightsEn : selectedProject.highlights).map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Github size={16} />
                    <span>{t('projects_modal_github')}</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink size={16} />
                    <span>{t('projects_modal_demo')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .bg-alt-section {
          background: rgba(248, 250, 252, 0.6);
        }

        .project-filters {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.6rem 1.3rem;
          border-radius: var(--radius-full);
          background: rgba(0, 56, 130, 0.04);
          border: 1px solid rgba(0, 56, 130, 0.12);
          color: #475569;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-btn:hover {
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.08);
        }

        .filter-btn.active {
          background: var(--color-primary);
          color: #ffffff;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 56, 130, 0.2);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }

        .project-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 56, 130, 0.12);
        }

        .project-img-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
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
          background: linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.4) 100%);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          background: rgba(217, 119, 6, 0.9);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .project-body {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.6rem;
          line-height: 1.35;
        }

        .project-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.2rem;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.4rem;
        }

        .badge {
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          background: rgba(0, 56, 130, 0.05);
          color: var(--color-primary);
          font-size: 0.76rem;
          font-weight: 600;
        }

        .project-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 56, 130, 0.08);
        }

        .external-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 56, 130, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .action-icon-btn:hover {
          background: var(--color-primary);
          color: #ffffff;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .project-modal-container {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
        }

        .modal-close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 50%;
          transition: var(--transition-smooth);
        }

        .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
        }

        .modal-project-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.2rem;
          padding-right: 2.5rem;
        }

        .modal-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: var(--radius-md);
          margin-bottom: 1.2rem;
        }

        .modal-desc {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .modal-highlights h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.8rem;
        }

        .modal-highlights ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .modal-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #334155;
        }

        .highlight-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.8rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
};
