const categoriesActionTypes = {
  INIT_CATEGORIES_SUCCESS: "INIT_CATEGORIES_SUCCESS",
  INIT_CATEGORIES_ERROR: "INIT_CATEGORIES_ERROR",
  SET_SELECTED_CATEGORY: "SET_SELECTED_CATEGORY",
};

const categoriesReducerFunction = (prevCategoriesState, { type, payload }) => {
  switch (type) {
    case categoriesActionTypes.INIT_CATEGORIES_SUCCESS:
      return {
        ...prevCategoriesState,
        categories: payload.categories,
        categoriesError: null,
        categoriesLoading: false,
      };

    case categoriesActionTypes.INIT_CATEGORIES_ERROR:
      return {
        ...prevCategoriesState,
        categoriesError:
          "Categories could not be loaded. Please try again later.",
        categoriesLoading: false,
      };

    case categoriesActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...prevCategoriesState,
        selectedCategory: payload.selectedCategory,
      };

    default:
      throw new Error("Unknown action type.");
  }
};

export { categoriesReducerFunction };
