import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AnnouncementBanner } from './AnnouncementBanner';

describe('AnnouncementBanner', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders banner with children', () => {
    render(<AnnouncementBanner>New release!</AnnouncementBanner>);
    expect(screen.getByText('New release!')).toBeInTheDocument();
  });

  it('has role="banner"', () => {
    render(<AnnouncementBanner>Test</AnnouncementBanner>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<AnnouncementBanner variant="warning">Warning</AnnouncementBanner>);
    expect(screen.getByRole('banner')).toHaveClass('bg-warning');
  });

  it('dismisses when close button is clicked', () => {
    render(<AnnouncementBanner storageKey="test-dismiss">Dismiss me</AnnouncementBanner>);
    fireEvent.click(screen.getByLabelText('Dismiss announcement'));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('persists dismissal in localStorage', () => {
    render(<AnnouncementBanner storageKey="test-key">Persist</AnnouncementBanner>);
    fireEvent.click(screen.getByLabelText('Dismiss announcement'));
    expect(localStorage.getItem('test-key')).toBe('true');
  });

  it('does not render if previously dismissed', () => {
    localStorage.setItem('pre-dismissed', 'true');
    render(<AnnouncementBanner storageKey="pre-dismissed">Hidden</AnnouncementBanner>);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
