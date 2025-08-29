import React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeCtx } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeCtx();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;