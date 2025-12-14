import SweetCard from "./SweetCard";
import SweetActions from "./SweetActions";

const SweetGrid = ({ sweets, onEdit, onDelete, onRestock, onPurchase }) => {
  if (!sweets || sweets.length === 0) {
    return <p className="text-center text-muted">No sweets available 🍬</p>;
  }

  return (
    <div
      className="d-flex flex-wrap gap-4 p-3"
      style={{
        background: "#FFF8D6",
        borderRadius: "12px",
        border: "1px solid #F3E5A8",
      }}
    >
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          actions={
            <SweetActions
              sweet={sweet}
              onEdit={onEdit}
              onDelete={onDelete}
              onRestock={onRestock}
              onPurchase={onPurchase}
            />
          }
        />
      ))}
    </div>
  );
};

export default SweetGrid;
