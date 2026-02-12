import fs from 'fs';
import path from 'path';
import { colorTokens } from '../src/lib/tokens.config.js';

// Helper to convert Hex to RGB triplet (e.g., "#ffffff" -> "255 255 255")
function hexToRgb(hex: string): string {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r: string, g: string, b: string) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
        : '0 0 0';
}

function generateCss() {
    const indexPath = path.join(process.cwd(), 'src/index.css');
    let cssContent = fs.readFileSync(indexPath, 'utf-8');

    const generateBlock = (tokens: typeof colorTokens.light) => {
        const lines: string[] = [];

        const formatColor = (hex: string) => hexToRgb(hex);

        // Background
        lines.push(`    /* Background */`);
        lines.push(`    --color-background: ${formatColor(tokens.background)};`);
        lines.push(``);

        // Surface
        lines.push(`    /* Surface */`);
        lines.push(`    --color-surface: ${formatColor(tokens.surface.DEFAULT)};`);
        lines.push(`    --color-surface-hover: ${formatColor(tokens.surface.hover)};`);
        lines.push(`    --color-surface-active: ${formatColor(tokens.surface.active)};`);
        lines.push(``);

        // Border
        lines.push(`    /* Border */`);
        lines.push(`    --color-border: ${formatColor(tokens.border.DEFAULT)};`);
        lines.push(`    --color-border-hover: ${formatColor(tokens.border.hover)};`);
        const parseRgba = (rgba: string) => {
            const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
            if (m) return `${m[1]} ${m[2]} ${m[3]} / ${m[4]}`;
            return '0 0 0 / 0.05';
        };
        lines.push(`    --color-border-subtle: ${parseRgba(tokens.border.subtle)};`);
        lines.push(`    --color-border-subtle-hover: ${parseRgba(tokens.border['subtle-hover'])};`);
        lines.push(``);

        // Primary
        lines.push(`    /* Primary */`);
        lines.push(`    --color-primary: ${formatColor(tokens.primary.DEFAULT)};`);
        lines.push(`    --color-primary-foreground: ${formatColor(tokens.primary.foreground)};`);
        lines.push(``);

        // Secondary
        lines.push(`    /* Secondary */`);
        lines.push(`    --color-secondary: ${formatColor(tokens.secondary.DEFAULT)};`);
        lines.push(`    --color-secondary-foreground: ${formatColor(tokens.secondary.foreground)};`);
        lines.push(``);

        // Accent
        lines.push(`    /* Accent */`);
        lines.push(`    --color-accent: ${formatColor(tokens.accent.DEFAULT)};`);
        lines.push(`    --color-accent-foreground: ${formatColor(tokens.accent.foreground)};`);
        lines.push(``);

        // Destructive
        lines.push(`    /* Destructive */`);
        lines.push(`    --color-destructive: ${formatColor(tokens.destructive.DEFAULT)};`);
        lines.push(`    --color-destructive-foreground: ${formatColor(tokens.destructive.foreground)};`);
        lines.push(``);

        // Muted
        lines.push(`    /* Muted */`);
        lines.push(`    --color-muted: ${formatColor(tokens.muted.DEFAULT)};`);
        lines.push(`    --color-muted-foreground: ${formatColor(tokens.muted.foreground)};`);
        lines.push(``);

        // Text
        lines.push(`    /* Text */`);
        lines.push(`    --color-text-primary: ${formatColor(tokens.text.primary)};`);
        lines.push(`    --color-text-secondary: ${formatColor(tokens.text.secondary)};`);
        lines.push(`    --color-text-tertiary: ${formatColor(tokens.text.tertiary)};`);

        // Charts
        if ('chart' in tokens) {
            const chart = (tokens as typeof colorTokens.light & { chart: Record<string, string> }).chart;
            lines.push(``);
            lines.push(`    /* Charts */`);
            Object.entries(chart).forEach(([key, value]) => {
                lines.push(`    --chart-${key}: ${formatColor(value)};`);
            });
        }

        return lines.join('\n');
    };

    const lightCSS = generateBlock(colorTokens.light);
    const darkCSS = generateBlock(colorTokens.dark);

    const replaceRange = (type: 'root' | 'dark', newContent: string) => {
        const startMarker = type === 'root' ? 'color-scheme: light;' : 'color-scheme: dark;';
        const endMarker = '/* Sidebar */';

        const startIndex = cssContent.indexOf(startMarker);
        const endIndex = cssContent.indexOf(endMarker, startIndex);

        if (startIndex === -1 || endIndex === -1) {
            console.error(`Could not find markers for ${type}`);
            return;
        }

        const prefix = cssContent.substring(0, startIndex + startMarker.length);
        const suffix = cssContent.substring(endIndex);

        cssContent = prefix + '\n\n' + newContent + '\n\n    ' + suffix;
    };

    replaceRange('root', lightCSS);
    replaceRange('dark', darkCSS);

    fs.writeFileSync(indexPath, cssContent, 'utf-8');
    console.log("src/index.css updated from src/lib/tokens.config.js");
}

generateCss();
