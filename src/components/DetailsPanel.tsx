import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../api/getPokemons';
import styles from '../pages/Main/MainPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { PokemonDetails } from '../types/pokemon';

interface DetailsPanelProps {
  id: string;
}

export const DetailsPanel = ({ id }: DetailsPanelProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsError, setDetailsError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        setIsLoading(true);
        setDetailsError(null);
        const data = await getPokemonDetails(id);

        console.log('details', data);
        setPokemon(data);
      } catch (err) {
        setDetailsError(
          err instanceof Error
            ? err
            : new Error('Failed to load pokemon details')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemonDetails();
  }, [id]);

  const handleClose = () => {
    navigate(`?page=${currentPage}`);
  };

  return (
    <section className={styles.detailsPanel}>
      <button className={styles.buttonClose} onClick={handleClose}>
        ×
      </button>

      {isLoading ? (
        <div>Loading...</div>
      ) : detailsError ? (
        <div>{detailsError.message}</div>
      ) : (
        <>
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
            className={styles.detailsImg}
          />
          <p>#{id}</p>
          <h2>
            {pokemon?.name &&
              pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
          </h2>

          <p>Height: {pokemon?.height}</p>
          <p>Weight: {pokemon?.weight}</p>
          <h3 className={styles.headingStats}>Stats:</h3>
          {pokemon?.stats.map((stat, i) => (
            <p key={i}>
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </>
      )}
    </section>
  );
};
