// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Adil Rafique",
  initials: "AR",
  role: "AI Automation Specialist & Full-Stack Developer",
  tagline: "Building software that moves ideas forward.",
  summary:
    "I build production-ready web products, AI-powered workflows, integrations, and automation systems that turn complex processes into useful software.",
  email: "adilrafiquedev1@gmail.com",
  cv: "/Adil-Rafique-CV.pdf",
  location: "Remote · Worldwide",
  socials: {
    linkedin: "https://www.linkedin.com/in/adilrafique-dev",
    github: "https://github.com/AdilDev2025",
    upwork: "https://upwork.com/freelancers/adilr31?mp_source=share",
  },
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const rotatingRoles = [
  "AI agents",
  "automation workflows",
  "full-stack products",
  "API integrations",
  "SaaS platforms",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years experience", note: "Full-stack + AI" },
  { value: 100, suffix: "%", label: "Job success", note: "Upwork · Top Rated" },
  { value: 30, prefix: "$", suffix: "K+", label: "Upwork earnings", note: "Verified profile" },
  { value: 42, suffix: "+", label: "Completed jobs", note: "Production work" },
];

export const techMarquee = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "OpenAI", "Claude",
  "n8n", "Make", "Zapier", "Supabase", "PostgreSQL", "MongoDB", "Stripe",
  "Docker", "GitHub", "MCP Servers", "Cursor", "Claude Code", "REST APIs",
];

// level = rough self-assessed proficiency (0–100), used for the animated bars
export const skillGroups = [
  {
    key: "ai",
    title: "AI & Agents",
    blurb: "LLM features, agent workflows and AI coding tools used in daily production work.",
    skills: [
      { name: "OpenAI / Claude APIs", level: 92 },
      { name: "AI Agents & RAG", level: 88 },
      { name: "MCP Servers", level: 82 },
      { name: "Claude Code / Cursor", level: 95 },
    ],
  },
  {
    key: "automation",
    title: "Automation",
    blurb: "Connected workflows that remove repetitive manual work across business tools.",
    skills: [
      { name: "n8n", level: 88 },
      { name: "Make", level: 84 },
      { name: "Zapier", level: 85 },
      { name: "Webhooks & Triggers", level: 92 },
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Fast, accessible, animated interfaces built with the modern React ecosystem.",
    skills: [
      { name: "React", level: 94 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind / Motion / GSAP", level: 86 },
    ],
  },
  {
    key: "backend",
    title: "Backend & Data",
    blurb: "APIs, auth, databases and integrations that keep products reliable at scale.",
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "REST APIs & OAuth", level: 93 },
      { name: "PostgreSQL / Supabase", level: 85 },
      { name: "Python scripting", level: 75 },
    ],
  },
];

export const expertise = [
  { title: "AI Agent Workflow Automation", desc: "Make, Zapier and n8n pipelines with LLM reasoning in the loop." },
  { title: "AI Coding Agents & MCP", desc: "Claude Code, Cursor and MCP-based agent-to-repository integration." },
  { title: "API & Webhook Integration", desc: "JSON, authentication flows, OAuth and third-party data exchange." },
  { title: "Full-Stack Development", desc: "MERN and Next.js products from requirements to deployment." },
  { title: "GitHub-Based Delivery", desc: "Version control, pull requests, issue tracking and code review." },
  { title: "Systems Optimization", desc: "Debugging inherited codebases, performance and reliability work." },
];

export const services = [
  {
    title: "Full-Stack Development",
    desc: "Production-ready web applications with React, Next.js, Node.js, TypeScript, Python, APIs, databases, authentication, and scalable architecture.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    icon: "code",
  },
  {
    title: "AI Development & Integration",
    desc: "AI-powered features, RAG workflows, agents, chatbots, structured outputs, and LLM integrations connected to real application data.",
    tags: ["OpenAI", "Claude", "RAG", "AI Agents"],
    icon: "brain",
  },
  {
    title: "API Integration & Automation",
    desc: "Third-party APIs, webhooks, CRM systems, payment flows, and workflow automation using n8n, Make, Zapier, and connected services.",
    tags: ["n8n", "Make", "Zapier", "Webhooks"],
    icon: "workflow",
  },
  {
    title: "SaaS & Custom Software",
    desc: "Secure, modular products with authentication, role-based access, multi-tenant data, subscriptions, and connected services.",
    tags: ["Supabase", "PostgreSQL", "RBAC", "Stripe"],
    icon: "layers",
  },
  {
    title: "Existing Build Rescue",
    desc: "Inherited codebases, broken integrations, missing documentation, performance issues, debugging, and product handoff brought back under control.",
    tags: ["Debugging", "Performance", "APIs", "Handoff"],
    icon: "wrench",
  },
];

