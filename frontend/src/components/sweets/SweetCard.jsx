const SweetCard = ({ sweet }) => {
  return (
    <div>
      <img src={sweet.image} alt={sweet.name} />
      <h3>{sweet.name}</h3>
      <p>{sweet.price}</p>
      <button>Purchase</button>
    </div>
  );
};

export default SweetCard;
