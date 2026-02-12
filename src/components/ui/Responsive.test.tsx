import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ResizablePanelGroup, ResizablePanel } from './Resizable'
import { ResponsivePanel, ResponsiveHandle } from './Responsive'

describe('ResponsivePanel', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal">
        <ResponsivePanel>Content</ResponsivePanel>
        <ResizablePanel>Other</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(container).toBeTruthy()
  })
})

describe('ResponsiveHandle', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResponsiveHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(container).toBeTruthy()
  })
})
