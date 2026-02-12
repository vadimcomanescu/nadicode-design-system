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
    </>
  );
}

export { ComponentsShowcase };
export type { ComponentsShowcaseProps };
