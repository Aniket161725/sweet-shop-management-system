import { useState } from "react";
import { useAuth } from "../../hooks/useAuth2";

const SweetCard = ({ sweet, onEdit, onDelete, onRestock, onPurchase }) => {
  const { isAdmin } = useAuth();
  const [quantity, setQuantity] = useState(sweet.quantity);

  const handlePurchaseClick = () => {
    if (onPurchase) onPurchase(sweet._id);
  };

  return (
    <div
      className="card shadow-sm p-2"
      style={{
        width: "18rem",
        background: "#FFF7D1",
        border: "1px solid #F4E7A1",
        borderRadius: "12px",
      }}
    >
      <img
        src={sweet.image}
        className="card-img-top rounded"
        alt={sweet.name}
        style={{ maxHeight: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        {/* Sweet Name */}
        <h5 className="card-title" style={{ color: "#B36B00" }}>
          {sweet.name}
        </h5>

        {/* Price & Availability */}
        <p className="card-text">₹ {sweet.price}</p>
        <p className="card-text">
          <strong>Available:</strong> {quantity}
        </p>

        {/* ----------- Actions ----------- */}
        <div className="d-flex flex-column gap-2">

          {/* USER — Only Purchase */}
          {!isAdmin && (
            <button
              className="btn btn-primary"
              disabled={quantity === 0}
              onClick={handlePurchaseClick}
            >
              Purchase
            </button>
          )}

          {/* ADMIN — Edit / Delete / Restock */}
          {isAdmin && (
            <>
              <button
                className="btn btn-warning"
                onClick={() => onEdit && onEdit(sweet)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onDelete && onDelete(sweet._id)}
              >
                Delete
              </button>

              <button
                className="btn btn-success"
                onClick={() => onRestock && onRestock({ id: sweet._id, amount: 1 })}
              >
                + Restock
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default SweetCard;
