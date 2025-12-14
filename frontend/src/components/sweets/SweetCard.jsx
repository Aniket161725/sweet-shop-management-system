const SweetCard = ({ sweet, actions }) => {
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
        <h5 className="card-title" style={{ color: "#B36B00" }}>
          {sweet.name}
        </h5>

        <p className="card-text">₹ {sweet.price}</p>
        <p className="card-text">
          <strong>Available:</strong> {sweet.quantity}
        </p>

        {/* Action Buttons */}
        {actions}
      </div>
    </div>
  );
};

export default SweetCard;
