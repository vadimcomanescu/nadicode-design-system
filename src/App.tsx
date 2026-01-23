import { Button } from "./components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/Card";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import { Checkbox } from "./components/ui/Checkbox";
import { Switch } from "./components/ui/Switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/Select";
import { Separator } from "./components/ui/Separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/Dialog";
import { Typography } from "./components/ui/Typography";
import { Container, Grid } from "./components/layout/Grid";
import { tokens } from "./tokens";

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary py-12">
      <Container>
        <header className="mb-12">
          <Typography variant="h1" className="mb-4">Design System 2026</Typography>
          <Typography variant="body" className="text-xl text-text-secondary max-w-2xl">
            A comprehensive design system for AI-integrated web applications. 
            Featuring ultra-realistic aesthetics, deep blacks, and high-contrast accessibility.
          </Typography>
        </header>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Typography</Typography>
          <div className="space-y-6">
            <Typography variant="h1">Heading 1 - Ultra Display</Typography>
            <Typography variant="h2">Heading 2 - Section Title</Typography>
            <Typography variant="h3">Heading 3 - Subsection</Typography>
            <Typography variant="h4">Heading 4 - Component Title</Typography>
            <Typography variant="body">
              Body Text - The quick brown fox jumps over the lazy dog. Design systems are essential for scaling
              consistency across enterprise, SMB, and consumer applications. This text is legible, accessible,
              and optimized for reading on dark backgrounds.
            </Typography>
            <Typography variant="small">Small Text - Metadata and captions.</Typography>
            <Typography variant="muted">Muted Text - Less important information.</Typography>
          </div>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Colors</Typography>
          <Grid cols={4} gap="md">
            <ColorCard name="Background" hex={tokens.colors.background} className="bg-background border border-border" />
            <ColorCard name="Surface" hex={tokens.colors.surface.DEFAULT} className="bg-surface" />
            <ColorCard name="Surface Active" hex={tokens.colors.surface.active} className="bg-surface-active" />
            <ColorCard name="Border" hex={tokens.colors.border.DEFAULT} className="bg-border" />
            <ColorCard name="Primary" hex={tokens.colors.primary.DEFAULT} className="bg-primary text-black" />
            <ColorCard name="Accent" hex={tokens.colors.accent.DEFAULT} className="bg-accent text-white" />
            <ColorCard name="Destructive" hex={tokens.colors.border.DEFAULT} className="bg-destructive text-white" />
          </Grid>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Buttons</Typography>
          <div className="flex flex-wrap gap-4 items-center mb-8">
            <Button variant="primary">Primary Action</Button>
            <Button variant="accent">AI Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
            <Button size="icon" variant="outline">
               <span className="sr-only">Icon</span>
               +
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Forms & Controls</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled Input</Label>
                <Input id="disabled-input" placeholder="Disabled input..." disabled />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
            </div>
            <div className="space-y-4">
               <div className="space-y-2">
                 <Label>Role</Label>
                 <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
               </div>
               <div className="space-y-2">
                 <Label>Notifications</Label>
                 <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Disabled select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectContent>
                </Select>
               </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Dialogs</Typography>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Separators</Typography>
          <div className="space-y-4 max-w-md">
             <div className="space-y-1">
              <Typography variant="h4">Radix Primitives</Typography>
              <Typography variant="muted">
                An open-source UI component library.
              </Typography>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Typography variant="small">Blog</Typography>
              <Separator orientation="vertical" />
              <Typography variant="small">Docs</Typography>
              <Separator orientation="vertical" />
              <Typography variant="small">Source</Typography>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <Typography variant="h2" className="mb-8 border-b border-border pb-2">Cards & Glassmorphism</Typography>
          <Grid cols={3} gap="lg">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard surface for content.</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body" className="mt-0">
                  This card uses the default surface color and border. It integrates seamlessly with the dark theme.
                </Typography>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Frosted glass effect.</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body" className="mt-0">
                  This variant uses backdrop-blur and translucency to create depth. Ideal for floating panels or high-tech dashboards.
                </Typography>
              </CardContent>
              <CardFooter>
                <Button variant="accent" className="w-full">Interact</Button>
              </CardFooter>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>Minimalist boundary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="body" className="mt-0">
                  Useful for less emphasized content or grouping related items without adding visual weight.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </section>
      </Container>
    </div>
  )
}

function ColorCard({ name, hex, className }: { name: string, hex: string, className?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className={`h-24 w-full ${className}`}></div>
      <div className="p-3 bg-surface">
        <Typography variant="small" className="block font-semibold text-text-primary">{name}</Typography>
        <Typography variant="small" className="block text-text-secondary font-mono">{hex}</Typography>
      </div>
    </div>
  )
}

export default App
