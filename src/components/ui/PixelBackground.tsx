import { useMemo } from "react";
import { cn } from "../../lib/utils";

export type PixelTheme = "cyber" | "encryption" | "void";

interface PixelBackgroundProps {
    theme?: PixelTheme;
    className?: string;
}

export function PixelBackground({
    theme = "cyber",
    className,
}: PixelBackgroundProps) {
    // Debug logging
    console.log("PixelBackground rendering with theme:", theme);

    // Deterministic content generation to avoid hydration mismatch
    // In a real app, this could be seeded. Here we use static patterns.

    const content = useMemo(() => {
        switch (theme) {
            case "encryption":
                // Density: High. Content: Numbers, Slashed 0 (ss04), Glyphs.
                return Array.from({ length: 200 }) // Reduced from 400
                    .map((_, i) => {
                        const r = (i * 1337) % 100;
                        if (r > 90) return "█";
                        if (r > 80) return "▓";
                        if (r > 70) return "▒";
                        if (r > 60) return "░";
                        if (r > 40) return "0"; // Will be slashed via CSS
                        return "1";
                    })
                    .join("");

            case "void":
                // Density: Low. Content: Dots, Crosses.
                return Array.from({ length: 200 }) // Reduced from 400
                    .map((_, i) => {
                        const r = (i * 7331) % 100;
                        if (r > 95) return "+";
                        if (r > 80) return ".";
                        return " ";
                    })
                    .join("");

            case "cyber":
            default:
                // Density: Medium. Content: Alphanumeric, Mixed Case.
                return Array.from({ length: 200 }) // Reduced from 400
                    .map((_, i) => {
                        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                        const r = (i * 42) % chars.length;
                        return chars[r];
                    })
                    .join("");
        }
    }, [theme]);

    const themeStyles = useMemo(() => {
        switch (theme) {
            case "encryption":
                return {
                    fontFeatureSettings: '"ss04" on',
                    opacity: 0.04, // Drastic reduction: Subliminal texture
                    animation: "pixel-scan 20s linear infinite",
                    maskImage: "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
                    maskSize: "100% 200%",
                };
            case "void":
                return {
                    fontFeatureSettings: '"ss02" on, "ss06" on',
                    opacity: 0.03, // Drastic reduction
                    animation: "pixel-drift 60s ease-in-out infinite",
                    maskImage: "radial-gradient(circle at center, black 30%, transparent 85%)",
                };
            case "cyber":
            default:
                return {
                    fontFeatureSettings: '"ss02" on, "ss06" on',
                    opacity: 0.01, // Almost invisible
                    // Removed animation for zero distraction
                    maskImage: "linear-gradient(135deg, black 0%, transparent 60%)",
                };
        }
    }, [theme]);

    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none overflow-hidden select-none",
                className
            )}
            aria-hidden="true"
        >
            <div
                className="w-full h-full break-all whitespace-pre-wrap"
                style={{
                    fontFamily: "'GeistPixelGrid'", // Use the Grid variant for perfect alignment
                    fontSize: "24px",
                    lineHeight: "24px",
                    ...themeStyles,
                    WebkitMaskImage: themeStyles.maskImage,
                }}
            >
                {content}
            </div>
        </div>
    );
}
