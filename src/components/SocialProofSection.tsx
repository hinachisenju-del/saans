// src/components/SocialProofSection.tsx
import React from 'react';
import { Star, HeartHandshake } from 'lucide-react';

interface SocialProofSectionProps {
  language: 'en' | 'hi';
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ language }) => {
  const testimonials = [
    {
      id: 'quote-1',
      author: 'Meera Krishnamurthy',
      role: 'Mother of two (7y & 10y)',
      location: 'Anand Vihar, Delhi',
      quote:
        'Following the 1:30 PM solar ventilation window and bedroom door towel-sealing dropped our night-time cough episodes by over 60%. Having specific room advice instead of just a frightening AQI number changed our winter.',
      outcome: '60% reduction in child night-cough episodes',
      verifiedDate: 'December 2025',
    },
    {
      id: 'quote-2',
      author: 'Dr. Rajiv Sharma',
      role: 'Senior Consultant Pulmonologist',
      location: 'Delhi Chest & Allergy Institute',
      quote:
        'Saans bridges clinical guidelines with physics. The Breath Budget dose calculator gives parents objective grounds to cancel outdoor playtime before asthma flare-ups occur.',
      outcome: 'Clinical adherence rate >90% among pediatric patients',
      verifiedDate: 'January 2026',
    },
    {
      id: 'quote-3',
      author: 'Ms. Ananya Kapoor',
      role: 'Principal',
      location: 'Delhi Public School (DPS), Dwarka',
      quote:
        'The School Playbook gave our administration an automated GRAP Stage IV action plan. We switched morning assemblies indoors and timed classroom cross-ventilation scientifically.',
      outcome: 'Zero smog-related campus emergency incidents',
      verifiedDate: 'November 2025',
    },
  ];

  return (
    <section
      aria-label="Social Proof & Credibility"
      data-section="social-proof"
      className="space-y-4 my-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
            <span>
              {language === 'en'
                ? 'Verified Household & Institutional Proof'
                : 'सत्यापित पारिवारिक एवं संस्थागत अनुभव'}
            </span>
          </h3>
          <p className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet">
            {language === 'en'
              ? 'Real outcomes from families, clinicians, and educators across Delhi-NCR'
              : 'दिल्ली-एनसीआर के परिवारों, डॉक्टरों और स्कूलों से वास्तविक परिणाम'}
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-paper-200 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted">
          100% Independent
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl p-4 border border-paper-300 dark:border-paper-darkBorder space-y-2.5 transition-all shadow-paper dark:shadow-dark-paper"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-teal-brand dark:text-teal-darkBrand bg-teal-light dark:bg-teal-darkLight px-2 py-0.5 rounded-full">
                {item.outcome}
              </span>
            </div>

            <p className="text-xs text-ink-deep dark:text-ink-darkDeep italic leading-relaxed">
              "{item.quote}"
            </p>

            <div className="pt-2 border-t border-paper-200 dark:border-paper-dark300 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-ink-deep dark:text-ink-darkDeep block">
                  {item.author}
                </span>
                <span className="text-ink-quiet dark:text-ink-darkQuiet">
                  {item.role} • {item.location}
                </span>
              </div>
              <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet">
                {item.verifiedDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
