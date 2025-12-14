const SweetActions = ({ sweet, onEdit, onDelete, onRestock, onPurchase }) => {
  return (
    <div className="mt-3 d-flex gap-2">

      <button className="btn btn-warning" onClick={() => onEdit(sweet)}>
        Edit
      </button>

      <button className="btn btn-danger" onClick={() => onDelete(sweet._id)}>
        Delete
      </button>

      <button
        className="btn btn-success"
        onClick={() => onRestock(sweet._id, 1)}
      >
        + Restock
      </button>

      <button
        className="btn btn-primary"
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet._id)}
      >
        Purchase
      </button>

    </div>
  );
};

export default SweetActions;
