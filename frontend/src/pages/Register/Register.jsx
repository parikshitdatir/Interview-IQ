import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister() {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                <h1 className="text-4xl font-bold text-white">
                    Create Account
                </h1>

                <p className="mt-3 text-slate-400">
                    Start your Interview IQ journey.
                </p>

                <div className="mt-8 space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                    </div>

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
                            placeholder="Create a password"
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

                    {success && (
                        <div className="rounded-lg bg-green-900/30 p-3 text-sm text-green-300">
                            {success}
                        </div>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Sign In
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

export default Register;