export const projects = [
  { name: "Entrepedia", category: "SaaS / Marketplace", url: "https://www.entrepedia.co/", hue: 90 },
  { name: "Healthdesk AI", category: "AI / CRM", url: "https://healthdesk.ai/", hue: 190 },
  { name: "WOW EARN", category: "Web3 / Platform", url: "https://wowearn.com/", hue: 270 },
  { name: "Lindy AI", category: "AI / Automation", url: "https://www.lindy.ai/", hue: 140 },
  { name: "Uplimit", category: "EdTech / SaaS", url: "https://www.uplimit.com/", hue: 210 },
  { name: "Educato AI", category: "AI / Education", url: "https://educato.ai/", hue: 300 },
  { name: "thirdweb", category: "Web3 / Developer Platform", url: "https://thirdweb.com/", hue: 330 },
  { name: "Canary Technologies", category: "Hospitality SaaS", url: "https://www.canarytechnologies.com/", hue: 30 },
  { name: "Mews", category: "Hospitality / SaaS", url: "https://www.mews.com/", hue: 170 },
  { name: "Vapi", category: "AI / Voice", url: "https://vapi.ai/", hue: 120 },
  { name: "Attio", category: "CRM / SaaS", url: "https://attio.com/", hue: 230 },
  { name: "Retell AI", category: "AI / Voice", url: "https://www.retellai.com/", hue: 10 },
  { name: "Flowise", category: "AI / LLM Workflows", url: "https://flowiseai.com/", hue: 250 },
  { name: "Hostaway", category: "Hospitality SaaS", url: "https://www.hostaway.com/", hue: 50 },
  { name: "Cloudbeds", category: "Hospitality / SaaS", url: "https://www.cloudbeds.com/", hue: 200 },
  { name: "Linear", category: "Product / Developer Tool", url: "https://linear.app/", hue: 260 },
];

export const experience = [
  {
    period: "2024 — Present",
    badge: "Current",
    role: "Full-Stack Developer",
    company: "DeveloperTag Private Limited",
    desc: "Building and maintaining AI-agent-driven applications, including an AI chat platform (ZenisChat) and a Solana-based AI agent tool, REST API integrations, authentication flows, and GitHub-based development workflows with Claude Code and Cursor.",
    tags: ["AI Agents", "React", "Node.js", "APIs", "GitHub"],
  },
  {
    period: "2021 — 2024",
    badge: "Remote",
    role: "Freelance / Remote Software Developer",
    company: "Independent Contract Work",
    desc: "Delivered full-stack projects for international clients across requirements, development, third-party integrations, GitHub workflows, debugging, and deployment.",
    tags: ["Full-Stack", "REST APIs", "Automation", "GitHub"],
  },
  {
    period: "2021 — 2022",
    badge: "Product",
    role: "Software Engineer",
    company: "cDocs NorthBay Solutions",
    desc: "Worked on a production-grade ride-hailing platform, contributing to feature development, payment integrations, backend services, API performance, and system reliability.",
    tags: ["Full-Stack", "Payments", "APIs", "Performance"],
  },
  {
    period: "2019 — 2021",
    badge: "Scale",
    role: "Software Engineer",
    company: "Airlift Technologies",
    desc: "Contributed to Airlift's shift into a rapid grocery-delivery platform, working across real-time order processing, inventory, warehouse tracking, backend integration, and high-traffic systems.",
    tags: ["MERN", "Real-Time", "Order Systems", "Scalability"],
  },
  {
    period: "2017 — 2019",
    badge: "Enterprise",
    role: "Software Engineer II",
    company: "SAP Signavio",
    desc: "Led feature development for workflow modules, supported scalable backend services, mentored junior developers, and worked on architecture, performance, CI/CD, and microservices.",
    tags: ["Spring Boot", "Microservices", "Docker", "CI/CD"],
  },
];

export const automationSteps = [
  { label: "Trigger", title: "New event", desc: "Webhook, form, booking, message, or database change." },
  { label: "AI Engine", title: "Understand", desc: "Classify, extract, summarize, reason, and choose the next action." },
  { label: "Logic", title: "Decide", desc: "Apply business rules, conditions, routing, and approval logic." },
  { label: "Automation", title: "Execute", desc: "Call APIs, update systems, create records, notify people, or sync data." },
  { label: "Result", title: "Done", desc: "Less manual work. Faster decisions. Connected systems." },
];

export const features = [
  { title: "Production-first", desc: "Auth, error handling, logging and deployment are part of the build — not an afterthought.", icon: "shield" },
  { title: "AI-accelerated delivery", desc: "Claude Code and Cursor in the daily workflow means faster iterations without cutting corners.", icon: "zap" },
  { title: "Clear communication", desc: "Scoped milestones, async updates and documented handoffs for remote teams across time zones.", icon: "message" },
  { title: "Integration specialist", desc: "Comfortable reading unfamiliar codebases and wiring up the third-party tools you already use.", icon: "plug" },
];

export const education = {
  school: "Information Technology University (ITU)",
  degree: "Bachelor's Degree",
};
