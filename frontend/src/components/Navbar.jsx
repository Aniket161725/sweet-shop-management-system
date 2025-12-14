import { useAuth } from "../hooks/useAuth2";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar sticky-top shadow-sm px-4"
      style={{
        background: "linear-gradient(135deg, #fff1b8, #ffe7a3, #fff7d9)",
        borderBottom: "1px solid #f0d28a",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Center Title */}
        <h2
          className="m-auto"
          style={{
            fontWeight: "700",
            color: "#c88900",
            letterSpacing: "1px",
          }}
        >
          🍬 PEACE SWEET
        </h2>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn"
          style={{
            backgroundColor: "#f4b400",
            color: "#fff",
            borderRadius: "10px",
            padding: "8px 20px",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
