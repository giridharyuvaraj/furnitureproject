import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // 🔐 Normalize passwords (IMPORTANT)
    const p1 = password.trim();
    const p2 = confirmPassword.trim();

    if (p1 !== p2) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await signup({
        username: name.trim(),
        email: email.trim().toLowerCase(),
        password: p1,
        role,
        address: address.trim() || null,
        postalCode: postalCode.trim() || null,
      });

      if (data?.success === true) {
        setSuccess("Account created successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      const d = err?.response?.data;
      let msg = "Signup failed. Please try again.";

      if (d && typeof d === "object" && d.message) msg = d.message;
      else if (typeof d === "string") msg = d;
      else if (err?.message?.includes("Network") || err?.code === "ERR_NETWORK")
        msg =
          "Cannot reach server. Ensure backend is running at http://localhost:8080.";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
          autoComplete="email"
        />

        {/* <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setError("");
          }}
          required
        >
          <option value="USER">Customer (USER)</option>
          <option value="ADMIN">Owner (ADMIN)</option>
        </select> */}

        <input
  type="password"
  placeholder="Password"
  value={password}
  onInput={(e) => {
    setPassword(e.target.value);
    setError("");
  }}
  required
  autoComplete="new-password"
/>

<input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onInput={(e) => {
    setConfirmPassword(e.target.value);
    setError("");
  }}
  required
  autoComplete="off"
/>

        <input
          placeholder="Address (optional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          placeholder="Postal Code (optional)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        {error && (
          <div style={{ color: "#b00020", marginBottom: "12px" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: "green", marginBottom: "12px" }}>
            {success}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
