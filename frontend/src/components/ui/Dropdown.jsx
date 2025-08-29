import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ trigger, children, align = "right" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((s) => !s)}>{trigger}</button>
      {open && (
        <div
          className={`absolute mt-2 min-w-[12rem] rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-lg z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;