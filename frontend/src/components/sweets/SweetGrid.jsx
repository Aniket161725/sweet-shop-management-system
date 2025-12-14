import SweetCard from "./SweetCard";

const SweetGrid = ({ sweets, onEdit, onDelete, onRestock, onPurchase }) => {
  if (!sweets || sweets.length === 0) {
    return <p>No sweets available</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-4">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestock={onRestock}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

export default SweetGrid;
