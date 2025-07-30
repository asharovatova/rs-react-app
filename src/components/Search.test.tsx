import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@testing-library/user-event';

describe('Search Component', () => {
  it('renders search input and button', () => {
    render(<Search initialValue="" onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays initial value from props', () => {
    render(<Search initialValue="pikachu" onSearch={vi.fn()} />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('shows empty input when no initial value', () => {
    render(<Search initialValue="" onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search Pokemon...')).toHaveValue('');
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<Search initialValue="" onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'charizard');

    expect(input).toHaveValue('charizard');
  });

  it('triggers onSearch with input value', async () => {
    const mockSearch = vi.fn();
    const user = userEvent.setup();
    render(<Search initialValue="" onSearch={mockSearch} />);

    await user.type(screen.getByRole('textbox'), 'bulbasaur');
    await user.click(screen.getByRole('button'));

    expect(mockSearch).toHaveBeenCalledWith('bulbasaur');
  });
});
