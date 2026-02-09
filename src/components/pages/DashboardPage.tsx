import {
    Package2,
    Search,
    ArrowUpRight,
} from "lucide-react"

import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
// PixelReveal removed as it was unused in this file version
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/Card"
import { Input } from "../ui/Input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/Table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { StatsGeneric } from "../blocks/StatsBlock"
// BarChart unused in this snippet, removing or keeping if intended for future use
// import { BarChart } from "../ui/charts/BarChart"
import { AreaChart } from "../ui/charts/AreaChart"
import { AnimatedIcon } from "../ui/AnimatedIcon"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
}

export function DashboardPage() {
    return (
        <div className="flex min-h-dvh w-full flex-col bg-background">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <AnimatedIcon icon={Package2} className="h-6 w-6" />
                        <span className="sr-only">Nadicode</span>
                    </a>
                    <a
                        href="#"
                        className="text-text-primary transition-colors hover:text-text-primary"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Orders
                    </a>
                    <a
                        href="#"
                        className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Products
                    </a>
                    <a
                        href="#"
                        className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Customers
                    </a>
                    <a
                        href="#"
                        className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Analytics
                    </a>
                </nav>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <AnimatedIcon icon={Search} className="absolute left-2.5 top-2.5 h-4 w-4 text-text-tertiary" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

                {/* KPI Stats Block */}
                <section>
                    <StatsGeneric />
                </section>

                {/* Charts Section */}
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <AreaChart data={chartData} config={chartConfig} indexKey="month" />
                            <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border/50">
                                <h4 className="text-sm font-medium mb-1">System Typography</h4>
                                <p className="text-xs text-text-secondary">
                                    Font Family: <span className="font-bold text-text-primary">Satoshi</span> (Geometric Sans)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3" pixelTheme="encryption">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                <div className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                        <p className="text-sm text-muted-foreground">
                                            olivia.martin@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$1,999.00</div>
                                </div>
                                <div className="flex items-center">
                                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                                        <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                        <AvatarFallback>JL</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                        <p className="text-sm text-muted-foreground">
                                            jackson.lee@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$39.00</div>
                                </div>
                                <div className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                        <AvatarFallback>IN</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                        <p className="text-sm text-muted-foreground">
                                            isabella.nguyen@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$299.00</div>
                                </div>
                                <div className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                        <AvatarFallback>WK</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">William Kim</p>
                                        <p className="text-sm text-muted-foreground">
                                            will@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$99.00</div>
                                </div>
                                <div className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                        <AvatarFallback>SD</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                        <p className="text-sm text-muted-foreground">
                                            sofia.davis@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$39.00</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Transactions Table */}
                <section>
                    <Card>
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>
                                    Recent transactions from your store.
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <a href="#">
                                    View All
                                    <AnimatedIcon icon={ArrowUpRight} className="h-4 w-4" />
                                </a>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden xl:table-cell">
                                            Type
                                        </TableHead>
                                        <TableHead className="hidden xl:table-cell">
                                            Status
                                        </TableHead>
                                        <TableHead className="hidden xl:table-cell">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="hidden text-sm text-text-secondary md:inline">
                                                liam@email.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <Badge className="text-xs" variant="outline">
                                                Approved
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Olivia Smith</div>
                                            <div className="hidden text-sm text-text-secondary md:inline">
                                                olivia@email.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            Refund
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <Badge className="text-xs" variant="outline">
                                                Declined
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            2023-06-24
                                        </TableCell>
                                        <TableCell className="text-right">$150.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Noah Williams</div>
                                            <div className="hidden text-sm text-text-secondary md:inline">
                                                noah@email.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            Subscription
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <Badge className="text-xs" variant="outline">
                                                Approved
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            2023-06-25
                                        </TableCell>
                                        <TableCell className="text-right">$350.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>

            </main>
        </div>
    )
}
