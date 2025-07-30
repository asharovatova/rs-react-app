import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Pagination Component', () => {
  const user = userEvent.setup();
  const mockOnPageChange = vi.fn();

  it('renders page buttons with active state', () => {
    render(
      <Pagination total={10} currentPage={3} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toHaveAttribute(
      'class',
      expect.stringContaining('active')
    );
    expect(screen.getByTestId('end-ellipsis')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders first page button and ellipsis when needed', async () => {
    render(
      <Pagination total={10} currentPage={5} onPageChange={mockOnPageChange} />
    );

    const firstPageBtn = screen.getByRole('button', { name: '1' });
    const ellipsis = screen.getByTestId('start-ellipsis');

    expect(firstPageBtn).toBeInTheDocument();
    expect(ellipsis).toBeInTheDocument();

    await user.click(firstPageBtn);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with correct page number', async () => {
    render(
      <Pagination total={5} currentPage={2} onPageChange={mockOnPageChange} />
    );

    await user.click(screen.getByText('4'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('handles prev/next navigation', async () => {
    render(
      <Pagination total={5} currentPage={1} onPageChange={mockOnPageChange} />
    );

    await user.click(screen.getByText('>'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    expect(screen.getByText('<')).toBeDisabled();
  });
});
