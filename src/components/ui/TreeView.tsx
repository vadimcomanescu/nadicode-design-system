import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { motion, AnimatePresence } from "motion/react"
import { ChevronRightIcon } from "@/components/ui/icons"

import { cn } from "../../lib/utils"
import { motionSpring, useMotionConfig } from "../../lib/motion"

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNode[]
  onSelect?: (node: TreeNode) => void
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, onSelect, className, ...props }, ref) => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null)

    const handleSelect = React.useCallback(
      (node: TreeNode) => {
        setSelectedId(node.id)
        onSelect?.(node)
      },
      [onSelect]
    )

    return (
      <div
        ref={ref}
        role="tree"
        className={cn("text-sm", className)}
        {...props}
      >
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    )
  }
)
TreeView.displayName = "TreeView"

interface TreeItemProps {
  node: TreeNode
  depth: number
  selectedId: string | null
  onSelect: (node: TreeNode) => void
}

function TreeItem({ node, depth, selectedId, onSelect }: TreeItemProps) {
  const [open, setOpen] = React.useState(false)
  const motionConfig = useMotionConfig()
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault()
          if (hasChildren) {
            setOpen((prev) => !prev)
          }
          onSelect(node)
          break
        case "ArrowRight":
          if (hasChildren && !open) {
            e.preventDefault()
            setOpen(true)
          }
          break
        case "ArrowLeft":
          if (hasChildren && open) {
            e.preventDefault()
            setOpen(false)
          }
          break
      }
    },
    [hasChildren, open, node, onSelect]
  )

  if (!hasChildren) {
    return (
      <div
        role="treeitem"
        tabIndex={0}
        aria-selected={isSelected}
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition-colors duration-fast ease-out-cubic hover:bg-surface-hover focus:outline-none focus:ring-1 focus:ring-accent",
          isSelected && "bg-accent/10 text-accent"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => onSelect(node)}
        onKeyDown={handleKeyDown}
      >
        {node.icon && <span className="shrink-0">{node.icon}</span>}
        <span className="truncate">{node.label}</span>
      </div>
    )
  }

  return (
    <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen}>
      <CollapsiblePrimitive.CollapsibleTrigger asChild>
        <div
          role="treeitem"
          tabIndex={0}
          aria-expanded={open}
          aria-selected={isSelected}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer transition-colors duration-fast ease-out-cubic hover:bg-surface-hover focus:outline-none focus:ring-1 focus:ring-accent",
            isSelected && "bg-accent/10 text-accent"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onSelect(node)}
          onKeyDown={handleKeyDown}
        >
          <motion.span
            className="shrink-0"
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ ...motionSpring.snappy, ...motionConfig }}
          >
            <ChevronRightIcon size={16} className="text-text-tertiary" />
          </motion.span>
          {node.icon && <span className="shrink-0">{node.icon}</span>}
          <span className="truncate">{node.label}</span>
        </div>
      </CollapsiblePrimitive.CollapsibleTrigger>

      <AnimatePresence initial={false}>
        {open && (
          <CollapsiblePrimitive.CollapsibleContent forceMount asChild>
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ...motionSpring.snappy, ...motionConfig }}
              style={{ overflow: "hidden" }}
            >
              {node.children!.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  selectedId={selectedId}
                  onSelect={onSelect}
                />
              ))}
            </motion.div>
          </CollapsiblePrimitive.CollapsibleContent>
        )}
      </AnimatePresence>
    </CollapsiblePrimitive.Root>
  )
}

export { TreeView }
