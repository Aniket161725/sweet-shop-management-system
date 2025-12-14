const DeleteSweet = ({ sweetId, onDelete }) => {
  const handleDelete = () => {
    onDelete && onDelete(sweetId);
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteSweet;
