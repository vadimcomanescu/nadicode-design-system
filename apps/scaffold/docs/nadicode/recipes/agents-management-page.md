# Recipe: Agents Management Page

Use this recipe when building pages where users talk to agents, monitor progress, inspect outputs, and approve actions.

## Goal

Build an operational agent workbench with three functional regions:

- Team and run status
- Conversation and tool activity
- Work artifacts and logs

## Required Layout

- Outer shell: `min-h-dvh bg-background text-text-primary`
- Primary containers: `Card` or `.glass-panel`
- Desktop: 3-column layout
- Mobile: stacked sections in this order:
  1. Conversation
  2. Composer
  3. Team and run status
  4. Logs and artifacts

## Required Components By Region

### 1. Team and Status Region

- `AgentTeamPanel`
- `AgentStatus`
- `AgentTimeline`
- `AgentMetricsCard`

### 2. Conversation Region

- `ConversationThread` for canonical message rendering
- `AgentMessageBubble` for enriched agent/user turns
- `ThinkingIndicator` while an agent is processing
- `ToolCallCard` for tool invocations
- `ApprovalCard` when user consent is required

### 3. Work Region

- `Tabs` to split `Work`, `Logs`, and `Files`
- `CodeDiffViewer` for code changes
- `ArtifactCard` for generated outputs
- `SourceCitation` for linked references
- `AgentTerminal` for command output
- `WorkflowGraph` and `ContextMeter` when orchestration visibility is needed

### 4. Composer Region

- `Textarea` (multi-line prompt) or `Input` (single-line prompt)
- `Button` for send/submit
- Icons from `@/components/ui/icons` only

## Required States

Implement all states explicitly:

- Empty: no active run
- Loading: history or run metadata loading
- Running: one or more agents active
- Blocked Approval: waiting for user action
- Failed: run or tool error
- Complete: run succeeded with artifacts

## Styling Contract

- Use semantic tokens only (`bg-surface`, `text-text-secondary`, `border-border`, etc.).
- Use `bg-overlay/80` for modal/backdrop overlays.
- Use `.glass-panel` for structural panels and `.glass-floating` for elevated panes.
- Do not use raw Tailwind colors (`bg-zinc-*`, `text-gray-*`, etc.).

## Accessibility

- Primary chat log uses `aria-live="polite"` for streaming updates.
- Every interactive control has visible focus (`focus-visible:ring-1` or stronger).
- Tabs, dialogs, and menus must remain keyboard navigable.
- Icon-only buttons require `aria-label`.

## Verification

```bash
npx tsc --noEmit
npm run build
npm run lint
npm run test
npm run ds:check
npm run ds:ast-check
```

## Reference Implementation

- Route wrapper: `src/app/voice-agents/page.tsx`
- Client loader: `src/app/voice-agents/client.tsx`
- Full page composition: `src/components/pages/VoiceAgentsPage.tsx`
