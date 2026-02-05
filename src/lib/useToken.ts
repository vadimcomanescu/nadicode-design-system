"use client";

import { useEffect, useState } from "react";

/**
 * Hook to retrieve CSS variable values, useful for syncing 2D theme with 3D uniforms.
 * Returns the resolved value (e.g., "rgb(255, 0, 0)").
 */
export function useToken(variableName: string, defaultValue: string = "#ffffff") {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        const computed = getComputedStyle(root).getPropertyValue(variableName).trim();

        if (computed) {
            // If it's a tailwind rgb var like "255 255 255", convert to standard syntax if needed
            // But usually for THREE.Color we want hex or standard CSS string.
            // Let's assume the user passes fully qualified vars or we handle the specific tailwind "space separated" format if we encounter it.
            // For now, return raw.
            setValue(computed);
        }

        // Optional: Observer for theme changes (class="dark")
        const observer = new MutationObserver(() => {
            const newComputed = getComputedStyle(root).getPropertyValue(variableName).trim();
            if (newComputed !== value) setValue(newComputed);
        });

        observer.observe(root, { attributes: true, attributeFilter: ["class", "style"] });

        return () => observer.disconnect();
    }, [variableName]);

    return value;
}

/**
 * Helper to convert Tailwind "255 255 255" format to "rgb(255, 255, 255)"
 */
export function tailwindToRgb(tailwindValue: string): string {
    if (!tailwindValue) return "white";
    // Check if it's already a color string
    if (tailwindValue.startsWith("#") || tailwindValue.startsWith("rgb")) return tailwindValue;

    // Assume space separated "r g b"
    return `rgb(${tailwindValue.replaceAll(" ", ",")})`;
}
