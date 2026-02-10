import { Button } from "./components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/Card";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { Checkbox } from "./components/ui/Checkbox";
import { Switch } from "./components/ui/Switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/Select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/Dialog";
import { Typography } from "./components/ui/Typography";
import { Container, Grid } from "./components/layout/Grid";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { Toaster } from "./components/ui/Toaster";
import { tokens } from "./tokens";
import { Badge } from "./components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/Avatar";
import { Skeleton } from "./components/ui/Skeleton";
import { Textarea } from "./components/ui/Textarea";
import { RadioGroup, RadioGroupItem } from "./components/ui/RadioGroup";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/ToggleGroup";
import { PackageIcon } from "@/components/ui/icons";
import { BoldIcon } from "./components/ui/icons/bold";
import { ItalicIcon } from "./components/ui/icons/italic";
import { UnderlineIcon } from "./components/ui/icons/underline";
import { UsersIcon } from "./components/ui/icons/users";
import { SettingsIcon } from "./components/ui/icons/settings";
import { Slider } from "./components/ui/Slider";
import { Progress } from "./components/ui/Progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/Accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/HoverCard";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/Popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/Tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./components/ui/AlertDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/DropdownMenu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/Sheet";
import { useToast } from "./hooks/use-toast";
import { Calendar } from "./components/ui/Calendar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/Table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/Carousel";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./components/ui/InputOTP";
import { ResizablePanel, ResizablePanelGroup } from "./components/ui/Resizable";
import { ResponsiveHandle, ResponsivePanel } from "./components/ui/Responsive";
import { useState } from "react";
import { ScrollFadeIn } from "./components/ui/ScrollFadeIn";
import { PageTransition } from "./components/ui/PageTransition";
import { TagInput } from "./components/ui/TagInput";
import { TreeView } from "./components/ui/TreeView";
import { FAQBlock } from "./components/blocks/FAQBlock";
import { NewsletterBlock } from "./components/blocks/NewsletterBlock";
import { ContactBlock } from "./components/blocks/ContactBlock";
import { BannerBlock } from "./components/blocks/BannerBlock";
import { ChangelogBlock } from "./components/blocks/ChangelogBlock";
import { ComparisonBlock } from "./components/blocks/ComparisonBlock";
import { ActivityFeedBlock } from "./components/blocks/ActivityFeedBlock";
import { easing, duration } from "./lib/animation.tokens";
import { CodeBlock } from "./components/blocks/CodeBlock";
import { AudioVisualizer } from "./components/blocks/AudioVisualizerBlock";
import { ChatLayout } from "./components/blocks/ChatLayout";
import { ChartBlock } from "./components/blocks/ChartBlock";
import { DirectoryBlock } from "./components/blocks/DirectoryBlock";
import { CreateBlock } from "./components/blocks/CreateBlock";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import { OTPBlock } from "./components/blocks/OTPBlock";

// import { Dashboard01Page } from "./components/pages/Dashboard01Page";
import { DashboardPage } from "./components/pages/DashboardPage";
import { ChartCollectionBlock } from "./components/blocks/ChartCollectionBlock";
import { HeroCentered, HeroSplit } from "./components/blocks/HeroBlock";
import { LogoCloud, Testimonials } from "./components/blocks/SocialProofBlock";
import { FeatureGrid, FeatureList } from "./components/blocks/FeatureBlock";
import { PricingTable } from "./components/blocks/PricingBlock";
import { Footer } from "./components/blocks/FooterBlock";
import { HeroHeader } from "./components/blocks/HeaderBlock";
import SimpleLoginForm from "./components/blocks/LoginSimpleBlock";
import { PatternsPage } from "./components/pages/PatternsPage";
import Integrations1 from "./components/blocks/IntegrationsBlock";
import Stats from "./components/blocks/StatsMarketingBlock";
import Team from "./components/blocks/TeamBlock";
import CallToAction from "./components/blocks/CallToActionBlock";
import { IconsPage } from "./components/pages/IconsPage";
import { WizardBlock } from "./components/blocks/WizardBlock";
import { InteractiveAreaChart } from "./components/blocks/InteractiveAreaChartBlock";
import { Combobox } from "./components/ui/Combobox";
import { DatePicker } from "./components/ui/DatePicker";
import { DataTable } from "./components/ui/DataTable";
import { Empty, EmptyDescription, EmptyIcon, EmptyTitle } from "./components/ui/Empty";
import { NativeSelect } from "./components/ui/NativeSelect";
import { InputGroup, InputGroupAddon } from "./components/ui/InputGroup";
import { ButtonGroup } from "./components/ui/ButtonGroup";
import { Spinner } from "./components/ui/Spinner";
import { Kbd } from "./components/ui/Kbd";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "./components/ui/Field";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "./components/ui/Item";

