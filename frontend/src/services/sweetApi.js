import axios from "axios";

const API = "http://localhost:5000/api/sweets";

const auth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

//
// CREATE SWEET (Admin)
//
export const addSweetApi = (data) =>
  axios.post(API, data, auth());

//
// GET ALL SWEETS
//
export const getAllSweetsApi = () =>
  axios.get(API, auth());

//
// SEARCH SWEETS
//
export const searchSweetsApi = (name, category) =>
  axios.get(`${API}/search`, {
    params: { name, category },
    ...auth(),
  });

//
// UPDATE SWEET (Admin)
//
export const updateSweetApi = (id, data) =>
  axios.put(`${API}/${id}`, data, auth());

//
// DELETE SWEET (Admin)
//
export const deleteSweetApi = (id) =>
  axios.delete(`${API}/${id}`, auth());

//
// PURCHASE SWEET (User)
//
export const purchaseSweetApi = (id) =>
  axios.post(`${API}/${id}/purchase`, {}, auth());

//
// RESTOCK SWEET (Admin)
// NOTE: backend expects: { quantity: 5 }
//
export const restockSweetApi = (id, quantity) =>
  axios.post(`${API}/${id}/restock`, { quantity }, auth());
