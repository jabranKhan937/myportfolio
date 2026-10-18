export const profile = {
  name: "Jabran Khan",
  role: "Full Stack AI Mobile Engineer",
  email: "jibran1076@gmail.com",
  phone: "+92 342 5778920",
  phoneHref: "tel:+923425778920",
  location: "Lahore, Pakistan",
  linkedin: "https://www.linkedin.com/in/jabran-khan-859450209",
  linkedinLabel: "linkedin.com/in/jabran-khan-859450209",
  github: "https://github.com/jabranKhan937",
  githubLabel: "github.com/jabranKhan937",
  resumePdf: "/Jabran-Khan-Full-Stack-AI-Engineer.pdf",
  availability: "Open to full-time roles",
  summary:
    "Full Stack AI Mobile Engineer with 5+ years of experience taking mobile products from initial screen design to production release across iOS and Android, with 20+ shipped applications for startups and enterprise teams. Strong expertise leading cross-platform mobile architecture in React Native and TypeScript, paired with full backend ownership in Node.js, Express.js, and MongoDB. Hands-on experience wiring OpenAI GPT, Anthropic Claude, and Google Gemini into production mobile workflows — covering conversational chat, intelligent search, and task automation — alongside Web2 and Web3 mobile capabilities including multi-chain crypto wallets, payment integrations, deep linking, universal links, push notifications, and App Store and Play Store delivery.",
  lede: "Full Stack AI Mobile Engineer with 5+ years of experience taking mobile products from initial screen design to production release across iOS and Android, with 20+ shipped applications. I lead cross-platform mobile architecture in React Native and TypeScript, own the Node.js, Express.js, and MongoDB services behind those apps, and integrate OpenAI GPT, Anthropic Claude, and Google Gemini into production workflows for chat, search, and automation — alongside Web2 and Web3 capabilities including multi-chain wallets, payment integrations, deep linking, push notifications, and App Store and Play Store releases.",
} as const;

export const layers = [
  { label: "Mobile", detail: "React Native, TypeScript, iOS & Android" },
  { label: "Services", detail: "Node.js, Express.js, REST" },
  { label: "Models", detail: "GPT, Claude, Gemini" },
  { label: "Data", detail: "MongoDB, PostgreSQL, Redis" },
  { label: "Release", detail: "App Store, Play Store, CI/CD" },
] as const;

export type Focus = "AI" | "Mobile" | "Web3";

