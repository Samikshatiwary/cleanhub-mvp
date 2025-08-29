import React, { useState } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Email required");
    try {
      setSending(true);
      await api.post("/auth/forgot-password", { email }); 
      toast.success("If your email exists, a reset link was sent.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to send reset link");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        />
        <button disabled={sending} className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700">
          {sending ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}