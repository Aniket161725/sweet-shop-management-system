import { useState, useMemo } from "react";

const useSweets = (sweets = []) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const currentSweets = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sweets.slice(start, start + pageSize);
  }, [page, sweets]);

  const nextPage = () => {
    const maxPage = Math.ceil(sweets.length / pageSize);
    if (page < maxPage) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    page,
    currentSweets,
    nextPage,
    prevPage,
  };
};

export default useSweets;
