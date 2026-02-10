import { useState } from "react";
import { Typography } from "../../components/ui/Typography";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import * as AnimatedIcons from "../ui/icons";

const ALL_ICONS = [
    { name: "Activity", component: AnimatedIcons.ActivityIcon },
    { name: "AlertTriangle", component: AnimatedIcons.AlertTriangleIcon },
    { name: "ArrowDownRight", component: AnimatedIcons.ArrowDownRightIcon },
    { name: "ArrowLeft", component: AnimatedIcons.ArrowLeftIcon },
    { name: "ArrowRight", component: AnimatedIcons.ArrowRightIcon },
    { name: "ArrowUpRight", component: AnimatedIcons.ArrowUpRightIcon },
    { name: "Bell", component: AnimatedIcons.BellIcon },
    { name: "Bold", component: AnimatedIcons.BoldIcon },
    { name: "Bot", component: AnimatedIcons.BotIcon },
    { name: "Calendar", component: AnimatedIcons.CalendarIcon },
    { name: "ChartBar", component: AnimatedIcons.ChartBarIcon },
    { name: "Check", component: AnimatedIcons.CheckIcon },
    { name: "ChevronDown", component: AnimatedIcons.ChevronDownIcon },
    { name: "ChevronLeft", component: AnimatedIcons.ChevronLeftIcon },
    { name: "ChevronRight", component: AnimatedIcons.ChevronRightIcon },
    { name: "ChevronsUpDown", component: AnimatedIcons.ChevronsUpDownIcon },
    { name: "ChevronUp", component: AnimatedIcons.ChevronUpIcon },
    { name: "Circle", component: AnimatedIcons.CircleIcon },
    { name: "Cloud", component: AnimatedIcons.CloudIcon },
    { name: "Code2", component: AnimatedIcons.Code2Icon },
    { name: "Copy", component: AnimatedIcons.CopyIcon },
    { name: "CornerDownLeft", component: AnimatedIcons.CornerDownLeftIcon },
    { name: "CreditCard", component: AnimatedIcons.CreditCardIcon },
    { name: "Database", component: AnimatedIcons.DatabaseIcon },
    { name: "DollarSign", component: AnimatedIcons.DollarSignIcon },
    { name: "Dot", component: AnimatedIcons.DotIcon },
    { name: "Ellipsis", component: AnimatedIcons.EllipsisIcon },
    { name: "File", component: AnimatedIcons.FileIcon },
    { name: "Github", component: AnimatedIcons.GithubIcon },
    { name: "Globe", component: AnimatedIcons.GlobeIcon },
    { name: "GripVertical", component: AnimatedIcons.GripVerticalIcon },
    { name: "Info", component: AnimatedIcons.InfoIcon },
    { name: "Italic", component: AnimatedIcons.ItalicIcon },
    { name: "Key", component: AnimatedIcons.KeyIcon },
    { name: "Laptop", component: AnimatedIcons.LaptopIcon },
    { name: "Layers", component: AnimatedIcons.LayersIcon },
    { name: "LayoutDashboard", component: AnimatedIcons.LayoutDashboardIcon },
    { name: "Linkedin", component: AnimatedIcons.LinkedinIcon },
    { name: "LoaderCircle", component: AnimatedIcons.LoaderCircleIcon },
    { name: "Lock", component: AnimatedIcons.LockIcon },
    { name: "Mail", component: AnimatedIcons.MailIcon },
    { name: "Menu", component: AnimatedIcons.MenuIcon },
    { name: "Mic", component: AnimatedIcons.MicIcon },
    { name: "Monitor", component: AnimatedIcons.MonitorIcon },
    { name: "Moon", component: AnimatedIcons.MoonIcon },
    { name: "Package", component: AnimatedIcons.PackageIcon },
    { name: "PanelLeft", component: AnimatedIcons.PanelLeftIcon },
    { name: "Plus", component: AnimatedIcons.PlusIcon },
    { name: "RefreshCw", component: AnimatedIcons.RefreshCwIcon },
    { name: "Rocket", component: AnimatedIcons.RocketIcon },
    { name: "Search", component: AnimatedIcons.SearchIcon },
    { name: "Send", component: AnimatedIcons.SendIcon },
    { name: "Settings", component: AnimatedIcons.SettingsIcon },
    { name: "Settings2", component: AnimatedIcons.Settings2Icon },
    { name: "Shield", component: AnimatedIcons.ShieldIcon },
    { name: "ShieldCheck", component: AnimatedIcons.ShieldCheckIcon },
    { name: "Smartphone", component: AnimatedIcons.SmartphoneIcon },
    { name: "Sparkles", component: AnimatedIcons.SparklesIcon },
    { name: "Sun", component: AnimatedIcons.SunIcon },
    { name: "Terminal", component: AnimatedIcons.TerminalIcon },
    { name: "Trash2", component: AnimatedIcons.Trash2Icon },
    { name: "Twitter", component: AnimatedIcons.TwitterIcon },
    { name: "Underline", component: AnimatedIcons.UnderlineIcon },
    { name: "Upload", component: AnimatedIcons.UploadIcon },
    { name: "User", component: AnimatedIcons.UserIcon },
    { name: "Users", component: AnimatedIcons.UsersIcon },
    { name: "Wrench", component: AnimatedIcons.WrenchIcon },
    { name: "X", component: AnimatedIcons.XIcon },
    { name: "Zap", component: AnimatedIcons.ZapIcon },
] as const;

export function IconsPage() {
    const [search, setSearch] = useState("");

    const filteredIcons = ALL_ICONS.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-4">
                <div>
                    <Typography variant="h2">Icons</Typography>
                    <Typography variant="body" className="text-text-secondary mt-2">
                        {ALL_ICONS.length} animated icons with SVG path animations on hover.
                    </Typography>
                </div>
                <div className="w-full md:w-72">
                    <Input
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <section>
                <div className="flex items-center gap-3 mb-6">
                    <Typography variant="h3">Animated Icons</Typography>
                    <Badge variant="accent">{filteredIcons.length}</Badge>
                </div>
                <Typography variant="body" className="text-text-secondary mb-6">
                    Real SVG path animations on hover. Each icon has unique motion design.
                </Typography>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {filteredIcons.map((item) => {
                        const IconComp = item.component;
                        return (
                            <Card key={item.name} className="hover:border-accent/50 transition-colors cursor-pointer group border-accent/20">
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                    <IconComp size={32} className="text-primary group-hover:text-accent transition-colors" />
                                    <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors truncate w-full text-center" title={item.name}>
                                        {item.name}
                                    </span>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {filteredIcons.length === 0 && (
                    <div className="text-center py-12 text-text-secondary">
                        No icons found matching "{search}"
                    </div>
                )}
            </section>
        </div>
    );
}
