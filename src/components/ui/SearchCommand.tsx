/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CornerDownLeftIcon } from "@/components/ui/icons"
import { SearchIcon } from "./icons/search"

const searchCommandVariants = cva(
  "flex flex-col rounded-xl border bg-surface overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border",
        floating: "border-border shadow-lg shadow-black/20",
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  icon?: React.ReactNode
}

export interface SearchCommandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect" | "results">,
    VariantProps<typeof searchCommandVariants> {
  /** Current query value */
  value?: string
  /** Called when query changes */
  onChange?: (value: string) => void
  /** Search results to display */
  results?: SearchResult[]
  /** Called when a result is selected */
  onSelect?: (result: SearchResult) => void
  /** Placeholder text */
  placeholder?: string
  /** Show loading state */
  loading?: boolean
  /** Show keyboard shortcut hint */
  showShortcut?: boolean
}

const SearchCommand = React.forwardRef<HTMLDivElement, SearchCommandProps>(
  (
    {
      className,
      variant,
      size,
      value = "",
      onChange,
      results = [],
      onSelect,
      placeholder = "Type a command or search...",
      loading = false,
      showShortcut = true,
      ...props
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      setSelectedIndex(0)
    }, [results])

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(results.length - 1, 0) : prev - 1
        )
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        onSelect?.(results[selectedIndex])
      }
    }

    const groupedResults = results.reduce<Record<string, SearchResult[]>>(
      (acc, result) => {
        const category = result.category ?? "Results"
        if (!acc[category]) acc[category] = []
        acc[category].push(result)
        return acc
      },
      {}
    )

    let flatIndex = -1

    return (
      <div
        ref={ref}
        className={cn(searchCommandVariants({ variant, size }), "w-full", className)}
        role="combobox"
        aria-expanded={results.length > 0}
        aria-haspopup="listbox"
        {...props}
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <SearchIcon size={16} className="shrink-0 text-text-tertiary" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            role="searchbox"
            aria-label="Search"
            aria-autocomplete="list"
          />
          {showShortcut && (
            <div className="flex items-center gap-1 text-text-tertiary">
              <CornerDownLeftIcon size={12} />
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-6">
            <span className="text-sm text-text-tertiary animate-pulse">Searching...</span>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ul
            className="max-h-[300px] overflow-y-auto py-1"
            role="listbox"
            aria-label="Search results"
          >
            {Object.entries(groupedResults).map(([category, items]) => (
              <li key={category} role="presentation">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                  {category}
                </div>
                <ul role="group" aria-label={category}>
                  {items.map((result) => {
                    flatIndex++
                    const idx = flatIndex
                    return (
                      <li
                        key={result.id}
                        role="option"
                        aria-selected={idx === selectedIndex}
                        className={cn(
                          "flex items-center gap-3 cursor-pointer px-3 py-2 text-sm transition-colors",
                          idx === selectedIndex
                            ? "bg-accent/10 text-accent"
                            : "text-text-primary hover:bg-surface-hover"
                        )}
                        onClick={() => onSelect?.(result)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        {result.icon && (
                          <span className="shrink-0 text-text-tertiary">{result.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{result.title}</p>
                          {result.description && (
                            <p className="text-xs text-text-tertiary truncate">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}

        {!loading && value && results.length === 0 && (
          <div className="flex items-center justify-center py-6">
            <span className="text-sm text-text-tertiary">No results found</span>
          </div>
        )}
      </div>
    )
  }
)
SearchCommand.displayName = "SearchCommand"

export { SearchCommand, searchCommandVariants }
