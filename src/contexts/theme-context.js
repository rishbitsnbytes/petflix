import { createContext, useContext, useState } from "react";

const initialTheme = { theme: "dark" };

const ThemeContext = createContext(initialTheme);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("petflix-theme") || "dark"
  );

  return <Provider value={{ theme, setTheme }}>{children}</Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
