import { useState, type FormEvent } from "react";
import { useAuth } from "../AuthContext";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await login({ username, password });  // service maps this to { email, password }
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Login failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EFEEE8] from-indigo-50 to-slate-50 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4"
            >
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Admin Login</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to continue</p>
                </div>

                <label className="flex flex-col gap-1 text-sm text-slate-700">
                    <span className="font-medium">Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
                        autoComplete="username"
                        required
                        className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm outline-none
                       focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition"
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm text-slate-700">
                    <span className="font-medium">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm outline-none
                       focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition"
                    />
                </label>

                {error && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="block w-[80%] mx-auto bg-[#AD8A3E] rounded-full text-[#1C2127] px-6 py-3 text-sm font-medium hover:bg-[#AD8630] transition-colors
                     disabled:bg-[#AD8A3E] disabled:cursor-not-allowed transition"
                >
                    {submitting ? "Logging in…" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;