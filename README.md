# 👨‍🏫 ThS. Nguyễn Vũ Duy Quang - Academic & Developer Portfolio

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_React-0.469-f59e0b.svg)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Trang tin cá nhân & Hồ sơ năng lực giảng dạy, nghiên cứu khoa học và phát triển phần mềm của **ThS. Nguyễn Vũ Duy Quang** (Giảng viên Trường Đại học Lạc Hồng - LHU).

---

## 🌟 Tổng Quan Dự Án

Ứng dụng Web Portfolio kết hợp trang Quản trị Nội dung (Admin Dashboard) hiện đại, tích hợp hiệu ứng thị giác **Glassmorphism**, hiệu ứng mượt mà và khả năng tùy chỉnh dữ liệu linh hoạt. Dự án phục vụ việc trưng bày năng lực học thuật, các dự án phần mềm nổi bật, hành trình công tác và CV tương tác trực tuyến.

---

## 🔥 Tính Năng Nổi Bật

### 🎨 1. Giao Diện Portfolio Tương Tác
- **Hero Section**: Giới thiệu tổng quan, chức danh học thuật, hình ảnh cá nhân và các liên kết thao tác nhanh (CTA).
- **Kỹ Năng (Skills)**: Trưng bày bộ kỹ năng chuyên môn (Lập trình, Giảng dạy, Nghiên cứu, Công cụ) phân loại trực quan.
- **Dự Án Nổi Bật (Projects Showcase)**: Danh sách các dự án thực tế, tích hợp bộ lọc theo công nghệ/chủ đề và cửa sổ xem chi tiết dự án (Project Detail Modal).
- **Lịch Sử & Cột Mốc (Timeline)**: Trình bày chi tiết quá trình học tập, kinh nghiệm công tác và các mốc nghiên cứu khoa học.
- **Liên Hệ (Contact)**: Form gửi tin nhắn tương tác kèm các kênh kết nối mạng xã hội (GitHub, LinkedIn, Email, v.v.).
- **Xem CV Tương Tác (Resume Modal)**: Tích hợp trình xem CV/Resume đầy đủ thông tin với tùy chọn tải xuống.

### ⚙️ 2. Trang Quản Trị Nội Dung (Dashboard Live Edit)
- Cho phép người dùng chuyển đổi sang chế độ **Dashboard** để trực tiếp quản lý, chỉnh sửa, thêm mới hoặc xóa dữ liệu bài viết, dự án, kỹ năng và mốc thời gian.
- **Tự động lưu trữ (Data Persistence)**: Dữ liệu được đồng bộ và lưu trữ an toàn trong `localStorage` trình duyệt.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core**: [React 18](https://react.dev/) (JSX, Functional Components & Hooks)
- **Build Tool / Bundler**: [Vite 6](https://vitejs.dev/) (Cung cấp Fast Refresh và tốc độ build vượt trội)
- **Bộ Icon**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Sử dụng CSS Custom Properties, Flexbox/Grid, Dark Mode Aesthetics & Glassmorphism UI)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
nvdquang-portfolio/
├── index.html              # HTML Entry Point & Meta Tags
├── package.json            # Thông tin dependencies & scripts
├── vite.config.js          # Cấu hình Vite & React Plugin
├── src/
│   ├── main.jsx            # React Entry Point (DOM Render)
│   ├── App.jsx             # Component chính quản lý State & View Switcher
│   ├── index.css           # Design System & Styling toàn trang
│   ├── components/         # Các React Components
│   │   ├── Header.jsx          # Thanh điều hướng (Navbar)
│   │   ├── Hero.jsx            # Phần giới thiệu đầu trang
│   │   ├── Skills.jsx          # Khối hiển thị kỹ năng
│   │   ├── Projects.jsx        # Khối danh sách dự án
│   │   ├── Timeline.jsx        # Cột mốc kinh nghiệm & học tập
│   │   ├── Contact.jsx         # Khối liên hệ & Mạng xã hội
│   │   ├── Footer.jsx          # Chân trang
│   │   ├── ResumeModal.jsx     # Modal hiển thị CV cá nhân
│   │   └── Dashboard.jsx       # Trang quản trị nội dung Live Edit
│   └── data/
│       └── portfolioData.js    # Dữ liệu khởi tạo mặc định & Helper LocalStorage
└── README.md               # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Tiền Đề
- **Node.js**: Phiên bản `>= 18.0.0`
- **npm** (đi kèm Node.js) hoặc **yarn** / **pnpm**

### Các Bước Thực Hiện

1. **Clone repository về máy local:**
   ```bash
   git clone https://github.com/nvdquang/portfolio.git
   cd portfolio
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng ở môi trường Development:**
   ```bash
   npm run dev
   ```
   Sau khi chạy, mở trình duyệt và truy cập địa chỉ: `http://localhost:5173`

4. **Đóng gói ứng dụng cho Production:**
   ```bash
   npm run build
   ```
   Kết quả đóng gói sẽ nằm trong thư mục `/dist`.

5. **Xem trước bản Build (Preview Production):**
   ```bash
   npm run preview
   ```

---

## 📝 Tùy Chỉnh Dữ Liệu

- Dữ liệu mặc định ban đầu được định nghĩa tại tệp [`src/data/portfolioData.js`](file:///run/media/quangnvd/DATA/Antigravity/Profile/src/data/portfolioData.js).
- Bạn có thể chỉnh sửa dữ liệu mặc định trong file trên hoặc sử dụng nút **Dashboard** trên thanh Header của ứng dụng để cập nhật giao diện và dữ liệu ngay trên trình duyệt.

---

## 👤 Tác Giả

**ThS. Nguyễn Vũ Duy Quang**
- **Đơn vị**: Trường Đại học Lạc Hồng (LHU)
- **Lĩnh vực**: Công nghệ Thông tin, Kỹ thuật Phần mềm, Hệ thống Thông minh, An toàn thông tin.

---

© 2026 ThS. Nguyễn Vũ Duy Quang. Built with React & Vite.
