import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './Form';
import { Input } from './Input';

function TestForm({ defaultValues, onSubmit }: { defaultValues?: { name: string }; onSubmit?: (data: { name: string }) => void }) {
  const form = useForm({ defaultValues: defaultValues ?? { name: '' } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormDescription>Your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

function ErrorForm() {
  const form = useForm({ defaultValues: { email: '' } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('renders form fields with label and description', () => {
    render(<TestForm />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Your full name.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<TestForm />);
    const label = screen.getByText('Name');
    const input = screen.getByPlaceholderText('Enter name');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('accepts user input in a controlled field', async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText('Enter name');
    await user.type(input, 'Alice');
    expect(input).toHaveValue('Alice');
  });

  it('displays validation error message on submit', async () => {
    const user = userEvent.setup();
    render(<ErrorForm />);
    await user.click(screen.getByText('Submit'));
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('marks input as aria-invalid when there is an error', async () => {
    const user = userEvent.setup();
    render(<ErrorForm />);
    await user.click(screen.getByText('Submit'));
    await screen.findByText('Email is required');
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
