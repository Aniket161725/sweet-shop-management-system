import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth2";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Check email or password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        background: "linear-gradient(135deg, #fff7d1, #ffeec7, #fffaf0)",
        overflow: "hidden",
      }}
    >
      {/* Floating Elements */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "120px",
          height: "120px",
          background: "#ffdd99",
          top: "5%",
          left: "10%",
          opacity: 0.5,
          filter: "blur(20px)",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>

      <div
        className="position-absolute rounded-circle"
        style={{
          width: "150px",
          height: "150px",
          background: "#ffcba4",
          bottom: "10%",
          right: "8%",
          opacity: 0.5,
          filter: "blur(25px)",
          animation: "spin 8s linear infinite",
        }}
      ></div>

      {/* LOGIN CARD */}
      <div
        className="card shadow-lg p-4"
        style={{
          width: "380px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid #f8e4b8",
        }}
      >
        <h2 className="text-center mb-2" style={{ color: "#cc8d00" }}>
          🍬 Sweet Shop Login
        </h2>

        <p className="text-center text-muted mb-4">
          Manage your sweets with ease
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              placeholder="email"
              className="form-control p-3 rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: "#e6c45c",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              placeholder="password"
              className="form-control p-3 rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: "#e6c45c",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-3"
            style={{
              backgroundColor: "#f4b400",
              color: "white",
              fontWeight: "600",
              borderRadius: "12px",
            }}
          >
            Login
          </button>
        </form>

        {/* 🔥 Switch to Register HERE */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#cc8d00", fontWeight: "600" }}
          >
            Register
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
