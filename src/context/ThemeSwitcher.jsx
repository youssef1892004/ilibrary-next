"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="icon-button"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <FaSun className="text-yellow-400" size={22} />
      ) : (
        <FaMoon className="text-black" size={22} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
