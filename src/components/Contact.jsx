import React, { useState } from 'react';
import { Send, Mail, Github, MapPin, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact = () => {
  const { personalInfo } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section bg-alt-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Send size={14} />
            <span>Kết nối & Hợp tác</span>
          </div>
          <h2 className="section-title">Liên hệ Công việc & Nghiên cứu</h2>
          <p className="section-subtitle">
            Nếu bạn có thắc mắc, mong muốn trao đổi chuyên môn, hoặc đề xuất hợp tác nghiên cứu khoa học, vui lòng để lại tin nhắn.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Direct Info Cards */}
          <div className="contact-info">
            <div className="info-card glass-card">
              <div className="info-icon-box">
                <Mail size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">Email chính thức</span>
                <a href={`mailto:${personalInfo.email}`} className="info-val">
                  {personalInfo.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="copy-btn"
                title="Sao chép địa chỉ email"
              >
                {copied ? <Check size={18} className="copy-success" /> : <Copy size={18} />}
              </button>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon-box">
                <Github size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">Trang GitHub cá nhân</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-val"
                >
                  github.com/nvdquang
                </a>
              </div>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon-box">
                <MapPin size={22} />
              </div>
              <div className="info-body">
                <span className="info-label">Địa chỉ làm việc</span>
                <span className="info-val-static">
                  {personalInfo.institution} - TP. Đồng Nai
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="contact-form-container glass-card">
            {submitted ? (
              <div className="success-toast">
                <div className="toast-icon">
                  <Sparkles size={28} />
                </div>
                <h3>Cảm ơn bạn đã gửi tin nhắn!</h3>
                <p>
                  Tin nhắn của bạn đã được gửi thành công!({personalInfo.email}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Họ và tên *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Địa chỉ Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tiêu đề tin nhắn</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Đề xuất hợp tác dự án / Hợp tác nghiên cứu..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nội dung tin nhắn *</label>
                  <textarea
                    rows={5}
                    className="form-input form-textarea"
                    placeholder="Vui lòng nhập chi tiết nội dung trao đổi của bạn tại đây..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={18} />
                  <span>Gửi tin nhắn ngay</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .bg-alt-section {
          background-color: var(--bg-section-alt);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2rem;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .info-card {
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .info-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(0, 56, 130, 0.06);
          border: 1px solid rgba(0, 56, 130, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .info-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .info-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
          font-family: var(--font-mono);
        }

        .info-val {
          color: #0f172a;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.98rem;
          transition: var(--transition-smooth);
        }

        .info-val:hover {
          color: var(--color-primary);
        }

        .info-val-static {
          color: #0f172a;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .copy-btn {
          background: rgba(0, 56, 130, 0.04);
          border: 1px solid rgba(0, 56, 130, 0.12);
          color: var(--text-muted);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .copy-btn:hover {
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.1);
        }

        .copy-success {
          color: var(--color-emerald);
        }

        .contact-form-container {
          padding: 2.2rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
        }

        .form-input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.2);
          border-radius: var(--radius-md);
          color: #0f172a;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-smooth);
        }

        .form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 12px rgba(0, 56, 130, 0.15);
        }

        .form-textarea {
          resize: vertical;
        }

        .submit-btn {
          margin-top: 0.5rem;
          width: 100%;
        }

        .success-toast {
          text-align: center;
          padding: 2.5rem 1rem;
        }

        .toast-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(5, 150, 105, 0.1);
          border: 1px solid rgba(5, 150, 105, 0.3);
          color: var(--color-emerald);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.2rem auto;
        }

        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
