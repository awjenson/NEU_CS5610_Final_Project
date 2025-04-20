import { useState } from "react";
import { useAuthUser } from "../security/AuthContext";
import { useNavigate, Link } from "react-router-dom";



export default function Login() {

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
        console.log("Attempting login with username:", username); // Debug log
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
    <section className="input-container">
        <header>
            <h2>Welcome Back</h2>
        </header>

        <p>Sign in to manage your reservations</p>

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
                    aria-label="Username input field"
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
                    aria-label="Password input field"
                />
            </div>

            {error && (
                <div className="error-message" role="alert">
                    {error}
                </div>
            )}

            {/* Move button inside form */}
            <div className="button-container">
                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                    aria-label="Login"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </div>
        </form>

        <section className="input-footer">
            <p>
                New to Little Lemon?{" "}
                <Link to="/register" className="register-link">
                    Register an account
                </Link>
            </p>
        </section>
    </section>

  );
}