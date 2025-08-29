import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [count, setCount] = useState(2); 
  return (
    <button
      className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => setCount(0)}
      aria-label="Notifications"
    >
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;