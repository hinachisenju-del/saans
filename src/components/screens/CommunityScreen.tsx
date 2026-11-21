// src/components/screens/CommunityScreen.tsx
import React, { useState } from 'react';
import type { SALBand } from '../../types/air';
import {
  Users,
  GraduationCap,
  Building,
  FileText,
  Copy,
  Check,
  MapPin,
  Flame,
} from 'lucide-react';

interface CommunityScreenProps {
  currentSal: SALBand;
  language: 'en' | 'hi';
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'school' | 'rwa' | 'report'>('school');
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const schoolPolicies = [
    {
      sal: 0,
      label: 'SAL 0–1 (Clear / Watch)',
      sports: 'Normal outdoor activities',
      recess: 'Outdoors',
      assembly: 'Outdoors',
      classroom: 'Normal ventilation',
    },
    {
      sal: 2,
      label: 'SAL 2 (Careful)',
      sports: 'Reduce high-intensity cardio',
      recess: 'Outdoors, shortened',
      assembly: 'Outdoors, under 15 min',
      classroom: 'Normal ventilation',
    },
    {
      sal: 3,
      label: 'SAL 3 (Protect)',
      sports: 'Indoor only for sensitive students',
      recess: 'Indoor quiet games',
      assembly: 'Indoor auditorium',
      classroom: 'Windows shut, filters running',
    },
    {
      sal: 4,
      label: 'SAL 4 (Shelter) [ACTIVE TODAY]',
      sports: 'Suspend all outdoor sports',
      recess: 'Strictly indoors',
      assembly: 'Cancelled or online intercom',
      classroom: 'Air cleaners active, no dry sweeping',
    },
    {
      sal: 5,
      label: 'SAL 5 (Emergency)',
      sports: 'Suspend school or shift online',
      recess: 'Online / At home',
      assembly: 'Cancelled',
      classroom: 'Emergency closure protocol',
    },
  ];

