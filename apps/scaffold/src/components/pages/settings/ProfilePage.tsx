'use client'

import { StaggerChildren } from "../../ui/StaggerChildren"
import { AvatarUpload } from "../../ui/AvatarUpload"
import { Button } from "../../ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Input } from "../../ui/Input"
import { Label } from "../../ui/Label"
import { Separator } from "../../ui/Separator"
import { Switch } from "../../ui/Switch"

export function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-text-secondary">
                    Manage your public profile and personal settings.
                </p>
            </div>
            <Separator />

            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                <div className="flex flex-col items-center gap-4">
                    <AvatarUpload />
                    <p className="text-xs text-text-tertiary text-center px-4">
                        Recommended: 400x400px. <br /> Max size: 2MB.
                    </p>
                </div>

                <StaggerChildren staggerMs={100} className="space-y-6">
                    <Card >
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                This information will be displayed on your public profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input id="name" defaultValue="Vadim" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Role or short description..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="url">Website</Label>
                                <Input id="url" placeholder="https://example.com" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card >
                        <CardHeader>
                            <CardTitle>Email & Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Emails</Label>
                                    <p className="text-sm text-text-secondary">
                                        Receive emails about new features and updates.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Security Alerts</Label>
                                    <p className="text-sm text-text-secondary">
                                        Get notified about login attempts.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost">Discard</Button>
                        <Button variant="accent">Save Changes</Button>
                    </div>
                </StaggerChildren>
            </div>
        </div>
    )
}
