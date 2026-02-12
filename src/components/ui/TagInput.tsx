'use client'

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { XIcon } from "@/components/ui/icons"

import { cn } from "../../lib/utils"
import { Badge } from "./Badge"
import { motionSpring, useMotionConfig } from "../../lib/motion"

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  maxTags?: number
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ className, tags, onTagsChange, maxTags, placeholder = "Add tag...", disabled, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const motionConfig = useMotionConfig()

    React.useImperativeHandle(ref, () => inputRef.current!)

    const addTag = React.useCallback(
      (value: string) => {
        const trimmed = value.trim()
        if (!trimmed) return
        if (tags.includes(trimmed)) return
        if (maxTags && tags.length >= maxTags) return
        onTagsChange([...tags, trimmed])
        setInputValue("")
      },
      [tags, onTagsChange, maxTags]
    )

    const removeTag = React.useCallback(
      (index: number) => {
        onTagsChange(tags.filter((_, i) => i !== index))
      },
      [tags, onTagsChange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault()
          addTag(inputValue)
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
          removeTag(tags.length - 1)
        }
      },
      [inputValue, tags, addTag, removeTag]
    )

    return (
      <div
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-accent",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence mode="popLayout">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ...motionSpring.snappy, ...motionConfig }}
              layout
            >
              <Badge variant="secondary" className="gap-1 pr-1">
                {tag}
                <button
                  type="button"
                  className="ml-0.5 rounded-full p-0.5 hover:bg-secondary/80 focus:outline-none focus:ring-1 focus:ring-accent"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(index)
                  }}
                  aria-label={`Remove ${tag}`}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
          className="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-text-tertiary text-text-primary"
          {...props}
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
