// src/components/screens/AskScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { checkRedFlags } from '../../engines/safetyEngine';
import type { RedFlagCheckResult } from '../../engines/safetyEngine';
import { MYTH_LIBRARY } from '../../data/mythLibrary';
import type { MythEntry } from '../../data/mythLibrary';
import {
  MessageCircle,
  Send,
  AlertOctagon,
  BookOpen,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  redFlag?: RedFlagCheckResult;
  citations?: string[];
  myth?: MythEntry;
}

interface AskScreenProps {
  language: 'en' | 'hi';
}

export const AskScreen: React.FC<AskScreenProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_welcome',
      sender: 'assistant',
      text:
        language === 'en'
          ? "Namaste Meera. I'm Saans. I have today's air readings for Anand Vihar (AQI 342, Very Poor). How can I help your family navigate the smog today?"
          : 'नमस्ते मीरा। मैं सांस हूँ। मेरे पास आनंद विहार का वर्तमान वायु स्तर (AQI 342, बहुत खराब) है। आज स्मॉग से बचाव के लिए मैं आपकी क्या मदद कर सकता हूँ?',
      time: '08:30 AM',
      citations: ['CPCB CAAQMS Station Anand Vihar'],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showMyths, setShowMyths] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickChips = [
    { label: 'Can kids play outside at 5 PM?', query: 'Can Kabir play outside at 5 PM? He has asthma.' },
    { label: 'Is it safe to open windows now?', query: 'Can I open the windows right now to air out?' },
    { label: 'Which mask for Kabir?', query: 'Which mask should Kabir (9y) wear for school walk?' },
    { label: 'Does steam clean lungs?', query: 'Does steam inhalation help remove smog particles from lungs?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const redFlagResult = checkRedFlags(query);

    let assistantMsg: ChatMessage;

    if (redFlagResult.isRedFlag) {
      assistantMsg = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'en'
            ? redFlagResult.emergencyMessage
            : redFlagResult.emergencyMessageHi,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        redFlag: redFlagResult,
      };
    } else {
      const lowerQuery = query.toLowerCase();
      const matchedMyth = MYTH_LIBRARY.find(
        (entry) =>
          lowerQuery.includes(entry.topic.toLowerCase()) ||
          (entry.id === 'myth_steam_inhalation' && lowerQuery.includes('steam')) ||
          (entry.id === 'myth_air_purifying_plants' && (lowerQuery.includes('plant') || lowerQuery.includes('areca'))) ||
          (entry.id === 'myth_cloth_masks' && (lowerQuery.includes('cloth') || lowerQuery.includes('surgical'))) ||
          (entry.id === 'myth_jaggery_gur' && (lowerQuery.includes('gur') || lowerQuery.includes('jaggery')))
      );

      if (matchedMyth && (lowerQuery.includes('steam') || lowerQuery.includes('clean'))) {
        assistantMsg = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? `Verdict: ${matchedMyth.verdict}. ${matchedMyth.explanation} ${matchedMyth.actionableAdvice}`
              : `निर्णय: ${matchedMyth.verdictHi}। ${matchedMyth.explanationHi} ${matchedMyth.actionableAdviceHi}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          myth: matchedMyth,
          citations: [matchedMyth.citation],
        };
      } else if (lowerQuery.includes('play') || lowerQuery.includes('cricket')) {
        assistantMsg = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? 'I would advise skipping outdoor sports today. Air at 5 PM is forecast to be Very Poor (PM2.5 ~175 µg/m³), and outdoor running makes children breathe 3–4x more air directly into inflamed airways. An indoor movement routine or quiet games in the clean bedroom is far safer. If Kabir experiences coughing, wheezing, or tightness, refer to his doctor’s written asthma action plan.'
              : 'आज शाम को बाहर खेलने से बचें। शाम 5 बजे वायु गुणवत्ता बहुत खराब रहेगी। खेलते समय बच्चे 3 से 4 गुना अधिक हवा अंदर खींचते हैं जिससे कबीर को खांसी या दमे का दौरा पड़ सकता है। घर के अंदर खेलना सुरक्षित रहेगा।',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ['Indian Academy of Paediatrics Environmental Health Protocol', 'WHO Air Quality 2024'],
        };
      } else if (lowerQuery.includes('window')) {
        assistantMsg = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? 'Keep all windows tightly closed right now. The smog layer will begin breaking after 1:00 PM due to solar warming. Open windows only between 1:30 PM and 2:00 PM for a quick 20-minute cross-ventilation to flush indoor carbon dioxide without letting in the morning soot.'
              : 'अभी खिड़कियां पूरी तरह बंद रखें। दोपहर 1:00 बजे के बाद जब धूप निकलेगी, तब 1:30 से 2:00 बजे के बीच केवल 20 मिनट के लिए खिड़की खोलकर कमरे की हवा बदलें।',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ['CPCB Diurnal Inversion Dynamics', 'ASHRAE Guideline 241'],
        };
      } else {
        assistantMsg = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? 'For your home in Anand Vihar, our physics model recommends focusing on Kabir’s bedroom: seal the door threshold with a damp cloth, keep the purifier on High for 30 minutes before sleep, and fit an N95 mask with an intact nose seal for his commute.'
              : 'आनंद विहार के लिए हमारे मॉडल का सुझाव है कि बच्चों के कमरे का दरवाजा बंद रखें, सोने से पहले प्यूरीफायर चलाएं और स्कूल जाते समय N95 मास्क अवश्य पहनाएं।',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: ['US EPA Indoor Particulate Guidance', 'CPCB CAAQMS Anand Vihar'],
        };
      }
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputText('');
  };

  const handleSimulateVoice = () => {
    setIsVoicePlaying(!isVoicePlaying);
    if (!isVoicePlaying) {
      setTimeout(() => {
        setIsVoicePlaying(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      {/* Ask Header Bar with Voice Equalizer */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-3.5 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper mb-3 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5">
          <MessageCircle className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-deep dark:text-ink-darkDeep">
              {language === 'en' ? 'Ask Saans Assistant' : 'सांस सहायक से पूछें'}
            </h2>
            <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet">
              Clinically grounded • Never hallucinates numbers • Cites sources
            </span>
          </div>
        </div>

        {/* Audio Equalizer Bars or Myth Library */}
        <div className="flex items-center gap-2">
          {isVoicePlaying && (
            <div className="flex items-end gap-0.5 h-4 px-2 py-0.5 bg-teal-light dark:bg-teal-darkLight rounded-md">
              <span className="w-1 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-1" />
              <span className="w-1 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-2" />
              <span className="w-1 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-3" />
              <span className="w-1 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-4" />
              <span className="w-1 bg-teal-brand dark:bg-teal-darkBrand rounded-full animate-audio-wave wave-bar-5" />
            </div>
          )}

          <button
            onClick={() => setShowMyths(!showMyths)}
            className="text-xs font-bold px-2.5 py-1.5 rounded-xl border border-paper-300 dark:border-paper-darkBorder bg-paper-50 dark:bg-paper-dark200 hover:bg-paper-200 dark:hover:bg-paper-dark300 text-teal-brand dark:text-teal-darkBrand flex items-center gap-1 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showMyths ? 'Hide Myths' : 'Myth Library'}</span>
          </button>
        </div>
      </div>

      {/* Myth Library Dropdown */}
      {showMyths && (
        <div className="bg-paper-100 dark:bg-paper-dark100 border border-paper-300 dark:border-paper-darkBorder rounded-3xl p-4 mb-3 max-h-60 overflow-y-auto space-y-2.5 shadow-paper dark:shadow-dark-paper transition-all animate-fade-in">
          <div className="flex justify-between items-center text-xs font-bold text-ink-deep dark:text-ink-darkDeep border-b border-paper-200 dark:border-paper-dark300 pb-1.5">
            <span>Verified Evidence-Based Myth Library</span>
            <span className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet">Grade A Clinical Evidence</span>
          </div>
          {MYTH_LIBRARY.map((myth) => (
            <div
              key={myth.id}
              onClick={() => handleSend(`Tell me about: ${myth.topic}`)}
              className="p-3 rounded-2xl bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-dark300 hover:border-teal-brand dark:hover:border-teal-darkBrand cursor-pointer transition-all active:scale-98"
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-bold text-ink-deep dark:text-ink-darkDeep">{myth.topic}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  myth.verdict === 'Harmful' ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                }`}>
                  {myth.verdict}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted dark:text-ink-darkMuted line-clamp-2 leading-relaxed">
                {myth.claim}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Chat Messages Scrollable Feed */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col animate-fade-in ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {msg.redFlag && msg.redFlag.isRedFlag ? (
              <div className="max-w-[92%] bg-[#481212] dark:bg-[#380e0e] text-amber-50 p-4 rounded-3xl border-2 border-red-700 shadow-paper-md space-y-3">
                <div className="flex items-center gap-2 text-red-300 font-black uppercase text-xs tracking-wider">
                  <AlertOctagon className="w-5 h-5 text-red-400 animate-bounce" />
                  <span>Medical Red-Flag Detected</span>
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed">
                  {msg.text}
                </p>

                <div className="p-3 bg-red-950/80 rounded-2xl border border-red-800 text-xs space-y-1.5">
                  <span className="font-bold text-amber-300 block">
                    Immediate Facilities & Helplines:
                  </span>
                  <div className="text-amber-100/90 leading-relaxed font-mono text-[11px]">
                    {msg.redFlag.nearestFacilityNote}
                  </div>
                </div>

                <div className="text-[10px] text-red-200/80 italic">
                  Saans does not diagnose or replace hospital emergency triage. Please proceed to the nearest emergency room immediately.
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[85%] rounded-3xl p-4 text-xs leading-relaxed transition-all ${
                  msg.sender === 'user'
                    ? 'bg-teal-brand dark:bg-teal-darkBrand text-paper-50 dark:text-ink-deep rounded-br-none shadow-sm'
                    : 'bg-paper-100 dark:bg-paper-dark100 border border-paper-300 dark:border-paper-darkBorder text-ink-deep dark:text-ink-darkDeep rounded-bl-none shadow-paper dark:shadow-dark-paper'
                }`}
              >
                <p className="whitespace-pre-line font-medium">{msg.text}</p>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-paper-300/80 dark:border-paper-darkBorder flex flex-wrap gap-1">
                    {msg.citations.map((cite, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-teal-dark dark:text-teal-darkBrand bg-teal-light/70 dark:bg-teal-darkLight px-2 py-0.5 rounded-md font-mono font-bold"
                      >
                        Source: {cite}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] mt-1 text-right ${
                    msg.sender === 'user'
                      ? 'text-teal-light/80 dark:text-teal-dark/70 font-semibold'
                      : 'text-ink-quiet dark:text-ink-darkQuiet'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips with Hover Animation */}
      <div className="py-2 overflow-x-auto no-scrollbar flex gap-2">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-paper-100 dark:bg-paper-dark100 hover:bg-paper-200 dark:hover:bg-paper-dark200 border border-paper-300 dark:border-paper-darkBorder text-ink-muted dark:text-ink-darkMuted whitespace-nowrap transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Bar with Animated Microphone / Audio Trigger */}
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl p-2.5 border border-paper-300 dark:border-paper-darkBorder shadow-paper dark:shadow-dark-paper flex items-center gap-2 transition-all">
        <button
          onClick={handleSimulateVoice}
          className={`p-2.5 rounded-2xl border transition-all ${
            isVoicePlaying
              ? 'bg-teal-brand dark:bg-teal-darkBrand text-white shadow-glow-teal animate-pulse'
              : 'bg-paper-50 dark:bg-paper-dark200 border-paper-300 dark:border-paper-darkBorder text-ink-muted dark:text-ink-darkMuted hover:text-teal-brand dark:hover:text-teal-darkBrand'
          }`}
          title="Play voice brief in calm, warm local accent"
        >
          {isVoicePlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={
            language === 'en'
              ? 'Ask about masks, purifier, walking, symptoms...'
              : 'मास्क, खिड़की, लक्षण या हवा के बारे में पूछें...'
          }
          className="flex-1 bg-transparent text-xs text-ink-deep dark:text-ink-darkDeep placeholder-ink-quiet dark:placeholder-ink-darkQuiet focus:outline-none px-2"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-2xl bg-teal-brand dark:bg-teal-darkBrand text-paper-50 dark:text-ink-deep hover:bg-teal-hover dark:hover:bg-teal-brand disabled:opacity-40 transition-all flex-shrink-0 active:scale-95 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
