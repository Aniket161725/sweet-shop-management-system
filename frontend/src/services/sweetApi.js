import axios from "axios";

const API = "http://localhost:5000/api/sweets";

// Include token with every request
const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* -----------------------------------
   1) ADD SWEET  (ADMIN)
-------------------------------------- */
export const addSweetApi = (data) =>
  axios.post(API, data, auth());

/* -----------------------------------
   2) GET ALL SWEETS
-------------------------------------- */
export const getAllSweetsApi = () =>
  axios.get(API, auth());

/* -----------------------------------
   3) SEARCH SWEETS
-------------------------------------- */
export const searchSweetsApi = (name = "", category = "") =>
  axios.get(`${API}/search`, {
    params: { name, category },
    ...auth(),
  });

/* -----------------------------------
   4) UPDATE SWEET (ADMIN)
-------------------------------------- */
export const updateSweetApi = (id, data) =>
  axios.put(`${API}/${id}`, data, auth());

/* -----------------------------------
   5) DELETE SWEET (ADMIN)
-------------------------------------- */
export const deleteSweetApi = (id) =>
  axios.delete(`${API}/${id}`, auth());

/* -----------------------------------
   6) PURCHASE SWEET (USER)
-------------------------------------- */
export const purchaseSweetApi = (id) =>
  axios.post(`${API}/${id}/purchase`, {}, auth());

/* -----------------------------------
   7) RESTOCK SWEET (ADMIN)
   Backend expects: { amount: number }
-------------------------------------- */
export const restockSweetApi = (id, amount) =>
  axios.post(`${API}/${id}/restock`, { amount }, auth());
