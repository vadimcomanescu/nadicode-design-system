import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MailIcon } from "@/components/ui/icons"
import { PlusIcon } from "../../ui/icons/plus"
import { CheckIcon } from "../../ui/icons/check"

import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"
import { Label } from "../../ui/Label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/Dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/Select"
import { RoleBadge } from "../../ui/RoleBadge"

const inviteSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    role: z.enum(["admin", "member", "guest"]),
})

type InviteFormValues = z.infer<typeof inviteSchema>

export function InviteUserModal() {
    const [open, setOpen] = React.useState(false)
    const [isPending, startTransition] = React.useTransition()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            role: "member",
        },
    })

    function onSubmit(data: InviteFormValues) {
        startTransition(() => {
            // Simulate API call
            setTimeout(() => {
                console.log("Invited:", data)
                setOpen(false)
                reset()
            }, 1000)
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="accent" className="gap-2">
                    <PlusIcon size={16} />
                    Invite User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Teammate</DialogTitle>
                    <DialogDescription>
                        Send an invitation to join your workspace. They will receive an email
                        with a magic link.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <MailIcon size={16} className="absolute left-3 top-2.5 text-text-tertiary" />
                            <Input
                                id="email"
                                placeholder="colleague@company.com"
                                className="pl-9"
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                            defaultValue="member"
                            onValueChange={(val: any) => setValue("role", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">
                                    <div className="flex items-center gap-2">
                                        <RoleBadge role="admin" />
                                        <span className="text-text-secondary">Full access</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="member">
                                    <div className="flex items-center gap-2">
                                        <RoleBadge role="member" />
                                        <span className="text-text-secondary">Can view and edit</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="guest">
                                    <div className="flex items-center gap-2">
                                        <RoleBadge role="guest" />
                                        <span className="text-text-secondary">View only</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-xs text-destructive">{errors.role.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="accent" disabled={isPending}>
                            {isPending ? (
                                <>Sending...</>
                            ) : (
                                <>
                                    <CheckIcon size={16} className="mr-2" /> Send Invite
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
