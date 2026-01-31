import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Sparkles } from "lucide-react";

export function AuthLayout() {
    return (
        <div className="w-full h-screen grid lg:grid-cols-2 overflow-hidden">
            {/* Visual Side */}
            <div className="hidden lg:flex relative h-full w-full flex-col bg-muted text-white dark:border-r border-border/50">
                <div className="absolute inset-0 bg-zinc-900" />
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background" />
                <div className="relative z-20 flex items-center text-lg font-medium p-8">
                    <Sparkles className="mr-2 h-6 w-6 text-accent" />
                    Nexus AI
                </div>
                <div className="relative z-20 m-auto max-w-lg text-center space-y-4">
                    <div className="h-64 w-64 bg-accent/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative">
                        Build the future, faster.
                    </h1>
                    <p className="text-lg text-zinc-400 relative">
                        "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
                    </p>
                </div>
                <div className="relative z-20 p-8 mt-auto">
                    <blockquote className="space-y-2">
                        <footer className="text-sm text-zinc-400">Sofia Davis, Lead Engineer</footer>
                    </blockquote>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-background relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />

                <Card variant="glass" className="w-full max-w-[400px] border-border/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline" className="w-full">Github</Button>
                            <Button variant="outline" className="w-full">Google</Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground bg-opacity-0 backdrop-blur-sm">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">Create account</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
