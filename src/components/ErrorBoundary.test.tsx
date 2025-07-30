import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

const ErrorComponent = () => {
  throw new Error('Test Error');
  return null;
};

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
    expect(screen.queryByText('Error occurred')).not.toBeInTheDocument();
  });

  it('renders fallback when error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
