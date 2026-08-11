export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  techTags: string[];
  visualSrc: string;
}

export const services: ServiceItem[] = [
  {
    id: "ai-chatbots",
    name: "AI Chatbots & Agents",
    description: "Intelligent conversational interfaces and autonomous workflows integrated into your business systems.",
    bullets: [
      "Natural Language Processing (NLP)",
      "Custom Knowledge Base Training",
      "Multi-channel Deployment (Web, WhatsApp, Slack)",
      "Autonomous Agentic Task Automation"
    ],
    techTags: ["OpenAI API", "LangChain", "Vector DBs", "Next.js", "Python"],
    visualSrc: "/assets/Projects Images/Task Management/Task Management.png"
  },
  {
    id: "erp-systems",
    name: "Enterprise ERP Systems",
    description: "Robust, custom-engineered resource planning software to optimize your business operations and inventory.",
    bullets: [
      "Real-time Inventory & Stock Tracking",
      "Automated Invoicing & Accounting Ledgers",
      "Touch-first Point-of-Sale (POS) Integration",
      "Comprehensive Analytical Dashboards"
    ],
    techTags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    visualSrc: "/assets/Projects Images/Jwellery Management /Jwellery Management .png"
  },
  {
    id: "web-mobile-apps",
    name: "Web & Mobile Apps",
    description: "Premium, ultra-responsive digital applications optimized for performance, scalability, and user experience.",
    bullets: [
      "Cross-platform iOS & Android Development",
      "Offline-first Database Syncing",
      "SEO-optimized Web Frameworks",
      "Secure and Fast REST/GraphQL API Design"
    ],
    techTags: ["Flutter", "React Native", "TypeScript", "Tailwind CSS", "Swift"],
    visualSrc: "/assets/Projects Images/Emplopyee Tracking/Emplopyee Tracking.png"
  },
  {
    id: "business-automation",
    name: "Business Automation",
    description: "End-to-end integration and workflow automation to save hours of manual tasks and minimize human error.",
    bullets: [
      "Background Cron Schedulers & Task Queues",
      "Real-time SMS & Email Notification Alerts",
      "Seamless Shopify & Stripe Integrations",
      "Robust Web Scraping & Data Extraction Pipeline"
    ],
    techTags: ["Node.js", "BullMQ", "Redis", "Puppeteer", "Stripe API"],
    visualSrc: "/assets/Projects Images/The juicist/The juicist.png"
  }
];
