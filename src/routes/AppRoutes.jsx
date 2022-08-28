import { Routes, Route } from "react-router-dom";

// Page imports
import { NotFoundPage, HomePage } from "pages";
import Mockman from "mockman-js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/mockman" element={<Mockman />} />
    </Routes>
  );
};

export { AppRoutes };
