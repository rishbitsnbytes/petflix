import { Routes, Route } from "react-router-dom";

// Page imports
import { NotFoundPage, HomePage, LoginPage, SignupPage } from "pages";
import Mockman from "mockman-js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mockman" element={<Mockman />} />
    </Routes>
  );
};

export { AppRoutes };
