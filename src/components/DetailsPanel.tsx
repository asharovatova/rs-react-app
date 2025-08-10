import styles from '../pages/Main/MainPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemonByNameOrIdQuery } from '../api/pokemonApi';

interface DetailsPanelProps {
  id: string;
}

export const DetailsPanel = ({ id }: DetailsPanelProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonByNameOrIdQuery(id);

  const handleClose = () => {
    navigate(`?page=${currentPage}`);
  };

  return (
    <section data-testid="details-panel" className={styles.detailsPanel}>
      <button className={styles.buttonClose} onClick={handleClose}>
        ×
      </button>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Failed to load pokemon details</div>
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
