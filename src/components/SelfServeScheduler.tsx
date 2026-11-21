// src/components/SelfServeScheduler.tsx
import React, { useState } from 'react';
import { Bell, CheckCircle2, Send, Clock, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SelfServeSchedulerProps {
  language: 'en' | 'hi';
}

export const SelfServeScheduler: React.FC<SelfServeSchedulerProps> = ({ language }) => {
  const [scheduledTime, setScheduledTime] = useState('07:00');
  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [contact, setContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    trackEvent({
      name: 'schedule_alert',
      channel,
      time: scheduledTime,
    });

    setIsSubmitted(true);
  };

  return (
    <div
      id="scheduler"
      data-conversion-block="self-serve-scheduler"
      className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-5 border-2 border-teal-brand/30 dark:border-teal-darkBrand/30 shadow-paper dark:shadow-dark-paper transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-brand/10 dark:bg-teal-darkBrand/20 rounded-xl text-teal-brand dark:text-teal-darkBrand">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
              {language === 'en'
                ? 'Free Daily Clean Air Schedule'
                : 'दैनिक स्वच्छ वायु अलर्ट शेड्यूलर'}
            </h3>
            <p className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet">
              {language === 'en'
                ? 'Select a time for your daily morning decision brief. No apps or paywalls.'
                : 'सुबह के निर्णय का समय चुनें। कोई शुल्क या विज्ञापन नहीं।'}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-light dark:bg-teal-darkLight text-teal-dark dark:text-teal-darkBrand border border-teal-brand/20">
          ₹0 / Free
        </span>
      </div>

      {isSubmitted ? (
        <div className="bg-teal-subtle dark:bg-teal-darkSubtle border border-teal-brand/30 dark:border-teal-darkBrand/30 rounded-2xl p-4 text-center space-y-2 animate-fade-in">
          <CheckCircle2 className="w-8 h-8 text-teal-brand dark:text-teal-darkBrand mx-auto animate-bounce" />
          <h4 className="text-sm font-bold text-teal-dark dark:text-teal-darkBrand">
            {language === 'en'
              ? 'Schedule Confirmed!'
              : 'शेड्यूल सफलतापूर्वक दर्ज हो गया!'}
          </h4>
          <p className="text-xs text-ink-deep dark:text-ink-darkDeep leading-relaxed">
            {language === 'en'
              ? `Your daily personalized brief will arrive at ${scheduledTime} AM via ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} at ${contact}. You can reply STOP anytime.`
              : `आपका दैनिक ब्रीफ ${scheduledTime} AM को ${channel.toUpperCase()} द्वारा भेजा जाएगा।`}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-[11px] font-semibold text-teal-brand hover:underline mt-1"
          >
            {language === 'en' ? 'Modify Schedule' : 'शेड्यूल बदलें'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { time: '07:00', label: '7:00 AM', desc: 'School Run' },
              { time: '08:30', label: '8:30 AM', desc: 'Office Commute' },
              { time: '13:00', label: '1:00 PM', desc: 'Solar Window' },
            ].map((slot) => (
              <button
                key={slot.time}
                type="button"
                onClick={() => setScheduledTime(slot.time)}
                className={`p-2 rounded-2xl border text-center transition-all ${
                  scheduledTime === slot.time
                    ? 'bg-teal-brand text-white border-teal-brand shadow-sm scale-102'
                    : 'bg-paper-50 dark:bg-paper-dark200 text-ink-muted dark:text-ink-darkMuted border-paper-300 dark:border-paper-darkBorder hover:border-ink-quiet'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  {slot.label}
                </div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    scheduledTime === slot.time ? 'text-teal-light' : 'text-ink-quiet dark:text-ink-darkQuiet'
                  }`}
                >
                  {slot.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex rounded-2xl border border-paper-300 dark:border-paper-darkBorder overflow-hidden p-0.5 bg-paper-50 dark:bg-paper-dark200 text-xs flex-shrink-0">
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`px-3 py-1.5 font-bold rounded-xl transition-all ${
                  channel === 'whatsapp'
                    ? 'bg-teal-brand text-white'
                    : 'text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep'
                }`}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`px-3 py-1.5 font-bold rounded-xl transition-all ${
                  channel === 'sms'
                    ? 'bg-teal-brand text-white'
                    : 'text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep'
                }`}
              >
                SMS
              </button>
            </div>

            <input
              type="text"
              required
              placeholder={channel === 'whatsapp' ? '+91 98765 43210' : '+91 98765 43210'}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-2xl border border-paper-300 dark:border-paper-darkBorder bg-paper-50 dark:bg-paper-dark200 text-ink-deep dark:text-ink-darkDeep placeholder-ink-quiet dark:placeholder-ink-darkQuiet focus:outline-none focus:ring-2 focus:ring-teal-brand"
            />
          </div>

          <button
            type="submit"
            data-cta="confirm-self-serve-booking"
            data-category="conversion"
            data-action="schedule-alert"
            data-label="Schedule Daily Clean Air Brief"
            className="w-full py-2.5 px-4 bg-teal-brand hover:bg-teal-dark active:scale-[0.99] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all group"
          >
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            <span>
              {language === 'en'
                ? `Confirm Daily ${scheduledTime} AM Schedule — Free Forever`
                : `दैनिक ${scheduledTime} AM शेड्यूल कन्फर्म करें — बिल्कुल मुफ्त`}
            </span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-ink-quiet dark:text-ink-darkQuiet pt-0.5">
            <ShieldCheck className="w-3 h-3 text-teal-brand" />
            <span>DPDP Act 2023 Compliant • No Spam • Instant Confirmation</span>
          </div>
        </form>
      )}
    </div>
  );
};
