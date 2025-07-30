import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('NotFoundPage Component', () => {
  it('renders correctly with main elements', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /go to home page/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
