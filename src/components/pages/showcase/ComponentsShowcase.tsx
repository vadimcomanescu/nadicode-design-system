'use client'

import { Button } from "../../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Checkbox } from "../../ui/Checkbox";
import { Switch } from "../../ui/Switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/Select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/Dialog";
import { Typography } from "../../ui/Typography";
import { Grid } from "../../layout/Grid";
import { Badge } from "../../ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/Avatar";
import { Skeleton } from "../../ui/Skeleton";
import { Textarea } from "../../ui/Textarea";
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup";
import { ToggleGroup, ToggleGroupItem } from "../../ui/ToggleGroup";
import { BoldIcon } from "../../ui/icons/bold";
import { ItalicIcon } from "../../ui/icons/italic";
import { UnderlineIcon } from "../../ui/icons/underline";
import { UsersIcon } from "../../ui/icons/users";
import { SettingsIcon } from "../../ui/icons/settings";
import { PackageIcon } from "@/components/ui/icons";
import { Slider } from "../../ui/Slider";
import { Progress } from "../../ui/Progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/Accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/HoverCard";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/Tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/Sheet";
import { Calendar } from "../../ui/Calendar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/Carousel";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/InputOTP";
import { ResizablePanel, ResizablePanelGroup } from "../../ui/Resizable";
import { ResponsiveHandle, ResponsivePanel } from "../../ui/Responsive";
import { ScrollFadeIn } from "../../ui/ScrollFadeIn";
import { TagInput } from "../../ui/TagInput";
import { TreeView } from "../../ui/TreeView";
import { Combobox } from "../../ui/Combobox";
import { DatePicker } from "../../ui/DatePicker";
import { DataTable } from "../../ui/DataTable";
import { Empty, EmptyDescription, EmptyIcon, EmptyTitle } from "../../ui/Empty";
import { NativeSelect } from "../../ui/NativeSelect";
import { InputGroup, InputGroupAddon } from "../../ui/InputGroup";
import { ButtonGroup } from "../../ui/ButtonGroup";
import { Spinner } from "../../ui/Spinner";
import { Kbd } from "../../ui/Kbd";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldLegend } from "../../ui/Field";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "../../ui/Item";
import { NotificationCenter } from "../../ui/NotificationCenter";
import { FileUpload } from "../../ui/FileUpload";
import { SearchCommand } from "../../ui/SearchCommand";
import { FormWizard } from "../../ui/FormWizard";
import { DatePickerWithRange } from "../../ui/DateRangePicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/Tabs";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../../ui/Breadcrumb";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../../ui/NavigationMenu";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "../../ui/Menubar";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "../../ui/ContextMenu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../ui/Pagination";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "../../ui/Drawer";
import { PasswordInput } from "../../ui/PasswordInput";
import { Alert, AlertTitle, AlertDescription } from "../../ui/Alert";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../../ui/Collapsible";
import { ScrollArea } from "../../ui/ScrollArea";
import { Separator } from "../../ui/Separator";
import { Timeline } from "../../ui/Timeline";
import { PromoCard } from "../../ui/PromoCard";
import { AnimatedBackground } from "../../ui/AnimatedBackground";
import { PixelBackground } from "../../ui/PixelBackground";
import { ProgressiveBlur } from "../../ui/ProgressiveBlur";
import { TiltCard } from "../../ui/TiltCard";
import { MovingBorder } from "../../ui/MovingBorder";
import { MagneticElement } from "../../ui/MagneticElement";
import { FloatingDock } from "../../ui/FloatingDock";
import { BentoGrid } from "../../ui/BentoGrid";
import { InfiniteSlider } from "../../ui/InfiniteSlider";
import { StaggerChildren } from "../../ui/StaggerChildren";
import { StaggeredEntrance } from "../../ui/StaggeredEntrance";
import { HomeIcon } from "../../ui/icons/home";
import { GlobeIcon } from "../../ui/icons/globe";
import { MailIcon } from "../../ui/icons/mail";
import { RocketIcon } from "../../ui/icons/rocket";
import { TerminalIcon } from "../../ui/icons/terminal";
import { SearchIcon } from "../../ui/icons/search";
import { StarIcon } from "../../ui/icons/star";
import { ZapIcon } from "../../ui/icons/zap";
import { InfoIcon } from "../../ui/icons/info";
import { AlertTriangleIcon } from "../../ui/icons/alert-triangle";
import { CheckIcon } from "../../ui/icons/check";
import { SparklesIcon } from "../../ui/icons/sparkles";
import { ChevronDownIcon } from "../../ui/icons/chevron-down";
import { DatabaseIcon } from "../../ui/icons/database";
import { LayersIcon } from "../../ui/icons/layers";

