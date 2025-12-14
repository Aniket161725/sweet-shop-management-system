import { useState } from "react";
import { useAuth } from "../hooks/useAuth2";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // save user + token in context
      login(res.data.user, res.data.token);

      // redirect after login
      navigate("/home");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
