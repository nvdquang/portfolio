import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, LogIn, LogOut, Save, RotateCcw, Download, Plus, Trash2, 
  Edit3, CheckCircle2, User, Sparkles, Layers, Clock, ArrowLeft, ShieldCheck, AlertCircle,
  Eye, EyeOff
} from 'lucide-react';
import { initialPortfolioData, savePortfolioDataToStorage, resetPortfolioDataToStorage } from '../data/portfolioData';

export const Dashboard = ({ portfolioData, onUpdateData, onReturnHome }) => {
  // Auth credentials
  const AUTH_USER = "nvdquang";
  const AUTH_PASS = "Qu@ngnvd123";

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('nvdquang_admin_auth') === 'true';
  });

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // info, skills, projects, timeline
  const [data, setData] = useState(portfolioData);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setData(portfolioData);
  }, [portfolioData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === AUTH_USER && loginForm.password === AUTH_PASS) {
      setIsLoggedIn(true);
      sessionStorage.setItem('nvdquang_admin_auth', 'true');
      setLoginError('');
      showToast('Đăng nhập Quản trị viên thành công!');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('nvdquang_admin_auth');
  };

  const handleSave = () => {
    savePortfolioDataToStorage(data);
    onUpdateData(data);
    showToast('Đã lưu và cập nhật dữ liệu thành công!');
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định ban đầu không?")) {
      const resetData = resetPortfolioDataToStorage();
      setData(resetData);
      onUpdateData(resetData);
      showToast('Đã khôi phục dữ liệu ban đầu!');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolioData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Đã tải xuống file portfolioData.json!');
  };

  // Field change handler for personalInfo
  const handleInfoChange = (field, val) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: val
      }
    }));
  };

  // Skill Add / Update / Delete
  const handleAddSkill = () => {
    const newSkill = { name: "Kỹ năng mới", level: 80, category: "software", icon: "Code" };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const handleUpdateSkill = (index, field, val) => {
    const updated = [...data.skills];
    updated[index] = { ...updated[index], [field]: val };
    setData((prev) => ({ ...prev, skills: updated }));
  };

  const handleDeleteSkill = (index) => {
    const updated = data.skills.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, skills: updated }));
  };

  // Project Add / Update / Delete
  const handleAddProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      title: "Tên dự án mới",
      description: "Mô tả dự án mới...",
      category: "software",
      tags: ["React", "Node.js"],
      githubUrl: "https://github.com/nvdquang",
      demoUrl: "https://lhu.edu.vn",
      featured: false,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      highlights: ["Điểm nổi bật của dự án"]
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const handleUpdateProject = (index, field, val) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: val };
    setData((prev) => ({ ...prev, projects: updated }));
  };

  const handleDeleteProject = (index) => {
    const updated = data.projects.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, projects: updated }));
  };

  // Timeline Add / Update / Delete
  const handleAddTimeline = () => {
    const newItem = {
      year: "2026",
      title: "Vị trí / Cột mốc mới",
      organization: "Trường Đại học Lạc Hồng (LHU)",
      description: "Mô tả chi tiết cột mốc công tác...",
      type: "work"
    };
    setData((prev) => ({
      ...prev,
      timeline: [newItem, ...prev.timeline]
    }));
  };

  const handleUpdateTimeline = (index, field, val) => {
    const updated = [...data.timeline];
    updated[index] = { ...updated[index], [field]: val };
    setData((prev) => ({ ...prev, timeline: updated }));
  };

  const handleDeleteTimeline = (index) => {
    const updated = data.timeline.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, timeline: updated }));
  };

  // If not logged in, render Login View
  if (!isLoggedIn) {
    return (
      <div className="admin-login-screen">
        <div className="login-card">
          <div className="login-header">
            <div className="login-brand-badge">
              <ShieldCheck size={26} className="brand-badge-icon" />
              <span>LHU Administrative Portal</span>
            </div>
            <h2 className="login-title">Đăng Nhập Quản Trị</h2>
            <p className="login-subtitle">Hồ sơ Năng lực Thạc sĩ Nguyễn Vũ Duy Quang</p>
          </div>

          {loginError && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            {/* Username Field */}
            <div className="modern-form-group">
              <label className="modern-label">
                <span>Tài khoản truy cập</span>
                <span className="label-badge">Required</span>
              </label>
              <div className="input-field-wrapper">
                <div className="field-icon-box">
                  <User size={19} className="field-icon" />
                </div>
                <input
                  type="text"
                  className="modern-input"
                  placeholder="Nhập tên đăng nhập (vd: nvdquang)"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="modern-form-group">
              <label className="modern-label">
                <span>Mật khẩu bảo mật</span>
                <span className="label-badge">Protected</span>
              </label>
              <div className="input-field-wrapper">
                <div className="field-icon-box">
                  <Lock size={19} className="field-icon" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="modern-input password-input"
                  placeholder="Nhập mật khẩu truy cập"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button type="submit" className="btn btn-primary login-btn">
              <LogIn size={18} />
              <span>Xác thực & Truy cập Dashboard</span>
            </button>
          </form>

          <div className="login-footer">
            <button onClick={onReturnHome} className="back-link-btn">
              <ArrowLeft size={16} />
              <span>Quay lại trang chính Portfolio</span>
            </button>
          </div>
        </div>

        <style>{`
          .admin-login-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1.5rem;
            background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
            position: relative;
            overflow: hidden;
          }

          .admin-login-screen::before {
            content: '';
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 56, 130, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
            top: -10%;
            left: -10%;
            pointer-events: none;
          }

          .admin-login-screen::after {
            content: '';
            position: absolute;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
            bottom: -5%;
            right: -5%;
            pointer-events: none;
          }

          .login-card {
            width: 100%;
            max-width: 460px;
            padding: 2.8rem 2.4rem;
            background: #ffffff;
            border: 1px solid rgba(0, 56, 130, 0.14);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 44, 108, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            z-index: 10;
          }

          .login-header {
            text-align: center;
            margin-bottom: 2.2rem;
          }

          .login-brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 1rem;
            border-radius: 9999px;
            background: rgba(0, 56, 130, 0.06);
            border: 1px solid rgba(0, 56, 130, 0.18);
            color: #003882;
            font-size: 0.82rem;
            font-weight: 700;
            font-family: var(--font-mono);
            margin-bottom: 1.2rem;
          }

          .brand-badge-icon {
            color: #d97706;
          }

          .login-title {
            font-size: 1.65rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
            margin-bottom: 0.35rem;
          }

          .login-subtitle {
            color: #64748b;
            font-size: 0.92rem;
            font-weight: 500;
          }

          .login-error-alert {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.85rem 1.1rem;
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.06);
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
          }

          .modern-form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .modern-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.88rem;
            font-weight: 700;
            color: #1e293b;
          }

          .label-badge {
            font-size: 0.72rem;
            font-weight: 600;
            font-family: var(--font-mono);
            color: #64748b;
            background: #f1f5f9;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
          }

          .input-field-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .field-icon-box {
            position: absolute;
            left: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 2;
          }

          .field-icon {
            color: #64748b;
            transition: color 0.25s ease;
          }

          .modern-input {
            width: 100%;
            padding: 0.9rem 1rem 0.9rem 3.1rem;
            background: #f8fafc;
            border: 1.5px solid #cbd5e1;
            border-radius: 14px;
            color: #0f172a;
            font-family: var(--font-sans);
            font-size: 0.96rem;
            font-weight: 500;
            outline: none;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .modern-input::placeholder {
            color: #94a3b8;
          }

          .modern-input:focus {
            background: #ffffff;
            border-color: #003882;
            box-shadow: 0 0 0 4px rgba(0, 56, 130, 0.14);
          }

          .input-field-wrapper:focus-within .field-icon {
            color: #003882;
          }

          .password-input {
            padding-right: 3rem;
          }

          .toggle-password-btn {
            position: absolute;
            right: 0.8rem;
            background: none;
            border: none;
            color: #64748b;
            padding: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s ease;
            z-index: 2;
          }

          .toggle-password-btn:hover {
            color: #003882;
            background: rgba(0, 56, 130, 0.06);
          }

          .login-btn {
            margin-top: 0.6rem;
            width: 100%;
            padding: 0.95rem;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 14px;
            box-shadow: 0 6px 20px rgba(0, 56, 130, 0.28);
          }

          .login-btn:hover {
            box-shadow: 0 8px 25px rgba(0, 56, 130, 0.4);
            transform: translateY(-2px);
          }

          .login-footer {
            margin-top: 2rem;
            text-align: center;
            padding-top: 1.4rem;
            border-top: 1px solid #e2e8f0;
          }

          .back-link-btn {
            background: none;
            border: none;
            color: #64748b;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .back-link-btn:hover {
            color: #003882;
            background: rgba(0, 56, 130, 0.05);
          }
        `}</style>
      </div>
    );
  }

  // Dashboard Main Admin View
  return (
    <div className="dashboard-page">
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="dash-header">
        <div className="container dash-header-container">
          <div className="dash-logo">
            <ShieldCheck size={24} className="dash-logo-icon" />
            <div>
              <h1 className="dash-title">Bảng Quản Trị Portfolio</h1>
              <span className="dash-subtitle">Nguyễn Vũ Duy Quang • Thạc sĩ LHU</span>
            </div>
          </div>

          <div className="dash-actions">
            <button onClick={onReturnHome} className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} />
              <span>Xem trang Portfolio</span>
            </button>

            <button onClick={handleSave} className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Lưu thay đổi</span>
            </button>

            <button onClick={handleExportJSON} className="btn btn-secondary btn-sm" title="Tải file cấu hình JSON">
              <Download size={16} />
              <span>Xuất JSON</span>
            </button>

            <button onClick={handleReset} className="btn btn-secondary btn-sm" title="Khôi phục dữ liệu ban đầu">
              <RotateCcw size={16} />
              <span>Khôi phục</span>
            </button>

            <button onClick={handleLogout} className="btn btn-secondary btn-sm logout-btn" title="Đăng xuất khỏi Dashboard">
              <LogOut size={16} />
              <span>Thoát</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <div className="container dash-content-container">
        {/* Navigation Tabs */}
        <div className="dash-tabs">
          <button
            className={`dash-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <User size={16} />
            <span>Thông tin Cá nhân</span>
          </button>

          <button
            className={`dash-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Sparkles size={16} />
            <span>Quản lý Kỹ năng ({data.skills.length})</span>
          </button>

          <button
            className={`dash-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Layers size={16} />
            <span>Quản lý Dự án ({data.projects.length})</span>
          </button>

          <button
            className={`dash-tab ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Clock size={16} />
            <span>Kinh nghiệm & Đào tạo ({data.timeline.length})</span>
          </button>
        </div>

        {/* Tab 1: General Info */}
        {activeTab === 'info' && (
          <div className="dash-panel glass-card">
            <h3 className="panel-title">Chỉnh sửa Thông tin Cá nhân & Đơn vị</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Họ và tên đầy đủ</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handleInfoChange('fullName', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Học vị / Học hàm</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.degreeTitle}
                  onChange={(e) => handleInfoChange('degreeTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Chức danh / Chức vụ</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.role}
                  onChange={(e) => handleInfoChange('role', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Trường / Đơn vị công tác</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.institution}
                  onChange={(e) => handleInfoChange('institution', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Khoa / Phong ban</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.department}
                  onChange={(e) => handleInfoChange('department', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email làm việc chính thức</label>
                <input
                  type="email"
                  className="form-input"
                  value={data.personalInfo.email}
                  onChange={(e) => handleInfoChange('email', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Đường dẫn GitHub Profile</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.github}
                  onChange={(e) => handleInfoChange('github', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Địa điểm / Địa chỉ công tác</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.location}
                  onChange={(e) => handleInfoChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.2rem' }}>
              <label className="form-label">Tóm tắt tiểu sử ngắn (Hero Bio)</label>
              <textarea
                rows={4}
                className="form-input"
                value={data.personalInfo.bioLong}
                onChange={(e) => handleInfoChange('bioLong', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Skills Editor */}
        {activeTab === 'skills' && (
          <div className="dash-panel glass-card">
            <div className="panel-header-action">
              <h3 className="panel-title">Quản lý Danh mục Kỹ năng ({data.skills.length})</h3>
              <button onClick={handleAddSkill} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Thêm kỹ năng mới</span>
              </button>
            </div>

            <div className="editor-list">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="editor-item-card">
                  <div className="editor-item-grid">
                    <div className="form-group">
                      <label className="form-label">Tên Kỹ năng</label>
                      <input
                        type="text"
                        className="form-input"
                        value={skill.name}
                        onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phần trăm thành thạo ({skill.level}%)</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        className="form-range"
                        value={skill.level}
                        onChange={(e) => handleUpdateSkill(idx, 'level', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nhóm Kỹ năng</label>
                      <select
                        className="form-input"
                        value={skill.category}
                        onChange={(e) => handleUpdateSkill(idx, 'category', e.target.value)}
                      >
                        <option value="software">Phát triển Phần mềm & Web</option>
                        <option value="ai">Trí tuệ nhân tạo & Data</option>
                        <option value="architecture">Kiến trúc & DevOps</option>
                        <option value="academic">Giảng dạy & Nghiên cứu</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteSkill(idx)}
                    className="delete-item-btn"
                    title="Xóa kỹ năng này"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Projects Editor */}
        {activeTab === 'projects' && (
          <div className="dash-panel glass-card">
            <div className="panel-header-action">
              <h3 className="panel-title">Quản lý Danh sách Dự án ({data.projects.length})</h3>
              <button onClick={handleAddProject} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Thêm dự án mới</span>
              </button>
            </div>

            <div className="editor-list">
              {data.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="editor-item-card project-editor-card">
                  <div className="editor-item-header">
                    <h4 className="editor-item-title">{proj.title || "Dự án mới"}</h4>
                    <button onClick={() => handleDeleteProject(idx)} className="delete-item-btn">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Tên dự án</label>
                      <input
                        type="text"
                        className="form-input"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nhóm loại dự án</label>
                      <select
                        className="form-input"
                        value={proj.category}
                        onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                      >
                        <option value="software">Phần mềm & Web</option>
                        <option value="ai">Trí tuệ nhân tạo (AI)</option>
                        <option value="architecture">Kiến trúc & Hạ tầng</option>
                        <option value="academic">Hệ thống Đào tạo LHU</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Link GitHub Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={proj.githubUrl}
                        onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Link Demo / Truy cập</label>
                      <input
                        type="text"
                        className="form-input"
                        value={proj.demoUrl}
                        onChange={(e) => handleUpdateProject(idx, 'demoUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '0.8rem' }}>
                    <label className="form-label">Mô tả tóm tắt dự án</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={proj.description}
                      onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                    />
                  </div>

                  <div className="checkbox-row" style={{ marginTop: '0.8rem' }}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={proj.featured}
                        onChange={(e) => handleUpdateProject(idx, 'featured', e.target.checked)}
                      />
                      <span>Đánh dấu Dự án Nổi bật (Hiển thị tab Star)</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Timeline Editor */}
        {activeTab === 'timeline' && (
          <div className="dash-panel glass-card">
            <div className="panel-header-action">
              <h3 className="panel-title">Quản lý Cột mốc Sự nghiệp & Đào tạo ({data.timeline.length})</h3>
              <button onClick={handleAddTimeline} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Thêm cột mốc mới</span>
              </button>
            </div>

            <div className="editor-list">
              {data.timeline.map((item, idx) => (
                <div key={idx} className="editor-item-card">
                  <div className="editor-item-grid">
                    <div className="form-group">
                      <label className="form-label">Thời gian (Ví dụ: 2018 - Hiện tại)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.year}
                        onChange={(e) => handleUpdateTimeline(idx, 'year', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tên vị trí / Cột mốc</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.title}
                        onChange={(e) => handleUpdateTimeline(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Đơn vị / Trường học</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.organization}
                        onChange={(e) => handleUpdateTimeline(idx, 'organization', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Loại cột mốc</label>
                      <select
                        className="form-input"
                        value={item.type}
                        onChange={(e) => handleUpdateTimeline(idx, 'type', e.target.value)}
                      >
                        <option value="work">Công tác & Giảng dạy</option>
                        <option value="education">Đào tạo học vị</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '0.8rem' }}>
                    <label className="form-label">Mô tả chi tiết</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={item.description}
                      onChange={(e) => handleUpdateTimeline(idx, 'description', e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => handleDeleteTimeline(idx)}
                    className="delete-item-btn"
                    title="Xóa cột mốc này"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .dashboard-page {
          min-height: 100vh;
          background: var(--bg-dark);
          padding-bottom: 4rem;
        }

        .toast-notification {
          position: fixed;
          top: 1rem;
          right: 1.5rem;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.4rem;
          background: #ffffff;
          border: 1px solid rgba(5, 150, 105, 0.4);
          color: var(--color-emerald);
          border-radius: var(--radius-md);
          font-weight: 600;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .dash-header {
          background: #ffffff;
          border-bottom: 1px solid rgba(0, 56, 130, 0.12);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 90;
          box-shadow: 0 4px 15px rgba(0, 44, 108, 0.05);
        }

        .dash-header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dash-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .dash-logo-icon {
          color: var(--color-primary);
        }

        .dash-title {
          font-size: 1.25rem;
          color: #0f172a;
        }

        .dash-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .dash-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .logout-btn {
          color: #dc2626;
          border-color: rgba(220, 38, 38, 0.2);
        }

        .logout-btn:hover {
          background: #fef2f2;
        }

        .dash-content-container {
          padding-top: 2rem;
        }

        .dash-tabs {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .dash-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.3rem;
          border-radius: var(--radius-md);
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.12);
          color: var(--text-muted);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .dash-tab.active {
          background: var(--color-primary);
          color: #ffffff;
          border-color: var(--color-primary);
          box-shadow: 0 4px 15px rgba(0, 56, 130, 0.2);
        }

        .dash-panel {
          padding: 2.2rem;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.1);
        }

        .panel-title {
          font-size: 1.3rem;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .panel-header-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.2rem;
        }

        .editor-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .editor-item-card {
          padding: 1.4rem;
          background: rgba(0, 56, 130, 0.02);
          border: 1px solid rgba(0, 56, 130, 0.1);
          border-radius: var(--radius-md);
          position: relative;
        }

        .editor-item-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1.2fr;
          gap: 1rem;
          padding-right: 2.5rem;
        }

        .editor-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 56, 130, 0.08);
        }

        .editor-item-title {
          font-size: 1.05rem;
          color: var(--color-primary);
        }

        .delete-item-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: rgba(220, 38, 38, 0.08);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .delete-item-btn:hover {
          background: #dc2626;
          color: #ffffff;
        }

        .form-range {
          width: 100%;
          height: 8px;
          margin-top: 0.8rem;
          accent-color: var(--color-primary);
        }

        .checkbox-row {
          display: flex;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
        }

        @media (max-width: 800px) {
          .editor-item-grid {
            grid-template-columns: 1fr;
            padding-right: 0;
          }
          .delete-item-btn {
            position: relative;
            top: 0;
            right: 0;
            margin-top: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};
