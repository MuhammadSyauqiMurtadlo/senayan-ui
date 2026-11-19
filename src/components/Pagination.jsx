export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      <button
        className="btn btn-secondary btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Sebelumnya
      </button>

      {start > 1 && (
        <>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="dots">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {end < lastPage && (
        <>
          {end < lastPage - 1 && <span className="dots">…</span>}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(lastPage)}
          >
            {lastPage}
          </button>
        </>
      )}

      <button
        className="btn btn-secondary btn-sm"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Berikutnya &raquo;
      </button>
    </nav>
  );
}
