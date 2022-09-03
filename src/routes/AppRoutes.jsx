import { Routes, Route, useLocation } from "react-router-dom";

// Page imports
import {
  NotFoundPage,
  HomePage,
  LoginPage,
  SignupPage,
  ExplorePage,
  PlaylistsPage,
  PlaylistVideosPage,
  LikesPage,
  WatchLaterPage,
  HistoryPage,
  SingleVideoPage,
} from "pages";
import { Sidebar } from "components";
import { ProtectedRoutes } from "routes/ProtectedRoutes";
import Mockman from "mockman-js";

const AppRoutes = () => {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/" || pathname === "/home";

  if (isHomePage) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    );
  }

  return (
    <div className="grid-container gap-2">
      <aside>
        <Sidebar />
      </aside>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/:videoId" element={<SingleVideoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route
            path="/playlists/:playlistsId"
            element={<PlaylistVideosPage />}
          />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/watchlater" element={<WatchLaterPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export { AppRoutes };
