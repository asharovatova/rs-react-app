import styles from '../app/page.module.scss';

import { useGetPokemonByNameOrIdQuery } from '../api/pokemonApi';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { NO_IMAGE_AVAILABLE } from '../utils/constants';

interface DetailsPanelProps {
  id: string;
}

export const DetailsPanel = ({ id }: DetailsPanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const currentPage = searchParams?.get('page') || '1';

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonByNameOrIdQuery(id);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');
    router.push(`?${params.toString()}`);
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
          <Image
            src={pokemon?.sprites.front_default || NO_IMAGE_AVAILABLE}
            alt={pokemon?.name || 'No Pokemon images'}
            className={styles.detailsImg}
            width={160}
            height={160}
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
