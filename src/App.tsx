import { Typography } from "./components/ui/Typography";
import { Container } from "./components/layout/Grid";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { StyleToggle } from "./components/ui/StyleToggle";
import { Toaster } from "./components/ui/Toaster";
import { Spinner } from "./components/ui/Spinner";
import { useToast } from "./hooks/use-toast";
import { useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { PageTransition } from "./components/ui/PageTransition";
import { AnimatedGradientText } from "./components/ui/text-effects";
import { MouseGlow } from "./components/ui/MouseEffect";

import { PatternsPage } from "./components/pages/PatternsPage";
import { IconsPage } from "./components/pages/IconsPage";

import { Routes, Route, useSearchParams } from "react-router-dom";
const DashboardPage = lazy(() => import("./components/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const LandingPage = lazy(() => import("./components/pages/LandingPage").then(m => ({ default: m.LandingPage })));
const PricingPage = lazy(() => import("./components/pages/PricingPage").then(m => ({ default: m.PricingPage })));
const OnboardingPage = lazy(() => import("./components/pages/OnboardingPage").then(m => ({ default: m.OnboardingPage })));
const VoiceAgentsPage = lazy(() => import("./components/pages/VoiceAgentsPage").then(m => ({ default: m.VoiceAgentsPage })));
const ChangelogPage = lazy(() => import("./components/pages/ChangelogPage").then(m => ({ default: m.ChangelogPage })));
const BlogPostPage = lazy(() => import("./components/pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const LoginBirdsDark = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginBirdsDark })));
const LoginGlobeDark = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginGlobeDark })));
const LoginNetDark = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginNetDark })));
const LoginCellsLight = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginCellsLight })));
const LoginTrunkLight = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginTrunkLight })));
const LoginDotsLight = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginDotsLight })));
const LoginTopologyDark = lazy(() => import("./components/pages/auth/VantaLoginPages").then(m => ({ default: m.LoginTopologyDark })));

import { DialRoot } from "dialkit";
import "dialkit/styles.css";

import { FoundationsShowcase } from "./components/pages/showcase/FoundationsShowcase";
import { ComponentsShowcase } from "./components/pages/showcase/ComponentsShowcase";
import { ChartsShowcase } from "./components/pages/showcase/ChartsShowcase";
import { BlocksShowcase } from "./components/pages/showcase/BlocksShowcase";
import { PagesShowcase } from "./components/pages/showcase/PagesShowcase";

const TAB_REDIRECTS: Record<string, string> = {
  overview: "foundations",
  primitives: "components",
  website: "blocks",
  application: "blocks",
  wizards: "blocks",
};

function DocsPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, _setProgress] = useState(13);

  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") || "foundations";
  const currentTab = TAB_REDIRECTS[rawTab] || rawTab;

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-dvh bg-background text-text-primary py-12 relative overflow-hidden">
      <MouseGlow className="fixed inset-0 z-0 pointer-events-none opacity-70" />
      <Container className="relative z-10">
        <header className="mb-12 flex items-start justify-between">
          <div>
            <Typography variant="h1" className="mb-4">
              <AnimatedGradientText className="text-5xl sm:text-6xl">Nadicode System</AnimatedGradientText>
            </Typography>
            <Typography variant="body" className="text-xl text-text-secondary max-w-2xl">
              A comprehensive design system for AI-integrated web applications.
              Featuring ultra-realistic aesthetics, deep blacks, and high-contrast accessibility.
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <StyleToggle />
            <ThemeToggle />
          </div>
        </header>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <TabsList className="glass mb-8">
            <TabsTrigger value="foundations">Foundations</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="foundations" className="mt-8 space-y-12">
            <FoundationsShowcase progress={progress} />
          </TabsContent>

          <TabsContent value="components" className="space-y-16">
            <ComponentsShowcase toast={toast} date={date} setDate={setDate} progress={progress} />
          </TabsContent>

          <TabsContent value="icons">
            <IconsPage />
          </TabsContent>

          <TabsContent value="charts">
            <ChartsShowcase />
          </TabsContent>

          <TabsContent value="blocks" className="space-y-16">
            <BlocksShowcase />
          </TabsContent>

          <TabsContent value="patterns">
            <PatternsPage />
          </TabsContent>

          <TabsContent value="pages">
            <PagesShowcase />
          </TabsContent>

        </Tabs>

      </Container>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <>
    {import.meta.env.DEV && <DialRoot position="top-right" />}
    <PageTransition>
    <Suspense fallback={<div className="flex items-center justify-center min-h-dvh"><Spinner /></div>}>
    <Routes>
      <Route path="/" element={<DocsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Vanta Login Pages - Dark */}
      <Route path="/login/vanta/birds" element={<LoginBirdsDark />} />
      <Route path="/login/vanta/globe" element={<LoginGlobeDark />} />
      <Route path="/login/vanta/net" element={<LoginNetDark />} />
      <Route path="/login/vanta/topology" element={<LoginTopologyDark />} />

      {/* Vanta Login Pages - Light */}
      <Route path="/login/vanta/cells" element={<LoginCellsLight />} />
      <Route path="/login/vanta/trunk" element={<LoginTrunkLight />} />
      <Route path="/login/vanta/dots" element={<LoginDotsLight />} />

      {/* New Pages */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
      <Route path="/blog/example" element={<BlogPostPage />} />

      {/* Voice Agents */}
      <Route path="/voice-agents" element={<VoiceAgentsPage />} />

      {/* 404 catch-all (must be last) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
    </PageTransition>
    </>
  )
}

export default App
