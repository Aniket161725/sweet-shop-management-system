import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

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

    const res = await api.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    login(res.data.user, res.data.token);
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="your name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />

      <input
        name="confirmPassword"
        placeholder="confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
