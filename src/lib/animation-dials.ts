'use client'

/**
 * DialKit animation configuration registry.
 * Centralized tuning presets for major animation patterns.
 * Components opt-in via useDialKit("ComponentName", DIALS.fadeInUp).
 */
import {
  spring,
  springBloom,
  motionDistance,
  motionScale,
  motionBlur,
} from "./animation.tokens";
import type { Style } from "./ThemeProvider";

export interface DialConfig {
  distance: number;
  scale: number;
  blur: number;
  spring: { type: "spring"; stiffness: number; damping: number; mass: number };
}

function buildDial(
  style: Style,
  preset: "snappy" | "gentle" | "bouncy" | "dramatic",
  distanceKey: "sm" | "md" | "lg",
  scaleKey: "subtle" | "normal",
  blurKey: "subtle" | "normal"
): DialConfig {
  const springs = style === "bloom" ? springBloom : spring;
  return {
    distance: motionDistance[style][distanceKey],
    scale: motionScale[style][scaleKey],
    blur: motionBlur[style][blurKey],
    spring: springs[preset],
  };
}

export const ANIMATION_DIALS = {
  fadeInUp: (style: Style) => buildDial(style, "snappy", "md", "subtle", "subtle"),
  fadeInDown: (style: Style) => buildDial(style, "snappy", "md", "subtle", "subtle"),
  scaleIn: (style: Style) => buildDial(style, "snappy", "sm", "normal", "normal"),
  heroEntrance: (style: Style) => buildDial(style, "gentle", "lg", "subtle", "subtle"),
  blockStagger: (style: Style) => buildDial(style, "snappy", "sm", "subtle", "subtle"),
  dialogEntrance: (style: Style) => buildDial(style, "bouncy", "sm", "normal", "normal"),
  pageSlide: (style: Style) => buildDial(style, "dramatic", "md", "subtle", "subtle"),
} as const;
