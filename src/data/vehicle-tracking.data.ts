export interface CaseStudyMobileScreen {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  summary: string;
  bullets: [string, string, string];
  image: string;
}

export interface StakeholderCard {
  id: string;
  role: string;
  surfaceTag: string;
  summary: string;
  pain: string;
  fix: string;
  icon: "guard" | "admin" | "resident";
}

export interface PipelineNode {
  step: string;
  title: string;
  detail: string;
}

export interface EngineeringModule {
  id: string;
  title: string;
  description: string;
  icon: "console" | "alert" | "storage" | "pass" | "logs" | "test";
}

export const VT_VIDEO_SRC =
  "/assets/Projects%20Images/Vehicle%20Tracking%20System/video.mp4";
export const VT_POSTER_SRC =
  "/assets/Projects%20Images/Vehicle%20Tracking%20System/Dashboard.jpeg";

export const VT_MOBILE_SCREENS: CaseStudyMobileScreen[] = [
  {
    id: "dashboard",
    tabLabel: "Dashboard",
    badge: "MODULE 01 · COMMAND OVERVIEW",
    title: "Live Gate & Security Dashboard",
    summary:
      "Gives guards and supervisors an immediate pulse on daily gate entries, active resident passes, and unresolved security violations.",
    bullets: [
      "Real-time counters for today's verified entries, active passes, and open alerts.",
      "One-tap quick actions to verify a plate or log an unknown visitor vehicle.",
      "Synchronized live with Firestore streams so shift handovers have zero blind spots.",
    ],
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Dashboard.jpeg",
  },
  {
    id: "alerts",
    tabLabel: "Violation Alerts",
    badge: "MODULE 02 · AUTOMATED ENFORCEMENT",
    title: "Real-Time Violation Alerts & Evidence",
    summary:
      "Surfaces instant NO_PASS and PASS_EXPIRED security flags complete with timestamped photo evidence and resolution controls.",
    bullets: [
      "Sub-second Firebase Cloud Messaging (FCM) push alerts on unauthorized entries.",
      "Color-coded severity badges distinguishing NO_PASS from PASS_EXPIRED vehicles.",
      "Direct evidence image preview and status resolution workflow for supervisors.",
    ],
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Alerts.jpeg",
  },
  {
    id: "vehicles",
    tabLabel: "Vehicles",
    badge: "MODULE 03 · PASS REGISTRY",
    title: "Registered Vehicles & Flat Mapping",
    summary:
      "Centralized digital directory linking every resident license plate to its assigned tower/flat unit and live pass validity window.",
    bullets: [
      "Instant license plate search eliminating manual sticker guesswork at the gate.",
      "Clear pass expiry tracking per household unit, tenant, or commercial slot.",
      "Prevents unauthorized vehicles from claiming reserved resident parking bays.",
    ],
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/vehicles.jpeg",
  },
  {
    id: "visits",
    tabLabel: "Visit Logs",
    badge: "MODULE 04 · AUDIT LEDGER",
    title: "Searchable Entry & Exit Visit Logs",
    summary:
      "Replaces dog-eared paper gate books with a permanent, filterable digital timeline of every vehicle movement across the premises.",
    bullets: [
      "Filter parkingLogs instantly by plate number, visitor/vendor category, or pass state.",
      "Exact entry timestamps paired with cloud-hosted photographic verification.",
      "Dispute-ready historical audit trail accessible to society management 24/7.",
    ],
    image: "/assets/Projects%20Images/Vehicle%20Tracking%20System/Visits.jpeg",
  },
  {
    id: "more-modules",
    tabLabel: "More Modules",
    badge: "MODULE 05 · OPERATIONS SUITE",
    title: "Extended Society Controls & Settings",
    summary:
      "Modular navigation hub governing role permissions, notification preferences, gate checkpoints, and operational utilities.",
    bullets: [
      "Role-scoped access separating gate guard actions from admin configuration.",
      "Push notification channel controls for committee members and head security.",
      "Extensible multi-module architecture ready for multi-gate societies.",
    ],
    image:
      "/assets/Projects%20Images/Vehicle%20Tracking%20System/more%20module.jpeg",
  },
];

export const VT_STAKEHOLDERS: StakeholderCard[] = [
  {
    id: "guards",
    role: "Gate Security Guards",
    surfaceTag: "MOBILE APP",
    summary:
      "Equipped with a fast mobile companion right at the boom barrier to verify plates and log unknown entries in seconds.",
    pain: "Flipping through paper registers and guessing whether a vehicle belongs to a resident or has an expired pass.",
    fix: "Instant plate/pass lookup on mobile with one-tap unknown vehicle photo logging.",
    icon: "guard",
  },
  {
    id: "admins",
    role: "Society Admins & Management",
    surfaceTag: "WEB MONITORING CONSOLE",
    summary:
      "Oversees live gate operations, violation trends, and photographic evidence from a centralized desktop command console.",
    pain: "Zero live visibility into gate violations, unauthorized parking disputes, or daily entry volume.",
    fix: "Real-time monitoring-web dashboard showing live parkingLogs, pass status, and instant evidence proof.",
    icon: "admin",
  },
  {
    id: "residents",
    role: "Residents & Property Owners",
    surfaceTag: "AUTOMATED SECURITY",
    summary:
      "Benefits from protected parking bays, faster gate clearance, and verifiable accountability for every non-resident vehicle.",
    pain: "Unauthorized cars occupying reserved slots and slow manual verification for registered vehicles.",
    fix: "Verified digital parkingPasses per flat/unit ensuring frictionless entry and tighter premise security.",
    icon: "resident",
  },
];

export const VT_PIPELINE_NODES: PipelineNode[] = [
  {
    step: "01",
    title: "Gate Scan / Entry",
    detail: "Vehicle plate & visit logged via mobile or camera feed.",
  },
  {
    step: "02",
    title: "Pass Validation",
    detail: "Real-time lookup against Firestore parkingPasses.",
  },
  {
    step: "03",
    title: "Evidence Capture",
    detail: "Unknown/expired vehicle image uploaded to Firebase Storage.",
  },
  {
    step: "04",
    title: "Live Alert & Sync",
    detail: "Instant FCM NO_PASS / PASS_EXPIRED alert + Web Console update.",
  },
];

export const VT_ENGINEERING_MODULES: EngineeringModule[] = [
  {
    id: "web-console",
    title: "Live Web Monitoring Console",
    description:
      "TypeScript + React + Vite dashboard with real-time Firestore listeners for active visits and alerts.",
    icon: "console",
  },
  {
    id: "violation-engine",
    title: "Automated Violation Engine",
    description:
      "Detects NO_PASS and PASS_EXPIRED conditions automatically and routes open tickets for review.",
    icon: "alert",
  },
  {
    id: "evidence-storage",
    title: "Cloud Evidence Storage",
    description:
      "Secure Firebase Storage pipeline attaching photographic proof directly to unknown-vehicle visit records.",
    icon: "storage",
  },
  {
    id: "pass-registry",
    title: "Resident Pass Registry",
    description:
      "Centralized management of parkingPasses, plate mappings, expiry tracking, and unit assignments.",
    icon: "pass",
  },
  {
    id: "visit-logs",
    title: "Searchable Visit Audit Logs",
    description:
      "Instant filtering across parkingLogs by plate number, status, vendor, or timestamp.",
    icon: "logs",
  },
  {
    id: "vitest-reliability",
    title: "Vitest-Verified Reliability",
    description:
      "Unit-tested alert state transitions and resilient upload handling built for 24/7 gate operations.",
    icon: "test",
  },
];
