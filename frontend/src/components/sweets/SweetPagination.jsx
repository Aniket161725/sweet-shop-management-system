const SweetPagination = ({ page, nextPage, prevPage, hasNext, hasPrev }) => {
  return (
    <div>
      <button onClick={prevPage} disabled={!hasPrev}>
        Previous
      </button>

      <button onClick={nextPage} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

export default SweetPagination;
