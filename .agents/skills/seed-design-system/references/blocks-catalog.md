# Blocks Catalog

All blocks live in `src/components/blocks/`. Import via `@/components/blocks/BlockName`.
Blocks are pre-composed page sections built from Seed UI primitives.
Inventory is dynamic, run `npm run docs:inventory` for current filesystem-backed lists.

---

## Auth Flow

| Block                   | Purpose                                  | Key Props                              |
| ----------------------- | ---------------------------------------- | -------------------------------------- |
| LoginBlock              | Email/password login with social OAuth   | `type: "login" \| "signup"`, `showSocial`, `title`, `onLogin` |
| SignUpBlock             | Registration form                        | `onSubmit`, `showSocial`               |
| PasswordRecoveryBlock   | Password reset request                   | `onSubmit`                             |
| ResetPasswordBlock      | New password entry (from email link)     | `onSubmit`                             |
| TwoFactorChallengeBlock | 2FA code entry challenge                 | `onVerify`                             |
| TwoFactorSetupBlock     | 2FA setup with QR code                   | `qrCodeUrl`, `secret`                  |
| AccountLockedBlock      | Account locked notification              | `onContact`, `reason`                  |
| AuthSuccessBlock        | Generic auth success state               | `title`, `description`, `onContinue`   |

**Auth Layout:**

| Block       | Purpose                                    | Key Props        |
| ----------- | ------------------------------------------ | ---------------- |
| AuthLayout  | Split-screen auth layout wrapper           | `children`       |

---

## Marketing

| Block              | Purpose                                   | Key Props                              |
| ------------------ | ----------------------------------------- | -------------------------------------- |
| HeroBlock          | Full hero with gradient text              | `title`, `subtitle`, `cta`             |
| HeroSectionBlock   | Alternate hero layout                     | `title`, `description`, `actions`      |
| FeatureBlock       | Single feature showcase                   | `title`, `description`, `icon`         |
| FeatureGridBlock   | Multi-feature grid layout                 | `features: Array<{title, description, icon}>` |
| PricingBlock       | Pricing cards comparison                  | `plans: Array<Plan>`                   |
| TestimonialsBlock  | Customer testimonial carousel/grid        | `testimonials: Array<Testimonial>`     |
| CallToActionBlock  | Call-to-action section                    | `title`, `description`, `action`       |
| FAQBlock           | Frequently asked questions accordion      | `items: Array<{question, answer}>`     |
| ComparisonBlock    | Side-by-side feature comparison           | `items`                                |
| SocialProofBlock   | Social proof metrics/logos                | `metrics`, `logos`                     |
| StatsMarketingBlock| Marketing statistics display              | `stats: Array<{label, value}>`         |
| LogoCloud          | Partner/client logo grid                  | `logos: Array<{src, alt}>`             |

---

## Navigation

| Block         | Purpose                              | Key Props                    |
| ------------- | ------------------------------------ | ---------------------------- |
| HeaderBlock   | Site header with nav links           | `logo`, `links`, `actions`   |
| FooterBlock   | Site footer with link columns        | `columns`, `social`, `legal` |
| BannerBlock   | Top-of-page promotional banner       | `message`, `action`, `dismissible` |
| NotFoundBlock | 404 page content                     | `title`, `description`, `action` |

---

## Dashboard & Data

| Block                    | Purpose                            | Key Props                    |
| ------------------------ | ---------------------------------- | ---------------------------- |
| StatsBlock               | KPI statistics cards               | `stats: Array<{label, value, change}>` |
| ChartBlock               | Single chart container             | `title`, `chart`, `description` |
| ChartCollectionBlock     | Multiple chart grid                | `charts: Array<ChartConfig>` |
| BarChartBlock            | Pre-configured bar chart           | `data`, `title`              |
| InteractiveAreaChartBlock| Zoomable/interactive area chart    | `data`, `title`              |
| HeatmapChartBlock        | Heatmap visualization block        | `data`, `title`              |
| UsageDonutBlock          | Usage/quota donut chart            | `used`, `total`, `label`     |
| DataGridBlock            | Data grid/table block              | `columns`, `data`            |
| ActivityFeedBlock        | Activity/event timeline            | `activities: Array<Activity>`|
| CodeBlock                | Syntax-highlighted code display    | `code`, `language`, `title`  |

---

## Application

| Block           | Purpose                              | Key Props                    |
| --------------- | ------------------------------------ | ---------------------------- |
| SettingsLayout  | Settings page with nav sidebar       | `sections`, `children`       |
| ChatLayout      | Chat application layout              | `messages`, `onSend`         |
| OnboardingBlock | Multi-step onboarding wizard         | `steps: Array<Step>`         |
| WizardBlock     | Generic step-by-step wizard          | `steps`, `onComplete`        |
| CreateBlock     | Entity creation form                 | `fields`, `onSubmit`         |
| DirectoryBlock  | User/item directory with search      | `items`, `onSearch`          |
| ChangelogBlock  | Version changelog display            | `entries: Array<ChangelogEntry>` |
| IntegrationsBlock| Integration marketplace grid        | `integrations: Array<Integration>` |
| ContactBlock    | Contact form                         | `onSubmit`                   |

---

## Content & Media

| Block               | Purpose                            | Key Props                    |
| ------------------- | ---------------------------------- | ---------------------------- |
| GalleryBlock        | Image/media gallery grid           | `items: Array<GalleryItem>`  |
| AudioVisualizerBlock| Audio visualization display        | `audioSrc`                   |
| NewsletterBlock     | Email newsletter signup            | `onSubscribe`                |

---

## User

| Block     | Purpose                                | Key Props              |
| --------- | -------------------------------------- | ---------------------- |
| TeamBlock | Team members grid with roles/avatars   | `members: Array<Member>` |
| InviteUserModal | Invite user flow modal            | `open`, `onOpenChange`, `onInvite` |

---

## AI/Voice

| Block          | Purpose                               | Key Props                    |
| -------------- | ------------------------------------- | ---------------------------- |
| VoiceAgentCard | AI voice agent interface card         | `agentName`, `state`, `onAction` |

---

## Agentic

| Block                    | Purpose                                      | Key Props                    |
| ------------------------ | -------------------------------------------- | ---------------------------- |
| AgentConversationBlock   | Full agent conversation UI composing AgentMessageBubble + ToolCallCard + ThinkingIndicator | `messages`, `tools`, `isThinking` |

---

## Block Usage Pattern

Blocks accept `className` for placement and compose Seed UI primitives:

```tsx
import { LoginBlock } from "@/components/blocks/LoginBlock"
import { HeroBlock } from "@/components/blocks/HeroBlock"

// In a page
<div className="flex items-center justify-center min-h-dvh">
  <LoginBlock type="login" showSocial />
</div>

// In a marketing layout
<HeroBlock
  title="Ship faster with Seed"
  subtitle="Production-ready components"
/>
```

Blocks are `"use client"` in Next.js (they contain event handlers, state, or Radix primitives).
