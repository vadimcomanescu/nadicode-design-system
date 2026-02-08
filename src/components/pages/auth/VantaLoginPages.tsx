import { VantaWrapper } from '../../ui/vanta/VantaWrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../ui/Card'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import { Checkbox } from '../../ui/Checkbox'
import { Zap } from 'lucide-react'
import { GoogleIcon } from '../../ui/BrandIcons'
import { useTheme } from '../../../lib/ThemeProvider'

// Note: Vanta effects are now lazy-loaded via effectImporter to avoid bundle bloat.
// No top-level imports of vanta/dist/*.min.js

// --- Colors ---
const COLORS = {
    primary: 0x6366f1,      // Indigo 500 (Brand Primary)
    primaryDark: 0x4338ca,  // Indigo 700 (High contrast for light mode)
    secondary: 0x22d3ee,    // Cyan 400 (Dark mode glow)
    secondaryDark: 0x0891b2,// Cyan 600 (Light mode contrast)
    accent: 0xdb2777,       // Pink 600
    darkBg: 0x050505,       // Deep Black
    lightBg: 0xFAFAFA,      // Off-white
    white: 0xffffff,
    black: 0x000000
}

// --- Shared Layout ---
function LoginPageLayout({ title, description, isDark }: { title: string, description: string, isDark: boolean }) {
    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <Button
                variant="ghost"
                className="absolute top-4 left-4 z-50 text-foreground/50 hover:text-foreground"
                onClick={() => window.location.href = '/?tab=pages'}
            >
                ← Back to Pages
            </Button>
            <Card className="w-full max-w-md" disablePixelBackground={true}>
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-full ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
                            <Zap className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <div className="mb-2 text-primary font-semibold tracking-widest uppercase text-xs">Nadicode System</div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        {title}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full relative">
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Sign in with Google
                    </Button>

                    <div className="relative flex items-center py-2">
                        <span className="w-full border-t border-border" />
                        <span className="whitespace-nowrap px-2 text-xs text-muted-foreground">Or continue with</span>
                        <span className="w-full border-t border-border" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="name@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me
                        </label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full">Sign In</Button>
                    <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                        Forgot your password?
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

// --- Adaptive Components ---

export function LoginBirdsDark() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.birds.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color1: isDark ? COLORS.primary : COLORS.primaryDark,
                color2: isDark ? COLORS.secondary : COLORS.secondaryDark,
                colorMode: "lerpGradient",
                birdSize: 1.50,
                wingSpan: 30.00,
                speedLimit: 4.00,
                separation: 50.00,
                alignment: 50.00,
                cohesion: 50.00,
                quantity: 3.00,
                backgroundAlpha: 1.0 // Ensure full coverage
            }}
        >
            <LoginPageLayout title="Welcome Back" description="Enter your credentials to access the system" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginGlobeDark() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.globe.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color: isDark ? COLORS.primary : COLORS.primaryDark,
                color2: isDark ? COLORS.accent : COLORS.accent, // Pink looks good on both
                size: 1.2,
                showDots: true
            }}
        >
            <LoginPageLayout title="Global Access" description="Connect to the worldwide network" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginNetDark() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.net.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color: isDark ? COLORS.secondary : COLORS.primaryDark,
                points: 12.00,
                maxDistance: 22.00,
                spacing: 18.00,
                showDots: true
            }}
        >
            <LoginPageLayout title="Neural Interface" description="Secure connection established" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginCellsLight() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.cells.min')}
            config={{
                color1: isDark ? COLORS.secondary : COLORS.secondaryDark,
                color2: isDark ? COLORS.primary : COLORS.primary,
                size: 1.5,
                speed: 1,
                minHeight: 200.00,
                minWidth: 200.00
            }}
        >
            <LoginPageLayout title="Cellular Login" description="Organic authentication systems" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginTrunkLight() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.trunk.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color: isDark ? COLORS.secondary : COLORS.primaryDark,
                spacing: 2.0,
                chaos: 4.0
            }}
        >
            <LoginPageLayout title="Growth Platform" description="Scale your business with us" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginDotsLight() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.dots.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color: isDark ? COLORS.primary : COLORS.primaryDark,
                color2: isDark ? COLORS.secondary : COLORS.secondaryDark,
                size: 3.0,
                spacing: 35.0
            }}
        >
            <LoginPageLayout title="Connected Systems" description="Join the grid" isDark={isDark} />
        </VantaWrapper>
    )
}

export function LoginTopologyDark() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <VantaWrapper
            // @ts-ignore
            effectImporter={() => import('vanta/dist/vanta.topology.min')}
            config={{
                backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
                color: isDark ? COLORS.secondary : COLORS.primaryDark,
            }}
        >
            <LoginPageLayout title="Topology View" description="Structural mapping login" isDark={isDark} />
        </VantaWrapper>
    )
}
