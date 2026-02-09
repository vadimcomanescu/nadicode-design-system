import { cn } from "@/lib/utils";

export const AnimatedBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-background", className)}>
            {/* 1. Deep Space/Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background opacity-80" />

            {/* 2. Grid Overlay - Perspective Distorted */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            {/* 3. Moving Orbs - "Lava Lamp" / "Aurora" Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden filter blur-[80px] opacity-60">
                {/* Primary Orb - Moving slowly top-left to center */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/30 rounded-full mix-blend-screen animate-blob" />

                {/* Accent Orb - Moving bottom-right to center */}
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-accent/30 rounded-full mix-blend-screen animate-blob animation-delay-2000" />

                {/* Secondary Orb - Moving bottom-left */}
                <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] bg-chart-2/30 rounded-full mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            {/* 4. Noise Texture for Realism */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* 5. Vignette for Focus */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
    );
};
