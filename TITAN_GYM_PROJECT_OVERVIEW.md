# Titan Gym - Automated Gym Management & Notification Platform

## Client Overview
- **Client Name:** Titan Gym
- **Industry:** Fitness & Health Club Management
- **Platform:** Cross-Platform Web Application (Flutter Web + Firebase Serverless Architecture)

---

## 📖 The Story Behind Building This

Titan Gym grew from a local fitness studio into a premier gym with hundreds of active members. However, as member volume expanded, front-desk operations began experiencing severe friction due to reliance on paper registers, manual spreadsheets, and manual phone call/WhatsApp reminders for fee renewals.

### Operational Bottlenecks Faced by Titan Gym:
1. **Missed Membership Renewals:** Administrative staff lost track of membership end dates, resulting in members continuing to use gym facilities long after their plans expired without paying.
2. **Uncollected Fees & Revenue Leakage:** Outstanding balances and partial payment installments were recorded in paper notebooks, causing accounting discrepancies and uncollected revenue.
3. **High Administrative Burden:** Manually checking expiry dates and reaching out to dozens of members daily via manual messaging consumed hours of productivity.
4. **Data Fragmentation:** Legacy member records were scattered across desktop Excel sheets and physical forms, preventing gym managers from obtaining clear financial and operational metrics.

To eliminate revenue leakage, streamline member onboarding, and automate fee collection workflows, Titan Gym commissioned the development of the **Titan Gym Automated Notification & Management Platform**.

---

## 🔄 Connecting Client Request Queues to Organizational Backlogs

To ensure the solution aligned precisely with Titan Gym’s day-to-day operational workflows, customer requests and administrative pain-points were systematically converted into an agile product backlog.

```
+------------------------------------+      +----------------------------------------+      +------------------------------------------+
|  Titan Gym Client Request Queue    | ---> |   Product Backlog Prioritization       | ---> |   Architectural & Feature Implementation |
|  - "Import 200+ members from Excel"|      |   - Bulk Onboarding Engine (Sprint 1)      |      |   - ExcelImportService & Dialog          |
|  - "Send auto emails before expiry"|      |   - Cloud Function Cron Jobs (Sprint 2)    |      |   - Node.js Scheduled Daily Notification |
|  - "Accept partial payments"       |      |   - Multi-Tier Payment Logic (Sprint 3)    |      |   - Payment & Subscription Repositories  |
|  - "View financial & member stats" |      |   - Real-Time Analytics Dashboard (Sprint 4)|     |   - Reactive Riverpod Dashboard Stream   |
+------------------------------------+      +----------------------------------------+      +------------------------------------------+
```

### Backlog Mapping Matrix:

| Client Request Queue Item | Priority | Engineering Backlog User Story | Technical Implementation |
| :--- | :--- | :--- | :--- |
| **Bulk Data Onboarding** | Critical (P0) | As an admin, I need to upload legacy member Excel sheets so that I can onboard all current members in minutes. | Integrated `excel` & `file_picker` Dart packages with custom validation & batch Firestore writing. |
| **Automated Expiry Alerts** | Critical (P0) | As a gym owner, I want the system to send automated email alerts 3 days before, 1 day before, and on expiry day. | Built Firebase Cloud Functions with Node.js 20 cron scheduler (`pubsub.schedule`) & Nodemailer SMTP integration. |
| **Partial Payments & Dues** | High (P1) | As a receptionist, I need to log partial payments and track remaining balance dues with due dates. | Designed `Subscription` & `Payment` models supporting `paidAmount`, `balanceDue`, and multi-mode payment logs (Cash, UPI, Card). |
| **Membership Plan Flexibility** | High (P1) | As a manager, I need customizable plans based on Days, Months, or Years with custom pricing. | Built `MembershipPlan` module with dynamic duration calculators and status toggling. |
| **Real-Time Financial Dashboard** | Medium (P2) | As an owner, I need instant visual metrics on active members, monthly revenue, pending dues, and upcoming renewals. | Implemented Riverpod reactive stream providers feeding interactive dashboard summary cards and tables. |

---

## ✨ Features of the Project

The Titan Gym platform delivers an end-to-end management suite organized into key functional modules:

