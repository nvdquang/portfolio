import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles, FileText, Send, Layers, User, ShieldCheck } from 'lucide-react';

export const Header = ({ onOpenResume, onOpenDashboard }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Giới thiệu', href: '#hero', icon: User },
    { name: 'Kỹ năng', href: '#skills', icon: Sparkles },
    { name: 'Dự án', href: '#projects', icon: Layers },
    { name: 'Lộ trình', href: '#timeline', icon: Code2 },
    { name: 'Liên hệ', href: '#contact', icon: Send }
  ];

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#hero" className="logo">
          <div className="logo-icon">
            <Code2 size={22} className="logo-svg" />
          </div>
          <div className="logo-text">
            <span className="logo-name">Nguyễn Vũ Duy Quang</span>
            <span className="logo-badge">Thạc sĩ • ĐH Lạc Hồng</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.name} href={link.href} className="nav-link">
                <Icon size={16} />
                <span>{link.name}</span>
              </a>
            );
          })}

          <button onClick={onOpenResume} className="btn btn-secondary resume-btn">
            <FileText size={16} />
            <span>Hồ sơ CV</span>
          </button>

          <button onClick={onOpenDashboard} className="btn btn-primary dash-nav-btn">
            <ShieldCheck size={16} />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </a>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="btn btn-secondary mobile-cv-btn"
          >
            <FileText size={18} />
            <span>Xem Hồ sơ CV (PDF)</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDashboard();
            }}
            className="btn btn-primary mobile-cv-btn"
          >
            <ShieldCheck size={18} />
            <span>Quản trị Dashboard</span>
          </button>
        </div>
      )}

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.25rem 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-scrolled {
          padding: 0.75rem 0;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 56, 130, 0.1);
          box-shadow: 0 4px 20px rgba(0, 44, 108, 0.08);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(0, 56, 130, 0.1) 0%, rgba(217, 119, 6, 0.15) 100%);
          border: 1px solid rgba(0, 56, 130, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 56, 130, 0.1);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-name {
          font-weight: 800;
          font-size: 1.05rem;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .logo-badge {
          font-size: 0.72rem;
          color: var(--color-accent);
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #334155;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          transition: var(--transition-smooth);
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .nav-link:hover {
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.06);
        }

        .resume-btn {
          padding: 0.55rem 1.1rem;
          font-size: 0.88rem;
        }

        .dash-nav-btn {
          padding: 0.55rem 1.1rem;
          font-size: 0.88rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: #0f172a;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          background: rgba(0, 56, 130, 0.04);
        }

        .mobile-cv-btn {
          margin-top: 0.3rem;
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};
