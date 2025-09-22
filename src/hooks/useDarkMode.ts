import { useEffect } from "react";

export function useDarkMode() {
  useEffect(() => {
    const root = window.document.documentElement;
    const dark = localStorage.getItem("theme") === "dark";
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);
}
