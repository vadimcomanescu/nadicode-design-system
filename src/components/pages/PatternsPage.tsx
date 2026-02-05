
import { useState } from 'react';
import { gridPatterns, type Pattern } from '../../lib/patterns';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Grid } from '../layout/Grid';
import { useToast } from '../../hooks/use-toast';

export function PatternsPage() {
    const { toast } = useToast();
    const [filter, setFilter] = useState("all");
    const categories = Array.from(new Set(gridPatterns.map(p => p.category)));

    const filteredPatterns = filter === "all"
        ? gridPatterns
        : gridPatterns.filter(p => p.category === filter);

    const copyToClipboard = (pattern: Pattern) => {
        // We need to clean up the code slightly for the user
        // But for now just copy the raw code
        navigator.clipboard.writeText(pattern.code);
        toast({
            title: "Copied CSS",
            description: `Pattern ${pattern.name} copied to clipboard.`
        });
    };

    return (
        <div className="space-y-8 p-8 min-h-screen bg-background text-text-primary">
            <div className="flex flex-col gap-4">
                <Typography variant="h1">Pattern Gallery ({gridPatterns.length})</Typography>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant={filter === "all" ? "primary" : "outline"}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={filter === cat ? "primary" : "outline"}
                            onClick={() => setFilter(cat)}
                            className="capitalize"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <Grid cols={1} gap="lg" className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPatterns.map((pattern) => (
                    <Card key={pattern.id} className="overflow-hidden group relative border-border/50">
                        {/* Preview Area */}
                        <div className="h-48 w-full relative overflow-hidden border-b border-border/50">
                            <div className="absolute inset-0" style={pattern.style} />
                            {/* Label Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <Typography variant="small" className="text-white font-mono text-xs truncate">
                                    {pattern.name}
                                </Typography>
                            </div>
                        </div>

                        <CardContent className="p-4 flex justify-between items-center gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-medium text-text-secondary capitalize">{pattern.category}</span>
                                {pattern.badge && (
                                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{pattern.badge}</span>
                                )}
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(pattern)}
                            >
                                Copy
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
