// src/components/FaqSection.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface FaqSectionProps {
  language: 'en' | 'hi';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does Saans cost to use?',
      qHi: 'सांस का उपयोग करने में कितना खर्च आता है?',
      a: 'Saans is 100% free for all households, schools, and health workers. It has zero advertisements, accepts no affiliate kickbacks, and operates strictly as an independent public health technology initiative.',
      aHi: 'सांस सभी परिवारों, स्कूलों और स्वास्थ्य कार्यकर्ताओं के लिए 100% मुफ्त है। इसमें कोई विज्ञापन या व्यावसायिक शुल्क नहीं है।',
    },
    {
      q: 'When is the best time to ventilate home during severe winter smog in Delhi?',
      qHi: 'दिल्ली में गंभीर स्मॉग के दौरान घर की खिड़कियां कब खोलनी चाहिए?',
      a: 'The safest time to ventilate is during the afternoon solar heating window (typically 1:00 PM to 3:00 PM). Ground solar radiation warms the surface air, breaking the nocturnal thermal inversion layer and dispersing particulate soot. Airing for 15–20 minutes during this window flushes indoor CO2 while drawing 45% less particulate soot than morning airing.',
      aHi: 'खिड़कियां खोलने का सबसे सुरक्षित समय दोपहर 1:00 से 3:00 बजे के बीच है जब धूप निकलने से जमीन की सतह गर्म होकर प्रदूषण को ऊपर उठा देती है। 15-20 मिनट ताजी हवा लेने से घर की CO2 निकल जाती है।',
    },
    {
      q: 'Why are cloth masks and surgical masks ineffective against PM2.5?',
      qHi: 'कपड़े और सर्जिकल मास्क PM2.5 के खिलाफ अप्रभावी क्यों हैं?',
      a: 'Cloth bandanas and cotton masks filter only 15% to 20% of PM2.5 because microscopic particles pass easily through textile weave pores. Surgical masks leak 50% to 70% around the cheeks and nose. Only certified N95 or FFP2 respirators with an airtight nose clip block 95%+ of fine soot.',
      aHi: 'कपड़े के मास्क केवल 15-20% कण ही रोक पाते हैं। केवल प्रमाणित N95 या FFP2 रेस्पिरेटर ही चेहरे पर कसकर फिट होकर 95% से अधिक बारीक कणों को रोकते हैं।',
    },
    {
      q: 'Does steam inhalation remove smog and soot particles from the lungs?',
      qHi: 'क्या भाप लेने से फेफड़ों से स्मॉग और कालिख बाहर निकल जाती है?',
      a: 'No. Microscopic PM2.5 particles penetrate directly into deep lung alveoli and capillary beds. Water steam condenses in the upper throat and cannot flush alveolar soot. Furthermore, excessively hot steam carries a severe risk of scalding delicate respiratory mucosa, especially in children.',
      aHi: 'नहीं। सूक्ष्म PM2.5 कण फेफड़ों की गहराई (एल्वियोली) तक पहुंच जाते हैं। भाप गले में ही पानी बन जाती है और कालिख को नहीं निकाल सकती, बल्कि इससे बच्चों के फेफड़ों की नली झुलसने का खतरा रहता है।',
    },
    {
      q: 'How does Saans calculate indoor PM2.5 levels?',
      qHi: 'सांस इनडोर PM2.5 स्तर की गणना कैसे करता है?',
      a: 'Saans solves a continuous single-zone mass-balance differential equation: dC_in/dt = P_pen * λ * C_out - (λ + k + CADR/V) * C_in + S/V. It integrates room volume (V), window sealing air exchange rate (λ from 0.28 to 4.2 ACH), clean air delivery rate (CADR), and internal cooking or dhoop emission rates (S).',
      aHi: 'सांस मास-बैलेंस भौतिक समीकरण (dC_in/dt) का उपयोग करके कमरे के आकार, खिड़कियों की सीलिंग, एयर प्यूरीफायर क्षमता (CADR) और अंदर खाना पकाने के धुएं के आधार पर सटीक प्रदूषण स्तर निकालता है।',
    },
  ];

  return (
    <section
      id="faq-section"
      aria-label="Frequently Asked Questions"
      data-section="faq-aeo"
      className="space-y-3 my-6"
    >
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
        <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
          {language === 'en'
            ? 'Frequently Asked Questions (Science & Medical Guidance)'
            : 'अक्सर पूछे जाने वाले प्रश्न (वैज्ञानिक एवं चिकित्सकीय मार्गदर्शन)'}
        </h3>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="bg-paper-100 dark:bg-paper-dark100 rounded-2xl border border-paper-300 dark:border-paper-darkBorder overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                data-cta={`faq-toggle-${idx}`}
                data-category="faq"
                data-action="toggle"
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-paper-200 dark:hover:bg-paper-dark200 transition-colors"
              >
                <span className="font-bold text-xs text-ink-deep dark:text-ink-darkDeep">
                  {language === 'en' ? faq.q : faq.qHi}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-teal-brand flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-ink-quiet flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-ink-muted dark:text-ink-darkMuted leading-relaxed border-t border-paper-200 dark:border-paper-darkBorder">
                  <p>{language === 'en' ? faq.a : faq.aHi}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
