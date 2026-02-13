'use client'

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Typography } from "../../ui/Typography";
import { Grid } from "../../layout/Grid";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { ScrollFadeIn } from "../../ui/ScrollFadeIn";
import { HeroCentered, HeroSplit } from "../../blocks/HeroBlock";
import { LogoCloud, Testimonials } from "../../blocks/SocialProofBlock";
import { FeatureGrid, FeatureList } from "../../blocks/FeatureBlock";
import { PricingTable } from "../../blocks/PricingBlock";
import { Footer } from "../../blocks/FooterBlock";
import { HeroHeader } from "../../blocks/HeaderBlock";
import { IntegrationsSection as Integrations1 } from "../../blocks/IntegrationsBlock";
import { StatsSection as Stats } from "../../blocks/StatsMarketingBlock";
import { TeamSection as Team } from "../../blocks/TeamBlock";
import { CallToAction } from "../../blocks/CallToActionBlock";
import { NewsletterBlock } from "../../blocks/NewsletterBlock";
import { ContactBlock } from "../../blocks/ContactBlock";
import { FAQBlock } from "../../blocks/FAQBlock";
import { BannerBlock } from "../../blocks/BannerBlock";
import { PasswordRecoveryBlock } from "../../blocks/PasswordRecoveryBlock";
import { ResetPasswordBlock } from "../../blocks/ResetPasswordBlock";
import { AuthSuccessBlock } from "../../blocks/AuthSuccessBlock";
import { CheckIcon } from "../../ui/icons/check";
import { ShieldCheckIcon } from "../../ui/icons/shield-check";
import { TwoFactorChallengeBlock } from "../../blocks/TwoFactorChallengeBlock";
import { AccountLockedBlock } from "../../blocks/AccountLockedBlock";
import { TwoFactorSetupBlock } from "../../blocks/TwoFactorSetupBlock";
import { ChatLayout } from "../../blocks/ChatLayout";
import { CodeBlock } from "../../blocks/CodeBlock";
import { AudioVisualizer } from "../../blocks/AudioVisualizerBlock";
import { DirectoryBlock } from "../../blocks/DirectoryBlock";
import { CreateBlock } from "../../blocks/CreateBlock";
import { StatsGeneric } from "../../blocks/StatsBlock";
import { DataGridBlock } from "../../blocks/DataGridBlock";
import { SettingsLayout } from "../../blocks/SettingsLayout";
import { WizardBlock } from "../../blocks/WizardBlock";
import { ChangelogBlock } from "../../blocks/ChangelogBlock";
import { ComparisonBlock } from "../../blocks/ComparisonBlock";
import { ActivityFeedBlock } from "../../blocks/ActivityFeedBlock";
import { GalleryBlock } from "../../blocks/GalleryBlock";
import { OnboardingBlock } from "../../blocks/OnboardingBlock";
import { VoiceAgentCard } from "../../blocks/VoiceAgentCard";
import { AgentConversationBlock } from "../../blocks/AgentConversationBlock";

const TOC_SECTIONS = [
  { id: "marketing", label: "Marketing", count: 18 },
  { id: "authentication", label: "Authentication", count: 7 },
  { id: "application", label: "Application", count: 13 },
  { id: "ai-voice", label: "AI & Voice", count: 2 },
] as const;

function BlocksTOC({ activeSection }: { activeSection: string }) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Desktop: vertical sidebar */}
      <nav className="hidden md:block border-l border-border pl-4">
        <ul className="space-y-2">
          {TOC_SECTIONS.map(({ id, label, count }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={
                  activeSection === id
                    ? "block text-sm font-medium text-accent border-l-2 border-accent -ml-[calc(1rem+1px)] pl-[calc(1rem-1px)] py-0.5 transition-colors"
                    : "block text-sm text-text-secondary hover:text-text-primary py-0.5 transition-colors"
                }
              >
                {label} ({count})
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: horizontal scrollbar */}
      <nav className="md:hidden flex gap-4 overflow-x-auto pb-2 mb-8 border-b border-border sticky top-16 z-10 bg-background/95 backdrop-blur-sm px-1">
        {TOC_SECTIONS.map(({ id, label, count }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={
              activeSection === id
                ? "text-sm font-medium text-accent border-b-2 border-accent pb-1 whitespace-nowrap transition-colors"
                : "text-sm text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap transition-colors"
            }
          >
            {label} ({count})
          </a>
        ))}
      </nav>
    </>
  );
}

