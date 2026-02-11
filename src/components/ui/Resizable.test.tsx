import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable'

describe('Resizable', () => {
  it('renders ResizablePanelGroup without crashing', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('renders handle with grip icon when withHandle is true', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
