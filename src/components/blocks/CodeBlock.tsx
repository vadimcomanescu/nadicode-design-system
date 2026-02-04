import * as React from "react"
import { Check, Copy } from "lucide-react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"

import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({
  code,
  language = "javascript",
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    Prism.highlightAll()
  }, [code, language])

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg glass-card",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2 text-xs text-text-secondary">
          <span>{filename}</span>
        </div>
      )}
      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 h-6 w-6 text-text-tertiary hover:bg-surface-active hover:text-text-primary"
          onClick={onCopy}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span className="sr-only">Copy code</span>
        </Button>
        <div className="overflow-x-auto p-4">
          <pre className="!m-0 !bg-transparent !p-0">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
