# The Genesis Interview: Initial User Intake

This document defines the **"Genesis Modal,"** the initial user interface designed to capture the "Spirit, Physics, and Context" of an application before the automated engineering pipeline begins.

While the PRD provides the "Hard Engineering" (Functional Requirements), this intake provides the "Soft Engineering" (Mutation Seeds) required to adapt the Design System.

## The 3-Step Intake Flow

### Step 1: The "Context" (Hard Input)
*   **UI:** A central drag-and-drop zone.
*   **Action:** User uploads PRD / Specs / Brain Dump.
*   **System Action:** AI silently begins parsing entities (Domain Modeling) in the background.

### Step 2: The "Vibe Check" (The 5 Vital Questions)
The user is asked **Scenario Questions** that map directly to the `MUTATION_GENOME`.

#### 1. The "Mastery" Slider (Cognitive Seed)
**"Who is sitting in the chair?"**
*   **Option A (The Tourist):** "First-time users. They need hand-holding, big buttons, and explanations."
    *   *Mapping:* `proficiency: 'novice'`, `onboarding: 'heavy'`, `labels: 'explicit'`.
*   **Option B (The Pilot):** "Veterans. They use this tool 6 hours a day. They want speed."
    *   *Mapping:* `proficiency: 'pro'`, `density: 'high'`, `shortcuts: 'enabled'`, `tooltips: 'on-hover'`.

#### 2. The "Reality" Check (Environmental Seed)
**"Where does the work happen?"**
*   **Option A (The Cave):** "In a controlled office, gaming room, or at night."
    *   *Mapping:* `lighting: 'controlled'`, `theme: 'dark-default'`, `effects: 'glassmorphism'`.
*   **Option B (The Field):** "Outside in the sun, in a warehouse, or a hospital corridor."
    *   *Mapping:* `lighting: 'uncontrolled'`, `theme: 'light-high-contrast'`, `transparency: false`.

#### 3. The "Heartbeat" (Operational Seed)
**"How alive is the data?"**
*   **Option A (The Painting):** "It changes when I save it. (e.g., CMS, Settings)."
    *   *Mapping:* `volatility: 'static'`, `animations: 'subtle'`, `numerals: 'proportional'`.
*   **Option B (The Ticker):** "It moves on its own. (e.g., Trading, Live Ops, Analytics)."
    *   *Mapping:* `volatility: 'real-time'`, `animations: 'flash-updates'`, `numerals: 'tabular-nums'`.

#### 4. The "Personality" (Brand Seed)
**"If the app could talk, how would it sound?"**
*   **Option A (The Banker):** "Professional, Secure, Calm, Trustworthy."
    *   *Mapping:* `vibe: 'serious'`, `font: 'sans-serif'`, `radius: 'small'`, `colors: 'muted'`.
*   **Option B (The Creator):** "Bold, Exciting, Playful, Loud."
    *   *Mapping:* `vibe: 'expressive'`, `font: 'display'`, `radius: 'large'`, `colors: 'vibrant'`.

#### 5. The "Scale" (Structural Seed)
**"How much information is on the screen at once?"**
*   **Option A (The Gallery):** "Focus on one thing at a time. Big visuals."
    *   *Mapping:* `density: 'low'`, `layout: 'card-based'`.
*   **Option B (The Excel Sheet):** "I need to see *everything*."
    *   *Mapping:* `density: 'ultra-high'`, `layout: 'grid/table-based'`, `font-size: 'small'`.

### Step 3: The "DNA" Output
The modal generates a **"Genesis JSON"** passed to the AI agents alongside the PRD.

```json
{
  "project_name": "Titan Trade Terminal",
  "genesis_dna": {
    "proficiency": "pro",        // "The Pilot"
    "environment": "controlled", // "The Cave"
    "volatility": "real-time",   // "The Ticker"
    "vibe": "serious",           // "The Banker"
    "density": "ultra-high"      // "The Excel Sheet"
  },
  "raw_prd_content": "..."
}
```

## Why this is Fundamental
Without this intake:
1.  The Domain Agent might identify a "Price" field correctly.
2.  But it won't know if that Price should be a massive marketing headline (Gallery) or a tiny, flickering monospace value (Ticker).

This ensures the automated pipeline builds the **contextually correct** version of the app.
