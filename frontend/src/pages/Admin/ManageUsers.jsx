import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PopupModal from "../../components/ui/PopupModal";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleRole = async (id, role) => {
    try {
      const next = role === "admin" ? "user" : "admin";
      await api.patch(`/admin/users/${id}/role`, { role: next });
      toast.success("Role updated");
      fetchUsers();
    } catch (e) {
      toast.error("Failed to update role");
    }
  };

  const onDelete = async () => {
    try {
      await api.delete(`/admin/users/${confirm.id}`);
      toast.success("User removed");
      setConfirm({ open: false, id: null });
      fetchUsers();
    } catch {
      toast.error("Failed to remove user");
      setConfirm({ open: false, id: null });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Role</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.map((u) => (
              <tr key={u._id} className="bg-white dark:bg-gray-900">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    onClick={() => toggleRole(u._id, u.role)}
                    className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Make {u.role === "admin" ? "User" : "Admin"}
                  </button>
                  <button
                    onClick={() => setConfirm({ open: true, id: u._id })}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PopupModal
        open={confirm.open}
        title="Remove user?"
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={onDelete}
        confirmText="Remove"
      >
        <p className="text-sm">This action cannot be undone.</p>
      </PopupModal>
    </div>
  );
}