import { Badge } from "../ui/Badge"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { WrenchIcon, RefreshCwIcon } from "@/components/ui/icons"
import { PlusIcon } from "@/components/ui/icons/plus"
import { cn } from "../../lib/utils"

interface ChangelogChange {
  type: "added" | "fixed" | "changed"
  text: string
}

interface ChangelogEntry {
  version: string
  date: string
  changes: ChangelogChange[]
}

interface ChangelogBlockProps {
  entries?: ChangelogEntry[]
  title?: string
  className?: string
}

const typeConfig: Record<
  ChangelogChange["type"],
  { icon: React.ReactNode; label: string; color: string }
> = {
  added: {
    icon: <PlusIcon size={12} />,
    label: "Added",
    color: "text-success bg-success/10",
  },
  fixed: {
    icon: <WrenchIcon size={12} />,
    label: "Fixed",
    color: "text-info bg-info/10",
  },
  changed: {
    icon: <RefreshCwIcon size={12} />,
    label: "Changed",
    color: "text-warning bg-warning/10",
  },
}

const defaultEntries: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "Feb 9, 2026",
    changes: [
      { type: "added", text: "ScrollFadeIn, MeteorShower, and AuroraEffect animation components" },
      { type: "added", text: "FAQ, Comparison, Contact, and Newsletter blocks" },
      { type: "changed", text: "Upgraded motion library to v12 with new easing tokens" },
    ],
  },
  {
    version: "2.0.0",
    date: "Feb 1, 2026",
    changes: [
      { type: "added", text: "Arctic Glow palette replacing Synthetic Coral" },
      { type: "added", text: "Light and dark theme support via CSS custom properties" },
      { type: "fixed", text: "WCAG contrast ratios for all semantic colors" },
      { type: "changed", text: "Migrated from Tailwind CSS 3 to 4" },
    ],
  },
  {
    version: "1.5.0",
    date: "Jan 15, 2026",
    changes: [
      { type: "added", text: "Dashboard page with chart collection" },
      { type: "fixed", text: "Dialog focus trap on mobile Safari" },
    ],
  },
]

export function ChangelogBlock({
  entries = defaultEntries,
  title = "Changelog",
  className,
}: ChangelogBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-3xl px-6">
        {title && (
          <ScrollFadeIn>
            <Typography variant="h2" className="mb-12 text-text-primary">
              {title}
            </Typography>
          </ScrollFadeIn>
        )}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-2 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {entries.map((entry, entryIndex) => (
              <ScrollFadeIn key={entry.version} delay={entryIndex * 0.08}>
                <div className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass-panel">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>

                  <div className="flex-1 pt-0.5">
                    {/* Version header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="primary" className="font-mono text-xs">
                        v{entry.version}
                      </Badge>
                      {entryIndex === 0 && (
                        <Badge variant="accent" className="text-[10px] animate-pulse">
                          Latest
                        </Badge>
                      )}
                      <time className="text-xs text-text-tertiary">{entry.date}</time>
                    </div>

                    {/* Changes */}
                    <ul className="space-y-2">
                      {entry.changes.map((change, changeIndex) => {
                        const config = typeConfig[change.type]
                        return (
                          <li
                            key={changeIndex}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded",
                                config.color
                              )}
                            >
                              {config.icon}
                            </span>
                            <span>{change.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
