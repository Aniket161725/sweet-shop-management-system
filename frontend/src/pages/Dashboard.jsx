import SweetGrid from "../components/sweets/SweetGrid";
import SweetPagination from "../components/sweets/SweetPagination";
import useSweets from "../hooks/useSweets";
import SweetFilter from "../components/sweets/SweetFilters";

const {
  page,
  currentSweets,
  nextPage,
  prevPage,
  hasNext,
  hasPrev,
  setSearch,
  setCategory,
} = useSweets();

const mockSweets = Array.from({ length: 25 }).map((_, i) => ({
  name: `Sweet ${i + 1}`,
  price: 100,
  quantity: 5,
  image: "img.jpg",
}));

const Dashboard = () => {
  const {
    page,
    currentSweets,
    nextPage,
    prevPage,
  } = useSweets(mockSweets);

  return (
  <div>
    <h1>Sweet Shop Dashboard</h1>

    {/* FILTERS GO HERE */}
    <SweetFilter
      onSearch={setSearch}
      onCategoryChange={setCategory}
    />

    {/* SWEETS GRID */}
    <SweetGrid sweets={currentSweets} />

    {/* PAGINATION */}
    <SweetPagination
      page={page}
      nextPage={nextPage}
      prevPage={prevPage}
      hasNext={hasNext}
      hasPrev={hasPrev}
    />
  </div>
);
};

export default Dashboard;
