'use client'

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const agentAvatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full overflow-hidden select-none",
  {
    variants: {
      size: {
        lg: "h-[120px] w-[120px]",
        xl: "h-[200px] w-[200px]",
        "2xl": "h-[400px] w-[400px]",
      },
    },
    defaultVariants: {
      size: "xl",
    },
  }
);

type AgentState = "idle" | "listening" | "speaking";

interface AgentAvatarProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof agentAvatarVariants> {
  src: string;
  name: string;
  state?: AgentState;
}

const AgentAvatar = forwardRef<HTMLButtonElement, AgentAvatarProps>(
  ({ src, name, state = "idle", size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full",
          className
        )}
        aria-label={`${name} - ${state}`}
        {...props}
      >
        {/* Outer ring for speaking/listening states */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-300",
            state === "speaking" && "agent-avatar-speaking",
            state === "listening" && "agent-avatar-listening",
            state === "idle" && "opacity-0"
          )}
        />

        {/* Avatar container with breathing animation */}
        <div
          className={cn(
            agentAvatarVariants({ size }),
            "agent-avatar-breathe ring-2 ring-border/50 transition-shadow duration-300",
            state === "speaking" && "ring-accent shadow-[0_0_30px_rgba(var(--accent),0.4)]",
            state === "listening" && "ring-primary/60 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
          )}
        >
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
            draggable={false}
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-overlay/0 group-hover:bg-overlay/10 transition-colors duration-200 rounded-full" />
        </div>
      </button>
    );
  }
);

AgentAvatar.displayName = "AgentAvatar";

export { AgentAvatar, agentAvatarVariants };
export type { AgentAvatarProps, AgentState };
