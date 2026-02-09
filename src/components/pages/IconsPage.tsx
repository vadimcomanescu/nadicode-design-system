import { useState, useMemo } from "react";
import { Typography } from "../../components/ui/Typography";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Animated icon imports (lucide-animated pattern - real SVG path animations)
import { BellIcon } from "../ui/icons/bell";
import { BoldIcon } from "../ui/icons/bold";
import { CheckIcon } from "../ui/icons/check";
import { CopyIcon } from "../ui/icons/copy";
import { GithubIcon } from "../ui/icons/github";
import { ItalicIcon } from "../ui/icons/italic";
import { KeyIcon } from "../ui/icons/key";
import { LayersIcon } from "../ui/icons/layers";
import { LinkedinIcon } from "../ui/icons/linkedin";
import { LockIcon } from "../ui/icons/lock";
import { MicIcon } from "../ui/icons/mic";
import { MoonIcon } from "../ui/icons/moon";
import { PlusIcon } from "../ui/icons/plus";
import { RocketIcon } from "../ui/icons/rocket";
import { SearchIcon } from "../ui/icons/search";
import { SettingsIcon } from "../ui/icons/settings";
import { ShieldCheckIcon } from "../ui/icons/shield-check";
import { SparklesIcon } from "../ui/icons/sparkles";
import { SunIcon } from "../ui/icons/sun";
import { TerminalIcon } from "../ui/icons/terminal";
import { TwitterIcon } from "../ui/icons/twitter";
import { UnderlineIcon } from "../ui/icons/underline";
import { UploadIcon } from "../ui/icons/upload";
import { UserIcon } from "../ui/icons/user";
import { UsersIcon } from "../ui/icons/users";
import { XIcon } from "../ui/icons/x";
import { ZapIcon } from "../ui/icons/zap";

const ANIMATED_ICONS = [
    { name: "Bell", component: BellIcon },
    { name: "Bold", component: BoldIcon },
    { name: "Check", component: CheckIcon },
    { name: "Copy", component: CopyIcon },
    { name: "Github", component: GithubIcon },
    { name: "Italic", component: ItalicIcon },
    { name: "Key", component: KeyIcon },
    { name: "Layers", component: LayersIcon },
    { name: "Linkedin", component: LinkedinIcon },
    { name: "Lock", component: LockIcon },
    { name: "Mic", component: MicIcon },
    { name: "Moon", component: MoonIcon },
    { name: "Plus", component: PlusIcon },
    { name: "Rocket", component: RocketIcon },
    { name: "Search", component: SearchIcon },
    { name: "Settings", component: SettingsIcon },
    { name: "ShieldCheck", component: ShieldCheckIcon },
    { name: "Sparkles", component: SparklesIcon },
    { name: "Sun", component: SunIcon },
    { name: "Terminal", component: TerminalIcon },
    { name: "Twitter", component: TwitterIcon },
    { name: "Underline", component: UnderlineIcon },
    { name: "Upload", component: UploadIcon },
    { name: "User", component: UserIcon },
    { name: "Users", component: UsersIcon },
    { name: "X", component: XIcon },
    { name: "Zap", component: ZapIcon },
] as const;

export function IconsPage() {
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(100);

    // Filter and prepare lucide-react icons list
    const allIcons = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter(key => {
                return key !== "createLucideIcon" && key !== "lucide-react" && key !== "default" && /^[A-Z]/.test(key);
            })
            .map(key => ({
                name: key,
                // @ts-ignore - dynamic access
                icon: LucideIcons[key] as LucideIcon,
            }));
    }, []);

    const filteredIcons = allIcons.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredAnimated = ANIMATED_ICONS.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const visibleIcons = filteredIcons.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 100);
    };

    return (
        <div className="space-y-12">
            {/* Search */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-4">
                <div>
                    <Typography variant="h2">Icons</Typography>
                    <Typography variant="body" className="text-text-secondary mt-2">
                        {ANIMATED_ICONS.length} animated + {allIcons.length} static Lucide icons.
                    </Typography>
                </div>
                <div className="w-full md:w-72">
                    <Input
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setVisibleCount(100);
                        }}
                    />
                </div>
            </div>

            {/* Animated Icons Section */}
            {filteredAnimated.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Typography variant="h3">Animated</Typography>
                        <Badge variant="accent">{filteredAnimated.length}</Badge>
                    </div>
                    <Typography variant="body" className="text-text-secondary mb-6">
                        Real SVG path animations on hover. Each icon has unique motion design.
                    </Typography>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {filteredAnimated.map((item) => {
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
                </section>
            )}

            {/* Full Lucide Icon Browser */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <Typography variant="h3">All Lucide Icons</Typography>
                    <Badge variant="secondary">{filteredIcons.length}</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {visibleIcons.map((item) => {
                        const IconComp = item.icon;
                        return (
                            <Card key={item.name} className="hover:border-primary/50 transition-colors cursor-pointer group">
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                    <IconComp className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                    <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors truncate w-full text-center" title={item.name}>
                                        {item.name}
                                    </span>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {filteredIcons.length === 0 && filteredAnimated.length === 0 && (
                    <div className="text-center py-12 text-text-secondary">
                        No icons found matching "{search}"
                    </div>
                )}

                {visibleCount < filteredIcons.length && (
                    <div className="flex justify-center mt-8">
                        <Button variant="outline" onClick={handleLoadMore}>
                            Load More ({filteredIcons.length - visibleCount} remaining)
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
