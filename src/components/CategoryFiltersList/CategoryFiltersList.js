import React from "react";
import { v4 as uuid } from "uuid";

import { useCategories } from "contexts";

const CategoryFiltersList = () => {
  const { categories, categoriesDispatch, selectedCategory } = useCategories();

  const handleCategoryChange = (categoryName) => {
    categoriesDispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: categoryName },
    });
  };

  const categoryMapping = [
    { _id: uuid(), categoryName: "All" },
    ...categories,
  ].map(({ categoryName, _id }) => (
    <button
      className={`py-0-5 px-3 rounded-full ${
        selectedCategory === categoryName
          ? "btn btn-secondary selected-category"
          : "btn btn-secondary"
      }`}
      key={_id}
      onClick={(e) => handleCategoryChange(categoryName)}
    >
      <span>{categoryName}</span>
    </button>
  ));

  return (
    <section className="category-list flex-row flex-align-center flex-justify-start flex-wrap gap-3">
      {categoryMapping}
    </section>
  );
};

export { CategoryFiltersList };
