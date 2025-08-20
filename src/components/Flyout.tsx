import styles from '../app/page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { clearSelectedItems } from '../store/selectedItemsSlice';
import saveAs from 'file-saver';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedItems.selectedPokemons
  );

  if (selectedPokemons.length === 0) return null;

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Name', 'Sprite'],
      ...selectedPokemons.map((item) => [item.id, item.name, item.sprite]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedPokemons.length}_pokemons.csv`);
  };

  return (
    <div className={styles.flyout}>
      <span>{selectedPokemons.length} items selected</span>

      <div className={styles.flexRow}>
        <button onClick={() => dispatch(clearSelectedItems())}>
          Unselect&nbsp;all
        </button>

        <button className={styles.buttonDownload} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
