import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/reset-password", { 
        token, 
        newPassword: password 
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="container layout_padding text-center">
        <h2 className="text-danger">Invalid Reset Link</h2>
        <p>This password reset link is missing a token. Please request a new link.</p>
        <button onClick={() => navigate("/forgot-password")} className="btn1 mt-3">
          Back to Forgot Password
        </button>
      </div>
    );
  }

  return (
    <div className="container layout_padding">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="admin_card p-4">
            <h3 className="mb-4 text-center">Set New Password</h3>
            <p className="text-muted text-center mb-4">
              Enter your new secure password below.
            </p>
            
            {message && <div className="alert alert-success">{message} Redirecting to login...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn1 w-100"
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
