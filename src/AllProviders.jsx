import { CategoriesProvider, ThemeProvider, AuthProvider } from "contexts";

const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
};

export { AllProviders };
