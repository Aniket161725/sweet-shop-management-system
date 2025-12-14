import { useState } from "react";

const RestockSweet = ({ sweetId, onRestock }) => {
  const [amount, setAmount] = useState("");

  const handleRestock = () => {
    onRestock &&
      onRestock({
        id: sweetId,
        amount: Number(amount),
      });
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Restock Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleRestock}>
        Restock
      </button>
    </div>
  );
};

export default RestockSweet;
