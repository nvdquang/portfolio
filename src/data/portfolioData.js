export const initialPortfolioData = {
  personalInfo: {
    fullName: "Nguyễn Vũ Duy Quang",
    degreeTitle: "Thạc sĩ",
    role: "Giảng viên & Kỹ sư Phần mềm Senior",
    institution: "Trường Đại học Lạc Hồng (LHU)",
    department: "Khoa Công Nghệ Thông Tin",
    bioShort: "Chuyên gia phát triển hệ thống phần mềm, trí tuệ nhân tạo và ứng dụng công nghệ trong giáo dục đại học.",
    bioLong: `Tôi là Nguyễn Vũ Duy Quang, Thạc sĩ ngành Công nghệ Thông tin tại Trường Đại học Lạc Hồng. Với hơn 8+ năm kinh nghiệm trong công tác giảng dạy, nghiên cứu khoa học và phát triển các hệ thống phần mềm quy mô lớn, tôi tập trung vào Kỹ thuật Phần mềm, Trí tuệ nhân tạo (AI/ML), Kiến trúc Hệ thống Phân tán và Ứng dụng Công nghệ Thông tin trong Giáo dục.`,
    email: "quang@lhu.edu.vn",
    github: "https://github.com/nvdquang",
    location: "Biên Hòa, Đồng Nai, Việt Nam",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    stats: [
      { label: "Năm kinh nghiệm", value: "8+" },
      { label: "Dự án & Nghiên cứu", value: "25+" },
      { label: "Sinh viên & Học viên", value: "1,500+" },
      { label: "Bài báo & Đề tài", value: "12+" }
    ]
  },

  skillCategories: [
    { id: "all", name: "Tất cả kỹ năng" },
    { id: "software", name: "Phát triển Phần mềm & Web" },
    { id: "ai", name: "Trí tuệ nhân tạo & Data" },
    { id: "architecture", name: "Kiến trúc & DevOps" },
    { id: "academic", name: "Giảng dạy & Nghiên cứu" }
  ],

  skills: [
    { name: "JavaScript / TypeScript", level: 92, category: "software", icon: "Code" },
    { name: "React.js / Next.js", level: 90, category: "software", icon: "Layout" },
    { name: "Node.js / Express / NestJS", level: 88, category: "software", icon: "Server" },
    { name: "Python (FastAPI, Flask)", level: 85, category: "software", icon: "Terminal" },
    { name: "C# / .NET Core", level: 82, category: "software", icon: "Cpu" },
    { name: "SQL & NoSQL (PostgreSQL, MongoDB)", level: 88, category: "software", icon: "Database" },
    { name: "Machine Learning (Scikit-Learn, PyTorch)", level: 82, category: "ai", icon: "Brain" },
    { name: "Computer Vision (OpenCV)", level: 80, category: "ai", icon: "Eye" },
    { name: "NLP & Large Language Models", level: 78, category: "ai", icon: "MessageSquare" },
    { name: "Data Processing (Pandas, NumPy)", level: 85, category: "ai", icon: "BarChart3" },
    { name: "Docker & Containerization", level: 85, category: "architecture", icon: "Box" },
    { name: "Git / GitHub & CI/CD Pipelines", level: 90, category: "architecture", icon: "GitBranch" },
    { name: "Cloud Architecture (AWS, Linux Server)", level: 80, category: "architecture", icon: "Cloud" },
    { name: "RESTful API & GraphQL Design", level: 92, category: "architecture", icon: "Network" },
    { name: "Giảng dạy & Xây dựng Giáo trình", level: 95, category: "academic", icon: "GraduationCap" },
    { name: "Nghiên cứu Khoa học Công nghệ", level: 88, category: "academic", icon: "BookOpen" },
    { name: "Hướng dẫn Đồ án Tốt nghiệp", level: 92, category: "academic", icon: "Users" }
  ],

  projects: [
    {
      id: "lhu-smart-learning",
      title: "Hệ thống Cổng Thông tin Learning Analytics LHU",
      description: "Nền tảng quản lý và phân tích kết quả học tập thông minh dành cho giảng viên và sinh viên Đại học Lạc Hồng, tích hợp biểu đồ trực quan hóa dữ liệu real-time.",
      category: "software",
      tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      githubUrl: "https://github.com/nvdquang",
      demoUrl: "https://lhu.edu.vn",
      featured: true,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Hỗ trợ hơn 10,000+ sinh viên truy cập hàng ngày",
        "Tự động dự báo tiến độ học tập bằng thuật toán phân tích dữ liệu",
        "Báo cáo trực quan hóa tự động cho quản lý khoa"
      ]
    },
    {
      id: "ai-attendance-system",
      title: "Hệ thống Điểm danh sinh viên bằng Điểm nhận dạng Khuôn mặt",
      description: "Ứng dụng Computer Vision ứng dụng mạng Deep Learning phát hiện và nhận diện khuôn mặt sinh viên thời gian thực trong phòng máy tính.",
      category: "ai",
      tags: ["Python", "OpenCV", "PyTorch", "FastAPI", "React"],
      githubUrl: "https://github.com/nvdquang",
      demoUrl: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Độ chính xác đạt 98.4% trong điều kiện ánh sáng thực tế",
        "Tự động xuất file báo cáo điểm danh Excel cho hệ thống đào tạo",
        "Tích hợp camera phòng học IP"
      ]
    },
    {
      id: "microservices-api-gateway",
      title: "Kiến trúc API Gateway & Microservices Phân tán",
      description: "Giải pháp hạ tầng kết nối các mô-đun phần mềm đào tạo, phân quyền OAuth2, Rate Limiting và cân bằng tải tự động.",
      category: "architecture",
      tags: ["Docker", "Node.js", "Redis", "Nginx", "JWT"],
      githubUrl: "https://github.com/nvdquang",
      demoUrl: "#",
      featured: false,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Xử lý tới 5,000 requests/giây",
        "Giảm thời gian phản hồi API trung bình xuống dưới 45ms",
        "Tích hợp logging tập trung qua ELK Stack"
      ]
    },
    {
      id: "academic-repository-portal",
      title: "Hệ thống Quản lý & Số hóa Đồ án Khoa học LHU",
      description: "Kho lưu trữ mở số hóa luận văn, bài báo nghiên cứu khoa học và đồ án tốt nghiệp của giảng viên và sinh viên.",
      category: "academic",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "ElasticSearch"],
      githubUrl: "https://github.com/nvdquang",
      demoUrl: "https://lhu.edu.vn",
      featured: true,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Tìm kiếm toàn văn (Full-text Search) tốc độ cao",
        "Phân quyền truy cập tài liệu và trích dẫn chuẩn IEEE",
        "Giao diện hiện đại, tương thích hoàn hảo thiết bị di động"
      ]
    }
  ],

  timeline: [
    {
      year: "2018 - Hiện tại",
      title: "Giảng viên & Kỹ sư Phần mềm",
      organization: "Trường Đại học Lạc Hồng (LHU)",
      description: "Phụ trách giảng dạy các môn học Kỹ thuật Phần mềm, Lập trình Web, Cơ sở dữ liệu và Trí tuệ nhân tạo. Đồng thời chủ trì phát triển các hệ thống công nghệ thông tin nội bộ.",
      type: "work"
    },
    {
      year: "2016 - 2018",
      title: "Thạc sĩ Khoa học Máy tính / CNTT",
      organization: "Trường Đại học Lạc Hồng (LHU)",
      description: "Tốt nghiệp chương trình Đào tạo Thạc sĩ với đề tài nghiên cứu về Xử lý dữ liệu lớn và Ứng dụng Học máy trong Phân tích Học tập.",
      type: "education"
    },
    {
      year: "2012 - 2016",
      title: "Kỹ sư Công nghệ Thông tin",
      organization: "Đại học Lạc Hồng",
      description: "Tốt nghiệp Kỹ sư CNTT chuyên ngành Kỹ thuật Phần mềm. Đạt nhiều giải thưởng trong các cuộc thi sáng tạo công nghệ.",
      type: "education"
    }
  ],

  resumeInfo: {
    title: "Hồ sơ Năng lực Khoa học & Chuyên môn",
    lastUpdated: "Tháng 07, 2026",
    summary: "Thạc sĩ Nguyễn Vũ Duy Quang có nhiều năm kinh nghiệm nghiên cứu, phát triển ứng dụng công nghệ thông tin, kiến trúc hệ thống web hiện đại và giảng dạy đại học tại LHU.",
    competencies: [
      "Kiến trúc phần mềm phân tán & Microservices",
      "Phát triển ứng dụng Web Full-stack (React, Node.js, Python)",
      "Ứng dụng AI/Machine Learning & Computer Vision trong thực tế",
      "Quản lý dự án phần mềm & Hướng dẫn nghiên cứu khoa học",
      "Thiết kế cơ sở dữ liệu quy mô lớn (Relational & NoSQL)"
    ]
  }
};

const STORAGE_KEY = 'nvdquang_portfolio_data_v1';

export const getStoredPortfolioData = () => {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (dataStr) {
      return JSON.parse(dataStr);
    }
  } catch (e) {
    console.error("Failed to load custom data from localStorage", e);
  }
  return initialPortfolioData;
};

export const savePortfolioDataToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data to localStorage", e);
  }
};

export const resetPortfolioDataToStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to reset localStorage data", e);
  }
  return initialPortfolioData;
};

export const portfolioData = getStoredPortfolioData();
