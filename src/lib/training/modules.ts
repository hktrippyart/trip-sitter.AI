import type { Module } from "./types";

export type { Module, Slide } from "./types";

/** Online trip-sitter curriculum adapted from peer harm-reduction training principles. */
export const COURSE_PRODUCT_KEY = "course_online_trip_sitter";

export const modules: Module[] = [
  {
    id: "module-1",
    slug: "module-1",
    track: "peer-basics",
    title: "Ethics, Safety Foundations & Volunteer Self-Care",
    subtitle: "Scope, boundaries, scene size-up, and nervous-system regulation",
    order: 1,
    estimateMinutes: 35,
    slides: [
      {
        kicker: "Peer Support Basics · Module 1",
        title: "Ethics, safety foundations & self-care",
        body: "Before you sit with someone in a storm — know your edge, scan the field, regulate yourself.",
        punch: "Peer support holds the critical window. You are not a clinician.",
        layout: "title",
      },
      {
        kicker: "Why this exists",
        title: "The critical window closes fast",
        body: "Online, that window is a screen and a voice. Overwhelm can tip into emergency without a shared room. Your job is steady presence — not diagnosis, not dosing advice, not therapy.",
        points: [
          "Scope — peer, horizontal, non-directive",
          "Safety — theirs and yours, including digital safety",
          "Self-care — you co-regulate; burnout helps no one",
        ],
      },
      {
        kicker: "01 · Scope",
        title: "Peer role ≠ hierarchy",
        body: "You sit beside, not above. You do not interpret their trip, prescribe meaning, or take control of their body or substances.",
        columns: [
          {
            heading: "You offer",
            items: [
              "Calm presence and co-regulation",
              "Consent-based check-ins",
              "Help reducing sensory load",
              "Knowing when to escalate to real-world help",
            ],
          },
          {
            heading: "You do not",
            items: [
              "Play doctor or therapist",
              "Touch without clear ongoing consent",
              "Exploit vulnerability (romantic, financial, content)",
              "Force “breakthroughs” or keep them talking",
            ],
          },
        ],
      },
      {
        kicker: "01 · Boundaries",
        title: "What sitters do — and don’t",
        body: "Most risks are psychological — until they’re medical. Know which lane you’re in.",
        points: [
          "Yellow care: anxiety, confusion, looping, tears, overwhelm — stay, ground, reduce input",
          "Red escalate: seizures, unresponsive, chest pain, severe hyperthermia signs, clear danger to self/others — emergency services + local support",
        ],
        punch: "Online sitters still escalate in the real world. Know their location and emergency contacts before you start.",
      },
      {
        kicker: "01 · Consent",
        title: "Vulnerability is sacred terrain",
        body: "Ask → wait for a clear yes. Silence is not consent. Intoxication raises the bar, not lowers it.",
        points: [
          "Agree scope before the session (voice/video, duration, what you’ll do if things escalate)",
          "Re-check consent if the vibe shifts",
          "Zero exploitation — no screenshots, recordings, or sharing without prior explicit agreement",
          "End the sit if boundaries are repeatedly crossed — yours or theirs",
        ],
      },
      {
        kicker: "01 · Confidentiality",
        title: "What happens in care stays in care",
        body: "Default = total privacy. Break confidentiality only to prevent imminent serious harm.",
        points: [
          "No gossip, no group chats about their trip",
          "Secure your device; don’t sit from public screens",
          "If you must escalate, share the minimum needed for safety",
        ],
        punch: "Trust is the product. Break it only to save a life.",
      },
      {
        kicker: "02 · Safety pillars",
        title: "Three pillars of safety",
        columns: [
          {
            heading: "Person",
            items: [
              "Breathing, hydration, temperature cues",
              "Orientation to time/place as much as possible",
              "Known meds / conditions disclosed in advance",
            ],
          },
          {
            heading: "Environment",
            items: [
              "Quiet lighting, water nearby, phone charged",
              "Someone local who can arrive if needed",
              "Reduce tabs, alerts, chaotic audio",
            ],
          },
          {
            heading: "You",
            items: [
              "Sober, fed, rested enough to stay regulated",
              "Exit plan if you leave your window of tolerance",
              "No dual role as dealer, partner, or content creator mid-sit",
            ],
          },
        ],
      },
      {
        kicker: "02 · Size-up",
        title: "Scene size-up before you dive in",
        body: "Online “scene” = voice tone, camera cues, chat latency, and who else is in the room.",
        points: [
          "Confirm physical address and emergency contact at the start",
          "Note substances/timing only as they volunteer — you are not a chemist",
          "Watch for medical red flags early; don’t wait for “proof”",
          "Lower sensory load: suggest dim lights, slower music, fewer voices",
        ],
      },
      {
        kicker: "03 · Nervous system",
        title: "Window of Tolerance",
        body: "Guests co-regulate off your calm. Stay in the green band — or tap out and hand off.",
        points: [
          "Hyperarousal: racing, panic, agitation — slow your voice, shorten sentences",
          "Hypoarousal: flat, dissociated, hard to reach — gentle orientation, not intensity",
          "Your micro-regulations matter more than clever words",
        ],
      },
      {
        kicker: "03 · W.A.I.T.",
        title: "Why Am I Talking?",
        body: "If you’re talking to feel better — stop. The guest isn’t your regulator.",
        points: [
          "Prefer short reflections over advice",
          "Silence is a tool, not a failure",
          "Questions should open space, not interrogate the trip",
        ],
        punch: "Presence over performance.",
      },
      {
        kicker: "03 · Tools",
        title: "Micro-regulations on the call",
        points: [
          "Match slower breathing without forcing theirs",
          "Offer orientation: “You’re on a call. You’re safe in your room.”",
          "Suggest water, blanket, eyes closed, or looking at one calm object",
          "If you’re flooding — mute, stand, sigh, hand off",
        ],
      },
      {
        kicker: "03 · Sustainability",
        title: "Don’t burn for the night",
        body: "A burned-out sitter is a liability. Rest is part of harm reduction.",
        points: [
          "Cap session length; arrange relief if needed",
          "De-rope after: hydrate, move, write one line, sleep",
          "Seek your own support if a sit shook you",
        ],
        punch: "Stay soft. Stay sharp. Stay safe.",
      },
    ],
  },
  {
    id: "module-2",
    slug: "module-2",
    track: "peer-basics",
    title: "Trauma-Attuned Care & Cultural Consideration",
    subtitle: "Safe space, invitational language, and co-regulation",
    order: 2,
    estimateMinutes: 30,
    slides: [
      {
        kicker: "Peer Support Basics · Module 2",
        title: "Creating a safe space",
        body: "When defenses drop, trauma and oppression can surface fast. Your job is a container of acceptance—not re-traumatization.",
        layout: "title",
      },
      {
        kicker: "Trauma-informed",
        title: "Prevent re-traumatization",
        points: [
          "Trauma = overwhelmed nervous-system response, not just the event",
          "Avoid coercion, control, or forcing posture/location/speech",
          "Do not pathologize tears, shaking, or intense discharge",
        ],
      },
      {
        kicker: "Language",
        title: "Invitational, not directive",
        body: "Trauma strips agency—restore choice with transparent, permission-based offers.",
        points: [
          "Offer options: chair, water, distance, pause",
          "Avoid “calm down” — model calm instead",
          "Name intent before changing environment (“I’ll grab a blanket—is that alright?”)",
        ],
      },
      {
        kicker: "Presence",
        title: "Non-verbal co-regulation",
        points: [
          "Open posture, visible hands, respectful distance",
          "Slower speech, lower pitch, softer tone",
          "Your stability is the anchor",
        ],
      },
      {
        kicker: "Culture",
        title: "Cultural attunement",
        body: "Guests arrive with identity, faith, language, and history. Curiosity beats assumption.",
        points: [
          "Ask what feels respectful; don’t stereotype",
          "Notice power, gender, and access dynamics in the room (or on the call)",
          "When unsure, pause and consult team leads",
        ],
      },
      {
        kicker: "Online",
        title: "Digital safe space",
        points: [
          "Confirm who else can hear; offer text-only if needed",
          "Reduce triggers in background video/audio",
          "Never record without explicit prior agreement",
        ],
        punch: "Safety is relational before it is technical.",
      },
    ],
  },
  {
    id: "module-3",
    slug: "module-3",
    track: "peer-basics",
    title: "Non-Directive Inquiry & Active Listening",
    subtitle: "Presence, reflection, and somatic awareness",
    order: 3,
    estimateMinutes: 30,
    slides: [
      {
        kicker: "Peer Support Basics · Module 3",
        title: "Sitting, not guiding",
        body: "You are a grounded container—not an interpreter. Trust the guest’s inner resiliency.",
        layout: "title",
      },
      {
        kicker: "Mindset",
        title: "Beginner’s mind",
        points: [
          "Drop the expert seat—no diagnosing or ranking their experience",
          "Release agendas (“I hope they breakthrough”)",
          "Allow non-linear, messy, repetitive process",
        ],
      },
      {
        kicker: "Listening",
        title: "Reflective listening",
        points: [
          "Emotional reflection: name the feeling tone you hear",
          "Content reflection: mirror key words without adding meaning",
          "Short summaries when they feel overwhelmed—beginning, middle, now",
        ],
      },
      {
        kicker: "Inquiry",
        title: "Non-directive questions",
        body: "Questions open curiosity; they don’t steer outcomes.",
        points: [
          "“What feels most present right now?”",
          "“Would it help to go slower?”",
          "Avoid why-chains that feel like interrogation",
        ],
      },
      {
        kicker: "Somatic",
        title: "Body-aware support",
        points: [
          "Notice breath, tension, pacing—reflect without fixing",
          "Invite optional grounding; never force techniques",
          "W.A.I.T. — Why Am I Talking?",
        ],
      },
      {
        kicker: "Online",
        title: "Voice & chat presence",
        points: [
          "Silence on a call is allowed—check in gently",
          "Match their tempo; don’t flood with tips",
          "Type less when they’re dysregulated; be predictable",
        ],
        punch: "Be the mirror, not the map.",
      },
    ],
  },
  {
    id: "module-4",
    slug: "module-4",
    track: "peer-basics",
    title: "Navigating Difficult Experiences & Crisis Intervention",
    subtitle: "Co-regulation, triage, escalation, and closing a sit",
    order: 4,
    estimateMinutes: 40,
    slides: [
      {
        kicker: "Peer Support Basics · Module 4",
        title: "Be the grounded anchor",
        body: "A practical field guide for emotional de-escalation and crisis awareness while trip-sitting online.",
        punch: "Your calm nervous system is the intervention.",
        layout: "title",
      },
      {
        kicker: "Core directive",
        title: "Protect the capacity to help",
        body: "If your own safety — physical, emotional, digital — is compromised, you cannot help anyone else. Pause, hand off, or escalate.",
      },
      {
        kicker: "Relationship",
        title: "Stay horizontal",
        body: "No guru seat. No “I know what your trip means.” Companionship without capture.",
        points: [
          "Reflect feelings more than interpret visions",
          "Avoid ranking substances or comparing trips",
          "Decline roles that create power imbalance mid-session",
        ],
      },
      {
        kicker: "Confidentiality",
        title: "Privacy with a safety valve",
        body: "Default = total privacy. Share only when harm is imminent and serious.",
      },
      {
        kicker: "Sensory load",
        title: "Reduce input before you add words",
        points: [
          "Fewer voices, lower volume, simpler visuals",
          "Suggest sitting or lying somewhere soft and familiar",
          "One calm focal point beats a flood of tips",
        ],
      },
      {
        kicker: "Co-regulation",
        title: "Grounded presence",
        body: "Your stance on the call teaches their nervous system what “safe enough” feels like.",
        points: [
          "Steady tone, unhurried pacing",
          "Visible calm if on video — shoulders down, soft gaze",
          "Predictable check-ins instead of constant chatter",
        ],
      },
      {
        kicker: "Boundaries",
        title: "Scripts that hold the line",
        points: [
          "“I can stay with you. I can’t advise on dosing.”",
          "“I’m going to get local help now — you matter more than privacy.”",
          "“I need a five-minute reset; I’ll be right back / my backup is joining.”",
        ],
      },
      {
        kicker: "Speech",
        title: "How you speak",
        body: "Short. Concrete. Present-tense. W.A.I.T. before every monologue.",
        points: [
          "Name what’s happening without catastrophizing",
          "Offer choices with two options max",
          "Avoid “calm down” — demonstrate calm instead",
        ],
      },
      {
        kicker: "Medical red flags",
        title: "Escalate — don’t debate",
        body: "You are not diagnosing. You are noticing danger and getting real-world help.",
        points: [
          "Seizure, collapse, can’t wake, severe vomiting with aspiration risk",
          "Chest pain, trouble breathing, signs of dangerous overheating",
          "Uncontrolled bleeding, serious injury",
        ],
        punch: "Call local emergency services. Use their address. Stay on the line if safe.",
      },
      {
        kicker: "Psych emergencies",
        title: "When mind-state becomes danger",
        points: [
          "Active plan/intent to harm self or others",
          "Unable to stay oriented enough to stay safe alone",
          "Severe paranoia with fleeing into traffic / heights / weapons access",
        ],
        body: "Get local humans involved. Online presence is not enough.",
      },
      {
        kicker: "Triage",
        title: "Yellow care · Red escalate",
        columns: [
          {
            heading: "Yellow — stay & support",
            items: [
              "Anxiety, tears, looping thoughts",
              "Confusion that still tracks your voice",
              "Need for quieter setting and time",
            ],
          },
          {
            heading: "Red — escalate now",
            items: [
              "Medical red flags",
              "Imminent harm risk",
              "You are out of your window and no backup exists",
            ],
          },
        ],
      },
      {
        kicker: "Closing",
        title: "Prepare for landing",
        body: "Help them toward hydration, warmth, simple food later, and rest. Agree how you’ll check in after — without hovering.",
        points: [
          "Confirm they are oriented enough before you disconnect",
          "Leave crisis numbers and a local contact path",
          "Invite creative integration when the wave has passed — not mid-peak",
        ],
      },
      {
        kicker: "Aftercare for you",
        title: "De-rope & recover",
        points: [
          "Shake out, hydrate, step outside if you can",
          "Note what worked; release what didn’t",
          "Talk to a trusted peer if the sit was heavy — without gossiping details",
        ],
        punch: "Be the grounded anchor — then put the rope down.",
      },
    ],
  },
  {
    id: "module-5",
    slug: "module-5",
    track: "peer-basics",
    title: "Integration & Sustaining Care",
    subtitle: "Aftercare, closing the container, and long-term support paths",
    order: 5,
    estimateMinutes: 30,
    slides: [
      {
        kicker: "Peer Support Basics · Module 5",
        title: "Integration fundamentals",
        body: "The wave ending is not the end. Days to weeks after are a window for digesting experience into daily life.",
        layout: "title",
      },
      {
        kicker: "Scope",
        title: "Peer integration vs. therapy",
        points: [
          "Peers offer companionship, routines, resources—not trauma analysis or diagnosis",
          "Refer when distress persists or trauma needs clinical care",
          "Integration is ongoing, not one conversation",
        ],
      },
      {
        kicker: "Practices",
        title: "Grounding integration tools",
        points: [
          "Sleep, food, hydration, gentle movement",
          "Journaling, art, nature—guest-led, not assigned homework",
          "Community and trusted humans—not isolation",
        ],
      },
      {
        kicker: "Closing",
        title: "Closing the container",
        body: "End support clearly so the guest knows the sit is complete and what follow-up exists.",
        points: [
          "Confirm orientation and immediate safety before disconnect",
          "Agree check-in timing without hovering",
          "Leave crisis numbers and local contacts",
        ],
      },
      {
        kicker: "Volunteer",
        title: "Sustain your capacity",
        points: [
          "Debrief with team—not gossip about guests",
          "Rest after heavy sits; swap coverage",
          "Celebrate what held; learn what to adjust",
        ],
        punch: "Hold the wave—then help them land.",
      },
    ],
  },
  {
    id: "ttt-events",
    slug: "ttt-events",
    track: "train-the-trainer",
    title: "Event Holding & Harm-Reduction Ops",
    subtitle: "Zoning, team roles, intake, and night logistics for peer support at events",
    order: 1,
    estimateMinutes: 35,
    slides: [
      {
        kicker: "Train-the-trainer · Module 1",
        title: "Design the container before doors open",
        body: "Events need physical and emotional architecture—quiet zones, clear roles, and escalation paths.",
        layout: "title",
      },
      {
        kicker: "Zoning",
        title: "Spaces that match states",
        points: [
          "Calm / low-stim zones vs. social zones—signposted and staffed",
          "Private check-in booths with sightlines for safety",
          "Clear routes to medical and security without shame",
        ],
      },
      {
        kicker: "Team",
        title: "Roles & comms",
        points: [
          "Floor sitters, float leads, medical liaison, welfare desk",
          "Buddy system—no solo escalation handling",
          "Radios or signal protocol; plain-language codes",
        ],
      },
      {
        kicker: "Intake",
        title: "Guest orientation",
        points: [
          "Explain peer scope at entry—not therapy, not policing",
          "Collect emergency contact & allergy/meds volunteers need to know",
          "Consent for how welfare may involve friends/security",
        ],
      },
      {
        kicker: "Night ops",
        title: "Throughput & handoffs",
        points: [
          "Shift lengths, breaks, and relief before people fry",
          "Log incidents minimally for learning—not gossip",
          "Morning after-action: what worked, what to fix",
        ],
        punch: "A good event plan is harm reduction made visible.",
      },
    ],
  },
  {
    id: "ttt-teaching",
    slug: "ttt-teaching",
    track: "train-the-trainer",
    title: "Training Volunteers & Facilitation",
    subtitle: "Teach trip-sitting skills, run practice drills, and onboard new sitters",
    order: 2,
    estimateMinutes: 35,
    slides: [
      {
        kicker: "Train-the-trainer · Module 2",
        title: "Teach presence, not performance",
        body: "Your job is to grow capable peers—scope-clear, regulated, and kind under pressure.",
        layout: "title",
      },
      {
        kicker: "Design",
        title: "Adult learning basics",
        points: [
          "Short concepts → demo → paired practice → debrief",
          "Use real scripts from Peer Support Basics modules",
          "Assess understanding with scenarios, not quizzes on jargon",
        ],
      },
      {
        kicker: "Facilitation",
        title: "Running a training block",
        points: [
          "Set safety agreements up front (confidentiality, triggers, opt-out)",
          "Model invitational language in the room",
          "Stop early if the group is flooded—regulate first",
        ],
      },
      {
        kicker: "Scenarios",
        title: "Practice drills",
        points: [
          "Yellow care: looping anxiety, sensory overload online",
          "Red flags: when to stop role-play and teach escalation",
          "Rotate roles: sitter, guest, observer with structured feedback",
        ],
      },
      {
        kicker: "Onboarding",
        title: "New volunteer checklist",
        points: [
          "Complete all Peer Support Basics modules",
          "Shadow experienced sitter + debrief",
          "Signed scope/ethics acknowledgment before solo shifts",
        ],
        punch: "Trainers build culture—SOPs on paper aren’t enough.",
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getAllModules(): Module[] {
  return [...modules].sort((a, b) => a.order - b.order);
}

export function getPeerBasicsModules(): Module[] {
  return getAllModules().filter((m) => m.track === "peer-basics");
}

export function getTrainTheTrainerModules(): Module[] {
  return getAllModules().filter((m) => m.track === "train-the-trainer");
}
