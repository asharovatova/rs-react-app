import styles from '../pages/Main/MainPage.module.scss';

interface PaginationProps {
  total: number;
  page: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ total, setPage }: PaginationProps) => {
  const pages = new Array(total).fill(0).map((_, index) => index + 1);

  return (
    <div className={styles.paginationWrapper}>
      {pages.map((num) => (
        <button
          key={num}
          // className={
          //   num === page
          //     ? clsx(styles.paginationButton, styles.selected)
          //     : styles.paginationButton
          // }
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
