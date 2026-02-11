import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('motion/react', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: () => {
      return (p: Record<string, unknown>) => {
        const { children, className, style } = p
        return <div className={className as string} style={style as React.CSSProperties}>{children as React.ReactNode}</div>
      }
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
  useReducedMotion: () => false,
}))

vi.mock('../../lib/motion', () => ({
  motionSpring: { snappy: {} },
  useMotionConfig: () => ({}),
}))

import { TreeView, type TreeNode } from './TreeView'

const sampleData: TreeNode[] = [
  {
    id: '1',
    label: 'Root',
    children: [
      { id: '1-1', label: 'Child 1' },
      { id: '1-2', label: 'Child 2' },
    ],
  },
  { id: '2', label: 'Leaf' },
]

describe('TreeView', () => {
  it('renders without crashing', () => {
    render(<TreeView data={sampleData} />)
    expect(screen.getByText('Root')).toBeInTheDocument()
    expect(screen.getByText('Leaf')).toBeInTheDocument()
  })

  it('has tree role', () => {
    render(<TreeView data={sampleData} />)
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<TreeView ref={ref} data={sampleData} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('calls onSelect when a leaf node is clicked', async () => {
    const onSelect = vi.fn()
    render(<TreeView data={sampleData} onSelect={onSelect} />)
    await userEvent.setup().click(screen.getByText('Leaf'))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '2', label: 'Leaf' }))
  })
})
