import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/navigation';
import styles from './page.module.scss';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className={styles.mainContainer}>
      <h2>{t('title')}</h2>

      <div>
        <Image
          src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/079.png"
          alt="Author's portrait"
          className={styles.img}
          width={300}
          height={300}
        />

        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.phrase}>
            {t('text')}
          </div>
        ))}
      </div>

      <p>
        {t('developedFor')}{' '}
        <Link href="https://rs.school/courses/reactjs" target="_blank">
          RSSchool React Course
        </Link>
      </p>

      <Link href="/">{t('toHome')}</Link>
    </main>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}
