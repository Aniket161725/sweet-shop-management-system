import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import SweetGrid from "../components/sweets/SweetGrid";
import SweetPagination from "../components/sweets/SweetPagination";
import SweetFilter from "../components/sweets/SweetFilters";
import AddSweet from "../components/sweets/AddSweet";
import UpdateSweet from "../components/sweets/UpdateSweet";

import useSweets from "../hooks/useSweets";
import { useAuth } from "../hooks/useAuth2";

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
    const { isAdmin } = useAuth();
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
  // LOAD SWEETS
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
      alert("Sweet deleted");
    } catch (err) {
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
        prev.map((s) => (s._id === id ? res.data.sweet : s))
      );
      alert("Purchase successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  // ----------------------------
  // RESTOCK
  // ----------------------------
  const handleRestockSweet = async ({ id, amount }) => {
    try {
      const res = await restockSweetApi(id, amount);
      setSweets((prev) =>
        prev.map((s) => (s._id === id ? res.data.sweet : s))
      );
      alert("Restocked!");
    } catch (err) {
      alert("Restock failed");
    }
  };

  // ----------------------------
  // SEARCH
  // ----------------------------
  const handleSearch = async (name) => {
    setSearch(name);
    try {
      const res = await searchSweetsApi(name);
      setSweets(res.data.sweets || []);
    } catch (err) {}
  };

  // ----------------------------
  // CATEGORY FILTER
  // ----------------------------
  const handleCategoryFilter = async (category) => {
    setCategory(category);
    try {
      const res = await searchSweetsApi("", category);
      setSweets(res.data.sweets || []);
    } catch (err) {}
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div className="container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="text-center mb-4" style={{ color: "#B05E00" }}>
          🍬 
        </h1>

        {/* FILTERS */}
        <SweetFilter
          onSearch={handleSearch}
          onCategoryChange={handleCategoryFilter}
        />

        {/* -------- ADD FORM (ADMIN ONLY) -------- */}
        {isAdmin && <AddSweet onSubmit={handleAddSweet} />}

        {/* -------- UPDATE FORM (ADMIN ONLY) -------- */}
        {editingSweet && isAdmin && (
          <UpdateSweet sweet={editingSweet} onUpdate={handleUpdateSweet} />
        )}

        {/* -------- SWEETS GRID -------- */}
        <SweetGrid
          sweets={currentSweets}
          onEdit={(s) => isAdmin && setEditingSweet(s)}
          onDelete={isAdmin ? handleDeleteSweet : null}
          onRestock={isAdmin ? handleRestockSweet : null}
          onPurchase={handlePurchaseSweet}  // users can still purchase
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

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Dashboard;
