'use client';

import styles from '../app/[locale]/page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { clearSelectedItems } from '../store/selectedItemsSlice';
import { useTranslations } from 'next-intl';
import { exportToCSV } from '../actions/exportCSV';
import { downloadFile } from '../utils/downloadFile';

export const Flyout = () => {
  const t = useTranslations('flyout');
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedItems.selectedPokemons
  );

  if (selectedPokemons.length === 0) return null;

  const handleDownload = async () => {
    try {
      const { csvContent, filename } = await exportToCSV(selectedPokemons);

      downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
    } catch (error) {
      console.error('Failed to export CSV:', error);
    }
  };

  return (
    <div className={styles.flyout}>
      <span>
        {selectedPokemons.length} {t('itemsSelected')}
      </span>

      <div className={styles.flexRow}>
        <button onClick={() => dispatch(clearSelectedItems())}>
          {t('unselectAll')}
        </button>

        <button className={styles.buttonDownload} onClick={handleDownload}>
          {t('download')}
        </button>
      </div>
    </div>
  );
};
