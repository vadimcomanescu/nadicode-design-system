'use client'

import { VantaWrapper } from '../../ui/vanta/VantaWrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../ui/Card'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import { Checkbox } from '../../ui/Checkbox'
import { GoogleIcon } from '../../ui/BrandIcons'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/ThemeProvider'
import { ZapIcon } from '../../ui/icons/zap'

const COLORS = {
    primary: 0x38BDB8,
    primaryDark: 0x1A8F88,
    secondary: 0x2DD4BF,
    secondaryDark: 0x0D9488,
    accent: 0xFBBF24,
    darkBg: 0x0F1114,
    lightBg: 0xFBFCFD,
}

function LoginPageLayout({ title, description, isDark }: { title: string, description: string, isDark: boolean }) {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center min-h-dvh relative">
            <Button
                variant="ghost"
                className="absolute top-4 left-4 z-50 text-text-primary/50 hover:text-text-primary"
                onClick={() => router.push("/pages")}
            >
                ← Back to Pages
            </Button>
            <Card className="w-full max-w-md" disablePixelBackground={true}>
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-full ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
                            <ZapIcon size={40} className="text-primary" />
                        </div>
                    </div>
                    <div className="mb-2 text-primary font-semibold tracking-widest uppercase text-xs">Scaffold System</div>
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
                        <span className="whitespace-nowrap px-2 text-xs text-text-tertiary">Or continue with</span>
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
                    <Button variant="ghost" className="w-full text-xs text-text-tertiary">
                        Forgot your password?
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export type VantaEffect = 'birds' | 'globe' | 'net' | 'cells' | 'trunk' | 'dots' | 'topology'

interface EffectConfig {
    title: string
    description: string
    importer: () => Promise<Record<string, unknown>>
    config: (isDark: boolean) => Record<string, unknown>
}

const EFFECT_CONFIGS: Record<VantaEffect, EffectConfig> = {
    birds: {
        title: "Welcome Back",
        description: "Enter your credentials to access the system",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.birds.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color1: isDark ? COLORS.primary : COLORS.primaryDark,
            color2: isDark ? COLORS.secondary : COLORS.secondaryDark,
            colorMode: "varianceGradient",
            birdSize: 1.50,
            wingSpan: 30.00,
            speedLimit: 4.00,
            separation: 50.00,
            alignment: 50.00,
            cohesion: 50.00,
            quantity: 4.00,
        }),
    },
    globe: {
        title: "Global Access",
        description: "Connect to the worldwide network",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.globe.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color: isDark ? COLORS.primary : COLORS.primaryDark,
            color2: COLORS.accent,
            size: 1.2,
            showDots: true,
        }),
    },
    net: {
        title: "Neural Interface",
        description: "Secure connection established",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.net.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color: isDark ? COLORS.secondary : COLORS.primaryDark,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00,
            showDots: true,
        }),
    },
    cells: {
        title: "Cellular Login",
        description: "Organic authentication systems",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.cells.min'),
        config: (isDark) => ({
            color1: isDark ? COLORS.secondary : COLORS.secondaryDark,
            color2: COLORS.primary,
            size: 1.5,
            speed: 1,
            minHeight: 200.00,
            minWidth: 200.00,
        }),
    },
    trunk: {
        title: "Growth Platform",
        description: "Scale your business with us",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.trunk.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color: isDark ? COLORS.secondary : COLORS.primaryDark,
            spacing: 2.0,
            chaos: 4.0,
        }),
    },
    dots: {
        title: "Connected Systems",
        description: "Join the grid",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.net.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color: isDark ? COLORS.secondary : COLORS.primaryDark,
            points: 15.0,
            maxDistance: 22.0,
            spacing: 18.0,
            showDots: true,
        }),
    },
    topology: {
        title: "Topology View",
        description: "Structural mapping login",
        // @ts-expect-error - Vanta.js has no TypeScript definitions
        importer: () => import('vanta/dist/vanta.topology.min'),
        config: (isDark) => ({
            backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
            color: isDark ? COLORS.secondary : COLORS.primaryDark,
        }),
    },
}

interface VantaLoginPageProps {
    effect: VantaEffect
    title?: string
    description?: string
}

export function VantaLoginPage({ effect, title, description }: VantaLoginPageProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'
    const cfg = EFFECT_CONFIGS[effect]

    return (
        <VantaWrapper
            effectImporter={cfg.importer}
            config={cfg.config(isDark)}
        >
            <LoginPageLayout
                title={title ?? cfg.title}
                description={description ?? cfg.description}
                isDark={isDark}
            />
        </VantaWrapper>
    )
}
