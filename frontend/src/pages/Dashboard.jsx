import { useEffect, useState } from "react";

import SweetGrid from "../components/sweets/SweetGrid";
import SweetPagination from "../components/sweets/SweetPagination";
import SweetFilter from "../components/sweets/SweetFilters";
import AddSweet from "../components/sweets/AddSweet";
import UpdateSweet from "../components/sweets/UpdateSweet";

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

  // hook for pagination + client-side slicing
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
  // LOAD SWEETS FROM BACKEND
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
  // ADD SWEET
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
  // UPDATE SWEET
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
  // DELETE SWEET
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
  // PURCHASE SWEET
  // ----------------------------
  const handlePurchaseSweet = async (id) => {
    try {
      const res = await purchaseSweetApi(id);

      setSweets((prev) =>
        prev.map((sweet) => (sweet._id === id ? res.data.sweet : sweet))
      );

      alert("Purchase successful!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  // ----------------------------
  // RESTOCK SWEET
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
  // SEARCH BY NAME
  // ----------------------------
  const handleSearch = async (name) => {
    setSearch(name);

    try {
      const res = await searchSweetsApi(name);
      setSweets(res.data.sweets || []);
    } catch (err) {
      console.error("Search error: ", err);
    }
  };

  // ----------------------------
  // FILTER BY CATEGORY
  // ----------------------------
  const handleCategoryFilter = async (category) => {
    setCategory(category);

    try {
      const res = await searchSweetsApi("", category);
      setSweets(res.data.sweets || []);
    } catch (err) {
      console.error("Category filter error: ", err);
    }
  };

  // ----------------------------
  // RENDER UI
  // ----------------------------
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: "#B05E00" }}>
        🍬 Sweet Shop Dashboard
      </h1>

      <SweetFilter
        onSearch={handleSearch}
        onCategoryChange={handleCategoryFilter}
      />

      <AddSweet onSubmit={handleAddSweet} />

      {editingSweet && (
        <UpdateSweet sweet={editingSweet} onUpdate={handleUpdateSweet} />
      )}

      <SweetGrid
        sweets={currentSweets}
        onEdit={(sweet) => setEditingSweet(sweet)}
        onDelete={handleDeleteSweet}
        onRestock={handleRestockSweet}
        onPurchase={handlePurchaseSweet}
      />

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
