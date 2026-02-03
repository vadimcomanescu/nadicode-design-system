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
import { Bold, Italic, Underline, Package, Users, Settings } from "lucide-react";
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
import { CodeBlock } from "./components/blocks/CodeBlock";
import { AudioVisualizer } from "./components/blocks/AudioVisualizer";
import { ChatLayout } from "./components/blocks/ChatLayout";
import { ChartBlock } from "./components/charts/ChartBlock";
import { DirectoryBlock } from "./components/blocks/DirectoryBlock";
import { CreateBlock } from "./components/blocks/CreateBlock";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import { OTPBlock } from "./components/blocks/OTPBlock";
import { DashboardBlock } from "./components/blocks/DashboardBlock";
import { Dashboard01Page } from "./components/pages/Dashboard01Page";
import { Dashboard02Page } from "./components/pages/Dashboard02Page";
import { ChartCollectionBlock } from "./components/charts/ChartCollectionBlock";
import { InteractiveAreaChart } from "./components/charts/InteractiveAreaChart";
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

import { MouseGlow } from "./components/ui/MouseEffect";
import { StatsGeneric } from "./components/blocks/StatsGeneric";
import { DataGridBlock } from "./components/blocks/DataGridBlock";
import { AuthLayout } from "./components/blocks/AuthLayout";
import { SettingsLayout } from "./components/blocks/SettingsLayout";
import { DatePickerWithRange } from "./components/ui/DateRangePicker";

