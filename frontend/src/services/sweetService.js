import axios from "axios";

export const purchaseSweet = async (id) => {
  return axios.post(`http://localhost:5000/api/sweets/${id}/purchase`, null, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
