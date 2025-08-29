import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    try {
      setSaving(true);
      const { data } = await api.put("/users/me", { name });
      setUser(data.user || { ...user, name });
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-3">
        <div>
          <label className="text-sm">Email</label>
          <input disabled value={user?.email || ""} className="w-full mt-1 rounded-md border px-3 py-2 bg-gray-100 dark:bg-gray-800" />
        </div>
        <div>
          <label className="text-sm">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
        </div>
        <button onClick={save} disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}