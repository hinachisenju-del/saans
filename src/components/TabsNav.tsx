// src/components/TabsNav.tsx
import React from 'react';
import { Sun, Calendar, Home, MessageCircle, Users } from 'lucide-react';

export type TabKey = 'today' | 'plan' | 'home' | 'ask' | 'community';

interface TabsNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  language: 'en' | 'hi';
}

export const TabsNav: React.FC<TabsNavProps> = ({
  activeTab,
  onTabChange,
  language,
}) => {
  const tabs: Array<{ key: TabKey; label: string; labelHi: string; icon: React.FC<{ className?: string }> }> = [
    { key: 'today', label: 'Today', labelHi: 'आज', icon: Sun },
    { key: 'plan', label: 'Plan', labelHi: 'दिनचर्या', icon: Calendar },
    { key: 'home', label: 'Home', labelHi: 'घर', icon: Home },
    { key: 'ask', label: 'Ask Saans', labelHi: 'पूछें', icon: MessageCircle },
    { key: 'community', label: 'Community', labelHi: 'समुदाय', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-paper-100/95 dark:bg-paper-dark100/95 backdrop-blur-md border-t border-paper-300 dark:border-paper-dark300 transition-all">
      <div className="max-w-md mx-auto px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              data-cta={`tab-navigate-${tab.key}`}
              data-category="navigation"
              data-action="switch-tab"
              data-tab={tab.key}
              className={`flex flex-col items-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all relative ${
                isActive
                  ? 'text-teal-brand dark:text-teal-darkBrand font-black'
                  : 'text-ink-muted dark:text-ink-darkDeep font-bold hover:text-teal-brand'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span>{language === 'en' ? tab.label : tab.labelHi}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-brand dark:bg-teal-darkBrand" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
