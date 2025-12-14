import SweetCard from "./SweetCard";

const SweetGrid = ({ sweets }) => {
  if (!sweets || sweets.length === 0) {
    return <p>No sweets available</p>;
  }

  return (
    <div>
      {sweets.map((sweet, index) => (
        <SweetCard key={index} sweet={sweet} />
      ))}
    </div>
  );
};

export default SweetGrid;
