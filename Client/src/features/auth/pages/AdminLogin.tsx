import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login({ username, password });
            navigate("/admin");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 360, margin: "80px auto" }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;