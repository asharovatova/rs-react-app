import { Results } from './Results';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

describe('Results Component', () => {
  it('displays "Results" heading', () => {
    render(<Results pokemons={[]} isLoading={false} />);
    expect(
      screen.getByRole('heading', { name: 'Results' })
    ).toBeInTheDocument();
  });
});