const FLOATING_DOCK_ITEMS = [
  { icon: <HomeIcon size={20} />, label: "Home" },
  { icon: <GlobeIcon size={20} />, label: "Browse" },
  { icon: <MailIcon size={20} />, label: "Mail" },
  { icon: <TerminalIcon size={20} />, label: "Terminal" },
  { icon: <RocketIcon size={20} />, label: "Deploy" },
  { icon: <SearchIcon size={20} />, label: "Search" },
];

const BENTO_ITEMS = [
  { title: "Analytics", description: "Real-time metrics and insights for your application.", className: "md:col-span-2", icon: <StarIcon size={20} /> },
  { title: "Database", description: "Managed PostgreSQL with automatic backups.", className: "", icon: <DatabaseIcon size={20} /> },
  { title: "Edge Functions", description: "Deploy serverless functions globally.", className: "", icon: <ZapIcon size={20} /> },
  { title: "Storage", description: "Object storage with CDN distribution.", className: "", icon: <LayersIcon size={20} /> },
  { title: "Authentication", description: "Full auth system with social providers and MFA.", className: "md:col-span-2", icon: <SparklesIcon size={20} /> },
];

const TIMELINE_ITEMS = [
  { title: "Project created", description: "Repository initialized with design system scaffolding.", timestamp: "Jan 15" },
  { title: "Core primitives shipped", description: "Button, Input, Card, and 20+ base components released.", timestamp: "Feb 3" },
  { title: "Dark mode support", description: "Full theme system with CSS variables and automatic switching.", timestamp: "Mar 12" },
  { title: "v1.0 released", description: "Public release with 96 components, 35 blocks, and full documentation.", timestamp: "Apr 1" },
];

const SCROLL_AREA_TAGS = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const INFINITE_SLIDER_WORDS = ["React", "TypeScript", "Tailwind", "Radix", "Next.js", "Vitest", "Motion"];

const STAGGER_ITEMS = ["Design Tokens", "Components", "Blocks", "Pages"];

interface ComponentsShowcaseProps {
  toast: (opts: { title: string; description: string }) => void;
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  progress: number;
}

