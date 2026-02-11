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
import { ForgotPasswordBlock } from "../../blocks/ForgotPasswordBlock";
import { MagicLinkBlock } from "../../blocks/MagicLinkBlock";
import { ResetPasswordBlock } from "../../blocks/ResetPasswordBlock";
import { PasswordChangedBlock } from "../../blocks/PasswordChangedBlock";
import { CheckEmailBlock } from "../../blocks/CheckEmailBlock";
import { EmailVerifiedBlock } from "../../blocks/EmailVerifiedBlock";
import { TwoFactorChallengeBlock } from "../../blocks/TwoFactorChallengeBlock";
import { AccountLockedBlock } from "../../blocks/AccountLockedBlock";
import { TwoFactorSetupBlock } from "../../blocks/TwoFactorSetupBlock";
import { ChatLayout } from "../../blocks/ChatLayout";
import { CodeBlock } from "../../blocks/CodeBlock";
import { AudioVisualizer } from "../../blocks/AudioVisualizerBlock";
import { DirectoryBlock } from "../../blocks/DirectoryBlock";
import { CreateBlock } from "../../blocks/CreateBlock";
import { OTPBlock } from "../../blocks/OTPBlock";
import { StatsGeneric } from "../../blocks/StatsBlock";
import { DataGridBlock } from "../../blocks/DataGridBlock";
import { SettingsLayout } from "../../blocks/SettingsLayout";
import { WizardBlock } from "../../blocks/WizardBlock";
import { ChangelogBlock } from "../../blocks/ChangelogBlock";
import { ComparisonBlock } from "../../blocks/ComparisonBlock";
import { ActivityFeedBlock } from "../../blocks/ActivityFeedBlock";
import { StreamingText } from "../../ui/text-effects";
import { AgentStatus } from "../../ui/AgentStatus";
import { AudioWaveform } from "../../ui/AudioWaveform";
import { ConversationThread } from "../../ui/ConversationThread";

function BlocksShowcase() {
  return (
    <>
            {/* MARKETING */}
            <section className="space-y-16">
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
            </section>

            {/* AUTHENTICATION */}
            <section className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Authentication</Typography>
              <Grid cols={1} gap="xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Typography variant="h3">Forgot Password</Typography>
                    <ForgotPasswordBlock />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h3">Magic Link</Typography>
                    <MagicLinkBlock />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Typography variant="h3">Reset Password</Typography>
                    <ResetPasswordBlock />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h3">Password Changed</Typography>
                    <PasswordChangedBlock />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Typography variant="h3">Check Email</Typography>
                    <CheckEmailBlock email="user@example.com" type="verification" />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h3">Email Verified</Typography>
                    <EmailVerifiedBlock />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Typography variant="h3">2FA Challenge</Typography>
                    <TwoFactorChallengeBlock />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h3">Account Locked</Typography>
                    <AccountLockedBlock reason="too_many_attempts" unlockMinutes={15} />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">2FA Setup</Typography>
                  <TwoFactorSetupBlock />
                </div>
              </Grid>
            </section>

            {/* APPLICATION */}
            <section className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Application</Typography>
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
                  <Typography variant="h3">OTP Block</Typography>
                  <OTPBlock />
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
              </Grid>
            </section>

            {/* AI & VOICE */}
            <section className="space-y-8">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">AI & Voice</Typography>

              <div className="space-y-4">
                <Typography variant="h3">Streaming Text</Typography>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <StreamingText
                      text="The agent is analyzing your codebase and generating a comprehensive review of all components, patterns, and potential improvements..."
                      speed={2}
                      interval={25}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Agent Status</Typography>
                <div className="flex flex-wrap gap-4">
                  <AgentStatus status="idle" />
                  <AgentStatus status="thinking" />
                  <AgentStatus status="streaming" />
                  <AgentStatus status="error" />
                  <AgentStatus status="complete" />
                  <AgentStatus status="thinking" label="Processing query..." size="lg" />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Audio Waveform</Typography>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Typography variant="small" className="text-text-secondary">Active (accent)</Typography>
                      <AudioWaveform active variant="accent" bars={32} />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="small" className="text-text-secondary">Inactive</Typography>
                      <AudioWaveform bars={32} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Conversation Thread</Typography>
                <Card>
                  <CardContent className="p-6">
                    <ConversationThread
                      showTimestamps
                      messages={[
                        { id: "1", role: "user", content: "Can you review the token system?", timestamp: "10:24 AM" },
                        { id: "2", role: "assistant", content: "I'll analyze the token architecture. The three-file flow (tokens.config.js -> index.css -> tailwind.config.js) looks solid. Let me check for any violations.", timestamp: "10:24 AM" },
                        { id: "3", role: "system", content: "Agent started code analysis" },
                        { id: "4", role: "assistant", content: "Found 3 hardcoded colors that should use semantic tokens. I'll fix those now.", timestamp: "10:25 AM" },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>
    </>
  );
}

export { BlocksShowcase };