import { AnimatedGradientText } from "./components/ui/AnimatedGradientText";
import { StreamingText } from "./components/ui/StreamingText";
import { AgentStatus } from "./components/ui/AgentStatus";
import { AudioWaveform } from "./components/ui/AudioWaveform";
import { ConversationThread } from "./components/ui/ConversationThread";
import { NotificationCenter } from "./components/ui/NotificationCenter";
import { FileUpload } from "./components/ui/FileUpload";
import { SearchCommand } from "./components/ui/SearchCommand";
import { FormWizard } from "./components/ui/FormWizard";
import { MouseGlow } from "./components/ui/MouseEffect";
import { StatsGeneric } from "./components/blocks/StatsBlock";
import { DataGridBlock } from "./components/blocks/DataGridBlock";
import { AuthLayout } from "./components/blocks/AuthLayout";
import { AnimatedBackground } from "./components/ui/AnimatedBackground";
import { SettingsLayout } from "./components/blocks/SettingsLayout";
import { DatePickerWithRange } from "./components/ui/DateRangePicker";
import { UsageDonut } from "./components/blocks/UsageDonutBlock";
import { VerificationPage } from "./components/pages/VerificationPage";
// Lint fix: correct import style for ProfilePage/TeamPage
import { ProfilePage } from "./components/pages/settings/ProfilePage";
import { TeamPage } from "./components/pages/settings/TeamPage";

// New pages
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { LandingPage } from "./components/pages/LandingPage";
import { PricingPage } from "./components/pages/PricingPage";
import { OnboardingPage } from "./components/pages/OnboardingPage";
import { VoiceAgentsPage } from "./components/pages/VoiceAgentsPage";
import { ChangelogPage } from "./components/pages/ChangelogPage";
import { BlogPostPage } from "./components/pages/BlogPostPage";



// Router Imports
import { Routes, Route } from "react-router-dom";
import {
  LoginBirdsDark,
  LoginGlobeDark,
  LoginNetDark,
  LoginCellsLight,
  LoginTrunkLight,
  LoginDotsLight,
  LoginTopologyDark
} from "./components/pages/auth/VantaLoginPages";


