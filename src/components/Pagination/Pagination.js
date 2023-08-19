import React from "react";
import "./pagination.css";
function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            style={{
              backgroundColor: currentPage === number && "#007ca0",
              outline: currentPage === number && "1px solid #00a9e0",
              outlineOffset: currentPage === number && "2px",
            }}
            key={number}
            onClick={() => paginate(number)}
            className="pagination-button"
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
