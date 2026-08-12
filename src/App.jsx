import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { Dashboard } from './components/Dashboard';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainLayout() {
  const [viewMode, setViewMode] = useState('portfolio'); // 'portfolio' | 'dashboard'
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { portfolioData, updatePortfolioData } = useLanguage();

  if (viewMode === 'dashboard') {
    return (
      <Dashboard
        portfolioData={portfolioData}
        onUpdateData={updatePortfolioData}
        onReturnHome={() => setViewMode('portfolio')}
      />
    );
  }

  return (
    <div className="app-main">
      {/* Background Glow Animation Orbs */}
      <div className="bg-glow-container">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
      </div>

      <Header
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDashboard={() => setViewMode('dashboard')}
      />

      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}

export default App;
