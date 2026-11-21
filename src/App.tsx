// src/App.tsx
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabsNav } from './components/TabsNav';
import type { TabKey } from './components/TabsNav';
import { TodayScreen } from './components/screens/TodayScreen';
import { PlanScreen } from './components/screens/PlanScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { AskScreen } from './components/screens/AskScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { ChannelPreviewModal } from './components/modals/ChannelPreviewModal';
import { CleanAirLedgerModal } from './components/modals/CleanAirLedgerModal';
import { SourceConfidenceModal } from './components/modals/SourceConfidenceModal';
import { ConsentBanner } from './components/ConsentBanner';
import { trackEvent } from './utils/analytics';

import {
  INITIAL_HOUSEHOLD,
  INITIAL_AIR_READING,
  MOCK_HOURLY_FORECAST,
  BEST_VENTILATION_WINDOW,
  INITIAL_ACTIONS,
} from './data/initialState';
import type { Room } from './types/household';

export function App() {
  const [household, setHousehold] = useState(INITIAL_HOUSEHOLD);
  const [air] = useState(INITIAL_AIR_READING);
  const [forecast] = useState(MOCK_HOURLY_FORECAST);
  const [ventWindow] = useState(BEST_VENTILATION_WINDOW);
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('saans_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('saans_theme', theme);
  }, [theme]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    trackEvent({ name: 'page_view', tab });
    window.location.hash = tab === 'today' ? '' : tab;
  };

  useEffect(() => {
    trackEvent({ name: 'page_view', tab: activeTab });
  }, [activeTab]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['today', 'plan', 'home', 'ask', 'community'].includes(hash)) {
        setActiveTab(hash as TabKey);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    trackEvent({ name: 'theme_change', theme: nextTheme });
  };

  // Modals
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);

  const handleToggleAction = (actionId: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, isDone: !a.isDone } : a))
    );
  };

  const handleUpdateRooms = (updatedRooms: Room[]) => {
    setHousehold((prev) => ({
      ...prev,
      rooms: updatedRooms,
    }));
  };

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-paper-dark50 text-ink-deep dark:text-ink-darkDeep font-sans flex flex-col selection:bg-teal-light dark:selection:bg-teal-darkLight selection:text-teal-dark dark:selection:text-teal-darkBrand transition-colors duration-200">
      {/* Top Header */}
      <Header
        air={air}
        language={language}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLanguageChange={setLanguage}
        onOpenSourceModal={() => setIsSourceModalOpen(true)}
        onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
        onOpenChannelModal={() => setIsChannelModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4">
        {activeTab === 'today' && (
          <TodayScreen
            air={air}
            forecast={forecast}
            ventWindow={ventWindow}
            actions={actions}
            household={household}
            language={language}
            onToggleAction={handleToggleAction}
            onOpenSourceModal={() => setIsSourceModalOpen(true)}
          />
        )}

        {activeTab === 'plan' && (
          <PlanScreen
            actions={actions}
            household={household}
            language={language}
            onToggleAction={handleToggleAction}
          />
        )}

        {activeTab === 'home' && (
          <HomeScreen
            household={household}
            outdoorPm25={air.pm25}
            language={language}
            onUpdateRooms={handleUpdateRooms}
          />
        )}

        {activeTab === 'ask' && <AskScreen language={language} />}

        {activeTab === 'community' && (
          <CommunityScreen currentSal={air.sal} language={language} />
        )}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <TabsNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        language={language}
      />

      {/* Consent Management Platform (CMP) Banner */}
      <ConsentBanner />

      {/* Modals */}
      <ChannelPreviewModal
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
        language={language}
      />

      <CleanAirLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        language={language}
      />

      <SourceConfidenceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        air={air}
        language={language}
      />
    </div>
  );
}

export default App;
