import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { Card, CardContent } from "../ui/Card"
import { StaggerChildren } from "../ui/StaggerChildren"
import { Shine } from "@/components/animate-ui/primitives/effects/shine"
import { ShimmeringText } from "../ui/text-effects"

export function LogoCloud() {
    const logos = [
        { name: "Vercel", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M12 2L22 22H2L12 2Z" fill="currentColor" stroke="none" /></svg> },
        { name: "Stripe", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
        { name: "OpenAI", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /></svg> },
        { name: "Nadicode", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 9h6v6H9z" /></svg> },
        { name: "Next.js", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5z" /><path d="M10 12h4" /></svg> },
    ]

    return (
        <div className="w-full py-12 lg:py-16">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-8 text-sm font-medium text-text-tertiary uppercase tracking-wider">
                    Trusted by innovative teams
                </p>
                <StaggerChildren staggerMs={60} distance={12} className="grid grid-cols-2 gap-8 md:grid-cols-5 items-center justify-items-center opacity-70">
                    {logos.map((logo) => (
                        <div
                            key={logo.name}
                            className="group flex items-center justify-center transition-all duration-300 hover:opacity-100 hover:scale-110"
                        >
                            <logo.icon className="h-8 w-8 text-text-tertiary transition-colors group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                            <span className="ml-2 text-lg font-semibold text-text-tertiary group-hover:text-text-primary hidden md:inline-block">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </StaggerChildren>
            </div>
        </div>
    )
}

export function Testimonials() {
    const testimonials = [
        {
            quote: "Seed has completely transformed how we build AI interfaces. The depth and realism are unmatched.",
            author: "Sarah Chen",
            role: "Product Designer @ NeuralNet",
            avatar: "SC"
        },
        {
            quote: "The glassmorphism effects are incredibly performant. It feels like a native app running in the browser.",
            author: "Marcus Rodriguez",
            role: "Frontend Lead @ FutureScale",
            avatar: "MR"
        },
        {
            quote: "Finally, a design system that understands what 'futuristic' actually means. No more flat, boring SaaS UI.",
            author: "Elena Kowalski",
            role: "CTO @ CyberSystems",
            avatar: "EK"
        },
        {
            quote: "Development velocity increased by 3x. The components are so easy to compose.",
            author: "David Park",
            role: "Indie Hacker",
            avatar: "DP"
        }
    ]

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-semibold leading-tight text-center mb-12 text-text-primary">
                    <ShimmeringText
                        text="Loved by Builders"
                        color="var(--color-text-primary)"
                        shimmeringColor="var(--color-accent)"
                        duration={2}
                    />
                </h2>
                <StaggerChildren staggerMs={100} direction="up" distance={20} className="flex flex-wrap justify-center gap-6">
                    {testimonials.map((t, i) => (
                        <Shine key={i} enableOnHover loop loopDelay={200} color="var(--color-accent)" opacity={0.15}>
                            <Card interactive className="w-full max-w-md">
                                <CardContent className="p-6">
                                    <p className="mb-4 text-lg text-text-secondary leading-relaxed">{'"'}{t.quote}{'"'}</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-primary/20">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.author}`} />
                                            <AvatarFallback>{t.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-sm font-semibold text-text-primary">{t.author}</div>
                                            <div className="text-xs text-text-tertiary">{t.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Shine>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}
