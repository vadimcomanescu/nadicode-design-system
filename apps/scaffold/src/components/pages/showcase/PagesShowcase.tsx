'use client'

import { useRouter } from "next/navigation";
import { Typography } from "../../ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { ScrollFadeIn } from "../../ui/ScrollFadeIn";
import { DashboardPage } from "../DashboardPage";
import { VerificationPage } from "../VerificationPage";
import { ProfilePage } from "../settings/ProfilePage";
import { TeamPage } from "../settings/TeamPage";
import { CheckoutPage } from "../CheckoutPage";
import { AuthLayout } from "../../blocks/AuthLayout";

function PagesShowcase() {
  const router = useRouter();
  return (
    <section className="space-y-16">
      <Typography variant="h2" className="mb-8 border-b border-border pb-2">Example Pages</Typography>
      <div className="grid gap-32">

        {/* Vanta Pages Section */}
        <div className="space-y-4">
          <Typography variant="h3">Vanta.js Login Pages</Typography>
          <Typography variant="muted"> immersive 3D backgrounds with branding colors.</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/birds")}>
              <CardHeader><CardTitle className="text-lg">Birds (Dark)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Flocking simulation with Cyan/Indigo gradient.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/globe")}>
              <CardHeader><CardTitle className="text-lg">Globe (Dark)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Connected world with Pink accents.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/net")}>
              <CardHeader><CardTitle className="text-lg">Net (Dark)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Neural network mesh topology.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/topology")}>
              <CardHeader><CardTitle className="text-lg">Topology (Dark)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Complex structural mapping.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/cells")}>
              <CardHeader><CardTitle className="text-lg">Cells (Light)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Organic diffusion pattern.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/trunk")}>
              <CardHeader><CardTitle className="text-lg">Trunk (Light)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Chaotic growth algorithm.</Typography></CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/login/vanta/dots")}>
              <CardHeader><CardTitle className="text-lg">Dots (Light)</CardTitle></CardHeader>
              <CardContent><Typography variant="small" className="text-text-secondary">Grid of connected points.</Typography></CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Unified Dashboard</Typography>
          <Typography variant="muted">The new consolidated dashboard view.</Typography>
          <div
            className="h-[600px] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-border isolate [transform:translateZ(0)] cursor-pointer hover:ring-primary/50 transition-all"
            onClick={() => router.push("/dashboard")}
          >
            <div className="pointer-events-none">
              <DashboardPage />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Verification Page</Typography>
          <div className="h-[600px] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-border bg-background">
            <VerificationPage />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Profile Settings</Typography>
          <div className="h-[600px] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-border bg-background">
            <ProfilePage />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Team Settings</Typography>
          <div className="h-[600px] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-border bg-background">
            <TeamPage />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Checkout Page (Stripe)</Typography>
          <div className="h-[600px] overflow-auto rounded-lg shadow-2xl ring-1 ring-border">
            <CheckoutPage />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Auth Layout (Login)</Typography>
          <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-y-auto min-h-[600px] max-h-[800px] flex items-center justify-center bg-background/50">
            <AuthLayout mode="login" />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Auth Layout (Signup)</Typography>
          <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-y-auto min-h-[600px] max-h-[800px] flex items-center justify-center bg-background/50">
            <AuthLayout mode="signup" />
          </div>
        </div>

        <ScrollFadeIn>
          <div className="space-y-4">
            <Typography variant="h3">New Pages</Typography>
            <Typography variant="muted">Additional page templates for common application views.</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/landing")}>
                <CardHeader><CardTitle className="text-lg">Landing Page</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Marketing landing with hero, features, and CTA sections.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/pricing")}>
                <CardHeader><CardTitle className="text-lg">Pricing Page</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Tiered pricing with feature comparison and toggle.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/onboarding")}>
                <CardHeader><CardTitle className="text-lg">Onboarding Page</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Multi-step onboarding flow for new users.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/changelog")}>
                <CardHeader><CardTitle className="text-lg">Changelog Page</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Version history with timeline and release notes.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/blog/example")}>
                <CardHeader><CardTitle className="text-lg">Blog Post Page</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Rich article layout with typography and media.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/not-a-page")}>
                <CardHeader><CardTitle className="text-lg">404 Not Found</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Custom error page with navigation back.</Typography></CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/voice-agents")}>
                <CardHeader><CardTitle className="text-lg">Voice Agents</CardTitle></CardHeader>
                <CardContent><Typography variant="small" className="text-text-secondary">Interactive AI voice agents with 3D animated avatars.</Typography></CardContent>
              </Card>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

export { PagesShowcase };
