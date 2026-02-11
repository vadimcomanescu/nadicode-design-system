import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  it('renders with placeholder when empty', () => {
    render(<TagInput tags={[]} onTagsChange={() => {}} placeholder="Add tag..." />);
    expect(screen.getByPlaceholderText('Add tag...')).toBeInTheDocument();
  });

  it('renders existing tags', () => {
    render(<TagInput tags={['React', 'TypeScript']} onTagsChange={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('adds a tag on Enter', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<TagInput tags={[]} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'NewTag{Enter}');
    expect(onTagsChange).toHaveBeenCalledWith(['NewTag']);
  });

  it('adds a tag on comma', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<TagInput tags={[]} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Tag1,');
    expect(onTagsChange).toHaveBeenCalledWith(['Tag1']);
  });

  it('removes a tag when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<TagInput tags={['React', 'Vue']} onTagsChange={onTagsChange} />);
    await user.click(screen.getByLabelText('Remove React'));
    expect(onTagsChange).toHaveBeenCalledWith(['Vue']);
  });

  it('removes last tag on Backspace when input is empty', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<TagInput tags={['React', 'Vue']} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard('{Backspace}');
    expect(onTagsChange).toHaveBeenCalledWith(['React']);
  });

  it('does not add duplicate tags', async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<TagInput tags={['React']} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'React{Enter}');
    expect(onTagsChange).not.toHaveBeenCalled();
  });

  it('respects maxTags limit', async () => {
    const onTagsChange = vi.fn();
    render(<TagInput tags={['A', 'B']} onTagsChange={onTagsChange} maxTags={2} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('supports disabled state', () => {
    render(<TagInput tags={['Tag']} onTagsChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
