'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

type NodeStatus = "pending" | "active" | "done" | "error"

const nodeStatusClass: Record<NodeStatus, string> = {
  pending: "border-border bg-muted text-text-tertiary",
  active: "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(var(--color-accent)/0.3)]",
  done: "border-success/40 bg-success/10 text-success",
  error: "border-destructive/40 bg-destructive/10 text-destructive",
}

type WorkflowNode = {
  id: string
  label: string
  status: NodeStatus
}

type WorkflowEdge = {
  from: string
  to: string
}

export interface WorkflowGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

const WorkflowGraph = React.forwardRef<HTMLDivElement, WorkflowGraphProps>(
  ({ className, nodes, edges, ...props }, ref) => {
    // Build adjacency: group nodes into layers via topological ordering
    const nodeMap = new Map(nodes.map((n) => [n.id, n]))
    const inDegree = new Map<string, number>()
    const adj = new Map<string, string[]>()
    for (const n of nodes) {
      inDegree.set(n.id, 0)
      adj.set(n.id, [])
    }
    for (const e of edges) {
      adj.get(e.from)?.push(e.to)
      inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1)
    }

    // BFS layering
    const layers: WorkflowNode[][] = []
    let queue = nodes.filter((n) => (inDegree.get(n.id) ?? 0) === 0)
    const visited = new Set<string>()
    while (queue.length > 0) {
      layers.push(queue)
      const next: WorkflowNode[] = []
      for (const node of queue) {
        visited.add(node.id)
        for (const childId of adj.get(node.id) ?? []) {
          const deg = (inDegree.get(childId) ?? 1) - 1
          inDegree.set(childId, deg)
          if (deg === 0 && !visited.has(childId)) {
            const child = nodeMap.get(childId)
            if (child) next.push(child)
          }
        }
      }
      queue = next
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-start gap-4 overflow-x-auto", className)}
        role="img"
        aria-label="Workflow graph"
        {...props}
      >
        {layers.map((layer, li) => (
          <React.Fragment key={li}>
            {li > 0 && (
              <div className="flex items-center self-center text-text-tertiary" aria-hidden="true">
                <div className="w-6 border-t border-border" />
                <span className="text-xs">&#8250;</span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {layer.map((node) => (
                <div
                  key={node.id}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs font-medium glass-panel whitespace-nowrap",
                    nodeStatusClass[node.status]
                  )}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
)
WorkflowGraph.displayName = "WorkflowGraph"

export { WorkflowGraph }
