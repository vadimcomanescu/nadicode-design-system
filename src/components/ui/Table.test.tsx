import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Table, TableHeader, TableBody,
  TableRow, TableCell, TableCaption,
} from './Table';

describe('Table', () => {
  it('renders a table element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Table className="custom-table"><TableBody><TableRow><TableCell>X</TableCell></TableRow></TableBody></Table>);
    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('forwards ref to table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<Table ref={ref}><TableBody><TableRow><TableCell>X</TableCell></TableRow></TableBody></Table>);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});

describe('TableHeader', () => {
  it('renders thead', () => {
    const { container } = render(
      <table><TableHeader><tr><th>H</th></tr></TableHeader></table>
    );
    expect(container.querySelector('thead')).toBeInTheDocument();
  });
});

describe('TableRow', () => {
  it('renders tr with hover class', () => {
    const { container } = render(
      <table><tbody><TableRow><td>R</td></TableRow></tbody></table>
    );
    expect(container.querySelector('tr')).toHaveClass('hover:bg-surface-hover/50');
  });
});

describe('TableCaption', () => {
  it('renders caption element', () => {
    render(
      <Table>
        <TableCaption>Caption text</TableCaption>
        <TableBody><TableRow><TableCell>X</TableCell></TableRow></TableBody>
      </Table>
    );
    expect(screen.getByText('Caption text')).toBeInTheDocument();
  });
});
