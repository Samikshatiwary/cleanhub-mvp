import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await login(email, password);
    if (!res.ok) return setErr(res.error);
    const role = res.user.role;
    nav(role === "admin" ? "/admin/dashboard" : "/user", { replace: true });
  };

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 border rounded p-5 bg-white dark:bg-gray-900">
        <h1 className="text-xl font-semibold">Login</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button disabled={loading} className="w-full bg-blue-600 text-white rounded py-2">
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-sm">
          No account? <Link to="/signup" className="text-blue-600">Sign up</Link>
        </div>
      </form>
    </div>
  );
}