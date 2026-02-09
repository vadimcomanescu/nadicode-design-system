import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

// --- Animation Variants ---

const scaleBounce: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.15,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
};

const rotateSpin: Variants = {
    rest: { rotate: 0 },
    hover: {
        rotate: 180,
        transition: { duration: 0.4, ease: "easeInOut" }
    }
};

const wiggle: Variants = {
    rest: { rotate: 0 },
    hover: {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
    }
};

const shake: Variants = {
    rest: { x: 0 },
    hover: {
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.4 }
    }
};

const pulse: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
    }
};

const slideRight: Variants = {
    rest: { x: 0 },
    hover: {
        x: 3,
        transition: { type: "spring", stiffness: 400, damping: 15 }
    }
};

const slideLeft: Variants = {
    rest: { x: 0 },
    hover: {
        x: -3,
        transition: { type: "spring", stiffness: 400, damping: 15 }
    }
};

const ring: Variants = {
    rest: { rotate: 0 },
    hover: {
        rotate: [0, 15, -15, 10, -10, 5, 0],
        transition: { duration: 0.6 }
    }
};

const VARIANTS_MAP = {
    scale: scaleBounce,
    rotate: rotateSpin,
    wiggle: wiggle,
    shake: shake,
    pulse: pulse,
    slideRight: slideRight,
    slideLeft: slideLeft,
    ring: ring,
} as const;

type AnimationType = keyof typeof VARIANTS_MAP;

// Icon-aware default animations: map icon display names to meaningful animations.
// Every icon used in the codebase should have a contextual default here.
const ICON_ANIMATION_MAP: Record<string, AnimationType> = {
    // --- Navigation / Arrows ---
    ChevronRight: "slideRight",
    ChevronLeft: "slideLeft",
    ChevronDown: "pulse",
    ChevronUp: "pulse",
    ChevronsUpDown: "pulse",
    ArrowRight: "slideRight",
    ArrowLeft: "slideLeft",
    ArrowUpRight: "slideRight",
    ArrowDownRight: "slideRight",
    PanelLeft: "slideLeft",
    // --- Close / Dismiss ---
    X: "rotate",
    // --- Settings / Config ---
    Settings: "rotate",
    Settings2: "rotate",
    Loader2: "rotate",
    GripVertical: "wiggle",
    LayoutDashboard: "pulse",
    // --- Notifications / Alerts ---
    Bell: "ring",
    // --- Status / Feedback ---
    Check: "pulse",
    Circle: "pulse",
    Dot: "pulse",
    Activity: "pulse",
    ShieldCheck: "pulse",
    // --- Actions ---
    Upload: "pulse",
    Send: "slideRight",
    Plus: "rotate",
    Copy: "scale",
    Trash2: "shake",
    MoreHorizontal: "wiggle",
    // --- People ---
    User: "wiggle",
    Users: "wiggle",
    Bot: "pulse",
    // --- Objects ---
    Package: "wiggle",
    Package2: "wiggle",
    Folder: "wiggle",
    Mail: "slideRight",
    CreditCard: "slideRight",
    Key: "rotate",
    Lock: "shake",
    Terminal: "pulse",
    Laptop: "pulse",
    Monitor: "pulse",
    Smartphone: "wiggle",
    // --- Search ---
    Search: "pulse",
    // --- Fun / Decorative ---
    Sparkles: "wiggle",
    Zap: "shake",
    Rocket: "slideRight",
    Star: "wiggle",
    // --- Text formatting ---
    Bold: "scale",
    Italic: "scale",
    Underline: "scale",
    // --- Media ---
    Mic: "pulse",
    Sun: "rotate",
    Moon: "rotate",
    CalendarIcon: "pulse",
    // --- Social ---
    Github: "wiggle",
    Twitter: "wiggle",
    Linkedin: "wiggle",
    // --- Features ---
    Shield: "shake",
    Layers: "pulse",
    Cloud: "pulse",
    DollarSign: "pulse",
};

// --- Component ---

interface AnimatedIconProps extends LucideProps {
    icon: LucideIcon;
    animation?: AnimationType;
    className?: string;
}

export const AnimatedIcon = forwardRef<SVGSVGElement, AnimatedIconProps>(
    ({ icon: Icon, animation, className, ...props }, ref) => {
        const reducedMotion = useReducedMotion();

        // Resolve animation: explicit prop > icon-aware default > scale fallback
        const iconName = Icon.displayName || Icon.name || "";
        const resolvedAnimation = animation || ICON_ANIMATION_MAP[iconName] || "scale";
        const variants = VARIANTS_MAP[resolvedAnimation];

        return (
            <motion.div
                initial="rest"
                whileHover={reducedMotion ? undefined : "hover"}
                variants={variants}
                className={cn("inline-flex items-center justify-center", className)}
            >
                <Icon
                    ref={ref}
                    className="h-full w-full"
                    {...props}
                />
            </motion.div>
        );
    }
);

AnimatedIcon.displayName = "AnimatedIcon";