function LazySection({ children, minHeight = 600 }: { children: ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}

function BlocksShowcase() {
  const [activeSection, setActiveSection] = useState("marketing");

  useEffect(() => {
    const headings = document.querySelectorAll("[data-toc-heading]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex gap-8">
      {/* TOC - sticky sidebar, hidden on mobile */}
      <aside className="hidden md:block w-48 shrink-0">
        <div className="sticky top-24">
          <BlocksTOC activeSection={activeSection} />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-16">
        {/* Mobile TOC (desktop uses the aside sidebar) */}
        <div className="md:hidden">
          <BlocksTOC activeSection={activeSection} />
        </div>

        {/* MARKETING */}
        <section id="marketing" data-toc-heading className="space-y-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Marketing</Typography>

              <div className="space-y-4">
                <Typography variant="h3">Marketing Header</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative h-[100px] isolate [transform:translateZ(0)]">
                  <HeroHeader />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Hero (Centered)</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <HeroCentered />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Hero (Split)</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <HeroSplit />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Logo Cloud</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <LogoCloud />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Testimonials (Masonry)</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <Testimonials />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Feature Grid</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <FeatureGrid />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Feature List (Split)</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <FeatureList />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Integrations</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <Integrations1 />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Statistics / KPI</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <Stats />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Team Members</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <Team />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Pricing Table</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <PricingTable />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Call to Action</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <CallToAction />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Footer (Multi-Column)</Typography>
                <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                  <Footer />
                </div>
              </div>

              <ScrollFadeIn>
                <div className="space-y-4">
                  <Typography variant="h3">Newsletter</Typography>
                  <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                    <NewsletterBlock />
                  </div>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn>
                <div className="space-y-4">
                  <Typography variant="h3">Contact</Typography>
                  <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                    <ContactBlock />
                  </div>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn>
                <div className="space-y-4">
                  <Typography variant="h3">FAQ</Typography>
                  <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                    <FAQBlock />
                  </div>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn>
                <div className="space-y-4">
                  <Typography variant="h3">Banner</Typography>
                  <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                    <BannerBlock>New feature: animated components are now available across the design system.</BannerBlock>
                  </div>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn>
                <div className="space-y-4">
                  <Typography variant="h3">Gallery</Typography>
                  <div className="rounded-lg border border-border bg-background overflow-hidden relative">
                    <GalleryBlock />
                  </div>
                </div>
              </ScrollFadeIn>
            </section>

            {/* AUTHENTICATION */}
            <section id="authentication" data-toc-heading className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Authentication</Typography>
              <LazySection minHeight={800}>
                <Grid cols={1} gap="xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Typography variant="h3">Password Recovery</Typography>
                      <PasswordRecoveryBlock mode="reset" />
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">Magic Link</Typography>
                      <PasswordRecoveryBlock mode="magic-link" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Typography variant="h3">Reset Password</Typography>
                      <ResetPasswordBlock />
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">Password Changed</Typography>
                      <AuthSuccessBlock
                        icon={<ShieldCheckIcon size={32} className="text-success" />}
                        title="Password changed!"
                        description="Your password has been successfully updated."
                        buttonText="Continue to login"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Typography variant="h3">Email Verified</Typography>
                      <AuthSuccessBlock
                        icon={<CheckIcon size={32} className="text-success" />}
                        title="Email verified!"
                        description="Your email address has been successfully verified."
                      />
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">2FA Challenge</Typography>
                      <TwoFactorChallengeBlock />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Typography variant="h3">Account Locked</Typography>
                      <AccountLockedBlock reason="too_many_attempts" unlockMinutes={15} />
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">2FA Setup</Typography>
                      <TwoFactorSetupBlock />
                    </div>
                  </div>
                </Grid>
              </LazySection>
            </section>

            {/* APPLICATION */}
            <section id="application" data-toc-heading className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Application</Typography>
              <LazySection minHeight={3000}>
                <Grid cols={1} gap="xl">
                  <div className="space-y-4">
                    <Typography variant="h3">Chat Interface</Typography>
                    <ChatLayout />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Code Block</Typography>
                    <CodeBlock
                      filename="example.js"
                      code={`function greet(name) {
  return "Hello, " + name;
}

console.log(greet("World"));`}
                    />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Audio Visualizer</Typography>
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-12 gap-6">
                        <AudioVisualizer isPlaying={true} />
                        <Button variant="outline">Play Voice Sample</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Directory (Sidebar + Menu)</Typography>
                    <DirectoryBlock />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Create Form (Zod + Validation)</Typography>
                    <CreateBlock />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Stats Generic (KPIs)</Typography>
                    <StatsGeneric />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Data Grid (Advanced)</Typography>
                    <DataGridBlock />
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Settings Layout</Typography>
                    <div className="border border-border rounded-lg overflow-hidden h-[600px]">
                      <SettingsLayout />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Wizard</Typography>
                    <div className="flex justify-center py-12 bg-muted/10 rounded-xl border border-dashed">
                      <WizardBlock />
                    </div>
                  </div>

                  <ScrollFadeIn>
                    <div className="space-y-4">
                      <Typography variant="h3">Changelog</Typography>
                      <ChangelogBlock />
                    </div>
                  </ScrollFadeIn>

                  <ScrollFadeIn>
                    <div className="space-y-4">
                      <Typography variant="h3">Comparison</Typography>
                      <ComparisonBlock />
                    </div>
                  </ScrollFadeIn>

                  <ScrollFadeIn>
                    <div className="space-y-4">
                      <Typography variant="h3">Activity Feed</Typography>
                      <ActivityFeedBlock />
                    </div>
                  </ScrollFadeIn>

                  <ScrollFadeIn>
                    <div className="space-y-4">
                      <Typography variant="h3">Onboarding</Typography>
                      <div className="flex justify-center py-8">
                        <OnboardingBlock />
                      </div>
                    </div>
                  </ScrollFadeIn>
                </Grid>
              </LazySection>
            </section>

            {/* AI & VOICE */}
            <section id="ai-voice" data-toc-heading className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">AI & Voice</Typography>
              <LazySection minHeight={600}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Typography variant="h3">Voice Agent Card</Typography>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
                      <VoiceAgentCard
                        agent={{ id: "atlas", name: "Atlas", role: "Engineering", avatar: "https://picsum.photos/seed/atlas/200/200" }}
                        state="idle"
                        selected={false}
                      />
                      <VoiceAgentCard
                        agent={{ id: "nova", name: "Nova", role: "Design", avatar: "https://picsum.photos/seed/nova/200/200" }}
                        state="speaking"
                        selected={true}
                      />
                      <VoiceAgentCard
                        agent={{ id: "echo", name: "Echo", role: "Support", avatar: "https://picsum.photos/seed/echo/200/200" }}
                        state="listening"
                        selected={true}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Agent Conversation</Typography>
                    <AgentConversationBlock
                      messages={[
                        {
                          id: "1",
                          role: "user",
                          content: "Help me optimize the database queries in the dashboard. The page load is over 3 seconds.",
                          timestamp: "10:30 AM",
                        },
                        {
                          id: "2",
                          role: "agent",
                          content: "I'll investigate the slow queries. Let me read the data access layer first.",
                          timestamp: "10:30 AM",
                          isThinking: true,
                          reasoning: "The user reports 3s+ load times on the dashboard. This likely involves N+1 queries or missing indexes. I should check the data fetching code first.",
                          toolCalls: [
                            {
                              toolName: "read_file",
                              args: { path: "src/lib/dashboard-queries.ts" },
                              status: "complete",
                              result: "Found 3 sequential queries that could be batched into a single JOIN",
                              duration: 280,
                            },
                          ],
                        },
                        {
                          id: "3",
                          role: "system",
                          content: "Agent identified 3 N+1 query patterns",
                        },
                        {
                          id: "4",
                          role: "agent",
                          content: "Found the bottleneck: three sequential queries fetching users, orders, and metrics separately. I've combined them into a single query with JOINs, reducing round trips from 3 to 1. Expected load time improvement: ~60%.",
                          timestamp: "10:31 AM",
                          toolCalls: [
                            {
                              toolName: "edit_file",
                              args: { path: "src/lib/dashboard-queries.ts", description: "Batch N+1 queries into JOIN" },
                              status: "complete",
                              duration: 450,
                            },
                            {
                              toolName: "bash",
                              args: { command: "npm run test -- --filter dashboard" },
                              status: "complete",
                              result: "12 tests passed, 0 failed",
                              duration: 3200,
                            },
                          ],
                        },
                      ]}
                    />
                  </div>
                </div>
              </LazySection>
            </section>
      </div>
    </div>
  );
}

export { BlocksShowcase };
