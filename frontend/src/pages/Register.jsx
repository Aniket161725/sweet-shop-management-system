import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth2";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Auto-login after registration
      login(res.data.user, res.data.token);

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
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
      {/* Floating Sweet Elements */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "120px",
          height: "120px",
          background: "#ffdd99",
          top: "8%",
          left: "5%",
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
          bottom: "12%",
          right: "12%",
          opacity: 0.5,
          filter: "blur(25px)",
          animation: "spin 8s linear infinite",
        }}
      ></div>

      {/* REGISTER CARD */}
      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid #f8e4b8",
        }}
      >
        <h2 className="text-center mb-2" style={{ color: "#cc8d00" }}>
          🍬 Create Your Account
        </h2>

        <p className="text-center text-muted mb-4">
          Join the Sweet Shop System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="form-control p-3 rounded-3"
              value={formData.name}
              onChange={handleChange}
              style={{ borderColor: "#e6c45c" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control p-3 rounded-3"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: "#e6c45c" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control p-3 rounded-3"
              value={formData.password}
              onChange={handleChange}
              style={{ borderColor: "#e6c45c" }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              className="form-control p-3 rounded-3"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ borderColor: "#e6c45c" }}
              required
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
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            style={{ color: "#cc8d00", fontWeight: "600" }}
          >
            Login
          </a>
        </p>
      </div>

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

export default Register;
