import fs from 'fs';
import path from 'path';
import { colorTokens } from '../src/lib/tokens.config.js';

// Helper to convert Hex to RGB triplet (e.g., "#ffffff" -> "255 255 255")
function hexToRgb(hex: string): string {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
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

    // Generate Light Theme Variables
    let lightVars = '';

    // Process Background
    if (colorTokens.light.background) {
        lightVars += `    --color-background: ${hexToRgb(colorTokens.light.background)};\n`;
    }

    // Process generic objects (Surface, Border, Primary, etc.)
    const processSection = (name: string, obj: any, prefix = 'color') => {
        let vars = '';
        for (const [key, value] of Object.entries(obj)) {
            const varName = key === 'DEFAULT' ? `--${prefix}-${name}` : `--${prefix}-${name}-${key}`;

            let finalValue = value as string;
            // Convert to RGB triplet if it looks like a hex color and we are in a color section
            if (typeof finalValue === 'string' && finalValue.startsWith('#')) {
                finalValue = hexToRgb(finalValue);
            }
            // Handle complex colors like rgba that might need special handling or just passthrough
            if (typeof finalValue === 'string' && finalValue.startsWith('rgba')) {
                // For rgba in this system, we might need to extract the rgb part or just leave it if the system supports it.
                // Current index.css uses space-separated RGB for colors to allow opacity modifiers.
                // If the config has rgba, we might be breaking that pattern unless we convert.
                // checking tokens.config.js, 'subtle' is rgba.
                // But in index.css, --color-border-subtle is '0 0 0 / 0.05'.
                // Let's defer complex rgba parsing for now and strictly handle the Hex -> RGB triplet sync which is the main source of truth.
                // For now, we will skip rgba values to avoid breaking them, or we need a improved parser.
                // Given the task is to fix consistency, let's assume valid Hex inputs for the main palette.
                // We will simply NOT output lines that we can't confidently convert to the expected format, 
                // OR we can try to parse rgba.
                // Let's stick to Hex for now as that covers 90% of the drift.
            } else {
                vars += `    ${varName}: ${finalValue};\n`;
            }
        }
        return vars;
    };


    // We will manually reconstruct the sections to match index.css structure or simplified it.
    // Actually, replacing ONLY the variable values in the existing file is safer than regenerating the whole file
    // to preserve comments and other CSS.
    // However, the task implies "Generating" or "Syncing".
    // Let's try to REGEX replace the values based on keys found in config.

    // Updated strategy: Read config, find matching css var in content, replace value.

    const updateVariables = (content: string, theme: 'light' | 'dark', tokens: any) => {
        let newContent = content;

        const flatten = (obj: any, prefix: string) => {
            let result: Record<string, string> = {};
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'object' && value !== null) {
                    const nested = flatten(value, key === 'DEFAULT' ? prefix : `${prefix}-${key}`);
                    result = { ...result, ...nested };
                } else {
                    const varName = key === 'DEFAULT' ? `--${prefix}` : `--${prefix}-${key}`;
                    result[varName] = value as string;
                }
            }
            return result;
        };

        const flatTokens = flatten(tokens, 'color');

        // Add chart colors if they are in a separate place or just hardcoded. 
        // In tokens.config.js they are NOT present in the colorTokens object, so we skip them for now.

        for (const [varName, hexValue] of Object.entries(flatTokens)) {
            if (typeof hexValue === 'string' && hexValue.startsWith('#')) {
                const rgbValue = hexToRgb(hexValue);
                // Regex to match: --var-name: <anything>;
                // We need to be careful about scope (light vs dark).
                // Light is under :root, Dark is under .dark

                // This regex approach is tricky globally.
                // Better approach: Extract the blocks, replace, then put back.
            }
        }
        return newContent;
    };

    // Simpler approach for this specific file structure:
    // 1. Generate the content for :root variables based on light tokens
    // 2. Generate the content for .dark variables based on dark tokens
    // 3. Replace the content between some markers or just strictly replace the已知 blocks.

    // Let's stick to a robust generation of the specific known lines for primary palette.

    const generateBlock = (tokens: any) => {
        let lines: string[] = [];

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
        // Handle subtle (rgba) manually or map it
        // In config: 'rgba(0, 0, 0, 0.05)' -> CSS: '0 0 0 / 0.05'
        const parseRgba = (rgba: string) => {
            const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
            if (m) return `${m[1]} ${m[2]} ${m[3]} / ${m[4]}`;
            return '0 0 0 / 0.05'; // Fallback
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
        if ((tokens as any).chart) {
            lines.push(``);
            lines.push(`    /* Charts */`);
            Object.entries((tokens as any).chart).forEach(([key, value]) => {
                lines.push(`    --chart-${key}: ${formatColor(value as string)};`);
            });
        }

        return lines.join('\n');
    };

    const lightCSS = generateBlock(colorTokens.light);
    const darkCSS = generateBlock(colorTokens.dark);

    // Now we need to inject these into the file.
    // We can use markers if they existed, but they don't.
    // We will assume the structure:
    // :root {
    //    ...
    //    /* Sidebar */
    // }
    // .dark {
    //    ...
    //    /* Sidebar */
    // }

    // We'll use regex to find the range between "color-scheme: light;" and "/* Sidebar */"

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

        // Preserve a newline after marker
        cssContent = prefix + '\n\n' + newContent + '\n\n    ' + suffix;
    };

    replaceRange('dark', darkCSS); // Do dark first to preserve indices? No, string updates changes indices.
    // Actually if we do replaceRange, we change cssContent. So second call needs to search again.
    // But since 'root' comes before 'dark' usually...

    // Let's reload content or just handle it carefully.
    // Safer to split, join.

    // However, Sidebar colors are missing from tokens.config.js? 
    // Checking tokens.config.js... 
    // Reference check: tokens.config.js DOES NOT have sidebar colors.
    // Sidebar colors are hardcoded in index.css:
    // --sidebar-background: 250 250 250;
    // etc.
    // Ideally we should add sidebar tokens to config too, but for this first step let's just sync the main palette.
    // So we invoke replace, preserving everything else.

    replaceRange('root', lightCSS);
    replaceRange('dark', darkCSS);

    fs.writeFileSync(indexPath, cssContent, 'utf-8');
    console.log("✅ src/index.css updated from src/lib/tokens.config.js");
}

generateCss();