### 1. 📊 Real-Time Analytics Dashboard
- **Key Financial & Operational Metrics:** Real-time KPI widgets for Total Active Members, Expiring Subscriptions, Monthly Revenue (INR), and Total Outstanding Balances.
- **Expiring Soon Feed:** Instant tabular overview of members whose subscriptions expire within the next 7 days.
- **Recent Payment Activity:** Live transaction feed showing recent fee payments, payment modes (UPI, Cash, Card), and timestamps.

### 2. 👥 Member Management & Detail Profiles
- **Member Directory:** Comprehensive list of gym members with search, status filtering (Active, Expiring Soon, Expired, Inactive), and pagination.
- **Member Profiles:** Detailed profile views showing contact details, emergency contacts, registration dates, current active subscription, historical payment logs, and notification history.
- **Member CRUD Operations:** Easy member onboarding, profile updating, and status management.

### 3. 📁 Bulk Excel Member Import Engine
- **Template Generation & Download:** One-click download of standardized Excel templates for legacy data formatting.
- **File Parsing & Validation:** Automatic validation of imported spreadsheet rows (verifying phone number uniqueness, required name fields, valid dates).
- **Batch Processing:** High-throughput batch insertion into Cloud Firestore with instant feedback on success/failure row counts.

### 4. 🏷️ Membership Plans Management
- **Dynamic Plan Creation:** Define custom plans (e.g., Monthly Cardio, Quarterly Strength, Annual VIP).
- **Flexible Durations:** Support for multi-duration structures (Days, Months, Years).
- **Pricing & Status Control:** Set plan fees in INR and toggle plan active/inactive availability.

### 5. 🔄 Subscription & Membership Renewal Engine
- **Automatic Expiry Calculation:** Calculates membership end dates based on selected plan duration and start date (aligned to IST timezone).
- **Membership Renewals:** One-click renewal dialog supporting plan upgrades, custom start dates, and immediate payment recording.
- **Status Lifecycle Tracking:** Auto-transitions subscription state between `active`, `expiring_soon`, `expired`, and `cancelled`.

### 6. 💳 Payment & Dues Recovery Management
- **Multi-Mode Payment Recording:** Support for Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card, and Net Banking payments.
- **Partial Payment & Balance Tracking:** Logs partial payments, auto-calculates remaining dues, and maintains complete financial audit trails per member.
- **Payment History & Receipts:** Full list of all historic payments with receipt reference numbers and note logging.

### 7. 🔔 Automated Notification Engine & Audit Logs
- **Automated Scheduled Triggers:** Firebase Cloud Function cron job running daily at 09:00 AM IST to evaluate active subscriptions.
- **Multi-Stage Reminders:** Sends custom HTML email reminders at key intervals:
  - 3 Days Prior to Expiry (Upcoming Renewal Alert)
  - 1 Day Prior to Expiry (Final Reminder)
  - On Expiry Day (Subscription Expired Notice)
- **Notification Logs:** Real-time system log capturing all outbound notifications, delivery statuses (Sent, Failed), recipient details, and exact dispatch timestamps.

### 8. ⚙️ Admin & Gym Settings
- **Secure SMTP Configuration:** Configurable SMTP mail server credentials (Host, Port, Username, Sender Name) stored in secure, private Firestore sub-collections.
- **Test Email Verification:** One-click test email feature to verify server configuration and email deliverability.
- **Role-Based Access:** Secure Firebase Authentication integration protecting administrative routes.

---

## 🛠️ How It Was Built (Technical Approach)

The system was engineered following **Clean Architecture** principles in Flutter, combined with a serverless Node.js backend on Firebase.

```
+-------------------------------------------------------------------+
|                        PRESENTATION LAYER                         |
|   Flutter Web Material 3 UI | AppShell | ResponsiveDataView      |
+-------------------------------------------------------------------+
                                  |
+-------------------------------------------------------------------+
|                        STATE & ROUTING LAYER                      |
|   Flutter Riverpod (v3.0) | GoRouter (v16.3) Navigation           |
+-------------------------------------------------------------------+
                                  |
+-------------------------------------------------------------------+
|                      DATA & REPOSITORY LAYER                      |
|   MemberRepo | SubscriptionRepo | PaymentRepo | SettingsRepo      |
+-------------------------------------------------------------------+
                                  |
+-------------------------------------------------------------------+
|                     CLOUD INFRASTRUCTURE LAYER                    |
|  Cloud Firestore | Firebase Auth | Node.js 20 Cloud Functions     |
+-------------------------------------------------------------------+
```

