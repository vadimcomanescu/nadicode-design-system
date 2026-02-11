import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './Toast'

describe('Toast', () => {
  it('renders ToastProvider and ToastViewport without crashing', () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    )
    expect(container).toBeTruthy()
  })

  it('renders Toast with title and description', () => {
    const { getByText } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Operation completed</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(getByText('Success')).toBeInTheDocument()
    expect(getByText('Operation completed')).toBeInTheDocument()
  })

  it('renders destructive variant', () => {
    const { getByText } = render(
      <ToastProvider>
        <Toast open variant="destructive">
          <ToastTitle>Error</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(getByText('Error')).toBeInTheDocument()
  })
})
