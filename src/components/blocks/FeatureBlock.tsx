import { ChartBarIcon, CloudIcon, Code2Icon, DatabaseIcon, GlobeIcon, LaptopIcon, ShieldIcon } from "@/components/ui/icons"
import { ZapIcon } from "../ui/icons/zap"
import { LayersIcon } from "../ui/icons/layers"
import { KeyIcon } from "../ui/icons/key"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { StaggerChildren } from "../ui/StaggerChildren"

export function FeatureGrid() {
    const features = [
        {
            title: "Edge Network",
            description: "Deploy your AI models to the edge with a single click. Global low-latency inference.",
            icon: <GlobeIcon size={20} />,
        },
        {
            title: "Real-time Processing",
            description: "Process locally on device or in the cloud. WebGPU and WebAssembly support built-in.",
            icon: <ZapIcon size={20} />,
        },
        {
            title: "Vector Database",
            description: "Integrated vector storage for semantic search and long-term memory retrieval.",
            icon: <DatabaseIcon size={20} />,
        },
        {
            title: "End-to-End Encryption",
            description: "Your data is encrypted at rest and in transit. Enterprise-grade security standards.",
            icon: <ShieldIcon size={20} />,
        },
        {
            title: "Automated Scaling",
            description: "Scale from 0 to millions of requests without managing infrastructure.",
            icon: <ChartBarIcon size={20} />,
        },
        {
            title: "API First",
            description: "Everything is available via API. Integrate with your existing stack seamlessly.",
            icon: <Code2Icon size={20} />,
        }
    ]

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <Badge variant="outline" className="mb-4">Capabilities</Badge>
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-4">
                        Everything you need to build
                    </h2>
                    <p className="text-text-secondary text-lg">
                        A complete toolkit for the next generation of intelligent applications.
                    </p>
                </div>

                <StaggerChildren staggerMs={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <Card key={i} interactive>
                            <CardHeader className="pb-2">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}

export function FeatureList() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 space-y-24">
                {/* Feature 1 */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                            <LayersIcon size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-text-primary mb-4">
                            Unified Component Architecture
                        </h3>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            Stop wrestling with fragmented libraries. Seed provides a cohesive set of primitives that work together perfectly out of the box. Themeable, accessible, and composable.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {['Type-safe design tokens', 'Radix UI primitives', 'Automatic dark mode'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-text-primary">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline">Explore Architecture</Button>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full" />
                        <Card className="p-0 overflow-hidden border-border/50">
                            <div className="p-4 border-b border-border/50 flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-destructive/50" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                                <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                            </div>
                            <div className="p-8 h-[300px] flex items-center justify-center bg-background/50">
                                <div className="grid grid-cols-2 gap-4 w-full opacity-80">
                                    <div className="h-24 bg-surface/50 rounded-lg border border-border animate-pulse" />
                                    <div className="h-24 bg-surface-active/50 rounded-lg border border-primary/20" />
                                    <div className="h-24 bg-surface/50 rounded-lg border border-border" />
                                    <div className="h-24 bg-surface rounded-lg border border-border" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Feature 2 (Reverse) */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
                        <Card className="p-0 overflow-hidden border-border/50">
                            <div className="glass-overlay p-6 h-[350px] relative overflow-hidden flex flex-col items-center justify-center">
                                <CloudIcon size={96} className="text-primary opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                <div className="z-10 glass-panel p-4 rounded-lg flex items-center gap-4 w-64 shadow-lg">
                                    <div className="h-8 w-8 rounded bg-chart-4/20 text-chart-4 flex items-center justify-center">
                                        <KeyIcon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-20 bg-text-primary/20 rounded mb-2" />
                                        <div className="h-2 w-full bg-text-primary/10 rounded" />
                                    </div>
                                </div>
                                <div className="z-10 glass-panel p-4 rounded-lg flex items-center gap-4 w-64 mt-4 translate-x-4 shadow-lg">
                                    <div className="h-8 w-8 rounded bg-chart-2/20 text-chart-2 flex items-center justify-center">
                                        <LaptopIcon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-16 bg-text-primary/20 rounded mb-2" />
                                        <div className="h-2 w-full bg-text-primary/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                            <ShieldIcon size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-text-primary mb-4">
                            Secure by Default
                        </h3>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            Enterprise-ready security features including SSO, audit logs, and role-based access control. Compliant with SOC2 and GDPR.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {['End-to-end encryption', 'SAML & OIDC support', '99.99% Uptime SLA'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-text-primary">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline">View Security Docs</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
