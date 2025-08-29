import React from "react";

const HamburgerButton = ({ onClick, open }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md 
      hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none md:hidden"
      aria-label="Open sidebar"
    >
      <span className="sr-only">Open sidebar</span>
      <div className="space-y-1.5">
        <span
          className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;