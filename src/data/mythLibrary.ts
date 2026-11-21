// src/data/mythLibrary.ts

export interface MythEntry {
  id: string;
  topic: string;
  topicHi: string;
  claim: string;
  claimHi: string;
  verdict: 'Ineffective' | 'Overstated' | 'Harmful' | 'Verified Effective' | 'Conditional';
  verdictHi: string;
  explanation: string;
  explanationHi: string;
  evidenceGrade: 'A' | 'B' | 'C';
  citation: string;
  actionableAdvice: string;
  actionableAdviceHi: string;
}

export const MYTH_LIBRARY: MythEntry[] = [
  {
    id: 'myth_steam_inhalation',
    topic: 'Steam Inhalation for Smog',
    topicHi: 'स्मॉग के लिए भाप (स्टीम) लेना',
    claim: 'Taking hot steam cleans smog and soot particles out of your lungs.',
    claimHi: 'गर्म भाप लेने से फेफड़ों में जमा स्मॉग और कालिख बाहर निकल जाती है।',
    verdict: 'Ineffective',
    verdictHi: 'अप्रभावी (असरदार नहीं)',
    explanation:
      'Fine PM2.5 particles penetrate deep into the microscopic alveoli of the lungs. Water steam condenses in the upper throat and cannot dissolve or flush out inhaled carbon soot. Additionally, scalding steam can burn delicate airways, especially in children.',
    explanationHi:
      'PM2.5 के महीन कण फेफड़ों की गहराई (एल्वियोली) तक पहुंच जाते हैं। भाप केवल गले में ही संघनित होती है और इन कणों को नहीं निकाल सकती। उल्टे गर्म भाप से सांस की नली जलने का खतरा रहता है।',
    evidenceGrade: 'A',
    citation: 'WHO Guideline on Inhalation Therapy & Paediatric Pulmonology Advisory 2024',
    actionableAdvice: 'Use clean indoor air and certified N95 masks outdoors instead.',
    actionableAdviceHi: 'इसके बजाय घर में हवा साफ़ रखें और बाहर N95 मास्क पहनें।',
  },
  {
    id: 'myth_air_purifying_plants',
    topic: 'Indoor Air-Purifying Plants',
    topicHi: 'हवा साफ़ करने वाले पौधे (Snake Plant, Areca)',
    claim: 'Keeping 3 or 4 indoor plants like Snake Plant cleans winter smog in your living room.',
    claimHi: 'घर में 3-4 पौधे रखने से कमरे का स्मॉग पूरी तरह साफ़ हो जाता है।',
    verdict: 'Overstated',
    verdictHi: 'अतिशयोक्तिपूर्ण (पर्याप्त नहीं)',
    explanation:
      'The famous 1989 NASA study evaluated volatile organic gases in small sealed 1 m³ plexiglass boxes. In real homes with normal air exchange, you would need between 10 to 100 plants per square meter to equal the clean air delivery of a basic HEPA purifier.',
    explanationHi:
      'नासा का पुराना अध्ययन बंद छोटे बॉक्स में किया गया था। आम घरों में बाहरी हवा के रिसाव के कारण कमरे की हवा साफ़ करने के लिए प्रति वर्ग मीटर 10 से 50 पौधों की आवश्यकता होगी।',
    evidenceGrade: 'A',
    citation: 'Drexel University Review of Indoor Plant VOC & Particulate Removal (2019)',
    actionableAdvice: 'Enjoy plants for greenery, but rely on true HEPA filtration or DIY box-fan filters for PM2.5.',
    actionableAdviceHi: 'पौधे घर की सुंदरता के लिए रखें, लेकिन स्मॉग से बचाव के लिए HEPA फ़िल्टर का उपयोग करें।',
  },
  {
    id: 'myth_cloth_masks',
    topic: 'Cloth & Single Surgical Masks',
    topicHi: 'कपड़े और साधारण सर्जिकल मास्क',
    claim: 'Wrapping a cotton dupatta or wearing a loose surgical mask protects against severe winter smog.',
    claimHi: 'रूमाल बांधने या ढीले सर्जिकल मास्क से गंभीर स्मॉग से पूरी सुरक्षा मिलती है।',
    verdict: 'Ineffective',
    verdictHi: 'अत्यंत सीमित बचाव',
    explanation:
      'Cloth bandanas and cotton dupattas filter only 15% to 20% of fine PM2.5 particles, as particles slip through weave gaps and facial leaks. Unsealed surgical masks leak 50-70% through edge gaps. Only tight-fitting N95/FFP2 respirators block 95%+ of microscopic particles.',
    explanationHi:
      'कपड़े और रुमाल केवल बड़े धूल के कण रोकते हैं, वे PM2.5 को केवल 15-20% ही रोक पाते हैं। सर्जिकल मास्क के किनारों से हवा लीक होती है। केवल N95 या FFP2 रेस्पिरेटर ही 95%+ सुरक्षा देता है।',
    evidenceGrade: 'A',
    citation: 'NIOSH Respirator Assessment & Aerosol Science and Technology (2021)',
    actionableAdvice: 'Equip the family with fitted N95 respirators with an intact nose clip.',
    actionableAdviceHi: 'परिवार के लिए सही फ़िटिंग वाला N95 मास्क ही चुनें।',
  },
  {
    id: 'myth_jaggery_gur',
    topic: 'Jaggery (Gur) for Lungs',
    topicHi: 'गुड़ खाने से फेफड़े साफ़ होना',
    claim: 'Eating a piece of jaggery (gur) every evening cleans toxic smoke from the lungs.',
    claimHi: 'शाम को गुड़ खाने से फेफड़ों में जमा जहरीला धुआं साफ हो जाता है।',
    verdict: 'Ineffective',
    verdictHi: 'अवैज्ञानिक',
    explanation:
      'Ingested jaggery enters the digestive tract (esophagus and stomach), not the respiratory bronchial tree. It has no biological pathway to reach or purge PM2.5 particulate matter from lung tissue.',
    explanationHi:
      'गुड़ पेट (पाचन तंत्र) में जाता है, फेफड़ों में नहीं। इसके पास फेफड़ों के ऊतकों से जहरीले धुएं के कणों को साफ़ करने का कोई जैविक तंत्र नहीं है।',
    evidenceGrade: 'B',
    citation: 'National Institute of Nutrition (NIN) & Pulmonology Review',
    actionableAdvice: 'Do not substitute dietary remedies for respiratory protection.',
    actionableAdviceHi: 'गुड़ को मास्क या इनडोर फ़िल्टर का विकल्प न समझें।',
  },
  {
    id: 'myth_camphor_karpoor',
    topic: 'Inhaling Camphor (Karpoor)',
    topicHi: 'कपूर सूंघना',
    claim: 'Sniffing camphor tied in a potli increases blood oxygen and counters smog breathing troubles.',
    claimHi: 'कपूर सूंघने से ऑक्सीजन का स्तर बढ़ता है और सांस की परेशानी दूर होती है।',
    verdict: 'Harmful',
    verdictHi: 'हानिकारक',
    explanation:
      'Inhaling camphor vapors irritates sensitive bronchial linings and can trigger acute bronchospasms, severe coughing, or seizures in young children. It does not increase blood oxygen saturation.',
    explanationHi:
      'कपूर के वाष्प सांस की नलियों में जलन पैदा करते हैं और दमा के मरीजों व छोटे बच्चों में खांसी का तीव्र दौरा या ऐंठन ला सकते हैं। यह ऑक्सीजन नहीं बढ़ाता।',
    evidenceGrade: 'A',
    citation: 'American Academy of Paediatrics & Indian Paediatric Society Poison Advisory',
    actionableAdvice: 'Avoid burning or sniffing camphor indoors during high pollution days.',
    actionableAdviceHi: 'स्मॉग के दिनों में कपूर सूंघने या घर में जलाने से बचें।',
  },
  {
    id: 'myth_ozone_generators',
    topic: 'Ozone-Generating Air Purifiers',
    topicHi: 'ओजोन और आयोनाइज़र वाले प्यूरीफायर',
    claim: 'Ozone generators and ionic air purifiers destroy pollution particles electronically.',
    claimHi: 'ओजोन जनरेटर प्रदूषण के कणों को बिजली से नष्ट कर देते हैं।',
    verdict: 'Harmful',
    verdictHi: 'खतरनाक',
    explanation:
      'Ozone is itself a toxic respiratory pollutant that chemically burns lung tissue, worsens asthma, and reacts with household VOCs to form formaldehyde. Health authorities worldwide strictly warn against ozone-producing indoor appliances.',
    explanationHi:
      'ओजोन गैस खुद एक गंभीर प्रदूषक है जो फेफड़ों को नुकसान पहुंचाती है और दमा को भड़काती है। वैश्विक स्वास्थ्य संस्थाएं ओजोन जनरेटर के इस्तेमाल की सख्त मनाही करती हैं।',
    evidenceGrade: 'A',
    citation: 'US EPA Indoor Air Quality Science & California Air Resources Board (CARB)',
    actionableAdvice: 'Use purely mechanical HEPA filtration (non-ionizing, zero ozone).',
    actionableAdviceHi: 'केवल शुद्ध मैकेनिकल HEPA फ़िल्टर का उपयोग करें जो ओजोन मुक्त हो।',
  },
];
