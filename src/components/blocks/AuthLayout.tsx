import { LoginBlock } from "./LoginBlock";
import { AnimatedBackground } from "../ui/AnimatedBackground";
import { SparklesIcon } from "../ui/icons/sparkles";
import { motion } from "motion/react";
import { StaggerChildren } from "../ui/StaggerChildren";

interface AuthLayoutProps {
    mode?: "login" | "signup";
}

export function AuthLayout({ mode = "login" }: AuthLayoutProps) {
    return (
        <div className="w-full min-h-dvh lg:h-dvh lg:min-h-[800px] grid lg:grid-cols-2 overflow-hidden bg-background">
            {/* Visual Side */}
            <div className="hidden lg:flex relative h-full w-full flex-col bg-muted text-white dark:border-r border-border/50">
                <div className="absolute inset-0 bg-surface-active" />
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <AnimatedBackground />
                </div>

                <div className="relative z-20 flex items-center text-lg font-medium p-8">
                    <SparklesIcon size={24} className="mr-2 text-accent" />
                    Nadicode
                </div>
                <StaggerChildren staggerMs={100} className="relative z-20 m-auto max-w-lg text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative">
                        Build the future, faster.
                    </h1>
                    <p className="text-lg text-text-tertiary relative">
                        {'"'}This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.{'"'}
                    </p>
                </StaggerChildren>
                <div className="relative z-20 p-8 mt-auto">
                    <blockquote className="space-y-2">
                        <footer className="text-sm text-text-tertiary">Sofia Davis, Lead Engineer</footer>
                    </blockquote>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-background relative overflow-y-auto">
                {/* Subtle background for form side so it's not plain flat color */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-accent/5 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative z-10 w-full max-w-sm"
                >
                    <LoginBlock
                        className="w-full"
                        type={mode === "signup" ? "signup" : "login"}
                    />
                </motion.div>
            </div>
        </div>
    );
}
