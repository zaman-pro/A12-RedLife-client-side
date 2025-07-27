const PaginationControls = ({
  itemPerPage,
  currentPage,
  totalPages,
  setItemPerPage,
  onPageChange,
}) => {
  const pages = [...Array(totalPages).keys()];

  return (
    <div className="flex items-center flex-wrap gap-2">
      <label className="font-medium">Items per page:</label>
      <select
        value={itemPerPage}
        onChange={(e) => {
          setItemPerPage(parseInt(e.target.value));
          onPageChange(1);
        }}
        className="select focus:outline-none select-sm w-20"
      >
        {[3, 5, 10, 20].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-sm"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page + 1)}
          className={`btn btn-sm ${
            currentPage === page + 1 ? "btn-secondary text-white" : ""
          }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-sm"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
