import React from "react";

const PageButton = ({ disabled, active, children, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={[
      "min-w-[2.25rem] h-9 px-2 rounded-md border text-sm",
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
      disabled ? "opacity-50 cursor-not-allowed" : "",
    ].join(" ")}
    aria-current={active ? "page" : undefined}
  >
    {children}
  </button>
);

const Pagination = ({ page, totalPages, onPageChange, maxButtons = 5 }) => {
  if (totalPages <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className="flex items-center justify-center gap-2 mt-4" aria-label="Pagination">
      <PageButton disabled={page === 1} onClick={() => go(1)}>«</PageButton>
      <PageButton disabled={page === 1} onClick={() => go(page - 1)}>‹</PageButton>

      {start > 1 && <span className="px-1 text-sm">…</span>}
      {pages.map((p) => (
        <PageButton key={p} active={p === page} onClick={() => go(p)}>
          {p}
        </PageButton>
      ))}
      {end < totalPages && <span className="px-1 text-sm">…</span>}

      <PageButton disabled={page === totalPages} onClick={() => go(page + 1)}>›</PageButton>
      <PageButton disabled={page === totalPages} onClick={() => go(totalPages)}>»</PageButton>
    </nav>
  );
};

export default Pagination;