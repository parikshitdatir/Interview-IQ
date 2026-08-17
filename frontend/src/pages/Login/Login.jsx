import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin() {
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                <h1 className="text-4xl font-bold text-white">
                    Welcome Back 👋
                </h1>

                <p className="mt-3 text-slate-400">
                    Sign in to continue your Interview IQ journey.
                </p>

                <div className="mt-8 space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Continue"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Create one
                    </Link>
                </p>

                <Link
                    to="/"
                    className="mt-4 block text-center text-sm text-slate-400 hover:text-white"
                >
                    ← Back to Home
                </Link>

            </div>
        </div>
    );
}

export default Login;