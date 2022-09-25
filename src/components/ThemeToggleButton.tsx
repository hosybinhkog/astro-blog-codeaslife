import React, { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

const themes: string[] = ["light", "dark"];

const ThemeToggleButton = () => {
  const [isMounted, setIsMouted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  return isMounted ? (
    <div
      onClick={toggleTheme}
      className='inline-flex items-center cursor-pointer rounded-3xl bg-orange-300  dark:bg-zinc-600'
    >
      {themes.map((t) => {
        const checked = t === theme;
        return (
          <button
            aria-label='toggle-theme'
            key={t}
            className={`${
              checked ? "bg-white text-black" : ""
            } cursor-pointer rounded-3xl p-2`}
          >
            {t === "dark" ? <IoMoon /> : <IoSunny />}
          </button>
        );
      })}
    </div>
  ) : (
    <div />
  );
};

export default ThemeToggleButton;
