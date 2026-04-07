import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      const payload = data?.data ?? data;
      const userData = payload?.user;

      if (!userData) {
        setError(data?.message || "Invalid response from server.");
        return;
      }

      const user = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };

      dispatch(loginSuccess(user));
      navigate("/");
    } catch (err) {
      let msg = "Invalid email or password.";
      const d = err?.response?.data;
      const status = err?.response?.status;

      if (status === 401 && d?.message) msg = d.message;
      else if (typeof d === "string") msg = d;
      else if (err?.message?.includes("Network"))
        msg = "Backend not reachable (http://localhost:8080)";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome to Login</h2>

        {error && (
          <div style={{ color: "#b00020", marginBottom: "12px" }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="auth-footer text-center mt-3">
          Don’t have an account? <Link to="/signup">Signup</Link>
          <br />
          <Link to="/forgot-password" style={{ fontSize: '14px' }}>Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
