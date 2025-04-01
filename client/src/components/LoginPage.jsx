import { useState } from "react";
import { useAuthUser } from "../security/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// LoginPage component
export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages
    setIsLoading(true); // Add loading state
  
    try {
      await login(username, password);
      // Only navigate if login was successful
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to manage your reservations</p>
      </header>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Error message */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
        
      </form>

      <div className="auth-footer">
        <p>
          New to Little Lemon?{" "}
          <Link to="/register" className="register-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
