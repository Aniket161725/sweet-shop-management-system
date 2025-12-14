import { useState } from "react";

const RestockSweet = ({ sweetId, onRestock }) => {
  const [amount, setAmount] = useState("");

  const handleRestock = () => {
    if (!amount || amount <= 0) return;

    onRestock && onRestock({ id: sweetId, amount: Number(amount) });
    setAmount("");
  };

  return (
    <div className="d-flex gap-2 mt-2">
      <input
        type="number"
        className="form-control"
        style={{ background: "#FFFBEA" }}
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="btn"
        style={{ background: "#FFB84D", color: "white" }}
        onClick={handleRestock}
      >
        Restock
      </button>
    </div>
  );
};

export default RestockSweet;
