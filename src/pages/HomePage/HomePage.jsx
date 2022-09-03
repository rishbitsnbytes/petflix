import "./home-page.css";
import { useDocumentTitle } from "../../custom-hooks";
import { Header, Loader } from "components";
import { useCategories } from "contexts";
import { getFullImgUrl } from "utils";
import { Link, Navlink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

// // Carousel Image Imports

// Main HomePage Export Component
const HomePage = () => {
  const setDocumentTitle = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Petflix | HomePage");
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <WatchByCategory />
    </div>
  );
};

const WatchByCategory = () => {
  const { categories, categoriesLoading, categoriesError } = useCategories();

  return (
    <section className="category-list container flex-col flex-align-center flex-justify-center p-3 mb-5">
      {categoriesLoading ? (
        <Loader loadingMessage="Fetching Categories..." />
      ) : categoriesError ? (
        <h3 className="text-center error-color">{categoriesError}</h3>
      ) : (
        <div className="category-container my-3 py-3">
          <h3 className="h1 color-primary mb-5 text-center">Categories</h3>
          <div className="category-list-wrapper">
            {categories.map((category) => (
              <CategoryItem category={category} key={category._id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const CategoryItem = ({ category }) => {
  const { categoryName, categoryImg } = category;

  const { categoriesDispatch } = useCategories();

  const handleCategoryItemSelection = (event) => {
    categoriesDispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: categoryName },
    });
  };

  return (
    <Link
      to={`/explore`}
      onClick={handleCategoryItemSelection}
      className="card category-item flex-col flex-align-center flex-justify-center"
    >
      <div className="card-header">
        <img
          src={getFullImgUrl(categoryImg, categoryName)}
          alt={`${categoryName} cover image `}
          className="card-img img-responsive"
        />
      </div>
      <div className="card-body flex-col flex-align-center flex-justify-center">
        <h4 className="card-title h2 color-white">{categoryName}</h4>
      </div>
    </Link>
  );
};

export { HomePage };
