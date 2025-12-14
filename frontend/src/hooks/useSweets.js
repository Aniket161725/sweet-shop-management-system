import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useSweets = () => {
  const [sweets, setSweets] = useState([]);   // NEW: real data from backend
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // NEW: Fetch sweets from backend
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sweets");
        setSweets(res.data.sweets);
      } catch (err) {
        console.log("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  // Pagination logic — your original logic, extended
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
    hasNext: page < maxPage,
    hasPrev: page > 1,
  };
};

export default useSweets;

