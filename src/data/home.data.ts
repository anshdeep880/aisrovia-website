export interface TrustMetric {
  value: string;
  label: string;
}

export interface VehicleScreenTab {
  id: string;
  label: string;
  fullTitle: string;
  caption: string;
  image: string;
}

export interface OutcomeItem {
  id: string;
  index: string;
  title: string;
  description: string;
  iconName: "shield" | "bell" | "audit";
}

export interface CuratedSystemItem {
  id: string;
  title: string;
  tag: string;
  hook: string;
  href: string;
  video: string;
  poster: string;
  frameType: "browser" | "phone";
  colSpan: "wide" | "compact";
}

export interface HomeServiceCard {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  techTags: [string, string, string];
  href: string;
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
}

export const WHATSAPP_URL = "https://wa.me/917248960113";
export const CONTACT_PATH = "/contact";
export const WORK_PATH = "/work";
export const VEHICLE_TRACKING_CASE_STUDY_PATH = "/work/vehicle-tracking-system";

export const HERO_MEDIA = {
  video: "/assets/Projects%20Images/Vehicle%20Tracking%20System/video.mp4",
  poster: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Dashboard.jpeg",
  mobileAlertImage: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Alerts.jpeg",
} as const;

export const HERO_TRUST_METRICS: TrustMetric[] = [
  { value: "20+", label: "Production Systems" },
  { value: "15+", label: "Commercial Clients" },
  { value: "7+", label: "Countries Served" },
  { value: "Perth & India", label: "Engineering Hubs" },
];

export const VEHICLE_TRACKING_SCREENS: VehicleScreenTab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    fullTitle: "Live Gate Dashboard",
    caption: "Live gate activity, active passes, and daily vehicle volume.",
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Dashboard.jpeg",
  },
  {
    id: "alerts",
    label: "Alerts",
    fullTitle: "Violation Alerts",
    caption: "Instant NO_PASS & PASS_EXPIRED push alerts with photo evidence.",
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Alerts.jpeg",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    fullTitle: "Registered Vehicles",
    caption: "Resident flat mapping, vehicle plates, and pass validity status.",
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/vehicles.jpeg",
  },
  {
    id: "visits",
    label: "Visit Logs",
    fullTitle: "Entry & Visit Logs",
    caption: "Timestamped entry/exit audit log searchable by plate or unit.",
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Visits.jpeg",
  },
];

export const VEHICLE_TRACKING_OUTCOMES: OutcomeItem[] = [
  {
    id: "pass-verification",
    index: "01",
    title: "Instant Pass Verification",
    description:
      "Real-time lookup of resident passes, sticker validity, and flat/unit records right at the gate.",
    iconName: "shield",
  },
  {
    id: "violation-alerts",
    index: "02",
    title: "Automated Violation Alerts",
    description:
      "Instant NO_PASS and PASS_EXPIRED push notifications (FCM) with live evidence photo capture.",
    iconName: "bell",
  },
  {
    id: "audit-trail",
    index: "03",
    title: "Complete Entry Audit Trail",
    description:
      "Searchable vehicle visit history paired with a role-based committee web monitoring console.",
    iconName: "audit",
  },
];

export const VEHICLE_TRACKING_STACK: string[] = [
  "TypeScript",
  "React",
  "Mobile App",
  "Firebase",
  "Cloud Functions",
  "FCM",
];

export const CURATED_SYSTEMS: CuratedSystemItem[] = [
  {
    id: "jewellery-erp",
    title: "Jewellery Management ERP",
    tag: "Enterprise ERP",
    hook: "Live gold rates, bullion inventory & girvi accounting in one dashboard.",
    href: "/work/jewellery-shop-erp",
    video: "/assets/Projects%20Images/Jwellery%20Management%20/video.mp4",
    poster:
      "/assets/Projects%20Images/Jwellery%20Management%20/Jwellery%20Management%20.png",
    frameType: "browser",
    colSpan: "wide",
  },
  {
    id: "mobile-retail-erp",
    title: "Mobile Retail ERP",
    tag: "Mobile POS",
    hook: "Touch POS, IMEI tracking & automated WhatsApp receipts.",
    href: "/work/mobile-shop-erp",
    video: "/assets/Projects%20Images/Mobile%20Shop%20ERP/video.mp4",
    poster: "/assets/Projects%20Images/Mobile%20Shop%20ERP/Mobile%20Shop%20ERP.png",
    frameType: "phone",
    colSpan: "compact",
  },
  {
    id: "employee-gps-tracking",
    title: "Employee GPS Tracking",
    tag: "Workforce Ops",
    hook: "Live field-staff GPS tracking, route logs & attendance.",
    href: "/work/live-employee-tracking",
    video: "/assets/Projects%20Images/Emplopyee%20Tracking/video.mp4",
    poster:
      "/assets/Projects%20Images/Emplopyee%20Tracking/Emplopyee%20Tracking.png",
    frameType: "phone",
    colSpan: "compact",
  },
  {
    id: "visitor-gate-pass",
    title: "Visitor Gate Pass System",
    tag: "Access Control",
    hook: "QR-verified visitor entry & instant security checkpoint logs.",
    href: "/work/visitor-security-management",
    video: "/assets/Projects%20Images/Security%20Management/video.mp4",
    poster:
      "/assets/Projects%20Images/Security%20Management/Security%20Management.png",
    frameType: "browser",
    colSpan: "wide",
  },
];

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    id: "enterprise-erps",
    number: "01",
    title: "Enterprise ERPs & Dashboards",
    description:
      "Inventory, billing, live financials, and multi-branch operations engineered into one command center.",
    image: "/assets/services/ERP%20%26%20Dashboard.png",
    techTags: ["Next.js", "PostgreSQL", "Role-Based Access"],
    href: "/services",
  },
  {
    id: "web-mobile-apps",
    number: "02",
    title: "Web & Mobile Applications",
    description:
      "Cross-platform iOS/Android field apps and high-speed Next.js web platforms built for daily speed.",
    image: "/assets/services/Web%20%26%20Mobile.jpeg",
    techTags: ["Flutter", "React Native", "Next.js 16"],
    href: "/services",
  },
  {
    id: "ai-chatbots-agents",
    number: "03",
    title: "AI Chatbots & Autonomous Agents",
    description:
      "Custom RAG knowledge bases, WhatsApp/Web assistants, and automated customer & lead workflows.",
    image: "/assets/services/Ai%20Chatbot.png",
    techTags: ["RAG Pipelines", "WhatsApp AI", "LLM Agents"],
    href: "/services",
  },
  {
    id: "business-automation",
    number: "04",
    title: "Business Process Automation",
    description:
      "Automated alerts, scheduled payment reminders, webhooks, and zero-spreadsheet daily operations.",
    image: "/assets/services/Automation.png",
    techTags: ["Cloud Functions", "Webhooks", "Auto-Alerts"],
    href: "/services",
  },
];

export const DELIVERY_PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: "01",
    title: "Architecture & Prototype",
    description:
      "Working UI and database structure validated upfront before heavy scaling.",
  },
  {
    step: "02",
    title: "Full-Stack Engineering",
    description:
      "Clean, maintainable code across web, mobile, cloud, and AI pipelines.",
  },
  {
    step: "03",
    title: "Launch & Reliability",
    description:
      "Production deployment, real-time monitoring, and ongoing technical support.",
  },
];

export const GLOBE_VIDEO_POSTER =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%230a1628'/%3E%3C/svg%3E";
