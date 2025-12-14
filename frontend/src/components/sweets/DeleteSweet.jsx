const DeleteSweet = ({ sweetId, onDelete }) => {
  const handleDelete = () => onDelete && onDelete(sweetId);

  return (
    <button
      className="btn btn-sm"
      style={{ background: "#D9534F", color: "white" }}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteSweet;
