import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages/2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="flex justify-center gap-2">
      <button 
        onClick={() => onPageChange(1)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded transition ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(totalPages)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;