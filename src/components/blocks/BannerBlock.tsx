import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "../ui/Button"
import { Typography } from "../ui/Typography"
import { InfoIcon, AlertTriangleIcon } from "@/components/ui/icons"
import { XIcon } from "@/components/ui/icons/x"
import { cn } from "../../lib/utils"

interface BannerBlockProps {
  children: React.ReactNode
  variant?: "info" | "warning" | "accent"
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const variantStyles: Record<string, string> = {
  info: "border-info/30 bg-info/5 text-info",
  warning: "border-warning/30 bg-warning/5 text-warning",
  accent: "border-accent/30 bg-accent/5 text-accent",
}

const variantIcons: Record<string, React.ReactNode> = {
  info: <InfoIcon size={16} className="shrink-0" />,
  warning: <AlertTriangleIcon size={16} className="shrink-0" />,
  accent: <InfoIcon size={16} className="shrink-0" />,
}

export function BannerBlock({
  children,
  variant = "info",
  dismissible = true,
  onDismiss,
  className,
}: BannerBlockProps) {
  const [visible, setVisible] = useState(true)

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-4 py-3",
            variantStyles[variant],
            className
          )}
        >
          {variantIcons[variant]}

          <Typography variant="small" className="flex-1 font-medium">
            {children}
          </Typography>

          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 hover:bg-transparent"
              onClick={handleDismiss}
              aria-label="Dismiss"
            >
              <XIcon size={14} />
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
