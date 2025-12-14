import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useSweets = (initialSweets = null) => {
  const [sweets, setSweets] = useState(initialSweets || []);
  const [page, setPage] = useState(1);

  // NEW states for search + category filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const pageSize = 10;

  // Fetch sweets when not passed from props
  useEffect(() => {
    if (initialSweets && initialSweets.length > 0) return;

    const fetchSweets = async () => {
      try {
        const res = await axios.get("/api/sweets");
        setSweets(res.data.sweets || res.data);
      } catch (err) {
        if (process.env.NODE_ENV === "test") {
          console.error("Error fetching sweets:", err);
        }
      }
    };

    fetchSweets();
  }, [initialSweets]);

  // FILTERED SWEETS FIRST (search + category)
  const filteredSweets = useMemo(() => {
    return sweets.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category ? item.category === category : true;

      return matchesSearch && matchesCategory;
    });
  }, [sweets, search, category]);

  // PAGINATION BASED ON FILTERED SWEETS
  const maxPage = Math.ceil(filteredSweets.length / pageSize);

  const currentSweets = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSweets.slice(start, start + pageSize);
  }, [page, filteredSweets]);

  // PAGINATION FUNCTIONS
  const nextPage = () => {
    if (page < maxPage) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    sweets,            // full list
    filteredSweets,    // filtered list
    currentSweets,     // paginated filtered list

    page,
    nextPage,
    prevPage,

    hasNext: page < maxPage,
    hasPrev: page > 1,

    // setters for filter component
    setSearch,
    setCategory,
  };
};

export default useSweets;
