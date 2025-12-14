import { useEffect, useState } from "react";
import SweetGrid from "../components/sweets/SweetGrid";
import SweetPagination from "../components/sweets/SweetPagination";
import SweetFilter from "../components/sweets/SweetFilters";
import AddSweet from "../components/sweets/AddSweet";
import UpdateSweet from "../components/sweets/UpdateSweet";
import DeleteSweet from "../components/sweets/DeleteSweet";
import RestockSweet from "../components/sweets/RestockSweet";

import useSweets from "../hooks/useSweets";

import {
  getAllSweetsApi,
  addSweetApi,
  updateSweetApi,
  deleteSweetApi,
  purchaseSweetApi,
  restockSweetApi,
  searchSweetsApi,
} from "../services/sweetApi";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);

  const {
    page,
    currentSweets,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
    setSearch,
    setCategory,
  } = useSweets(sweets);

  // ----------------------------
  // 1) LOAD SWEETS FROM BACKEND
  // ----------------------------
  const loadSweets = async () => {
    try {
      const res = await getAllSweetsApi();
      setSweets(res.data.sweets || []);
    } catch (err) {
      console.error("Failed to load sweets", err);
      alert("Error loading sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // ----------------------------
  // 2) ADD SWEET
  // ----------------------------
  const handleAddSweet = async (data) => {
    try {
      const res = await addSweetApi(data);
      setSweets((prev) => [...prev, res.data.sweet]);
      alert("Sweet added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add sweet");
    }
  };

  // ----------------------------
  // 3) UPDATE SWEET
  // ----------------------------
  const handleUpdateSweet = async (updated) => {
    try {
      const res = await updateSweetApi(updated._id, updated);

      setSweets((prev) =>
        prev.map((s) => (s._id === updated._id ? res.data.sweet : s))
      );

      setEditingSweet(null);
      alert("Sweet updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ----------------------------
  // 4) DELETE SWEET
  // ----------------------------
  const handleDeleteSweet = async (id) => {
    try {
      await deleteSweetApi(id);

      setSweets((prev) => prev.filter((s) => s._id !== id));
      alert("Sweet deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ----------------------------
  // 5) PURCHASE SWEET
  // ----------------------------
  const handlePurchaseSweet = async (id) => {
    try {
      const res = await purchaseSweetApi(id);

      setSweets((prev) =>
        prev.map((sweet) =>
          sweet._id === id ? res.data.sweet : sweet
        )
      );

      alert("Purchase successful!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  // ----------------------------
  // 6) RESTOCK SWEET
  // ----------------------------
  const handleRestockSweet = async ({ id, amount }) => {
    try {
      const res = await restockSweetApi(id, amount);

      setSweets((prev) =>
        prev.map((s) => (s._id === id ? res.data.sweet : s))
      );

      alert("Restocked successfully!");
    } catch (err) {
      console.error(err);
      alert("Restock failed");
    }
  };

  // ----------------------------
  // 7) SEARCH + FILTER
  // ----------------------------
  const handleSearch = async (name) => {
    setSearch(name);

    try {
      const res = await searchSweetsApi(name);
      setSweets(res.data.sweets || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryFilter = async (category) => {
    setCategory(category);

    try {
      const res = await searchSweetsApi("", category);
      setSweets(res.data.sweets || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------
  // RENDER UI
  // ----------------------------
  return (
    <div>
      <h1>Sweet Shop Dashboard</h1>

      {/* FILTERS */}
      <SweetFilter
        onSearch={handleSearch}
        onCategoryChange={handleCategoryFilter}
      />

      {/* ADD SWEET */}
      <AddSweet onSubmit={handleAddSweet} />

      {/* UPDATE SWEET */}
      {editingSweet && (
        <UpdateSweet sweet={editingSweet} onUpdate={handleUpdateSweet} />
      )}

      {/* SWEETS GRID */}
      <SweetGrid
        sweets={currentSweets}
        onEdit={(sweet) => setEditingSweet(sweet)}
        onDelete={handleDeleteSweet}
        onRestock={handleRestockSweet}
        onPurchase={handlePurchaseSweet}
      />

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