export type Project = {
  slug: string;
  name: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  tags: Focus[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "stx-wallet",
    name: "STX Wallet",
    period: "Aug 2023 — Dec 2024",
    summary:
      "A secure multi-chain cryptocurrency wallet for STX, BNB, ETH, and SOL, enabling users to send, receive, swap tokens, and connect to decentralized applications on iOS and Android.",
    points: [
      "Developed the cross-platform wallet in React Native and TypeScript, supporting asset management, send/receive flows, and real-time balance tracking across four blockchains.",
      "Implemented in-app token swap functionality and integrated WalletConnect, Web3.js, and Ethers.js so users could interact with dApps securely without leaving the app.",
      "Connected mobile transaction workflows to Node.js and Express.js backend services focused on signing security, clear transaction UX, and cross-chain reliability.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WalletConnect",
      "Web3.js",
      "Ethers.js",
    ],
    tags: ["Mobile", "Web3"],
  },
  {
    slug: "localshows",
    name: "LocalShows",
    period: "May 2024 — Mar 2025",
    summary:
      "A community-driven mobile event discovery application with category browsing, rich event details, community posts, and personalized user profiles.",
    points: [
      "Built responsive, API-backed React Native and TypeScript screens for discovering local events, filtering by category, publishing community posts, and managing user profiles.",
      "Designed data flows across Node.js REST APIs, MongoDB, and Firebase Firestore to keep feeds, event updates, and community interactions fast and reliable.",
      "Structured modular feature architecture ready for intelligent search, personalized recommendations, and AI-assisted content workflows.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Firebase Firestore",
    ],
    tags: ["Mobile"],
  },
  {
    slug: "you-waggle",
    name: "You Waggle",
    period: "May 2025 — Feb 2026",
    summary:
      "A cross-platform mobile application that helps users organize, track, and interact with items in one streamlined workspace.",
    points: [
      "Built the React Native mobile application end to end, delivering core create, read, update, and item-interaction workflows with a clean, modular component architecture.",
      "Kept the component and state architecture reusable so navigation and screen transitions stayed smooth across both iOS and Android devices.",
      "Integrated Node.js and Express.js REST APIs with MongoDB persistence, tuning list rendering and navigation for fast daily usage.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "Express.js", "REST APIs", "MongoDB"],
    tags: ["Mobile"],
  },
];

export const filters = ["All", "AI", "Mobile", "Web3"] as const;
export type Filter = (typeof filters)[number];

export type Job = {
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const jobs: Job[] = [
  {
    role: "Full Stack Mobile Engineer",
    company: "RapidDev",
    location: "USA Company (Working Remotely)",
    period: "May 2025 — Present",
    current: true,
    points: [
      "Lead React Native mobile architecture and end-to-end product delivery for iOS and Android applications, collaborating remotely with a USA-based engineering and product team.",
      "Design, build, and maintain scalable backend services and RESTful APIs in Node.js and Express.js, backed by MongoDB and secured with JWT and OAuth authentication flows.",
      "Integrate OpenAI GPT, Anthropic Claude, and Google Gemini into mobile workflows to power conversational AI chat, semantic search, and automated user experiences.",
      "Implement payment integrations, deep linking, universal links, App Links, and push notifications, and manage automated release pipelines with Docker and GitHub CI/CD.",
      "Drive mobile performance optimization, crash reduction, and code quality through profiling, architecture reviews, and mentoring junior developers.",
    ],
  },
  {
    role: "Full Stack Mobile Engineer",
    company: "KryptoMind (Pvt) Ltd.",
    location: "Lahore, Pakistan",
    period: "June 2023 — May 2025",
    points: [
      "Owned end-to-end delivery of multiple Web2 and Web3 mobile applications in React Native and TypeScript, from system architecture through App Store and Google Play Store releases.",
      "Architected and shipped the multi-chain STX Wallet supporting STX, BNB, ETH, and SOL networks, including in-app token swaps, WalletConnect, Web3.js, and Ethers.js integrations.",
      "Built Node.js and Express.js backend microservices and data layers across MongoDB, PostgreSQL, Firebase Firestore, and Redis for low-latency mobile experiences.",
      "Delivered complex mobile features including deep linking, push notifications, in-app payment flows, and AI-assisted chat and workflow automation.",
      "Partnered closely with blockchain, backend, and UI/UX teams, conducted code reviews, and mentored junior React Native engineers.",
    ],
  },
  {
    role: "Full Stack Mobile Engineer",
    company: "Ammag Technologies",
    location: "Lahore, Pakistan",
    period: "December 2021 — June 2023",
    points: [
      "Built responsive cross-platform mobile screens and reusable UI component libraries in React Native, TypeScript, and JavaScript for iOS and Android applications.",
      "Integrated Node.js and Express.js REST APIs, Redux state management, and MongoDB and SQL data sources across production mobile features.",
      "Handled app debugging, secure authentication flows, device responsiveness testing, and App Store and Play Store publishing alongside senior engineers.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Mobile Engineering",
    items: [
      "React Native (iOS & Android)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Cross-Platform Architecture",
      "Native Modules & Bridging",
      "Redux",
      "Responsive Mobile UI",
      "Payment Integrations",
      "Deep Linking",
      "Universal Links & App Links",
      "Push Notifications",
      "App Store & Play Store Releases",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
      "Microservices Architecture",
      "JWT & OAuth Authentication",
    ],
  },
  {
    title: "AI & LLM Systems",
    items: [
      "OpenAI API (GPT)",
      "Anthropic Claude",
      "Google Gemini",
      "Meta Llama",
      "Hugging Face",
      "LangChain",
      "AI Agents",
      "Prompt Engineering",
      "Chatbots",
      "MCP",
      "AI Orchestration",
    ],
  },
  {
    title: "Web3 & Wallets",
    items: [
      "WalletConnect",
      "Web3.js",
      "Ethers.js",
      "Smart Contract Integration",
      "Multi-Chain Wallets (STX, BNB, ETH, SOL)",
      "In-App Token Swaps & dApp Connections",
    ],
  },
  {
    title: "Databases & Cloud",
    items: [
      "MongoDB",
      "Firebase Firestore",
      "Realtime Database",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "AWS",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Docker",
      "Kubernetes",
      "Git & GitHub CI/CD",
      "Monitoring & Logging",
    ],
  },
] as const;

export const education = {
  degree: "Bachelor of Software Engineering",
  school: "University of Agriculture Faisalabad",
  period: "August 2017 — October 2021",
} as const;

export const languages = ["English", "Urdu"] as const;

export const award = "Employee of the Month Award · Punctuality Award";
