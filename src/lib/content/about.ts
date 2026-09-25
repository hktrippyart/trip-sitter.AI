import type { Locale } from "@/lib/i18n";

export type AboutBlock = {
  heading: string;
  body?: string;
  items?: { title: string; body: string }[];
};

export type AboutContent = {
  title: string;
  sections: AboutBlock[];
  contactCta: string;
  contactLink: string;
};

const en: AboutContent = {
  title: "trip-sitter.AI",
  contactCta: "Want to collaborate or have questions?",
  contactLink: "Contact us",
  sections: [
    {
      heading: "Our Mission",
      body: "As an open educational hub and support platform, we bridge human care with 24/7 accessible technology for harm reduction. We combine curated online trip-sitting service with an AI-driven training framework to empower global community members. Our mission is to provide immediate presence during intense emotional experiences, altered states of consciousness, and sensory overload anytime anywhere.",
    },
    {
      heading: "The Gap We Fill: Why AI for Harm Reduction?",
      body: "Harm reduction crises often occur during late-night hours—moments when individuals are completely isolated or afraid to reach out to friends, family, or authorities due to fear of stigma, judgment, or legal consequences.\n\nOur platform does not aim to replace human connection. Instead, it serves as an accessible first responder and navigator in those critical moments when no one else is around, filling the crucial gap in existing support networks.",
    },
    {
      heading: "Key Advantages of AI Peer Support",
      items: [
        {
          title: "Consistent & Standardized Care",
          body: "Trained strictly on harm-reduction SOPs to ensure consistent, non-directive support without the risk of panic, over-intervention, or bad advice often given by untrained peers.",
        },
        {
          title: "24/7 Immediate Response",
          body: "Eliminates waiting times during late-night panic or crisis, delivering second-level de-escalation and immediate grounding techniques.",
        },
        {
          title: "Zero Judgment & Zero Stigma",
          body: "Provides a completely anonymous, non-judgmental space where users can speak openly about their condition without fear of societal stigma or repercussions.",
        },
      ],
    },
    {
      heading: "How Our AI Framework Works",
      body: "Our AI models are trained on internationally recognized peer-to-peer harm reduction protocols and standard operating procedures (SOPs):",
      items: [
        {
          title: 'Holding Space, Not "Fixing"',
          body: "Uses empathetic, non-directive listening without imposing commands, judgment, or unsolicited advice, allowing users to process their experiences safely.",
        },
        {
          title: "Empathetic Neutrality",
          body: 'Normalizes intense emotional states without pathologizing them, reducing the anxiety caused by "fear of the fear itself." With non-directive dialogues, trip-sitter.AI avoids giving commands, moralizing, or offering unsolicited advice.',
        },
        {
          title: "Evidence-Based Grounding Techniques",
          body: "Delivers guided exercises in real time, including Box Breathing, 5-4-3-2-1 sensory grounding, and environmental de-escalation tips to help users reconnect with the present moment.",
        },
        {
          title: "Strict Red Flags Triage",
          body: "Monitors safety boundaries continuously. If acute physical distress, severe overdose risk, or self-harm intent is detected, the AI immediately halts standard chat and directs the user to local emergency services (e.g., 911 / 999) or professional crisis hotlines.",
        },
      ],
    },
    {
      heading: "Service Limitations & Safety Boundaries",
      body: "To ensure complete transparency and user safety, we clearly define the boundaries of our platform:",
      items: [
        {
          title: "Not Medical or Psychiatric Care",
          body: "trip-sitter.AI is not a medical facility, psychiatric clinic, or therapy platform. The AI functions as a peer supporter and navigator, not a licensed medical professional, and cannot diagnose conditions, prescribe medications, or perform psychotherapy.",
        },
        {
          title: "Hard Boundaries on Acute Crises",
          body: "In medical emergencies (e.g., unconsciousness, persistent vomiting, seizures, severe breathing difficulty, or acute self-harm), online AI cannot offer physical intervention. Users must immediately seek emergency medical assistance.",
        },
        {
          title: "Dependence on Technology",
          body: "Our services rely on stable internet connection, electricity, and server uptime. It should never be relied upon as the sole safety net in extreme-risk situations.",
        },
        {
          title: "Immediate Respite, Not Long-Term Integration",
          body: "The AI focuses solely on immediate de-escalation and grounding during acute sensory overload. It is not a substitute for professional counselors or experienced human guides for long-term integration and trauma resolution.",
        },
      ],
    },
  ],
};

