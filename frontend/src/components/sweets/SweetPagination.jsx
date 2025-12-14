const SweetPagination = ({ page, nextPage, prevPage, hasNext, hasPrev }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4 gap-3">

      <button
        className="btn btn-outline-warning"
        disabled={!hasPrev}
        onClick={prevPage}
      >
        ⬅ Previous
      </button>

      <span
        className="px-3 py-2 rounded"
        style={{
          background: "#FFE9A6",
          border: "1px solid #F2D585",
          color: "#6A4A00",
          fontWeight: "bold",
        }}
      >
        Page {page}
      </span>

      <button
        className="btn btn-warning"
        disabled={!hasNext}
        onClick={nextPage}
      >
        Next ➡
      </button>

    </div>
  );
};

export default SweetPagination;
