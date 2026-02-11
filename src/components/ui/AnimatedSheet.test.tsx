import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/lib/motion', () => ({
  motionSpring: { gentle: {} },
  useMotionConfig: () => ({}),
}))

import {
  AnimatedSheet,
  AnimatedSheetTrigger,
  AnimatedSheetHeader,
  AnimatedSheetFooter,
} from './AnimatedSheet'

describe('AnimatedSheet', () => {
  it('renders trigger without crashing', () => {
    render(
      <AnimatedSheet>
        <AnimatedSheetTrigger>Open</AnimatedSheetTrigger>
      </AnimatedSheet>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders header and footer', () => {
    const { container } = render(
      <>
        <AnimatedSheetHeader data-testid="header">Header</AnimatedSheetHeader>
        <AnimatedSheetFooter data-testid="footer">Footer</AnimatedSheetFooter>
      </>
    )
    expect(container).toBeTruthy()
  })
})
