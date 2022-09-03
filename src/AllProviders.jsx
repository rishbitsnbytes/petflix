import {
  CategoriesProvider,
  ThemeProvider,
  AuthProvider,
  VideosProvider,
  UserDataProvider,
} from "contexts";

const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserDataProvider>
        <ThemeProvider>
          <CategoriesProvider>
            <VideosProvider>{children}</VideosProvider>
          </CategoriesProvider>
        </ThemeProvider>
      </UserDataProvider>
    </AuthProvider>
  );
};

export { AllProviders };
