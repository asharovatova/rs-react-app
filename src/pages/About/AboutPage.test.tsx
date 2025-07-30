import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('AboutPage Component', () => {
  it('renders correctly with all sections', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    const image = screen.getByAltText("Author's portrait");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/079.png'
    );

    const phrases = screen.getAllByText('I WILL DELIVER PROJECTS ON TIME');
    expect(phrases.length).toBe(10);

    const courseLink = screen.getByRole('link', {
      name: 'RSSchool React Course',
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');

    const homeLink = screen.getByRole('link', { name: 'Go to Home Page' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
