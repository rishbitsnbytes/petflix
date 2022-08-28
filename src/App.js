import "styles/styles.css";
import { Navbar, Footer } from "components";
import { useTheme } from "contexts";
import { AppRoutes } from "routes/AppRoutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  // const { theme } = useTheme();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div className={`app-${theme}`}>
      <div className="app">
        <Navbar />
        <AppRoutes />
        {pathname === "/" ? <Footer /> : null}
      </div>
    </div>
  );
}

export default App;
