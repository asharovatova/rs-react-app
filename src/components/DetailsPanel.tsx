import styles from '../app/[locale]/page.module.scss';

import { useGetPokemonByNameOrIdQuery } from '../api/pokemonApi';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { NO_IMAGE_AVAILABLE } from '../utils/constants';
import { useTranslations } from 'next-intl';

interface DetailsPanelProps {
  id: string;
}

export const DetailsPanel = ({ id }: DetailsPanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('details');

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
        <div>{t('loading')}</div>
      ) : isError ? (
        <div>{t('error')}</div>
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

          <p>
            {t('height')}: {pokemon?.height}
          </p>
          <p>
            {t('weight')}: {pokemon?.weight}
          </p>
          <h3 className={styles.headingStats}>{t('stats')}:</h3>
          {pokemon?.stats.map((stat, i) => (
            <p key={i}>
              {t(stat.stat.name)}: {stat.base_stat}
            </p>
          ))}
        </>
      )}
    </section>
  );
};
