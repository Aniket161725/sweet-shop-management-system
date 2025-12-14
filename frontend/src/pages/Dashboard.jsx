import SweetGrid from "../components/sweets/SweetGrid";
import SweetPagination from "../components/sweets/SweetPagination";
import useSweets from "../hooks/useSweets";

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

      <SweetGrid sweets={currentSweets} />

      <SweetPagination
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        hasNext={true}
        hasPrev={page > 1}
      />
    </div>
  );
};

export default Dashboard;
