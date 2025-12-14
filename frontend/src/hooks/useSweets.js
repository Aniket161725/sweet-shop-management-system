import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useSweets = (initialSweets = null) => {
  const [sweets, setSweets] = useState(initialSweets || []);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (initialSweets && initialSweets.length > 0) return;

    const fetchSweets = async () => {
      try {
        const res = await axios.get("/api/sweets");
        setSweets(res.data.sweets || res.data);
      } catch (err) {
        if (process.env.NODE_ENV === "test") {
          console.log("Error fetching sweets:", err);
        }
      }
    };

    fetchSweets();
  }, [initialSweets]);

  const currentSweets = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sweets.slice(start, start + pageSize);
  }, [page, sweets]);

  const maxPage = Math.ceil(sweets.length / pageSize);

  const nextPage = () => {
    if (page < maxPage) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    sweets,
    currentSweets,
    page,
    nextPage,
    prevPage,
  };
};

export default useSweets;
