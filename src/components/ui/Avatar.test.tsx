import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarFallback } from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies custom className to root', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('custom-avatar');
  });

  it('forwards ref to root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
