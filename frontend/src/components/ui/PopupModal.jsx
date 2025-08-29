import React from "react";

const PopupModal = ({ open, title, children, onClose, onConfirm, confirmText = "Confirm" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold">{title}</h4>
          <button onClick={onClose} className="text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <button onClick={onClose} className="px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;