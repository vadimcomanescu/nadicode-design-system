import { useState } from "react"
import { Stepper, Step } from "@/components/ui/stepper"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { CreditCardIcon } from "@/components/ui/icons"
import { RocketIcon } from "@/components/ui/icons/rocket"
import { UserIcon } from "@/components/ui/icons/user"
import { SettingsIcon } from "@/components/ui/icons/settings"

export function WizardBlock() {
    const [activeStep, setActiveStep] = useState(0)
    const steps = [
        { title: "Account", description: "Setup your account", icon: <UserIcon size={16} /> },
        { title: "Profile", description: "Add personal info", icon: <SettingsIcon size={16} /> },
        { title: "Plan", description: "Choose a plan", icon: <CreditCardIcon size={16} /> },
        { title: "Launch", description: "Ready to go", icon: <RocketIcon size={16} /> },
    ]

    const handleNext = () => setActiveStep((p) => Math.min(p + 1, steps.length - 1))
    const handlePrev = () => setActiveStep((p) => Math.max(p - 1, 0))

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription>Follow the steps to setup your new project workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Stepper Header */}
                <Stepper activeStep={activeStep} onStepChange={setActiveStep} className="justify-between">
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            index={index}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                            completed={index < activeStep}
                        />
                    ))}
                </Stepper>

                {/* Dynamic Content */}
                <div className="min-h-[200px] border rounded-lg p-6 bg-muted/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeStep === 0 && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Username</Label>
                                <Input placeholder="jdoe" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input placeholder="john@example.com" />
                            </div>
                        </div>
                    )}
                    {activeStep === 1 && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Full Name</Label>
                                <Input placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Bio</Label>
                                <Input placeholder="Tell us about yourself" />
                            </div>
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border p-4 rounded-lg bg-background hover:bg-accent/50 cursor-pointer transition-colors">
                                <h3 className="font-bold">Free</h3>
                                <p className="text-sm text-text-tertiary">For hobbyists</p>
                            </div>
                            <div className="border border-primary p-4 rounded-lg bg-primary/10 cursor-pointer">
                                <h3 className="font-bold text-primary">Pro</h3>
                                <p className="text-sm text-text-tertiary">For professionals</p>
                            </div>
                        </div>
                    )}
                    {activeStep === 3 && (
                        <div className="text-center space-y-4 py-8">
                            <RocketIcon size={64} className="mx-auto text-primary" style={{ animation: "float 2s ease-in-out infinite" }} />
                            <h3 className="text-xl font-bold">Ready to Launch!</h3>
                            <p className="text-text-tertiary">Review your settings and click Finish to deploy.</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrev} disabled={activeStep === 0}>
                    Previous
                </Button>
                <Button onClick={activeStep === steps.length - 1 ? undefined : handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
            </CardFooter>
        </Card>
    )
}
