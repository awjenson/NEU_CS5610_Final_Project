import { useState } from "react"; 
import { useAuthUser } from "../security/AuthContext";  
import { useNavigate, Link } from "react-router-dom"; 

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuthUser();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Clear any previous errors
    
      try {
        if (password.length < 6) {
          setError("Password must be at least 6 characters long");
          return;
        }
    
        await register(username, password, name);
        navigate('/profile');
      } catch (error) {
        setError('Registration failed. Please try again.');
      }
    };

    return (
        <section className="input-container">
            <header>
            <h2>Welcome</h2>
            </header>

            <p>Create an account to make reservations</p>
        
            {error && (
            <div className="error-message" role="alert">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label htmlFor="name">
                Name <span className="required">*</span>
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                />
            </div>

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
                autoComplete="new-password"
                />
            </div>

             {/* Move button inside form */}
             <div className="button-container">
                <button
                    type="submit"
                    className="submit-button"
                    aria-label="Create Account"
                >
                    Register
                </button>
             </div>

            </form>

            <div className="input-footer">
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="register-link">
                    Login
                    </Link>
                </p>
            </div>
      </section>
 
    )
}