const zhHant: AboutContent = {
  title: "trip-sitter.AI",
  contactCta: "希望合作或有任何疑問？",
  contactLink: "聯絡我哋",
  sections: [
    {
      heading: "我哋嘅使命",
      body: "作為一個開源嘅教育樞紐與支援平台，我哋將人文關懷同 24/7 隨手可及嘅科技結合，全力推動減害運動（Harm Reduction）。我哋整合精選嘅線上同行陪伴（Trip-sitting）服務同埋由 AI 驅動嘅培訓框架，幫助全球嘅社群成員喺呢方面進修。我哋嘅使命係喺情緒劇烈波動、意識狀態改變同感官過載嘅任何時刻同任何地方提供即時嘅陪伴。",
    },
    {
      heading: "我哋填補嘅空白：點解要用 AI 做減害？",
      body: "減害危機往往發生喺深夜——求助者當時可能處於極度孤立無援嘅狀態，又或者怕標籤審判甚至法律後果，而唔敢向親友或執法單位求助。\n\n我哋嘅平台並唔係想取代人與人之間嘅真實連結；相反，我哋希望喺你身邊完全無人嘅關鍵時刻擔當第一響應者（First Responder）同導航員，填補現有支援網絡中脆弱嘅缺口。",
    },
    {
      heading: "AI 同行支援嘅核心優勢",
      items: [
        {
          title: "高標準與一致性嘅專業陪伴",
          body: "我哋嘅 AI 經過嚴格根據減害標準作業流程（SOP）進行訓練，提供穩定且非指令式嘅支援，避免從未受訓練朋友因一時慌張而過度干預、誤判甚至俾錯誤指引。",
        },
        {
          title: "24/7 即時秒級回應",
          body: "消除深夜恐慌或心理危機時嘅漫長等待，即時做到秒級嘅情緒降溫同感官接地（Grounding）。",
        },
        {
          title: "零標籤同零批判",
          body: "呢度提供一個完全匿名無審判嘅空間俾你坦白傾訴自己嘅真實狀況，無需擔心社會標籤或者負面後果。",
        },
      ],
    },
    {
      heading: "我哋 AI 框架嘅運作機制",
      body: "我哋嘅 AI 模型訓練嚴格遵循國際認可嘅同行減害（Peer-to-Peer Harm Reduction）協議與標準作業流程（SOP）：",
      items: [
        {
          title: '陪伴而非修復（Holding Space, Not "Fixing"）',
          body: "採用具同理心同非指令式嘅傾聽，唔強加命令、批判或非必要嘅建議，令你安全順應同平復當下嘅體驗。",
        },
        {
          title: "具有同理心嘅中立性（Empathetic Neutrality）",
          body: "透過非指令式對話避免給予命令、道德教誨或未經請求嘅建議，將強烈嘅情緒狀態視為自然歷程「去疾病化」，從而減輕焦慮。",
        },
        {
          title: "感官接地（Grounding Techniques）",
          body: "即時提供經過驗證嘅引導練習，包括箱式呼吸法（Box Breathing）、5-4-3-2-1 感官接地法等減壓建議，帶你重新返嚟當下。",
        },
        {
          title: "嚴謹嘅紅旗預警與分流機制（Red Flags Triage）",
          body: "持續監測安全邊界，一旦偵測到急性生理危險、嚴重過量風險或自傷意圖引導你聯繫在地緊急救援服務（如 999 / 911）或者其他專業危機熱線。",
        },
      ],
    },
    {
      heading: "服務限制與安全邊界",
      body: "為確保完全透明同用戶安全，我哋清晰界定本平台嘅服務邊界：",
      items: [
        {
          title: "非醫療或精神科診治",
          body: "我哋絕非醫療機構、精神科診所或心理諮商平台。定位角色係同行支援者同導航員，並非持有執照嘅醫療專業人員，無法進行診斷、開藥或臨床心理治療。",
        },
        {
          title: "急性危機嘅硬性邊界",
          body: "遇上醫療緊急狀況（如：昏迷、持續嘔吐、抽搐、嚴重呼吸困難或急性自傷）我哋無法提供實體救援，請必須立即尋求緊急醫療救助。",
        },
        {
          title: "對科技與網絡嘅依賴",
          body: "我哋嘅服務依賴穩定的網絡連線、電力同伺服器運作，唔可以作為極高風險情境下嘅唯一安全防線。",
        },
        {
          title: "當下平復而非長期身心整合",
          body: "專注於急性感官過載時嘅即時降溫同接地。對於經驗結束後嘅長期心理整合（Integration）與創傷處理，無法取代專業心理諮商師或經驗豐富嘅實體引導者。",
        },
      ],
    },
  ],
};

export function getAboutContent(locale: Locale): AboutContent {
  return locale === "zh-Hant" ? zhHant : en;
}
