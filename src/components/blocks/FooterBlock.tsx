import { Github, Twitter, Linkedin } from "lucide-react"
import { AnimatedIcon } from "../ui/AnimatedIcon"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Separator } from "../ui/Separator"

export function Footer() {
    return (
        <footer className="bg-background py-12 lg:py-16 border-t border-border/50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold">
                                S
                            </div>
                            <span className="text-xl font-bold text-text-primary">Nadicode</span>
                        </div>
                        <p className="max-w-xs text-text-secondary">
                            The ultimate design system for building futuristic, high-contrast AI interfaces.
                        </p>
                        <div className="flex max-w-sm flex-col gap-2 sm:flex-row">
                            <Input placeholder="Enter your email" type="email" className="bg-surface/50 border-border/50" />
                            <Button variant="primary">Subscribe</Button>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Product</h4>
                            <ul className="space-y-2 text-sm text-text-secondary">
                                <li><a href="#" className="hover:text-primary transition-colors">Components</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Blocks</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Themes</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Showcase</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Company</h4>
                            <ul className="space-y-2 text-sm text-text-secondary">
                                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-2 text-sm text-text-secondary">
                                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">License</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator className="my-12 bg-border/50" />

                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-sm text-text-tertiary">
                        © 2026 Nadicode System. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-text-secondary hover:text-primary hover:bg-surface-hover">
                            <AnimatedIcon icon={Twitter} className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-text-secondary hover:text-primary hover:bg-surface-hover">
                            <AnimatedIcon icon={Github} className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-text-secondary hover:text-primary hover:bg-surface-hover">
                            <AnimatedIcon icon={Linkedin} className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
