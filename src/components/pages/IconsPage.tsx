import { useState, useMemo } from "react";
import { Typography } from "../../components/ui/Typography";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import * as LucideIcons from "lucide-react";
import { AnimatedIcon } from "../../components/ui/AnimatedIcon";
import type { LucideIcon } from "lucide-react";

// Specific animations for key icons
const SPECIFIC_ANIMATIONS: Record<string, "scale" | "rotate" | "wiggle" | "shake" | "pulse" | "draw"> = {
    Home: "scale",
    User: "wiggle",
    Settings: "rotate",
    Bell: "shake",
    Heart: "pulse",
    Check: "draw",
    Search: "scale",
    Mail: "wiggle",
    Calendar: "pulse",
    Phone: "shake",
    Trash2: "shake",
    Edit: "scale",
    Plus: "rotate",
    Minus: "scale",
    X: "rotate",
    RefreshCw: "rotate",
    Download: "pulse",
    Upload: "pulse",
    AlertCircle: "shake",
    AlertTriangle: "shake",
    CheckCircle: "draw",
    Star: "pulse",
    Smile: "wiggle",
};

export function IconsPage() {
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(100);

    // Filter and prepare icons list
    const allIcons = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter(key => {
                // Filter out non-component exports (types, createLucideIcon, etc.)
                // Icons are typically PascalCase and not 'createLucideIcon'
                return key !== "createLucideIcon" && key !== "lucide-react" && key !== "default" && /^[A-Z]/.test(key);
            })
            .map(key => ({
                name: key,
                // @ts-ignore - dynamic access
                icon: LucideIcons[key] as LucideIcon,
                animation: SPECIFIC_ANIMATIONS[key] || "scale" // Default to scale for interactivity
            }));
    }, []);

    const filteredIcons = allIcons.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const visibleIcons = filteredIcons.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 100);
    };

    return (
        <div className="space-y-8">
            <section>
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 border-b border-border pb-4">
                    <div>
                        <Typography variant="h2">Animated Icons ({allIcons.length})</Typography>
                        <Typography variant="body" className="text-text-secondary mt-2">
                            Complete set of {allIcons.length} interactive Lucide icons.
                        </Typography>
                    </div>
                    <div className="w-full md:w-72">
                        <Input
                            placeholder="Search icons..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(100); // Reset pagination on search
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {visibleIcons.map((item) => (
                        <Card key={item.name} className="hover:border-primary/50 transition-colors cursor-pointer group">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                {/* @ts-ignore - string vs literal type mismatch possible */}
                                <AnimatedIcon icon={item.icon} animation={item.animation} className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                <span className="text-xs text-muted-foreground group-hover:text-text-primary transition-colors truncate w-full text-center" title={item.name}>
                                    {item.name}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredIcons.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
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
