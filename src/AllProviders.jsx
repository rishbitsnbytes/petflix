import { CategoriesProvider, ThemeProvider } from "contexts";

const AllProviders = ({ children }) => {
  return (
    <CategoriesProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </CategoriesProvider>
  );
};

export { AllProviders };
