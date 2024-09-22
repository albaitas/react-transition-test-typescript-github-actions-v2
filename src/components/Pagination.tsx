import { PaginationProps } from "../types";

const Pagination = ({
  commentsPerPage,
  totalComments,
  paginate,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  // Helper function to handle pagination buttons dynamically
  const generatePageNumbers = () => {
    const pageNumbers = [];

    // Always show the "Prev" button
    pageNumbers.push(
      <li key="prev" className="page-item">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </li>,
    );

    // Show the first page and add ellipsis if necessary
    pageNumbers.push(
      <li key={1} className={`page-item ${currentPage === 1 ? "active" : ""}`}>
        <button onClick={() => paginate(1)} className="page-link">
          1
        </button>
      </li>,
    );

    if (currentPage > 3) {
      pageNumbers.push(
        <li key="ellipsis-start" className="page-item">
          <button className="page-link">...</button>
        </li>,
      );
    }

    // Calculate middle page range
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button onClick={() => paginate(i)} className="page-link">
            {i}
          </button>
        </li>,
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <li key="ellipsis-end" className="page-item">
          <button className="page-link">...</button>
        </li>,
      );
    }

    // Show the last page number
    if (totalPages > 1) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <button onClick={() => paginate(totalPages)} className="page-link">
            {totalPages}
          </button>
        </li>,
      );
    }

    // Always show the "Next" button
    pageNumbers.push(
      <li key="next" className="page-item">
        <button
          onClick={() => paginate(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>,
    );

    return pageNumbers;
  };

  return (
    <>
      <ul className="pagination">{generatePageNumbers()}</ul>
    </>
  );
};

export default Pagination;