function App() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, _setProgress] = useState(13);

  return (
    <div className="min-h-screen bg-background text-text-primary py-12 relative overflow-hidden">
      <MouseGlow className="fixed inset-0 z-0 pointer-events-none opacity-70" />
      <Container className="relative z-10">
        <header className="mb-12 flex items-start justify-between">
          <div>
            <Typography variant="h1" className="mb-4">Nadicode Seed Design</Typography>
            <Typography variant="body" className="text-xl text-text-secondary max-w-2xl">
              A comprehensive design system for AI-integrated web applications.
              Featuring ultra-realistic aesthetics, deep blacks, and high-contrast accessibility.
            </Typography>
          </div>
          <ThemeToggle />
        </header>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="glass mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>

            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="settings">Settings (New)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-12">
            <section>
              <Typography variant="h2" className="mb-6 border-b border-border pb-2">Core Principles</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" className="h-full">
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
                <Card variant="glass" className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">Ultra-Realistic Depth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Moving beyond flat design. We use realistic shadows, borders, and lighting to create a tangible sense of depth and hierarchy, making the UI feel grounded and physical.
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="glass" className="h-full">
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
          </TabsContent>

          <TabsContent value="components" className="space-y-16">
            {/* BUTTONS & BADGES */}
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
              </div>
            </section>

            {/* FORMS */}
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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Date Range (New)</Label>
                      <DatePickerWithRange />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Security Level</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </div>
                <div className="space-y-6">
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
                    <Label>Text Style</Label>
                    <ToggleGroup type="multiple">
                      <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="italic" aria-label="Toggle italic">
                        <Italic className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="underline" aria-label="Toggle underline">
                        <Underline className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </Grid>
            </section>

            {/* OVERLAYS */}
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
            </section>

            {/* DATA DISPLAY */}
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
                  <Card variant="glass">
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
            </section>

            {/* COMPLEX */}
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Complex Components</Typography>
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
                              <Card variant="glass">
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

              <div className="mt-8 border border-border rounded-md">
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
            </section>
          </TabsContent>

          <TabsContent value="blocks">
            <section className="space-y-16">
              <div>
                <Typography variant="h2" className="mb-8 border-b border-border pb-2">Blocks & Layouts</Typography>
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
                    <Card variant="glass">
                      <CardContent className="flex flex-col items-center justify-center p-12 gap-6">
                        <AudioVisualizer isPlaying={true} />
                        <Button variant="outline">Play Voice Sample</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Resizable Layouts</Typography>
                    <div className="h-[400px] border border-border rounded-lg overflow-hidden">
                      <ResizablePanelGroup direction="horizontal">
                        <ResponsivePanel defaultSize={25} minSize={20} mobileBehavior="hide" className="md:hidden lg:flex">
                          <div className="flex h-full flex-col p-4 bg-surface gap-2">
                            <div className="p-2 font-semibold text-text-primary mb-2">My App</div>
                            <Button variant="ghost" className="justify-start w-full">
                              <Users className="mr-2 h-4 w-4" /> Team
                            </Button>
                            <Button variant="ghost" className="justify-start w-full bg-surface-active">
                              <Package className="mr-2 h-4 w-4" /> Projects
                            </Button>
                            <Button variant="ghost" className="justify-start w-full">
                              <Settings className="mr-2 h-4 w-4" /> Settings
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



                  <div className="space-y-8">
                    <Typography variant="h2" className="mb-8 border-b border-border pb-2">High-Level Composition (v4)</Typography>

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
                          <ItemMedia variant="icon"><Users /></ItemMedia>
                          <ItemContent>
                            <ItemTitle>Team Members</ItemTitle>
                            <ItemDescription>Manage your team access.</ItemDescription>
                          </ItemContent>
                          <ItemActions><Button size="sm" variant="outline">View</Button></ItemActions>
                        </Item>
                        <ItemSeparator />
                        <Item variant="default">
                          <ItemMedia variant="icon"><Settings /></ItemMedia>
                          <ItemContent>
                            <ItemTitle>General Settings</ItemTitle>
                            <ItemDescription>Global preferences and configurations.</ItemDescription>
                          </ItemContent>
                          <ItemActions><Button size="sm" variant="outline">Edit</Button></ItemActions>
                        </Item>
                      </ItemGroup>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h2">Additional UI Primitives</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <Typography variant="h4">Date Picker</Typography>
                        <DatePicker />
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
                        <Typography variant="h4">Button Group</Typography>
                        <ButtonGroup>
                          <Button variant="outline">Day</Button>
                          <Button variant="outline">Week</Button>
                          <Button variant="outline">Month</Button>
                        </ButtonGroup>
                      </div>
                      <div className="space-y-4">
                        <Typography variant="h4">Native Select</Typography>
                        <NativeSelect>
                          <option>Selection A</option>
                          <option>Selection B</option>
                        </NativeSelect>
                      </div>
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
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Empty State</Typography>
                    <Empty>
                      <EmptyIcon>
                        <Package className="h-6 w-6" />
                      </EmptyIcon>
                      <EmptyTitle>No projects found</EmptyTitle>
                      <EmptyDescription>You haven't created any projects yet. Get started by creating a new one.</EmptyDescription>
                      <Button>Create Project</Button>
                    </Empty>
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
                    <Typography variant="h3">Dashboard (Complex)</Typography>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <DashboardBlock />
                    </div>
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
                </Grid>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="charts">
            <section className="space-y-16">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Data Visualization & Charts</Typography>
              <Grid cols={1} gap="xl">
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

          <TabsContent value="pages">
            <section className="space-y-16">
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Example Pages</Typography>
              <div className="grid gap-32">
                <div className="space-y-4">
                  <Typography variant="h3">Dashboard Analytics (v1)</Typography>
                  <div className="h-[600px] overflow-hidden rounded-lg shadow-2xl ring-1 ring-border">
                    <Dashboard01Page />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Dashboard Overview (v2)</Typography>
                  <div className="h-[600px] overflow-hidden rounded-lg shadow-2xl ring-1 ring-border">
                    <Dashboard02Page />
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
                  <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-hidden min-h-[600px] flex items-center justify-center bg-zinc-950/50">
                    <LoginPage />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Signup Page</Typography>
                  <div className="rounded-lg shadow-2xl ring-1 ring-border overflow-hidden min-h-[600px] flex items-center justify-center bg-zinc-950/50">
                    <SignupPage />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Auth Layout (Split Glass)</Typography>
                  <div className="min-h-[800px] overflow-hidden rounded-lg shadow-2xl ring-1 ring-border bg-zinc-950/50">
                    <AuthLayout />
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="settings">
            <SettingsLayout />
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
        <Typography variant="small" className="text-text-secondary font-mono">{hex}</Typography>
      </div>
    </div>
  )
}

export default App
