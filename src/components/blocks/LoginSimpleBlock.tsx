import { LogoIcon } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { GoogleIcon } from '@/components/ui/BrandIcons'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from "motion/react"
import { StaggerChildren } from '@/components/ui/StaggerChildren'

export function SimpleLoginForm() {
    return (
        <section className="flex min-h-dvh items-center justify-center p-4 bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
            <Card className="w-full max-w-sm border-border/50">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <LogoIcon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-xl">Sign In to Nadicode</CardTitle>
                    <CardDescription>Welcome back! Sign in to continue</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 h-10 border-border/50">
                        <GoogleIcon className="h-4 w-4" />
                        <span>Continue with Google</span>
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent px-2 text-muted-foreground backdrop-blur-md">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <StaggerChildren staggerMs={60} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                className="bg-background/50 border-border/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pwd">Password</Label>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-accent hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="bg-background/50 border-border/50"
                            />
                        </div>

                        <Button className="w-full bg-accent hover:bg-accent/90">Sign In</Button>
                    </StaggerChildren>
                </CardContent>
                <CardFooter className="justify-center">
                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don&apos;t have an account? </span>
                        <a href="#" className="font-medium text-accent hover:underline">
                            Create account
                        </a>
                    </div>
                </CardFooter>
            </Card>
            </motion.div>
        </section>
    )
}
