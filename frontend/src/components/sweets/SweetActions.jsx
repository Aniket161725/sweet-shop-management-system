const SweetActions = ({ sweet, onEdit, onDelete, onRestock, onPurchase }) => {
  return (
    <div className="mt-3 d-flex gap-2">

      <button
        className="btn btn-sm"
        style={{ background: "#FFCE73", color: "#5A3A00" }}
        onClick={() => onEdit(sweet)}
      >
        ✏️ Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(sweet._id)}
      >
        🗑 Delete
      </button>

      <button
        className="btn btn-sm"
        style={{ background: "#A3E635", color: "#1A3A00" }}
        onClick={() => onRestock({ id: sweet._id, amount: 1 })}
      >
        ➕ Restock
      </button>

      <button
        className="btn btn-sm"
        style={{ background: "#FDBA74", color: "#7A3A00" }}
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet._id)}
      >
        🛒 Purchase
      </button>

    </div>
  );
};

export default SweetActions;