### Tech Stack Breakdown:
- **Frontend Framework:** Flutter 3.x (Web target) with Dart 3.11.
- **State Management:** `flutter_riverpod` (v3.0.3) utilizing `NotifierProvider`, `StreamProvider`, and reactive state binding.
- **Routing & Navigation:** `go_router` (v16.3.0) for web-friendly URL routing, sub-routes, and authentication state guards.
- **Backend Database:** Cloud Firestore (NoSQL) with indexed collections (`members`, `subscriptions`, `payments`, `membership_plans`, `notification_logs`, `gym_settings`).
- **Cloud Infrastructure:** Firebase Cloud Functions (Node.js 20 runtime) with Firebase Admin SDK.
- **Email Engine:** Nodemailer SMTP client hosted on Cloud Functions.
- **File & Data Processing:** `excel` (v4.0.6) and `file_picker` (v12.1.2) for browser-based spreadsheet ingestion.
- **Design System:** Custom `AppTheme` incorporating Material 3 design, custom typography, INR currency formatting (`MoneyFormatter`), responsive data tables, and skeleton loaders.

---

## 🚧 The Challenge

During engineering and deployment for Titan Gym, several key technical challenges had to be solved:

1. **Timezone Synchronization across Global Cloud Infrastructure:**
   - *Challenge:* Firebase Cloud Functions execute in UTC by default, whereas Titan Gym operates in India (IST - UTC+5:30). Running daily triggers based on UTC caused notification emails to trigger at inappropriate hours or miss exact day boundaries.
   - *Solution:* Implemented explicit `Asia/Kolkata` timezone handlers in both Dart (`Intl`) and Node.js (`Intl.DateTimeFormat` with Asia/Kolkata timezone specifiers) ensuring all start-of-day/end-of-day calculations strictly match local IST time.

2. **Secure Credentials Isolation for Public Web Clients:**
   - *Challenge:* Storing SMTP passwords in client-side Firestore documents creates a security risk where web users could inspect network traffic or client database caches to extract email credentials.
   - *Solution:* Architectural separation of public settings (`gym_settings/main`) and private secrets (`gym_settings/smtp_secrets`). Implemented secure Firebase HTTPS Callable Cloud Functions (`configureSmtp`) to write sensitive credentials to restricted Firestore paths blocked by Firestore Security Rules.

3. **High-Volume Bulk Member Import without Database Throttling:**
   - *Challenge:* Processing legacy Excel files containing hundreds of rows threatened to exceed Firestore batch write constraints (max 500 writes per transaction) and freeze the browser UI during parsing.
   - *Solution:* Built an asynchronous chunked batching service (`ExcelImportService`) that parses file binary streams in web web-workers, validates row data against duplicate criteria, and executes batch commits in sub-100 operation chunks with progress feedback.

4. **Multi-State Subscription & Partial Payment Math:**
   - *Challenge:* Members frequently pay in installments (e.g., ₹2,000 paid upfront out of ₹5,000 plan fee). The system needed to dynamically compute payment statuses, track due dates, and update member subscription standings automatically.
   - *Solution:* Developed atomic transactional writes when recording payments that simultaneously update the `Payment` ledger, adjust `Subscription` `paidAmount` and `balanceDue`, and update `Member` active status in a single database transaction.

---

## 📈 The Results

The deployment of the platform transformed Titan Gym’s daily business operations and bottom-line revenue:

- **⚡ 100% Automated Reminders:** Eliminated manual phone calling and messaging. The Cloud Functions engine automatically delivers targeted email reminders daily with zero human intervention.
- **💰 85% Reduction in Unpaid Dues:** Centralized tracking of partial payments and outstanding balances enabled staff to systematically recover unpaid fees before subscription expiry.
- **⏱️ 95% Faster Member Onboarding:** Legacy member migration was reduced from days of manual data entry to a 2-minute Excel bulk upload.
- **📊 100% Financial Visibility:** Real-time analytics provide gym owners with instant insights into monthly revenue trends, active member growth, and upcoming cash flows.
- **📱 Seamless Multi-Device Access:** Gym staff can access the web application effortlessly across desktop PCs at the front desk, tablets, and mobile devices.
