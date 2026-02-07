import { ArrowRight, ChevronRight, Sparkles, Terminal, Zap } from "lucide-react"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { MouseGlow } from "../ui/MouseEffect"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { cn } from "../../lib/utils"

interface HeroProps {
    headline?: string
    subheadline?: string
    primaryAction?: {
        label: string
        onClick?: () => void
    }
    secondaryAction?: {
        label: string
        onClick?: () => void
    }
    announcement?: {
        label: string
        text: string
        href?: string
    }
    className?: string
}

export function HeroCentered({
    headline = "Experience the Future of Synthetic Intelligence",
    subheadline = "Unleash the power of deep learning with our ultra-realistic, high-performance design system. Built for the next generation of AI interfaces.",
    primaryAction = { label: "Get Started" },
    secondaryAction = { label: "View Components" },
    announcement = { label: "New", text: "Nadicode System v2.0 is now live", href: "#" },
    className,
}: HeroProps) {
    return (
        <section className={cn("relative overflow-hidden py-24 lg:py-32", className)}>
            <MouseGlow className="opacity-40" />
            <div className="container relative z-10 mx-auto px-4 text-center">
                {/* Announcement Pill */}
                <div className="mb-8 flex justify-center">
                    <a
                        href={announcement.href}
                        className="inline-flex items-center rounded-full border border-border/50 bg-surface/50 px-3 py-1 text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-accent/10 hover:bg-surface-hover"
                    >
                        <Badge variant="accent" className="mr-2 h-5 px-1.5 text-[10px]">
                            {announcement.label}
                        </Badge>
                        <span className="flex items-center gap-1">
                            {announcement.text}
                            <ChevronRight className="h-3 w-3" />
                        </span>
                    </a>
                </div>

                {/* Headlines */}
                <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-text-primary sm:text-7xl">
                    <span className="block">{headline.split(" ").slice(0, 3).join(" ")}</span>
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {headline.split(" ").slice(3).join(" ")}
                    </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                    {subheadline}
                </p>

                {/* Actions */}
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Button size="lg" variant="primary" onClick={primaryAction.onClick}>
                        {primaryAction.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                        {secondaryAction.label}
                    </Button>
                </div>

                <div className="mt-20">
                    <Card className="mx-auto max-w-5xl rounded-xl p-2 lg:rounded-2xl lg:p-4">
                        <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border glass-panel shadow-inner relative">
                            {/* Fake UI Content */}
                            <div className="absolute inset-0 flex flex-col">
                                {/* Fake Toolbar */}
                                <div className="h-12 border-b border-border flex items-center px-4 gap-4 bg-muted/30">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-destructive/50" />
                                        <div className="h-3 w-3 rounded-full bg-chart-5/50" />
                                        <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                                    </div>
                                    <div className="h-6 w-full max-w-sm rounded bg-muted" />
                                </div>
                                {/* Fake Body */}
                                <div className="flex-1 flex">
                                    <div className="w-64 border-r border-border p-4 space-y-4 bg-muted/10 hidden md:block">
                                        <div className="h-4 w-24 rounded bg-muted" />
                                        <div className="h-4 w-32 rounded bg-muted/50" />
                                        <div className="h-4 w-20 rounded bg-muted/50" />
                                        <div className="h-4 w-28 rounded bg-muted/50" />
                                    </div>
                                    <div className="flex-1 p-6 space-y-6">
                                        <div className="flex gap-4">
                                            <div className="h-32 flex-1 rounded-lg border border-border bg-muted/20" />
                                            <div className="h-32 flex-1 rounded-lg border border-border bg-muted/20" />
                                            <div className="h-32 flex-1 rounded-lg border border-border bg-muted/20" />
                                        </div>
                                        <div className="h-64 rounded-lg border border-border bg-muted/10" />
                                    </div>
                                </div>
                            </div>

                            {/* Glow Overlay */}
                            <div className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none">
                                <div className="grid grid-cols-2 gap-8 opacity-20">
                                    <div className="h-32 w-32 rounded-full border border-primary/50 blur-3xl animate-pulse" />
                                    <div className="h-32 w-32 rounded-full border border-accent/50 blur-3xl animate-pulse delay-1000" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section >
    )
}

export function HeroSplit({
    headline = "Build faster with Nadicode",
    subheadline = "A complete component library for building modern, high-contrast AI applications.",
    primaryAction = { label: "Start Building" },
    className,
}: HeroProps) {
    return (
        <section className={cn("relative overflow-hidden py-20 lg:py-28", className)}>
            <div className="container mx-auto grid gap-12 px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
                {/* Left Content */}
                <div className="relative z-10">
                    <div className="inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1 mb-6">
                        <Sparkles className="mr-2 h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-text-secondary">AI-Powered Components</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl mb-6">
                        {headline}
                    </h1>
                    <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
                        {subheadline}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" variant="accent" onClick={primaryAction.onClick}>
                            {primaryAction.label}
                            <Zap className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="ghost">
                            Documentation
                        </Button>
                    </div>

                    <div className="mt-8 flex items-center gap-4 text-sm text-text-tertiary">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-surface-active flex items-center justify-center text-[10px] font-bold">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <p>Trusted by 10,000+ developers</p>
                    </div>
                </div>

                {/* Right Visual (Mock UI) */}
                <div className="relative lg:ml-auto w-full max-w-md">
                    <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl" />
                    <Card interactive className="relative w-full border-border/50">
                        <CardHeader className="border-b border-border/50 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <div className="h-3 w-3 rounded-full bg-destructive/50" />
                                    <div className="h-3 w-3 rounded-full bg-chart-5/50" />
                                    <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">terminal.tsx</div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6 font-mono text-sm">
                            <div className="flex items-center gap-2 text-chart-4">
                                <ChevronRight className="h-4 w-4" />
                                <span>npm install @nadicode/core</span>
                            </div>
                            <div className="text-text-secondary">
                                <span className="text-chart-2">✔</span> Added 124 packages
                            </div>
                            <div className="flex items-center gap-2 text-text-primary">
                                <ChevronRight className="h-4 w-4 text-text-tertiary" />
                                <span>npx nadicode init</span>
                            </div>
                            <div className="bg-surface/50 p-3 rounded border border-border/50 text-xs text-text-secondary mt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Terminal className="h-3 w-3" />
                                    <span>Initializing project...</span>
                                </div>
                                <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-2/3" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Floating Element */}
                    <div className="absolute -bottom-6 -left-6 max-w-[200px]">
                        <Card className="border-border/50 shadow-xl">
                            <CardContent className="p-3 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-chart-4/20 flex items-center justify-center text-chart-4">
                                    <Zap className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-text-primary">Deployment</div>
                                    <div className="text-[10px] text-text-secondary">Successful (24ms)</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
