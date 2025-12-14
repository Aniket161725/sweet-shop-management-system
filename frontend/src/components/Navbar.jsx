import { useAuth } from "../hooks/useAuth2";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar shadow-sm px-4 py-3"
      style={{
        background: "linear-gradient(135deg, #fff1b8, #ffe7a3, #fff7d9)",
        borderBottom: "1px solid #f0d28a",
        backdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="container-fluid d-flex justify-content-center position-relative"
      >
        {/* Title */}
        <h2
          className="m-0"
          style={{
            fontWeight: "700",
            color: "#c88900",
            letterSpacing: "1px",
          }}
        >
          🍬 PEACE SWEET
        </h2>

        {/* Right Section */}
        <div
          className="position-absolute end-0 d-flex align-items-center gap-3"
          style={{ right: "15px" }}
        >
          {isAdmin && (
            <span
              className="badge"
              style={{
                backgroundColor: "#d48806",
                color: "white",
                padding: "8px 12px",
                borderRadius: "12px",
                fontSize: "14px",
              }}
            >
              Admin
            </span>
          )}

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
      </div>
    </nav>
  );
};

export default Navbar;
