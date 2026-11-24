import type { Metadata } from "next";
import VehicleTrackingCaseStudy from "@/src/components/work/VehicleTrackingCaseStudy";

export const metadata: Metadata = {
  title:
    "Society Vehicle Tracking System — Case Study | AiSROvia Engineering",
  description:
    "How we engineered a connected Gate Mobile App and TypeScript/React Web Monitoring Console with Firebase Firestore, Storage, and FCM for real-time parking enforcement.",
};

export default function VehicleTrackingSystemPage() {
  return <VehicleTrackingCaseStudy />;
}
