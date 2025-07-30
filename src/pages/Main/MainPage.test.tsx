import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('../../components/Main/Main', () => ({
  Main: () => <div data-testid="main-component">Main Component</div>,
}));

describe('MainPage Component', () => {
  it('renders Main component inside container', () => {
    render(<MainPage />);

    const container = screen.getByTestId('main-page-container');
    expect(container).toBeInTheDocument();

    expect(screen.getByTestId('main-component')).toBeInTheDocument();
  });
});
