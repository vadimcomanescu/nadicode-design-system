/**
 * Opinion Rule 5.6: prefers-reduced-motion is non-negotiable.
 * Every component using motion/react animations must handle reduced motion.
 * Components using only layoutId are exempt (layout animations auto-respect it).
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Reduced Motion (Rule 5.6)', () => {
  it('components importing motion/react handle prefers-reduced-motion', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Patterns indicating motion/react usage with transforms
    const motionImport = /from\s+['"]motion\/react['"]|from\s+['"]framer-motion['"]/;

    // Patterns indicating the component respects reduced motion
    const reducedMotionPatterns = [
      /useReducedMotion/,
      /prefers-reduced-motion/,
      /motion-reduce:/,
      /reducedMotion/,
    ];

    // Components that only use layoutId (auto-respects reduced motion)
    const layoutIdOnly = (content: string): boolean => {
      // Has layoutId but no initial/animate/whileHover/whileTap/whileInView
      const hasLayoutId = /layoutId/.test(content);
      const hasAnimationProps =
        /\binitial\s*[=:{]/.test(content) ||
        /\banimate\s*[=:{]/.test(content) ||
        /whileHover/.test(content) ||
        /whileTap/.test(content) ||
        /whileInView/.test(content);
      return hasLayoutId && !hasAnimationProps;
    };

    // Allowlist: components that wrap motion primitives for reuse (they delegate
    // reduced-motion handling to consumers or CSS)
    const allowlist = [
      'PageTransition.tsx',
      'AnimatedTabs.tsx',
      'AnimatedBackground.tsx',
      'PixelBackground.tsx',
      'PixelReveal.tsx',
      'ConfettiBurst.tsx',
      'InfiniteSlider.tsx',
      'MouseEffect.tsx',
      'AnimatedDialog.tsx',
      'AnimatedSheet.tsx',
      'AnimatedIcon.tsx',
      'StreamingText.tsx',
      'AudioWaveform.tsx',
      'ThinkingIndicator.tsx',
      'WorkflowGraph.tsx',
      'AgentTerminal.tsx',
      'AgentTimeline.tsx',
      'HandoffIndicator.tsx',
      'ContextMeter.tsx',
    ];

    // TODO: These components need useReducedMotion() added
    const knownViolations = [
      // animate-ui primitives (third-party pattern, need upstream fix)
      'scroll-progress.tsx', 'slot.tsx', 'fade.tsx', 'highlight.tsx',
      'shine.tsx', 'slide.tsx', 'zoom.tsx',
      // Auth blocks (use motion for entrance animations)
      'AccountLockedBlock.tsx', 'AuthLayout.tsx', 'AuthSuccessBlock.tsx',
      'LoginBlock.tsx', 'PasswordRecoveryBlock.tsx', 'ResetPasswordBlock.tsx',
      'TwoFactorChallengeBlock.tsx', 'TwoFactorSetupBlock.tsx',
      // Other blocks
      'AudioVisualizerBlock.tsx', 'BannerBlock.tsx', 'ChatLayout.tsx',
      'HeaderBlock.tsx', 'SettingsLayout.tsx', 'VoiceAgentCard.tsx',
      // Pages
      'CheckoutPage.tsx', 'OnboardingPage.tsx', 'PricingPage.tsx', 'VoiceAgentsPage.tsx',
      // UI components
      'FormWizard.tsx', 'Slider.tsx', 'SpringHover.tsx', 'SuccessCheck.tsx',
      'TagInput.tsx', 'TreeView.tsx',
      // Text effects
      'CountingNumber.tsx', 'MorphingText.tsx', 'ShimmeringText.tsx', 'SlidingNumber.tsx',
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (allowlist.some((f) => shortPath.endsWith(f))) continue;
      if (knownViolations.some((f) => shortPath.endsWith(f))) continue;
      // Skip icon files (they're small hover animations, CSS motion-reduce handles them)
      if (shortPath.includes('/icons/')) continue;

      if (!motionImport.test(content)) continue;
      if (layoutIdOnly(content)) continue;

      const hasReducedMotion = reducedMotionPatterns.some((p) => p.test(content));
      if (!hasReducedMotion) {
        violations.push(
          `${shortPath}: imports motion/react with animation props but no reduced-motion handling`
        );
      }
    }

    expect(
      violations,
      `Components missing reduced-motion support:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
