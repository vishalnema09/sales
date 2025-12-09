// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, pages, onPageChange }) {
  const visiblePages = Array.from({ length: pages }, (_, index) => index + 1).slice(0, 10);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing page {page} of {pages}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {visiblePages.map((currentPage) => (
          <button
            key={currentPage}
            onClick={() => onPageChange(currentPage)}
            className={`px-3 py-1 border rounded ${currentPage === page ? "bg-gray-800 text-white" : "bg-white"}`}
          >
            {currentPage}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page >= pages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
