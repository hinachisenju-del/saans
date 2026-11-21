// src/components/modals/ChannelPreviewModal.tsx
import React, { useState } from 'react';
import { X, MessageSquare, PhoneCall, Smartphone, QrCode, Play, Pause, Share2 } from 'lucide-react';

interface ChannelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const ChannelPreviewModal: React.FC<ChannelPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'sms' | 'voice'>('whatsapp');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/70 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl border border-paper-300 dark:border-paper-darkBorder w-full max-w-lg overflow-hidden shadow-paper-lg flex flex-col max-h-[90vh] transition-all">
        {/* Modal Header */}
        <div className="p-4 bg-paper-200/60 dark:bg-paper-dark200/60 border-b border-paper-300 dark:border-paper-dark300 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
              <span>Multi-Channel Interface Map (SPECS A2)</span>
            </h3>
            <span className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet">
              One brain across WhatsApp, SMS, Voice IVR and Mobile
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-paper-300 dark:hover:bg-paper-dark300 text-ink-quiet dark:text-ink-darkQuiet transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="flex border-b border-paper-300 dark:border-paper-darkBorder bg-paper-100 dark:bg-paper-dark100">
          <button
            onClick={() => setActiveChannel('whatsapp')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeChannel === 'whatsapp'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-transparent text-ink-quiet dark:text-ink-darkQuiet hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Brief</span>
          </button>
          <button
            onClick={() => setActiveChannel('sms')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeChannel === 'sms'
                ? 'border-sky-600 text-sky-800 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20'
                : 'border-transparent text-ink-quiet dark:text-ink-darkQuiet hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>SMS (3-Segment)</span>
          </button>
          <button
            onClick={() => setActiveChannel('voice')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeChannel === 'voice'
                ? 'border-amber-600 text-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                : 'border-transparent text-ink-quiet dark:text-ink-darkQuiet hover:text-ink-deep dark:hover:text-ink-darkDeep'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Voice / IVR</span>
          </button>
        </div>

        {/* Channel Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* 1. WhatsApp View */}
          {activeChannel === 'whatsapp' && (
            <div className="space-y-3">
              <div className="bg-[#E5DDD5] dark:bg-[#1a2228] p-3 rounded-3xl border border-[#D1C7BA] dark:border-[#2b353e] shadow-inner max-w-sm mx-auto space-y-2">
                <div className="bg-white dark:bg-[#202c33] p-3.5 rounded-2xl rounded-tl-none text-xs text-ink-deep dark:text-[#e9edef] shadow-sm space-y-2 leading-relaxed">
                  <div className="font-bold text-[#075E54] dark:text-[#25d366] border-b border-gray-100 dark:border-gray-700 pb-1 text-[11px] flex justify-between">
                    <span>🌿 Saans Daily Air Brief (Anand Vihar)</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">06:45 AM</span>
                  </div>

                  <p>
                    Good morning Meera. Air now: <strong>Very Poor (AQI 342)</strong>, easing to Poor by 1:00 PM.
                  </p>

                  <div className="space-y-1 font-medium bg-[#F0F2F5] dark:bg-[#111b21] p-2.5 rounded-xl">
                    <div>1️⃣ <strong>Keep windows shut</strong> till 12:30 PM. Air out briefly at 1:30 PM (keeps bedroom ~45% cleaner).</div>
                    <div>2️⃣ <strong>Kids' room purifier:</strong> High for 30 min at bedtime, then Low (expect ~45 µg/m³ overnight).</div>
                    <div>3️⃣ <strong>School walk:</strong> Fitted N95 for Kabir; skip outdoor sports today.</div>
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    🕒 <strong>Best outdoor window:</strong> 1:00 PM – 3:00 PM.<br />
                    Station 1.8 km away, 12 min old.
                  </p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-1.5 text-[11px] text-center font-bold text-[#00A884]">
                    <div className="py-2 bg-[#F0F2F5] dark:bg-[#111b21] rounded-xl hover:bg-[#E2E8F0] dark:hover:bg-[#222e35] cursor-pointer transition-colors active:scale-98">
                      📊 Why this works?
                    </div>
                    <div className="py-2 bg-[#F0F2F5] dark:bg-[#111b21] rounded-xl hover:bg-[#E2E8F0] dark:hover:bg-[#222e35] cursor-pointer transition-colors active:scale-98">
                      💬 Ask a Question
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#202c33] p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs text-center space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-1 text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                    <span>Forwardable Family / Society Card</span>
                    <Share2 className="w-3.5 h-3.5 text-[#075E54] dark:text-[#25d366]" />
                  </div>
                  <div className="font-black text-sal-4 text-sm tracking-wide">
                    AQI 342 • Severe Smog Alert
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                    Delhi-NCR: Keep sensitive elders & asthmatics indoors till 1 PM. Use N95 outdoors.
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 pt-1">
                    <QrCode className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
                    <span>Scan to view Anand Vihar live air plan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SMS View */}
          {activeChannel === 'sms' && (
            <div className="space-y-3 max-w-sm mx-auto">
              <div className="bg-paper-50 dark:bg-paper-dark200 p-4 rounded-3xl border border-paper-300 dark:border-paper-darkBorder font-mono text-xs text-ink-deep dark:text-ink-darkDeep leading-relaxed space-y-2.5">
                <div className="text-[10px] font-bold text-sky-800 dark:text-sky-400 uppercase tracking-wider">
                  SMS Gateway (3 Segments / 440 Chars)
                </div>
                <div className="p-3.5 bg-white dark:bg-paper-dark100 rounded-2xl border border-paper-300 dark:border-paper-darkBorder text-[11px] leading-relaxed shadow-sm">
                  Saans: Very Poor air (AQI 342). Keep windows shut till 12:30 PM. Purifier high 30 min at bedtime. N95 for school walk. Best outdoor window 1-3 PM. Reply WHY for reasons or MASK for fit guide. Reply STOP to opt out.
                </div>
                <div className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet">
                  Keywords supported: AIR, PLAN, MASK, WHY, HELP, LANG
                </div>
              </div>
            </div>
          )}

          {/* 3. Voice / IVR Audio Script */}
          {activeChannel === 'voice' && (
            <div className="space-y-3 max-w-sm mx-auto">
              <div className="bg-paper-50 dark:bg-paper-dark200 p-4 rounded-3xl border border-paper-300 dark:border-paper-darkBorder space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    Spoken Brief (60-90s IVR Script)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                    Native Hindi/English Voice
                  </span>
                </div>

                <div className="p-3.5 bg-white dark:bg-paper-dark100 rounded-2xl border border-paper-200 dark:border-paper-darkBorder text-xs text-ink-deep dark:text-ink-darkDeep leading-relaxed italic shadow-sm">
                  "Namaste. Today the air in your area is very bad. Keep your windows shut this morning. If you need to step out, wear an N95 mask. The safest time for outdoor tasks is between 1:00 PM and 3:00 PM. Press 1 to repeat. Press 2 to ask a question."
                </div>

                <div className="flex items-center gap-3 bg-paper-200/60 dark:bg-paper-dark300/60 p-3 rounded-2xl">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-9 h-9 rounded-full bg-teal-brand dark:bg-teal-darkBrand text-white dark:text-ink-deep flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-ink-deep dark:text-ink-darkDeep mb-1">
                      <span>{isPlayingAudio ? 'Speaking in calm local tone...' : 'Listen to Spoken Voice Brief'}</span>
                      {isPlayingAudio && (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-1" />
                          <span className="w-0.5 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-3" />
                          <span className="w-0.5 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-2" />
                          <span className="w-0.5 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-4" />
                        </div>
                      )}
                    </div>
                    <div className="w-full bg-paper-300 dark:bg-paper-dark400 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`bg-teal-brand dark:bg-teal-darkBrand h-full rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'w-full transition-all duration-[5000ms] ease-linear' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
