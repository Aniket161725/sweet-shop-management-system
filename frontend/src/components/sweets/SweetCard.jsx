import axios from "axios";
import { useState } from "react";

const SweetCard = ({ sweet }) => {
  const [quantity, setQuantity] = useState(sweet.quantity);

  const handlePurchase = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/sweets/${sweet._id}/purchase`
      );

      setQuantity((prev) => prev - 1);
      alert("Sweet purchased successfully!");
    } catch (err) {
      console.log(err);
      alert("Purchase failed");
    }
  };

  return (
    <div className="card" style={{ width: "18rem", marginBottom: "20px" }}>
      <img src={sweet.image} className="card-img-top" alt={sweet.name} />
      <div className="card-body">
        <h5 className="card-title">{sweet.name}</h5>
        <p className="card-text">₹ {sweet.price}</p>
        <p className="card-text">In Stock: {quantity}</p>

        <button
          className="btn btn-primary"
          disabled={quantity === 0}
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
