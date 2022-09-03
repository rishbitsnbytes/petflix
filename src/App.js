import "styles/styles.css";
import { Navbar, Footer } from "components";
import { useTheme } from "contexts";
import { AppRoutes } from "routes/AppRoutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div className={`app-${theme}`}>
      <div className="app">
        <Navbar />
        <AppRoutes />
        {pathname === "/" || pathname === "/home" ? <Footer /> : null}
      </div>
    </div>
  );
}

export default App;
