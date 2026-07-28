import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, LogIn, LogOut, Save, RotateCcw, Download, Plus, Trash2, 
  Edit3, CheckCircle2, User, Sparkles, Layers, Clock, ArrowLeft, ShieldCheck, AlertCircle,
  Eye, EyeOff, GitCommit, Globe, RefreshCw, Github, Image, Upload, Link2, Camera
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
  const [activeTab, setActiveTab] = useState('info'); // info, skills, projects, timeline, github
  const [data, setData] = useState(portfolioData);
  const [toastMessage, setToastMessage] = useState('');

  // GitHub Auto-sync States
  const [ghToken, setGhToken] = useState(() => localStorage.getItem('nvdquang_gh_token') || '');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setData(portfolioData);
  }, [portfolioData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
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
    showToast('Đã lưu và cập nhật dữ liệu trên trình duyệt thành công!');
  };

  // Auto-Commit to GitHub via REST API
  const handleSyncGitHub = async () => {
    let token = ghToken || localStorage.getItem('nvdquang_gh_token');
    if (!token) {
      token = prompt("Vui lòng nhập GitHub Personal Access Token (PAT) để kết nối tự động:");
      if (!token) return;
      setGhToken(token);
      localStorage.setItem('nvdquang_gh_token', token);
    }

    setIsSyncing(true);
    try {
      const owner = "nvdquang";
      const repo = "portfolio";
      const path = "src/data/portfolioData.js";

      // 1. Get current SHA of src/data/portfolioData.js
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!getRes.ok) {
        throw new Error(`Không thể lấy file từ GitHub (${getRes.status}). Kiểm tra Token hoặc tên Repo.`);
      }

      const fileMeta = await getRes.json();
      const sha = fileMeta.sha;

      // 2. Generate updated portfolioData.js code string
      const codeContent = `export const initialPortfolioData = ${JSON.stringify(data, null, 2)};\n\nconst STORAGE_KEY = 'nvdquang_portfolio_data_v1';\n\nexport const getStoredPortfolioData = () => {\n  try {\n    const dataStr = localStorage.getItem(STORAGE_KEY);\n    if (dataStr) {\n      return JSON.parse(dataStr);\n    }\n  } catch (e) {\n    console.error("Failed to load custom data from localStorage", e);\n  }\n  return initialPortfolioData;\n};\n\nexport const savePortfolioDataToStorage = (data) => {\n  try {\n    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));\n  } catch (e) {\n    console.error("Failed to save data to localStorage", e);\n  }\n};\n\nexport const resetPortfolioDataToStorage = () => {\n  try {\n    localStorage.removeItem(STORAGE_KEY);\n  } catch (e) {\n    console.error("Failed to reset localStorage data", e);\n  }\n  return initialPortfolioData;\n};\n\nexport const portfolioData = getStoredPortfolioData();\n`;

      // 3. UTF-8 Base64 encoding
      const utf8Bytes = new TextEncoder().encode(codeContent);
      let binary = '';
      utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
      const base64Content = btoa(binary);

      // 4. Send PUT request to GitHub API to commit changes
      const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update portfolio data via Dashboard [Auto Sync]',
          content: base64Content,
          sha: sha,
          branch: 'main'
        })
      });

      if (!putRes.ok) {
        const errJson = await putRes.json();
        throw new Error(errJson.message || `Lỗi Commit lên GitHub (${putRes.status})`);
      }

      // Save to local storage as well
      savePortfolioDataToStorage(data);
      onUpdateData(data);
      showToast('🚀 Đã Commit thành công lên GitHub! Vercel đang tự động Re-build online...');
    } catch (err) {
      alert(`Lỗi kết nối GitHub API: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
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

            <button onClick={handleSyncGitHub} disabled={isSyncing} className="btn btn-primary btn-sm gh-sync-btn">
              {isSyncing ? <RefreshCw size={16} className="spin-icon" /> : <GitCommit size={16} />}
              <span>{isSyncing ? 'Đang Commit...' : 'Commit lên GitHub (Auto Vercel)'}</span>
            </button>

            <button onClick={handleSave} className="btn btn-secondary btn-sm">
              <Save size={16} />
              <span>Lưu trình duyệt</span>
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

          <button
            className={`dash-tab ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            <Github size={16} />
            <span>Cấu hình GitHub API</span>
          </button>
        </div>

        {/* Tab 1: General Info */}
        {activeTab === 'info' && (
          <div className="dash-panel glass-card">
            <h3 className="panel-title">Chỉnh sửa Thông tin Cá nhân & Đơn vị</h3>
            
            {/* Avatar Image Editor Box */}
            <div className="avatar-editor-card">
              <div className="avatar-preview-box">
                {data.personalInfo.avatarUrl ? (
                  <img src={data.personalInfo.avatarUrl} alt="Avatar" className="avatar-preview-img" />
                ) : (
                  <div className="avatar-fallback-box">NV</div>
                )}
              </div>
              <div className="avatar-inputs-box">
                <label className="modern-label">
                  <span>Hình đại diện (Avatar Image URL)</span>
                  <span className="label-badge">Image Link</span>
                </label>
                <div className="input-field-wrapper">
                  <div className="field-icon-box">
                    <Camera size={18} className="field-icon" />
                  </div>
                  <input
                    type="text"
                    className="modern-input"
                    placeholder="Dán đường dẫn hình ảnh (https://...)"
                    value={data.personalInfo.avatarUrl || ''}
                    onChange={(e) => handleInfoChange('avatarUrl', e.target.value)}
                  />
                </div>
                <div className="avatar-presets-bar">
                  <span className="preset-label">Mẫu nhanh:</span>
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handleInfoChange('avatarUrl', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600')}
                  >
                    Mẫu 1
                  </button>
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handleInfoChange('avatarUrl', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600')}
                  >
                    Mẫu 2
                  </button>
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handleInfoChange('avatarUrl', '')}
                  >
                    Huy hiệu chữ (NV)
                  </button>
                </div>
              </div>
            </div>

            {/* Symmetric 2-Column Form Grid */}
            <div className="symmetric-form-grid">
              <div className="modern-form-group">
                <label className="modern-label">Họ và tên đầy đủ *</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handleInfoChange('fullName', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Học vị / Học hàm *</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.degreeTitle}
                  onChange={(e) => handleInfoChange('degreeTitle', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Chức danh công tác</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.role}
                  onChange={(e) => handleInfoChange('role', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Trường / Đơn vị chủ quản</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.institution}
                  onChange={(e) => handleInfoChange('institution', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Khoa / Phòng ban</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.department}
                  onChange={(e) => handleInfoChange('department', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Email làm việc chính thức</label>
                <input
                  type="email"
                  className="modern-input"
                  value={data.personalInfo.email}
                  onChange={(e) => handleInfoChange('email', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Đường dẫn GitHub Profile</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.github}
                  onChange={(e) => handleInfoChange('github', e.target.value)}
                />
              </div>

              <div className="modern-form-group">
                <label className="modern-label">Địa chỉ làm việc</label>
                <input
                  type="text"
                  className="modern-input"
                  value={data.personalInfo.location}
                  onChange={(e) => handleInfoChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="modern-form-group" style={{ marginTop: '1.5rem' }}>
              <label className="modern-label">Tiểu sử tóm tắt (Hero Bio - Hiển thị tại banner chính)</label>
              <textarea
                rows={4}
                className="modern-input modern-textarea"
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

            <div className="editor-cards-list">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="modern-editor-card">
                  <div className="card-top-row">
                    <span className="card-index-badge">#Kỹ năng {idx + 1}</span>
                    <button
                      onClick={() => handleDeleteSkill(idx)}
                      className="delete-item-btn"
                      title="Xóa kỹ năng này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="symmetric-form-grid">
                    <div className="modern-form-group">
                      <label className="modern-label">Tên Kỹ năng</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={skill.name}
                        onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Nhóm Kỹ năng</label>
                      <select
                        className="modern-input"
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

                  <div className="modern-form-group" style={{ marginTop: '1.2rem' }}>
                    <div className="slider-label-row">
                      <label className="modern-label">Trình độ thành thạo</label>
                      <span className="level-badge">{skill.level}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      className="modern-range-slider"
                      value={skill.level}
                      onChange={(e) => handleUpdateSkill(idx, 'level', parseInt(e.target.value))}
                    />
                  </div>
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

            <div className="editor-cards-list">
              {data.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="modern-editor-card">
                  <div className="card-top-row">
                    <span className="card-index-badge">#Dự án {idx + 1}</span>
                    <button onClick={() => handleDeleteProject(idx)} className="delete-item-btn">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Project Image Preview & URL Edit */}
                  <div className="project-img-edit-box">
                    <div className="project-cover-preview">
                      <img src={proj.image} alt={proj.title} className="cover-img" />
                    </div>
                    <div className="project-img-input-box">
                      <label className="modern-label">Hình ảnh bìa dự án (URL Image Link)</label>
                      <div className="input-field-wrapper">
                        <div className="field-icon-box">
                          <Image size={18} className="field-icon" />
                        </div>
                        <input
                          type="text"
                          className="modern-input"
                          placeholder="Dán URL hình ảnh..."
                          value={proj.image}
                          onChange={(e) => handleUpdateProject(idx, 'image', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="symmetric-form-grid" style={{ marginTop: '1.2rem' }}>
                    <div className="modern-form-group">
                      <label className="modern-label">Tên Dự án *</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Danh mục Loại dự án</label>
                      <select
                        className="modern-input"
                        value={proj.category}
                        onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                      >
                        <option value="software">Phần mềm & Web</option>
                        <option value="ai">Trí tuệ nhân tạo (AI)</option>
                        <option value="architecture">Kiến trúc & Hạ tầng</option>
                        <option value="academic">Hệ thống Đào tạo LHU</option>
                      </select>
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Đường dẫn GitHub Code</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={proj.githubUrl}
                        onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Đường dẫn Trải nghiệm Demo</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={proj.demoUrl}
                        onChange={(e) => handleUpdateProject(idx, 'demoUrl', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="modern-form-group" style={{ marginTop: '1.2rem' }}>
                    <label className="modern-label">Mô tả dự án</label>
                    <textarea
                      rows={3}
                      className="modern-input modern-textarea"
                      value={proj.description}
                      onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                    />
                  </div>

                  <div className="checkbox-row" style={{ marginTop: '1.2rem' }}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={proj.featured}
                        onChange={(e) => handleUpdateProject(idx, 'featured', e.target.checked)}
                      />
                      <span>Đánh dấu Dự án Nổi bật (Hiển thị Huy hiệu Star ⭐)</span>
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

            <div className="editor-cards-list">
              {data.timeline.map((item, idx) => (
                <div key={idx} className="modern-editor-card">
                  <div className="card-top-row">
                    <span className="card-index-badge">#Cột mốc {idx + 1}</span>
                    <button onClick={() => handleDeleteTimeline(idx)} className="delete-item-btn">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="symmetric-form-grid">
                    <div className="modern-form-group">
                      <label className="modern-label">Giai đoạn Thời gian (Ví dụ: 2018 - Hiện tại)</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={item.year}
                        onChange={(e) => handleUpdateTimeline(idx, 'year', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Tên vị trí / Cột mốc</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={item.title}
                        onChange={(e) => handleUpdateTimeline(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Tên Đơn vị / Trường học</label>
                      <input
                        type="text"
                        className="modern-input"
                        value={item.organization}
                        onChange={(e) => handleUpdateTimeline(idx, 'organization', e.target.value)}
                      />
                    </div>

                    <div className="modern-form-group">
                      <label className="modern-label">Phân loại Cột mốc</label>
                      <select
                        className="modern-input"
                        value={item.type}
                        onChange={(e) => handleUpdateTimeline(idx, 'type', e.target.value)}
                      >
                        <option value="work">Công tác & Giảng dạy</option>
                        <option value="education">Đào tạo học vị</option>
                      </select>
                    </div>
                  </div>

                  <div className="modern-form-group" style={{ marginTop: '1.2rem' }}>
                    <label className="modern-label">Mô tả chi tiết nhiệm vụ / thành tựu</label>
                    <textarea
                      rows={3}
                      className="modern-input modern-textarea"
                      value={item.description}
                      onChange={(e) => handleUpdateTimeline(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: GitHub API Sync Config */}
        {activeTab === 'github' && (
          <div className="dash-panel glass-card">
            <h3 className="panel-title">Cấu hình Tự động Kết nối GitHub API & Vercel Auto-Deploy</h3>
            
            <div className="gh-config-info-box">
              <h4>🚀 Tính năng Đồng bộ 1-Click:</h4>
              <p>
                Khi bạn bấm nút <strong>"Commit lên GitHub (Auto Vercel)"</strong>, hệ thống sẽ tự động gọi GitHub REST API để cập nhật dữ liệu trực tiếp vào file <code>src/data/portfolioData.js</code> trên GitHub repository <strong>nvdquang/portfolio</strong>.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Ngay lập tức, <strong>Vercel sẽ tự động phát hiện commit mới và re-build trang web online</strong> trong ~15 giây cho tất cả người xem trên thế giới.
              </p>
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem', maxWidth: '600px' }}>
              <label className="form-label">GitHub Personal Access Token (PAT)</label>
              <div className="input-field-wrapper">
                <input
                  type="password"
                  className="form-input"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={ghToken}
                  onChange={(e) => {
                    setGhToken(e.target.value);
                    localStorage.setItem('nvdquang_gh_token', e.target.value);
                  }}
                />
              </div>
              <small className="help-text">Token sẽ được lưu an toàn trong trình duyệt của bạn.</small>
            </div>

            <div className="pat-guide-box">
              <h4>Cách tạo Token GitHub miễn phí (chỉ mất 1 phút):</h4>
              <ol className="guide-steps">
                <li>Mở trình duyệt và truy cập: <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer">https://github.com/settings/tokens/new</a></li>
                <li>Đặt tên **Note**: <code>Portfolio-Dashboard-Sync</code></li>
                <li>Tích chọn quyền **<code>repo</code>** (Full control of private/public repositories).</li>
                <li>Kéo xuống cuối trang và bấm **Generate token**.</li>
                <li>Copy đoạn mã Token (bắt đầu bằng <code>ghp_...</code>) và dán vào ô bên trên.</li>
              </ol>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={handleSyncGitHub}
                disabled={isSyncing}
                className="btn btn-primary"
              >
                {isSyncing ? <RefreshCw size={18} className="spin-icon" /> : <GitCommit size={18} />}
                <span>{isSyncing ? 'Đang Commit lên GitHub...' : 'Thử nghiệm Commit ngay bây giờ'}</span>
              </button>
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

        /* Avatar Editor Box */
        .avatar-editor-card {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          padding: 1.4rem 1.6rem;
          background: rgba(0, 56, 130, 0.03);
          border: 1px solid rgba(0, 56, 130, 0.12);
          border-radius: 16px;
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
        }

        .avatar-preview-box {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 15px rgba(0, 56, 130, 0.15);
          flex-shrink: 0;
          background: #ffffff;
        }

        .avatar-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-fallback-box {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #003882 0%, #d97706 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.8rem;
        }

        .avatar-inputs-box {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .avatar-presets-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.4rem;
          flex-wrap: wrap;
        }

        .preset-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .preset-btn {
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          background: #ffffff;
          border: 1px solid rgba(0, 56, 130, 0.15);
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-btn:hover {
          background: var(--color-primary);
          color: #ffffff;
        }

        /* Symmetric Form Grid & Cards */
        .symmetric-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.4rem;
        }

        .editor-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modern-editor-card {
          padding: 1.6rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(0, 44, 108, 0.04);
          position: relative;
          transition: all 0.25s ease;
        }

        .modern-editor-card:hover {
          border-color: rgba(0, 56, 130, 0.25);
          box-shadow: 0 8px 25px rgba(0, 44, 108, 0.08);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .card-index-badge {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-primary);
          background: rgba(0, 56, 130, 0.06);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        /* Project Image Box */
        .project-img-edit-box {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          padding: 1rem 1.2rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          flex-wrap: wrap;
        }

        .project-cover-preview {
          width: 120px;
          height: 75px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid #cbd5e1;
        }

        .project-cover-preview .cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-img-input-box {
          flex-grow: 1;
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .level-badge {
          font-family: var(--font-mono);
          font-weight: 800;
          color: var(--color-primary);
          font-size: 0.9rem;
          background: rgba(0, 56, 130, 0.08);
          padding: 0.15rem 0.6rem;
          border-radius: 6px;
        }

        .modern-range-slider {
          width: 100%;
          height: 8px;
          accent-color: var(--color-primary);
          cursor: pointer;
        }

        .modern-textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.6;
        }

        .delete-item-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .delete-item-btn:hover {
          background: #dc2626;
          color: #ffffff;
        }

        .gh-sync-btn {
          background: linear-gradient(135deg, #15803d 0%, #059669 100%);
          border-color: #15803d;
        }

        .gh-sync-btn:hover {
          background: linear-gradient(135deg, #166534 0%, #047857 100%);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .gh-config-info-box {
          padding: 1.2rem 1.5rem;
          background: rgba(0, 56, 130, 0.04);
          border: 1px solid rgba(0, 56, 130, 0.15);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .gh-config-info-box h4 {
          color: var(--color-primary);
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
        }

        .gh-config-info-box p {
          font-size: 0.93rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .help-text {
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-top: 0.3rem;
          display: block;
        }

        .pat-guide-box {
          margin-top: 1.8rem;
          padding: 1.4rem 1.6rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
        }

        .pat-guide-box h4 {
          font-size: 0.98rem;
          color: #0f172a;
          margin-bottom: 0.8rem;
        }

        .guide-steps {
          padding-left: 1.2rem;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.7;
        }

        .guide-steps a {
          color: var(--color-primary);
          font-weight: 600;
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
