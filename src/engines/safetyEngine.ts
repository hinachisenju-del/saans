// src/engines/safetyEngine.ts

export interface RedFlagCheckResult {
  isRedFlag: boolean;
  severity: 'immediate_emergency' | 'same_day_consult' | 'none';
  matchedKeywords: string[];
  emergencyMessage: string;
  emergencyMessageHi: string;
  nearestFacilityNote: string;
}

const IMMEDIATE_RED_FLAGS = [
  'difficulty breathing',
  'struggling to speak',
  'breathless',
  'short of breath',
  'cant breathe',
  'can not breathe',
  "can't breathe",
  'chest pain',
  'chest pressure',
  'chest tightness',
  'blue lips',
  'grey lips',
  'fainting',
  'passed out',
  'severe wheeze',
  'inhaler not working',
  'infant fast breathing',
  'baby breathing fast',
  'coughing blood',
  'blood in cough',
  'stroke',
  'saans lene me takleef',
  'saans phool rahi',
  'chhati me dard',
  'hosh kho diya',
];

const SAME_DAY_SYMPTOMS = [
  'persistent cough',
  'worsening wheeze',
  'throat irritation',
  'eye burning',
  'drowsiness',
  'khansi ruk nahi rahi',
  'gale me jalan',
];

export function checkRedFlags(text: string): RedFlagCheckResult {
  const lower = text.toLowerCase();
  const matchedImmediate: string[] = [];
  const matchedSameDay: string[] = [];

  for (const flag of IMMEDIATE_RED_FLAGS) {
    if (lower.includes(flag)) {
      matchedImmediate.push(flag);
    }
  }

  if (matchedImmediate.length > 0) {
    return {
      isRedFlag: true,
      severity: 'immediate_emergency',
      matchedKeywords: matchedImmediate,
      emergencyMessage:
        'This could be serious. Please get medical help immediately. Call emergency services (112 / 102) or go to the nearest emergency room. While waiting, move to the cleanest indoor room and sit upright. Do not wait for advice here.',
      emergencyMessageHi:
        'यह गंभीर हो सकता है। कृपया तुरंत चिकित्सकीय सहायता लें। आपातकालीन नंबर (112 / 102) पर कॉल करें या नजदीकी अस्पताल जाएं। इस दौरान सबसे साफ कमरे में आराम से बैठें।',
      nearestFacilityNote:
        'Emergency Rooms nearby: Safdarjung Hospital (4.2 km) • AIIMS Trauma Center (5.1 km). Ambulance: 102 / 112.',
    };
  }

  for (const flag of SAME_DAY_SYMPTOMS) {
    if (lower.includes(flag)) {
      matchedSameDay.push(flag);
    }
  }

  if (matchedSameDay.length > 0) {
    return {
      isRedFlag: false,
      severity: 'same_day_consult',
      matchedKeywords: matchedSameDay,
      emergencyMessage:
        'These symptoms should be reviewed by a doctor today, especially for children or elders with respiratory conditions. Move to a filtered room and rest.',
      emergencyMessageHi:
        'इन लक्षणों के लिए आज ही डॉक्टर से परामर्श लें, खासकर बच्चों और बुजुर्गों के लिए। फ़िल्टर वाले कमरे में आराम करें।',
      nearestFacilityNote: 'Contact your family physician or clinic.',
    };
  }

  return {
    isRedFlag: false,
    severity: 'none',
    matchedKeywords: [],
    emergencyMessage: '',
    emergencyMessageHi: '',
    nearestFacilityNote: '',
  };
}
