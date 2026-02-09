"use client"

import { DataTable } from "../ui/DataTable"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/Badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card"

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const variant =
                status === 'success' ? 'outline' :
                    status === 'processing' ? 'accent' :
                        status === 'failed' ? 'destructive' : 'secondary';

            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase text-text-secondary">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium font-mono text-text-primary">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "123e1d42",
        amount: 550,
        status: "success",
        email: "corporate@nadicode.inc",
    },
    {
        id: "999e1d42",
        amount: 25,
        status: "failed",
        email: "user@domain.com",
    },
    {
        id: "444e1d42",
        amount: 300,
        status: "success",
        email: "sales@company.com",
    },
]

export function DataGridBlock() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>A sophisticated data grid with filtering and actions.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} searchKey="email" />
            </CardContent>
        </Card>
    )
}
