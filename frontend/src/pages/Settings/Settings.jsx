import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="rounded-lg border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <h2 className="font-semibold mb-2">Appearance</h2>
        <button onClick={toggleTheme} className="px-3 py-2 rounded border">
          Toggle Theme (current: {theme})
        </button>
      </div>

      <div className="rounded-lg border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <h2 className="font-semibold mb-2">Notifications</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
          <span>Email me about orders and updates</span>
        </label>
      </div>
    </div>
  );
}