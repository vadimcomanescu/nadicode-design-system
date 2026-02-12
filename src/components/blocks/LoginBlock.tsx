'use client'

import React from "react"
import { motion } from "motion/react"
import { Button } from "../ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/Card"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { GoogleIcon } from "../ui/BrandIcons"
import { StaggerChildren } from "../ui/StaggerChildren"
import { cn } from "../../lib/utils"

interface LoginBlockProps {
    className?: string
    variant?: "default" | "glass-panel" | "outline" | "glass-overlay"
    type?: "login" | "signup"
    showSocial?: boolean
    title?: string
    description?: string
    onLogin?: (e: React.FormEvent) => void
}

export function LoginBlock({
    className,
    type = "login",
    showSocial = true,
    title,
    description,
    onLogin,
}: LoginBlockProps) {
    const defaultTitle = type === "login" ? "Welcome back" : "Create an account"
    const defaultDescription = type === "login"
        ? "Enter your credentials to access your account"
        : "Enter your information to create an account"
    const buttonText = type === "login" ? "Sign In" : "Sign Up"

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
        <Card className={cn("w-full max-w-[400px] border-border/50", className)}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">{title || defaultTitle}</CardTitle>
                <CardDescription className="text-center">
                    {description || defaultDescription}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {showSocial && (
                    <>
                        <div className="grid gap-4">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-border/50 transition-colors py-6">
                                <GoogleIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">Continue with Google</span>
                            </Button>
                        </div>
                        <div className="flex items-center gap-3 text-xs uppercase text-text-tertiary font-medium">
                            <div className="h-px flex-1 bg-border/50" />
                            <span className="whitespace-nowrap">Or continue with</span>
                            <div className="h-px flex-1 bg-border/50" />
                        </div>
                    </>
                )}
                <form onSubmit={onLogin} className="grid gap-4">
                    <StaggerChildren staggerMs={60} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                className="border-border/50 focus:border-accent/50 transition-colors"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="border-border/50 focus:border-accent/50 transition-colors"
                            />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] font-semibold">
                            {buttonText}
                        </Button>
                    </StaggerChildren>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <p className="text-center text-sm text-text-tertiary">
                    {type === "login" ? (
                        <>
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                className="text-accent underline-offset-4 hover:underline transition-all font-medium"
                            >
                                Create account
                            </a>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <a
                                href="#"
                                className="text-accent underline-offset-4 hover:underline transition-all font-medium"
                            >
                                Sign in
                            </a>
                        </>
                    )}
                </p>
            </CardFooter>
        </Card>
        </motion.div>
    )
}