  const parentNoticeText =
    language === 'en'
      ? `[DELHI PUBLIC SCHOOL NOTICE: AIR QUALITY PROTOCOL]\nDate: 20 Nov 2026\nAir Level: Severe Smog (AQI 342 / SAL 4 - Shelter)\n\nDear Parents,\nIn accordance with CPCB and GRAP Stage IV advisories, all outdoor sports, morning physical assemblies, and outdoor recess activities are suspended today. All classroom air purifiers are running at full capacity.\n\nPlease ensure students wear certified N95 respirators with a snug nose fit during their bus commutes. Students with diagnosed respiratory conditions (asthma) may attend classes online or rest in our filtered infirmary.\n\n— Principal's Office`
      : `[डीपीएस स्कूल सूचना: वायु गुणवत्ता प्रोटोकॉल]\nदिनांक: 20 नवम्बर 2026\nवायु स्तर: गंभीर स्मॉग (AQI 342 / SAL 4 - आश्रय)\n\nप्रिय अभिभावकगण,\nप्रदूषण नियंत्रण बोर्ड और GRAP-IV के दिशा-निर्देशों के अनुसार आज खेलकूद, सुबह की प्रार्थना सभा और बाहर खेलना पूरी तरह स्थगित किया गया है।\n\nकृपया बस में आते-जाते समय बच्चों को N95 मास्क अवश्य पहनाएं। दमा से पीड़ित बच्चे आज घर से ही ऑनलाइन पढ़ाई कर सकते हैं।\n\n— प्रधानाचार्य कार्यालय`;

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(parentNoticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header Overview */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-colors">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
          <h2 className="text-base font-bold text-ink-deep dark:text-ink-darkDeep">
            {language === 'en' ? 'Community Hub' : 'सामुदायिक केंद्र'}
          </h2>
        </div>
        <p className="text-xs text-ink-muted dark:text-ink-darkMuted mt-1 leading-relaxed">
          {language === 'en'
            ? 'Actionable playbooks for schools, housing societies (RWAs), and clinics. Collective protection reduces community exposure.'
            : 'स्कूलों, आरडब्ल्यूए और सोसायटियों के लिए साक्षा नीतियां और सहायता किट।'}
        </p>

        {/* Sub-nav Switcher */}
        <div className="flex gap-1.5 mt-3 pt-3 border-t border-paper-200 dark:border-paper-dark300">
          <button
            onClick={() => setActiveTab('school')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'school'
                ? 'bg-teal-brand dark:bg-teal-darkBrand text-white dark:text-ink-deep shadow-sm'
                : 'bg-paper-200 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            School Playbook
          </button>
          <button
            onClick={() => setActiveTab('rwa')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'rwa'
                ? 'bg-teal-brand dark:bg-teal-darkBrand text-white dark:text-ink-deep shadow-sm'
                : 'bg-paper-200 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            RWA Society Kit
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'report'
                ? 'bg-teal-brand dark:bg-teal-darkBrand text-white dark:text-ink-deep shadow-sm'
                : 'bg-paper-200 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            Citizen Report
          </button>
        </div>
      </div>

      {/* 1. School Playbook View */}
      {activeTab === 'school' && (
        <div className="space-y-4">
          <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sal-4 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Today's Mandatory School Protocol</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sal-4 text-white">
                SAL 4 Shelter
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <span className="text-[10px] font-bold text-ink-quiet dark:text-ink-darkQuiet block uppercase">
                  Outdoor Sports
                </span>
                <span className="font-bold text-sal-4">
                  Suspended (Indoor Only)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <span className="text-[10px] font-bold text-ink-quiet dark:text-ink-darkQuiet block uppercase">
                  Morning Assembly
                </span>
                <span className="font-bold text-sal-4">
                  Cancelled / Online
                </span>
              </div>
            </div>
          </div>

          <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
                <span>One-Tap Parent Broadcast Notice</span>
              </h3>
              <button
                onClick={handleCopyNotice}
                className="text-xs font-bold text-teal-brand dark:text-teal-darkBrand hover:underline flex items-center gap-1 bg-paper-50 dark:bg-paper-dark200 px-2.5 py-1 rounded-lg border border-paper-300 dark:border-paper-darkBorder"
              >
                {copiedNotice ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotice ? 'Copied!' : 'Copy for WhatsApp'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300 text-xs font-mono text-ink-deep dark:text-ink-darkDeep whitespace-pre-wrap leading-relaxed">
              {parentNoticeText}
            </pre>
          </div>

          <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper transition-colors">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep mb-3">
              Standard Operating Policy Ladder
            </h3>
            <div className="space-y-2 text-xs">
              {schoolPolicies.map((pol) => (
                <div
                  key={pol.sal}
                  className={`p-2.5 rounded-xl border ${
                    pol.sal === 4
                      ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                      : 'bg-paper-50 dark:bg-paper-dark200 border-paper-200 dark:border-paper-dark300'
                  }`}
                >
                  <div className="font-bold text-ink-deep dark:text-ink-darkDeep mb-1">
                    {pol.label}
                  </div>
                  <div className="text-[11px] text-ink-muted dark:text-ink-darkMuted grid grid-cols-2 gap-1">
                    <div>Sports: {pol.sports}</div>
                    <div>Classroom: {pol.classroom}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. RWA / Society Toolkit */}
      {activeTab === 'rwa' && (
        <div className="space-y-4">
          <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper space-y-3 transition-colors">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep">
                Society Anti-Smog Action Checklist
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <input type="checkbox" defaultChecked className="rounded text-teal-brand" />
                <span>Strict ban on open burning of garden leaves or waste at gates</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <input type="checkbox" defaultChecked className="rounded text-teal-brand" />
                <span>Enforce engine switch-off for delivery vans and taxis at drop-off</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <input type="checkbox" className="rounded text-teal-brand" />
                <span>Inspect Diesel Generator (DG) sets: switch to dual-fuel or grid</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300">
                <input type="checkbox" className="rounded text-teal-brand" />
                <span>Wet-mist driveways twice daily to suppress resuspended construction dust</span>
              </label>
            </div>
          </div>

          <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper space-y-2 transition-colors">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep">
              Anand Vihar Community Aggregate Impact
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-3 bg-paper-50 dark:bg-paper-dark200 rounded-xl border border-paper-200 dark:border-paper-dark300">
                <span className="text-2xl font-black text-teal-brand dark:text-teal-darkBrand tabular-nums">4,820</span>
                <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet block mt-0.5">Protected Households</span>
              </div>
              <div className="p-3 bg-paper-50 dark:bg-paper-dark200 rounded-xl border border-paper-200 dark:border-paper-dark300">
                <span className="text-2xl font-black text-ink-deep dark:text-ink-darkDeep tabular-nums">18.4 kg</span>
                <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet block mt-0.5">PM2.5 Exposure Avoided</span>
              </div>
            </div>
            <p className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet italic text-center pt-1">
              *All community metrics are aggregated and pseudonymised (minimum 20 households required).
            </p>
          </div>
        </div>
      )}

      {/* 3. Citizen Reporting View */}
      {activeTab === 'report' && (
        <div className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper space-y-3 transition-colors">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-sal-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep">
              Report Biomass, Waste Burning or Dust
            </h3>
          </div>
          <p className="text-xs text-ink-muted dark:text-ink-darkMuted">
            Geotagged reports are packaged into official municipal submission templates for CPCB and DPCC green helplines.
          </p>

          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[11px] font-bold text-ink-deep dark:text-ink-darkDeep block mb-1">
                Violation Type:
              </label>
              <select className="w-full bg-paper-50 dark:bg-paper-dark200 border border-paper-300 dark:border-paper-darkBorder rounded-lg p-2 text-xs text-ink-deep dark:text-ink-darkDeep focus:outline-none">
                <option>Open Leaf / Garbage Burning</option>
                <option>Uncovered Construction Dust</option>
                <option>Commercial Vehicle Heavy Idling</option>
                <option>Unregulated Diesel Generator Exhaust</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-deep dark:text-ink-darkDeep block mb-1">
                Location:
              </label>
              <div className="flex items-center gap-1.5 p-2 bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300 rounded-lg text-ink-muted dark:text-ink-darkMuted text-xs">
                <MapPin className="w-3.5 h-3.5 text-teal-brand dark:text-teal-darkBrand" />
                <span>Anand Vihar Ward 4, Delhi-NCR (GPS verified)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setReportSent(true);
                setTimeout(() => setReportSent(false), 3000);
              }}
              className="w-full py-2.5 bg-teal-brand dark:bg-teal-darkBrand text-white dark:text-ink-deep font-bold rounded-xl hover:bg-teal-hover transition-all text-xs mt-2"
            >
              {reportSent ? 'Report Packaged & Dispatched ✓' : 'Submit Citizen Report'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