function ComponentsShowcase({ toast, date, setDate, progress }: ComponentsShowcaseProps) {
  return (
    <>
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

            {/* NAVIGATION */}
            <ScrollFadeIn>
            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Navigation</Typography>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Typography variant="h4">Tabs</Typography>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <Card><CardContent className="pt-6"><Typography variant="muted">Overview content goes here.</Typography></CardContent></Card>
                    </TabsContent>
                    <TabsContent value="analytics">
                      <Card><CardContent className="pt-6"><Typography variant="muted">Analytics dashboard.</Typography></CardContent></Card>
                    </TabsContent>
                    <TabsContent value="reports">
                      <Card><CardContent className="pt-6"><Typography variant="muted">Generated reports.</Typography></CardContent></Card>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4">Breadcrumb</Typography>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4">Navigation Menu</Typography>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Projects</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Settings</NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4">Menubar</Typography>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>New Tab</MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarItem>Print</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Zoom In</MenubarItem>
                        <MenubarItem>Zoom Out</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Fullscreen</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4">Context Menu</Typography>
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[120px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-text-secondary">
                      Right-click here
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Back</ContextMenuItem>
                      <ContextMenuItem>Forward</ContextMenuItem>
                      <ContextMenuItem>Reload</ContextMenuItem>
                      <ContextMenuItem>View Source</ContextMenuItem>
                      <ContextMenuItem>Inspect</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4">Pagination</Typography>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
                  <Slider label="Security Level" defaultValue={50} max={100} step={1} />
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
                  <div className="space-y-4">
                    <Typography variant="h4">Password Input</Typography>
                    <PasswordInput placeholder="Enter your password" />
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

                <Drawer>
                  <DrawerTrigger asChild><Button variant="outline">Drawer</Button></DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Move to project</DrawerTitle>
                      <DrawerDescription>Select a destination for your files.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <Typography variant="muted">Drawer body content goes here.</Typography>
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

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
                      <AccordionContent>Yes. It comes with default styles that match the other components&apos; aesthetic.</AccordionContent>
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
                    <EmptyDescription>You haven&apos;t created any projects yet. Get started by creating a new one.</EmptyDescription>
                    <Button>Create Project</Button>
                  </Empty>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Alert</Typography>
                  <div className="space-y-3">
                    <Alert variant="success">
                      <CheckIcon size={16} />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                      <AlertTriangleIcon size={16} />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>Your trial expires in 3 days.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <InfoIcon size={16} />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Failed to deploy. Check build logs for details.</AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Collapsible</Typography>
                  <Collapsible className="w-full max-w-sm border border-border rounded-lg">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between">
                        Advanced Settings
                        <ChevronDownIcon size={16} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 space-y-2">
                      <div className="rounded-md border border-border px-4 py-3 text-sm text-text-secondary">
                        Enable experimental features
                      </div>
                      <div className="rounded-md border border-border px-4 py-3 text-sm text-text-secondary">
                        Debug mode output
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <Grid cols={2} gap="xl">
                  <div className="space-y-4">
                    <Typography variant="h3">Scroll Area</Typography>
                    <ScrollArea className="h-[200px] w-full rounded-md border border-border p-4">
                      <div className="space-y-2">
                        {SCROLL_AREA_TAGS.map((item) => (
                          <div key={item} className="text-sm text-text-secondary py-1 border-b border-border last:border-0">
                            {item}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Separator</Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography variant="h4">Horizontal</Typography>
                        <Separator className="my-4" />
                        <Typography variant="muted">Content below the separator.</Typography>
                      </div>
                      <div className="flex h-5 items-center space-x-4 text-sm">
                        <span>Blog</span>
                        <Separator orientation="vertical" />
                        <span>Docs</span>
                        <Separator orientation="vertical" />
                        <span>Source</span>
                      </div>
                    </div>
                  </div>
                </Grid>

                <div className="space-y-4">
                  <Typography variant="h3">Timeline</Typography>
                  <div className="max-w-lg">
                    <Timeline items={TIMELINE_ITEMS} />
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Promo Card</Typography>
                  <div className="max-w-xs">
                    <PromoCard
                      title="Upgrade to Pro"
                      description="Unlock all features and get unlimited access to the design system."
                      actionLabel="Upgrade Now"
                    />
                  </div>
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
                          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
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
                    <ResizablePanelGroup orientation="horizontal">
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
                    <Kbd>&#x2318;</Kbd>
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

            {/* EFFECTS & ANIMATION */}
            <ScrollFadeIn>
              <section>
                <Typography variant="h2" className="mb-8 border-b border-border pb-2">Effects & Animation</Typography>
                <div className="space-y-8">
                  <Grid cols={2} gap="xl">
                    <div className="space-y-4">
                      <Typography variant="h3">Animated Background</Typography>
                      <div className="relative h-[200px] rounded-lg border border-border overflow-hidden">
                        <AnimatedBackground />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Typography variant="h4" className="text-text-primary z-10">Living Canvas</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">Pixel Background</Typography>
                      <div className="relative h-[200px] rounded-lg border border-border overflow-hidden bg-background">
                        <PixelBackground theme="cyber" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Typography variant="h4" className="text-text-primary z-10">Pixel Grid</Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <div className="space-y-4">
                    <Typography variant="h3">Progressive Blur</Typography>
                    <div className="relative h-[160px] rounded-lg border border-border overflow-hidden">
                      <div className="flex items-center justify-center h-full gap-4 px-8">
                        {INFINITE_SLIDER_WORDS.map((w) => (
                          <Badge key={w} variant="secondary" className="text-sm">{w}</Badge>
                        ))}
                      </div>
                      <ProgressiveBlur className="inset-y-0 left-0 w-24" direction="right" blurIntensity={2} />
                      <ProgressiveBlur className="inset-y-0 right-0 w-24" direction="left" blurIntensity={2} />
                    </div>
                  </div>

                  <Grid cols={2} gap="xl">
                    <div className="space-y-4">
                      <Typography variant="h3">Tilt Card</Typography>
                      <TiltCard>
                        <Card className="glass-panel">
                          <CardHeader>
                            <CardTitle>Hover to Tilt</CardTitle>
                            <CardDescription>Move your mouse across this card to see the 3D tilt effect.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Typography variant="muted">Perspective-based interaction with spring physics.</Typography>
                          </CardContent>
                        </Card>
                      </TiltCard>
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">Moving Border</Typography>
                      <MovingBorder>
                        <div className="p-6 space-y-2">
                          <Typography variant="h4">Animated Border</Typography>
                          <Typography variant="muted">A conic gradient spins around the border using CSS animation.</Typography>
                        </div>
                      </MovingBorder>
                    </div>
                  </Grid>

                  <div className="space-y-4">
                    <Typography variant="h3">Magnetic Element</Typography>
                    <div className="flex gap-4 items-center justify-center py-8">
                      <MagneticElement>
                        <Button variant="accent" size="lg">Pull Me</Button>
                      </MagneticElement>
                      <MagneticElement strength={0.5}>
                        <Button variant="outline" size="lg">Stronger Pull</Button>
                      </MagneticElement>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Floating Dock</Typography>
                    <div className="flex items-end justify-center py-8">
                      <FloatingDock items={FLOATING_DOCK_ITEMS} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Bento Grid</Typography>
                    <BentoGrid columns={3}>
                      {BENTO_ITEMS.map((item) => (
                        <Card key={item.title} className={`glass-panel ${item.className}`}>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <CardTitle className="text-base">{item.title}</CardTitle>
                            </div>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </BentoGrid>
                  </div>

                  <div className="space-y-4">
                    <Typography variant="h3">Infinite Slider</Typography>
                    <div className="border border-border rounded-lg overflow-hidden py-2">
                      <InfiniteSlider speed={30} gap={16}>
                        {INFINITE_SLIDER_WORDS.map((word) => (
                          <Badge key={word} variant="outline" className="text-sm whitespace-nowrap">{word}</Badge>
                        ))}
                      </InfiniteSlider>
                    </div>
                  </div>

                  <Grid cols={2} gap="xl">
                    <div className="space-y-4">
                      <Typography variant="h3">Stagger Children</Typography>
                      <StaggerChildren staggerMs={100} direction="up">
                        {STAGGER_ITEMS.map((item) => (
                          <div key={item} className="rounded-md border border-border px-4 py-3 mb-2 text-sm text-text-primary bg-surface">
                            {item}
                          </div>
                        ))}
                      </StaggerChildren>
                    </div>
                    <div className="space-y-4">
                      <Typography variant="h3">Staggered Entrance</Typography>
                      <StaggeredEntrance delayMs={80}>
                        {STAGGER_ITEMS.map((item) => (
                          <div key={item} className="rounded-md border border-border px-4 py-3 mb-2 text-sm text-text-primary bg-surface">
                            {item}
                          </div>
                        ))}
                      </StaggeredEntrance>
                    </div>
                  </Grid>
                </div>
              </section>
            </ScrollFadeIn>
    </>
  );
}

export { ComponentsShowcase };
export type { ComponentsShowcaseProps };
