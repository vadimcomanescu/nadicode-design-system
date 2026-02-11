import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AgentAvatar } from './AgentAvatar';

describe('AgentAvatar', () => {
  const defaultProps = { src: '/avatar.png', name: 'Agent' };

  it('renders an image with the provided src and alt', () => {
    render(<AgentAvatar {...defaultProps} />);
    const img = screen.getByAltText('Agent');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('renders as a button element', () => {
    render(<AgentAvatar {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sets aria-label with name and state', () => {
    render(<AgentAvatar {...defaultProps} state="speaking" />);
    expect(screen.getByLabelText('Agent - speaking')).toBeInTheDocument();
  });

  it('defaults state to idle', () => {
    render(<AgentAvatar {...defaultProps} />);
    expect(screen.getByLabelText('Agent - idle')).toBeInTheDocument();
  });

  it('forwards ref to button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<AgentAvatar ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies custom className', () => {
    render(<AgentAvatar {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
