import styles from '../pages/Main/MainPage.module.scss';
interface PaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination = ({
  total,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(total, start + maxVisiblePages - 1);

    start = Math.max(1, end - maxVisiblePages + 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const visiblePages = getVisiblePages();
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  return (
    <div data-testid="pagination" className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.paginationButton}
      >
        &lt;
      </button>

      {firstVisiblePage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {firstVisiblePage > 2 && (
            <span data-testid="start-ellipsis">...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? styles.active : ''}
        >
          {page}
        </button>
      ))}

      {lastVisiblePage < total && (
        <>
          {lastVisiblePage < total - 1 && (
            <span data-testid="end-ellipsis">...</span>
          )}
          <button onClick={() => onPageChange(total)}>{total}</button>
        </>
      )}

      <button
        disabled={currentPage === total}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.paginationButton}
      >
        &gt;
      </button>
    </div>
  );
};
