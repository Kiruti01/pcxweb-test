"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // // Load saved preference
  // useEffect(() => {
  //   const saved = localStorage.getItem("pcx_theme");
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;
  //   setDark(saved ? saved === "dark" : prefersDark);
  // }, []);

  // // Apply class to <html> whenever dark changes
  // useEffect(() => {
  //   if (dark) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  //   localStorage.setItem("pcx_theme", dark ? "dark" : "light");
  // }, [dark]);

  // const toggle = () => setDark((v) => !v);
  const toggle = () => {};

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
