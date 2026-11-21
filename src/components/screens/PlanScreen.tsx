// src/components/screens/PlanScreen.tsx
import React from 'react';
import type { ActionItem } from '../../types/action';
import type { HouseholdProfile } from '../../types/household';
import {
  Clock,
  CheckCircle2,
  Circle,
  Activity,
  TrendingDown,
} from 'lucide-react';

interface PlanScreenProps {
  actions: ActionItem[];
  household: HouseholdProfile;
  language: 'en' | 'hi';
  onToggleAction: (actionId: string) => void;
}

export const PlanScreen: React.FC<PlanScreenProps> = ({
  actions,
  language,
  onToggleAction,
}) => {
  const blocks: Array<{
    key: 'morning' | 'midday' | 'evening' | 'night';
    label: string;
    labelHi: string;
    timeSpan: string;
    description: string;
  }> = [
    {
      key: 'morning',
      label: 'Morning',
      labelHi: 'सुबह',
      timeSpan: '6:00 AM – 11:00 AM',
      description: 'Severe inversion peak. Keep windows sealed and avoid outdoor exercise.',
    },
    {
      key: 'midday',
      label: 'Midday',
      labelHi: 'दोपहर',
      timeSpan: '11:00 AM – 4:00 PM',
      description: 'Solar heating window. Best time for essential ventilation and errands.',
    },
    {
      key: 'evening',
      label: 'Evening',
      labelHi: 'शाम',
      timeSpan: '4:00 PM – 8:00 PM',
      description: 'Rush hour exhaust rise. Switch to recirculated transit and indoor activities.',
    },
    {
      key: 'night',
      label: 'Night',
      labelHi: 'रात',
      timeSpan: '8:00 PM – 6:00 AM',
      description: 'Overnight bedroom protection. Purge room on high CADR then sleep on low.',
    },
  ];

  const breathBudget = [
    { label: 'Morning Commute', dose: 18, baseline: 58 },
    { label: 'Afternoon Indoor', dose: 22, baseline: 45 },
    { label: 'Evening Transit', dose: 14, baseline: 52 },
    { label: 'Night Sleep', dose: 16, baseline: 75 },
  ];

  const totalDose = breathBudget.reduce((sum, b) => sum + b.dose, 0);
  const totalBaseline = breathBudget.reduce((sum, b) => sum + b.baseline, 0);
  const totalAvoided = totalBaseline - totalDose;
  const avoidedPercent = Math.round((totalAvoided / totalBaseline) * 100);

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-colors">
        <h2 className="text-base font-bold text-ink-deep dark:text-ink-darkDeep flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
          <span>
            {language === 'en'
              ? 'Low-Emission Daily Routine'
              : 'दैनिक दिनचर्या योजना'}
          </span>
        </h2>
        <p className="text-xs text-ink-muted dark:text-ink-darkMuted mt-1 leading-relaxed">
          {language === 'en'
            ? 'Time-blocked protective routine tuned to Delhi’s diurnal boundary-layer inversion cycle.'
            : 'दिल्ली के वायु प्रदूषण चक्र के अनुसार तैयार की गई समयबद्ध दिनचर्या।'}
        </p>

        {/* Breath Budget Visualization */}
        <div className="mt-4 pt-3.5 border-t border-paper-200 dark:border-paper-dark300">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-ink-deep dark:text-ink-darkDeep">
              <Activity className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
              <span>
                {language === 'en' ? 'Today’s Breath Budget' : 'सांस का बजट'}
              </span>
            </span>
            <span className="text-teal-brand dark:text-teal-darkBrand font-bold">
              {avoidedPercent}% Dose Avoided
            </span>
          </div>

          <div className="h-3 w-full bg-paper-200 dark:bg-paper-dark300 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="bg-teal-brand dark:bg-teal-darkBrand h-full"
              style={{ width: `${(totalDose / totalBaseline) * 100}%` }}
              title="Inhaled dose with protective plan"
            />
            <div
              className="bg-sal-4/70 h-full flex-1"
              title="Avoided dose"
            />
          </div>

          <div className="flex justify-between items-center mt-2 text-[11px] text-ink-quiet dark:text-ink-darkQuiet">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-brand dark:bg-teal-darkBrand" />
              <span>Inhaled: <strong className="text-ink-deep dark:text-ink-darkDeep">{totalDose} µg</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-teal-brand dark:text-teal-darkBrand font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Avoided: <strong>{totalAvoided} µg</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Time Blocks */}
      <div className="space-y-4">
        {blocks.map((block) => {
          const blockActions = actions.filter((a) => a.assignedBlock === block.key);

          return (
            <div
              key={block.key}
              className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl border border-paper-300 dark:border-paper-darkBorder overflow-hidden shadow-paper dark:shadow-dark-paper transition-colors"
            >
              <div className="px-4 py-3 bg-paper-200/50 dark:bg-paper-dark200/50 border-b border-paper-200 dark:border-paper-dark300 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
                      {language === 'en' ? block.label : block.labelHi}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-paper-50 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted border border-paper-300 dark:border-paper-darkBorder">
                      {block.timeSpan}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet mt-0.5">
                    {block.description}
                  </p>
                </div>
              </div>

              <div className="p-3 space-y-2.5">
                {blockActions.length === 0 ? (
                  <p className="text-xs text-ink-quiet dark:text-ink-darkQuiet italic py-2 text-center">
                    No urgent actions scheduled for this window. Keep standard precautions.
                  </p>
                ) : (
                  blockActions.map((action) => (
                    <div
                      key={action.id}
                      className="p-3 rounded-xl bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300 flex items-start gap-3 hover:border-ink-quiet dark:hover:border-paper-dark400 transition-all"
                    >
                      <button
                        onClick={() => onToggleAction(action.id)}
                        className="mt-0.5 text-teal-brand dark:text-teal-darkBrand hover:scale-110 transition-transform flex-shrink-0"
                      >
                        {action.isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand fill-teal-light dark:fill-teal-darkLight" />
                        ) : (
                          <Circle className="w-5 h-5 text-ink-quiet dark:text-ink-darkQuiet" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1">
                          <h4
                            className={`text-xs font-bold ${
                              action.isDone
                                ? 'line-through text-ink-quiet dark:text-ink-darkQuiet'
                                : 'text-ink-deep dark:text-ink-darkDeep'
                            }`}
                          >
                            {language === 'en' ? action.title : action.titleHi}
                          </h4>
                          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-paper-200 dark:bg-paper-dark300 text-ink-muted dark:text-ink-darkMuted">
                            {action.costBand}
                          </span>
                        </div>

                        <p className="text-[11px] text-ink-muted dark:text-ink-darkMuted mt-0.5">
                          {language === 'en'
                            ? action.shortImpact
                            : action.shortImpactHi}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
