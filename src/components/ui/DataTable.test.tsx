import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

interface TestRow {
  name: string;
  value: number;
}

const columns: ColumnDef<TestRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'value', header: 'Value' },
];

const data: TestRow[] = [
  { name: 'Alpha', value: 1 },
  { name: 'Beta', value: 2 },
];

describe('DataTable', () => {
  it('renders table with data rows', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('shows "No results." when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('renders pagination buttons', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('shows row selection count', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText(/0 of 2 row\(s\) selected/)).toBeInTheDocument();
  });
});