import { useSearchParams } from "react-router-dom";

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
          <ThemeToggle />
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


            <section>
              <Typography variant="h2" className="mb-6 border-b border-border pb-2">Core Principles</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Synthetic AI Aesthetics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Designed for the next generation of intelligence. Interfaces that feel alive, using deep blacks, subtle glows, and glassmorphism to create a futuristic yet professional environment.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">Ultra-Realistic Depth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Moving beyond flat design. We use realistic shadows, borders, and lighting to create a tangible sense of depth and hierarchy, making the UI feel grounded and physical.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">High-Contrast Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Beauty does not compromise usability. We prioritize strict contrast ratios ensuring that our "dark mode" is legible, crisp, and accessible to everyone.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Typography</Typography>
              <div className="space-y-6">
                <Typography variant="h1">Heading 1 - Ultra Display</Typography>
                <Typography variant="h2">Heading 2 - Section Title</Typography>
                <Typography variant="h3">Heading 3 - Subsection</Typography>
                <Typography variant="h4">Heading 4 - Component Title</Typography>
                <Typography variant="body">
                  Body Text - The quick brown fox jumps over the lazy dog. Design systems are essential for scaling
                  consistency across enterprise, SMB, and consumer applications.
                </Typography>
                <Typography variant="small">Small Text - Metadata and captions.</Typography>
                <Typography variant="muted">Muted Text - Less important information.</Typography>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Colors</Typography>
              <Grid cols={4} gap="md">
                <ColorCard name="Background" hex={tokens.colors.background} className="bg-background border border-border" />
                <ColorCard name="Surface" hex={tokens.colors.surface.DEFAULT} className="bg-surface" />
                <ColorCard name="Surface Active" hex={tokens.colors.surface.active} className="bg-surface-active" />
                <ColorCard name="Border" hex={tokens.colors.border.DEFAULT} className="bg-border" />
                <ColorCard name="Primary" hex={tokens.colors.primary.DEFAULT} className="bg-primary text-primary-foreground" />
                <ColorCard name="Accent" hex={tokens.colors.accent.DEFAULT} className="bg-accent text-white" />
                <ColorCard name="Destructive" hex={tokens.colors.destructive.DEFAULT} className="bg-destructive text-white" />
              </Grid>

              <Typography variant="h3" className="mt-8 mb-4">Data Visualization Palette</Typography>
              <Grid cols={5} gap="md">
                <ColorCard name="Chart 1" hex="#4f46e5" className="bg-[rgb(var(--chart-1))]" />
                <ColorCard name="Chart 2" hex="#0891b2" className="bg-[rgb(var(--chart-2))]" />
                <ColorCard name="Chart 3" hex="#7c3aed" className="bg-[rgb(var(--chart-3))]" />
                <ColorCard name="Chart 4" hex="#65a30d" className="bg-[rgb(var(--chart-4))]" />
                <ColorCard name="Chart 5" hex="#db2777" className="bg-[rgb(var(--chart-5))]" />
              </Grid>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Spacing Scale</Typography>
              <div className="flex flex-wrap items-end gap-4">
                {[
                  { name: "xs (4px)", size: "h-4 w-4" },
                  { name: "sm (8px)", size: "h-8 w-8" },
                  { name: "md (16px)", size: "h-16 w-16" },
                  { name: "lg (24px)", size: "h-24 w-24" },
                  { name: "xl (32px)", size: "h-32 w-32" },
                  { name: "2xl (48px)", size: "h-48 w-20" },
                  { name: "3xl (64px)", size: "h-64 w-20" },
                ].map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-2">
                    <div className={`${s.size} rounded-sm bg-accent/20 border border-accent/40`} />
                    <Typography variant="small" className="text-text-secondary">{s.name}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Shadow Scale</Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-glow", "shadow-glow-accent"].map((shadow) => (
                  <div key={shadow} className={`${shadow} rounded-lg border border-border bg-surface p-6 flex items-center justify-center min-h-[100px]`}>
                    <Typography variant="small" className="text-text-secondary font-mono">{shadow}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Border Radius Scale</Typography>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { name: "sm (4px)", cls: "rounded-sm" },
                  { name: "md (8px)", cls: "rounded-md" },
                  { name: "lg (16px)", cls: "rounded-lg" },
                  { name: "full", cls: "rounded-full" },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div className={`h-20 w-20 ${r.cls} bg-accent/20 border-2 border-accent/60`} />
                    <Typography variant="small" className="text-text-secondary">{r.name}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Z-Index Scale</Typography>
              <div className="relative h-64 w-full max-w-lg">
                {[
                  { name: "base (0)", z: "z-0", offset: "top-0 left-0", color: "bg-accent/10 border-accent/30" },
                  { name: "dropdown (50)", z: "z-[50]", offset: "top-6 left-6", color: "bg-info/10 border-info/30" },
                  { name: "sticky (100)", z: "z-[100]", offset: "top-12 left-12", color: "bg-success/10 border-success/30" },
                  { name: "overlay (200)", z: "z-[200]", offset: "top-18 left-18", color: "bg-warning/10 border-warning/30" },
                  { name: "modal (300)", z: "z-[300]", offset: "top-24 left-24", color: "bg-destructive/10 border-destructive/30" },
                  { name: "toast (500)", z: "z-[500]", offset: "top-30 left-30", color: "bg-primary/10 border-primary/30" },
                ].map((layer) => (
                  <div
                    key={layer.name}
                    className={`absolute ${layer.offset} ${layer.z} ${layer.color} w-48 h-20 rounded-lg border backdrop-blur-sm flex items-center justify-center`}
                  >
                    <Typography variant="small" className="text-text-primary font-mono text-xs">{layer.name}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Animation Tokens</Typography>
              <div className="space-y-8">
                <div>
                  <Typography variant="h3" className="mb-4">Easing Curves</Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(easing).map(([name, value]) => {
                      const nums = value.match(/[\d.]+/g) || ["0","0","1","1"];
                      const [x1, y1, x2, y2] = nums.map(Number);
                      return (
                        <div key={name} className="border border-border rounded-lg p-4 bg-surface space-y-2">
                          <Typography variant="small" className="font-mono text-accent">{name}</Typography>
                          <div className="h-16 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                              <path
                                d={`M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`}
                                fill="none"
                                stroke="rgb(var(--color-accent))"
                                strokeWidth="3"
                              />
                            </svg>
                          </div>
                          <Typography variant="small" className="text-text-tertiary text-xs truncate">{value}</Typography>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Typography variant="h3" className="mb-4">Duration Scale</Typography>
                  <div className="space-y-3">
                    {Object.entries(duration).map(([name, value]) => (
                      <div key={name} className="flex items-center gap-4">
                        <Typography variant="small" className="font-mono w-24 text-text-secondary">{name}</Typography>
                        <div className="flex-1 h-6 bg-surface rounded-full overflow-hidden border border-border">
                          <div
                            className="h-full bg-accent/40 rounded-full"
                            style={{ width: `${(parseInt(value) / 300) * 100}%` }}
                          />
                        </div>
                        <Typography variant="small" className="text-text-tertiary w-12 text-right">{value}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="components" className="space-y-16">
            {/* ACTIONS & INDICATORS */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Actions & Indicators</Typography>
              <div className="space-y-8">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="space-y-4">
                  <Typography variant="h4">Button Group</Typography>
                  <ButtonGroup>
                    <Button variant="outline">Day</Button>
                    <Button variant="outline">Week</Button>
                    <Button variant="outline">Month</Button>
                  </ButtonGroup>
                </div>
                <div className="space-y-4">
                  <Typography variant="h4">Toggle Group</Typography>
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      <BoldIcon size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      <ItalicIcon size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                      <UnderlineIcon size={16} />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </section>
            </ScrollFadeIn>

            {/* DATA ENTRY */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Data Entry</Typography>
              <Grid cols={2} gap="xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea placeholder="Tell us about yourself" />
                  </div>
                  <div className="space-y-2">
                    <Label>One-Time Password</Label>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="space-y-2">
                    <Label>Framework</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h4">Combobox</Typography>
                    <Combobox
                      options={[
                        { label: "Option 1", value: "1" },
                        { label: "Option 2", value: "2" },
                        { label: "Option 3", value: "3" },
                      ]}
                    />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h4">Native Select</Typography>
                    <NativeSelect>
                      <option>Selection A</option>
                      <option>Selection B</option>
                    </NativeSelect>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms-2" />
                      <Label htmlFor="terms-2">Accept terms</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notify" />
                      <Label htmlFor="notify">Enable Notifications</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <RadioGroup defaultValue="compact">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r2" />
                        <Label htmlFor="r2">Compact</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Security Level</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Date Picker</Label>
                    <DatePicker />
                  </div>
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <DatePickerWithRange />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h4">Input Group</Typography>
                    <InputGroup>
                      <InputGroupAddon>https://</InputGroupAddon>
                      <Input placeholder="example.com" className="rounded-none" />
                      <InputGroupAddon>.com</InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h4">File Upload</Typography>
                    <FileUpload
                      helperText="PDF, PNG, JPG up to 10MB"
                      maxSize={10 * 1024 * 1024}
                      files={[
                        { name: "design-tokens.json", size: 4200, type: "application/json" },
                        { name: "screenshot.png", size: 1240000, type: "image/png" },
                      ]}
                    />
                  </div>
                </div>
              </Grid>
            </section>
            </ScrollFadeIn>

            {/* OVERLAYS & FEEDBACK */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Overlays & Feedback</Typography>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>Make changes to your profile here.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4"><Input placeholder="Name" /></div>
                    <DialogFooter><Button>Save</Button></DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive">Alert Dialog</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Sheet>
                  <SheetTrigger asChild><Button variant="secondary">Side Sheet</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sheet Header</SheetTitle>
                      <SheetDescription>Content goes here.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost">Dropdown</Button></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                  <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
                  <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon">?</Button></TooltipTrigger>
                    <TooltipContent><p>Add to library</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  variant="accent"
                  onClick={() => {
                    toast({
                      title: "Scheduled: Catch up",
                      description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                  }}
                >
                  Show Toast
                </Button>
              </div>

              <div className="mt-8 space-y-4">
                <Typography variant="h3">Notification Center</Typography>
                <div className="max-w-sm">
                  <NotificationCenter
                    notifications={[
                      { id: "1", title: "Build succeeded", description: "Production deployment complete", type: "success", read: false, timestamp: "2 min ago" },
                      { id: "2", title: "PR review requested", description: "alice requested your review on #142", type: "info", read: false, timestamp: "15 min ago" },
                      { id: "3", title: "Disk usage warning", description: "Storage at 90% capacity", type: "warning", read: true, timestamp: "1 hour ago" },
                    ]}
                  />
                </div>
              </div>
            </section>
            </ScrollFadeIn>

            {/* DATA DISPLAY */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Data Display</Typography>
              <Grid cols={2} gap="xl">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/nadia.png" />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Typography variant="h4">Nadia</Typography>
                      <Typography variant="muted">@nadia</Typography>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>Yes. It comes with default styles that match the other components' aesthetic.</AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>You have 3 unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </CardContent>
                  </Card>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@nextjs</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@nextjs</h4>
                          <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </Grid>

              <div className="mt-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-border rounded-md p-4 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="border border-border rounded-md p-4 flex items-center justify-center min-h-[400px]">
                    <div className="w-full max-w-[240px]">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <Card>
                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-md">
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Data Table</Typography>
                  <DataTable
                    searchKey="name"
                    columns={[
                      { accessorKey: "name", header: "Name" },
                      { accessorKey: "status", header: "Status" },
                      { accessorKey: "amount", header: "Amount" },
                    ]}
                    data={[
                      { name: "John Doe", status: "Active", amount: "$120" },
                      { name: "Jane Smith", status: "Inactive", amount: "$80" },
                    ]}
                  />
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Empty State</Typography>
                  <Empty>
                    <EmptyIcon>
                      <PackageIcon size={24} />
                    </EmptyIcon>
                    <EmptyTitle>No projects found</EmptyTitle>
                    <EmptyDescription>You haven't created any projects yet. Get started by creating a new one.</EmptyDescription>
                    <Button>Create Project</Button>
                  </Empty>
                </div>
              </div>
            </section>
            </ScrollFadeIn>

            {/* COMPOSITION & LAYOUT */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Composition & Layout</Typography>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Typography variant="h3">Fields & Groups</Typography>
                  <FieldSet>
                    <FieldLegend>Account Settings</FieldLegend>
                    <FieldGroup>
                      <Field orientation="horizontal">
                        <FieldLabel>Display Name</FieldLabel>
                        <Input placeholder="Evil Rabbit" />
                      </Field>
                      <Field orientation="horizontal">
                        <FieldLabel>Email Address</FieldLabel>
                        <FieldContent>
                          <Input placeholder="rabbit@evil.com" />
                          <FieldDescription>We'll never share your email.</FieldDescription>
                        </FieldContent>
                      </Field>
                      <FieldSeparator>Security</FieldSeparator>
                      <Field orientation="horizontal">
                        <FieldLabel>Two-Factor Auth</FieldLabel>
                        <Switch />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Items & Lists</Typography>
                  <ItemGroup className="max-w-md border border-border rounded-lg p-2 bg-surface">
                    <Item variant="outline">
                      <ItemMedia variant="icon"><UsersIcon /></ItemMedia>
                      <ItemContent>
                        <ItemTitle>Team Members</ItemTitle>
                        <ItemDescription>Manage your team access.</ItemDescription>
                      </ItemContent>
                      <ItemActions><Button size="sm" variant="outline">View</Button></ItemActions>
                    </Item>
                    <ItemSeparator />
                    <Item variant="default">
                      <ItemMedia variant="icon"><SettingsIcon /></ItemMedia>
                      <ItemContent>
                        <ItemTitle>General Settings</ItemTitle>
                        <ItemDescription>Global preferences and configurations.</ItemDescription>
                      </ItemContent>
                      <ItemActions><Button size="sm" variant="outline">Edit</Button></ItemActions>
                    </Item>
                  </ItemGroup>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Resizable Panels</Typography>
                  <div className="h-[400px] border border-border rounded-lg overflow-hidden">
                    <ResizablePanelGroup direction="horizontal">
                      <ResponsivePanel defaultSize={25} minSize={20} mobileBehavior="hide" className="md:hidden lg:flex">
                        <div className="flex h-full flex-col p-4 bg-surface gap-2">
                          <div className="p-2 font-semibold text-text-primary mb-2">My App</div>
                          <Button variant="ghost" className="justify-start w-full">
                            <UsersIcon size={16} className="mr-2" /> Team
                          </Button>
                          <Button variant="ghost" className="justify-start w-full bg-surface-active">
                            <PackageIcon size={16} className="mr-2" /> Projects
                          </Button>
                          <Button variant="ghost" className="justify-start w-full">
                            <SettingsIcon size={16} className="mr-2" /> Settings
                          </Button>
                        </div>
                      </ResponsivePanel>
                      <ResponsiveHandle withHandle mobileBehavior="hide" className="md:hidden lg:flex" />
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6 bg-background">
                          <div className="text-center space-y-2">
                            <Typography variant="h4">Project Dashboard</Typography>
                            <Typography variant="muted">Select an item from the sidebar to view details.</Typography>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Form Wizard</Typography>
                  <FormWizard
                    variant="card"
                    steps={[
                      {
                        id: "account",
                        title: "Account",
                        description: "Basic info",
                        content: (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                              <Label>Password</Label>
                              <Input type="password" placeholder="Create a password" />
                            </div>
                          </div>
                        ),
                      },
                      {
                        id: "profile",
                        title: "Profile",
                        description: "Your details",
                        content: (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Display Name</Label>
                              <Input placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label>Bio</Label>
                              <Textarea placeholder="Tell us about yourself" />
                            </div>
                          </div>
                        ),
                      },
                      {
                        id: "review",
                        title: "Review",
                        content: (
                          <div className="text-center py-8 space-y-2">
                            <Typography variant="h4">All set!</Typography>
                            <Typography variant="muted">Review your details and click Complete.</Typography>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </section>
            </ScrollFadeIn>

            {/* UTILITY */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Utility</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <Typography variant="h4">Keyboard Shortcut</Typography>
                  <div className="flex gap-2 items-center">
                    <span>Press</span>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <span>to search</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Typography variant="h4">Spinner</Typography>
                  <Spinner className="text-accent" />
                </div>
                <div className="space-y-4">
                  <Typography variant="h4">Search Command</Typography>
                  <SearchCommand
                    value="dash"
                    results={[
                      { id: "1", title: "Dashboard", description: "Main analytics view", category: "Pages" },
                      { id: "2", title: "DashboardPage.tsx", description: "src/components/pages/", category: "Files" },
                      { id: "3", title: "DataGridBlock", description: "Advanced data table", category: "Components" },
                    ]}
                  />
                </div>
              </div>
            </section>
            </ScrollFadeIn>

            {/* SPECIALIZED INPUTS */}
            <ScrollFadeIn>
              <section>
                <Typography variant="h2" className="mb-8 border-b border-border pb-2">Specialized Inputs</Typography>
                <Grid cols={2} gap="xl">
                  <div className="space-y-4">
                    <Typography variant="h3">Tag Input</Typography>
                    <TagInput tags={["react", "typescript"]} onTagsChange={() => {}} placeholder="Add tags..." />
                  </div>
                  <div className="space-y-4">
                    <Typography variant="h3">Tree View</Typography>
                    <div className="border border-border rounded-lg p-4 bg-surface max-w-sm">
                      <TreeView
                        data={[
                          {
                            id: "src",
                            label: "src",
                            children: [
                              {
                                id: "components",
                                label: "components",
                                children: [
                                  { id: "ui", label: "ui", children: [
                                    { id: "button", label: "Button.tsx" },
                                    { id: "card", label: "Card.tsx" },
                                    { id: "input", label: "Input.tsx" },
                                  ]},
                                  { id: "blocks", label: "blocks", children: [
                                    { id: "hero", label: "HeroBlock.tsx" },
                                    { id: "faq", label: "FAQBlock.tsx" },
                                  ]},
                                ],
                              },
                              { id: "lib", label: "lib", children: [
                                { id: "utils", label: "utils.ts" },
                                { id: "tokens", label: "tokens.config.js" },
                              ]},
                              { id: "app", label: "App.tsx" },
                            ],
                          },
                        ]}
                      />
                    </div>
                  </div>
                </Grid>
              </section>
            </ScrollFadeIn>
          </TabsContent>

          <TabsContent value="icons">
            <IconsPage />
          </TabsContent>

          <TabsContent value="charts">
            <section className="space-y-16">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Data Visualization & Charts</Typography>
              <Grid cols={1} gap="xl">
                <div className="space-y-4">
                  <Typography variant="h3">Usage Donut</Typography>
                  <UsageDonut />
                </div>
                <div className="space-y-4">
                  <Typography variant="h3">Single Chart</Typography>
                  <ChartBlock />
                </div>
                <div className="space-y-4">
                  <Typography variant="h3">Interactive Area Chart</Typography>
                  <InteractiveAreaChart />
                </div>
                <div className="space-y-4">
                  <Typography variant="h3">Charts Collection</Typography>
                  <ChartCollectionBlock />
                </div>
              </Grid>
            </section>
          </TabsContent>



          <TabsContent value="blocks" className="space-y-16">
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
          </TabsContent>

          <TabsContent value="patterns">
            <PatternsPage />
          </TabsContent>

          <TabsContent value="pages">
            <section className="space-y-16">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Example Pages</Typography>
              <div className="grid gap-32">

                {/* Vanta Pages Section */}
                <div className="space-y-4">
                  <Typography variant="h3">Vanta.js Login Pages</Typography>
                  <Typography variant="muted"> immersive 3D backgrounds with branding colors.</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/birds'}>
                      <CardHeader><CardTitle className="text-lg">Birds (Dark)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Flocking simulation with Cyan/Indigo gradient.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/globe'}>
                      <CardHeader><CardTitle className="text-lg">Globe (Dark)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Connected world with Pink accents.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/net'}>
                      <CardHeader><CardTitle className="text-lg">Net (Dark)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Neural network mesh topology.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/topology'}>
                      <CardHeader><CardTitle className="text-lg">Topology (Dark)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Complex structural mapping.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/cells'}>
                      <CardHeader><CardTitle className="text-lg">Cells (Light)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Organic diffusion pattern.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/trunk'}>
                      <CardHeader><CardTitle className="text-lg">Trunk (Light)</CardTitle></CardHeader>
                      <CardContent><Typography variant="small" className="text-text-secondary">Chaotic growth algorithm.</Typography></CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/login/vanta/dots'}>
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
                    onClick={() => window.location.href = '/dashboard'}
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
                  <Typography variant="h3">Login Page</Typography>
                  <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-y-auto min-h-[600px] max-h-[800px] flex items-center justify-center bg-background/50">
                    <LoginPage />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Signup Page</Typography>
                  <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-y-auto min-h-[600px] max-h-[800px] flex items-center justify-center bg-background/50">
                    <SignupPage />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Simple Login Form (Alternative)</Typography>
                  <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-y-auto min-h-[600px] max-h-[800px] flex items-center justify-center relative">
                    <div className="absolute inset-0 z-0">
                      <AnimatedBackground />
                    </div>
                    <div className="relative z-10 w-full">
                      <SimpleLoginForm />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Auth Layout (Split Glass)</Typography>
                  <div className="h-[800px] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-border bg-background/50">
                    <AuthLayout />
                  </div>
                </div>

                <ScrollFadeIn>
                  <div className="space-y-4">
                    <Typography variant="h3">New Pages</Typography>
                    <Typography variant="muted">Additional page templates for common application views.</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/landing'}>
                        <CardHeader><CardTitle className="text-lg">Landing Page</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Marketing landing with hero, features, and CTA sections.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/pricing'}>
                        <CardHeader><CardTitle className="text-lg">Pricing Page</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Tiered pricing with feature comparison and toggle.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/onboarding'}>
                        <CardHeader><CardTitle className="text-lg">Onboarding Page</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Multi-step onboarding flow for new users.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/changelog'}>
                        <CardHeader><CardTitle className="text-lg">Changelog Page</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Version history with timeline and release notes.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/blog/example'}>
                        <CardHeader><CardTitle className="text-lg">Blog Post Page</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Rich article layout with typography and media.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/not-a-page'}>
                        <CardHeader><CardTitle className="text-lg">404 Not Found</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Custom error page with navigation back.</Typography></CardContent>
                      </Card>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/voice-agents'}>
                        <CardHeader><CardTitle className="text-lg">Voice Agents</CardTitle></CardHeader>
                        <CardContent><Typography variant="small" className="text-text-secondary">Interactive AI voice agents with 3D animated avatars.</Typography></CardContent>
                      </Card>
                    </div>
                  </div>
                </ScrollFadeIn>
              </div>
            </section>
          </TabsContent>

        </Tabs>

      </Container>
      <Toaster />
    </div>
  )
}

function ColorCard({ name, hex, className }: { name: string, hex: string, className?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className={`h-24 w-full ${className}`}></div>
      <div className="p-3 bg-surface flex items-center justify-between">
        <Typography variant="small" className="font-semibold text-text-primary">{name}</Typography>
        <Typography variant="small" className="text-text-secondary font-sans">{hex}</Typography>
      </div>
    </div>
  )
}

function App() {
  return (
    <PageTransition>
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
    </PageTransition>
  )
}

export default App
