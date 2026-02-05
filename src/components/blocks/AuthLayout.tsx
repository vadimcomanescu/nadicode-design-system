import { Sparkles } from "lucide-react";
import { LoginBlock } from "./LoginBlock";
import { AnimatedBackground } from "../ui/AnimatedBackground";

interface AuthLayoutProps {
    mode?: "login" | "signup";
}

export function AuthLayout({ mode = "login" }: AuthLayoutProps) {
    return (
        <div className="w-full min-h-screen lg:h-screen lg:min-h-[800px] grid lg:grid-cols-2 overflow-hidden bg-background">
            {/* Visual Side */}
            <div className="hidden lg:flex relative h-full w-full flex-col bg-muted text-white dark:border-r border-border/50">
                <div className="absolute inset-0 bg-surface-active" />
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <AnimatedBackground />
                </div>

                <div className="relative z-20 flex items-center text-lg font-medium p-8">
                    <Sparkles className="mr-2 h-6 w-6 text-accent" />
                    Nadicode
                </div>
                <div className="relative z-20 m-auto max-w-lg text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative">
                        Build the future, faster.
                    </h1>
                    <p className="text-lg text-text-tertiary relative">
                        "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
                    </p>
                </div>
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

                <LoginBlock
                    variant="glass-panel"
                    className="relative z-10 w-full max-w-sm"
                    type={mode === "signup" ? "signup" : "login"}
                />
            </div>
        </div>
    );
}
