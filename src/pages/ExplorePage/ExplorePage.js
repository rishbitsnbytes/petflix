import React, { useEffect } from "react";

import {
  CategoryFiltersList,
  Loader,
  SortingOptionsList,
  VideosList,
} from "components";
import { useCategories, useVideos } from "contexts";
import "./explore.css";
import { getFilteredSortedVideos } from "utils";
import { useDocumentTitle } from "custom-hooks";

const ExplorePage = () => {
  const { categoriesLoading, categoriesError, selectedCategory } =
    useCategories();
  const {
    videosLoading,
    videosError,
    videos,
    videosDispatch,
    videosSortOption,
    videosSearchText,
  } = useVideos();

  const filteredSortedVideos = getFilteredSortedVideos(
    videos,
    videosSearchText,
    selectedCategory,
    videosSortOption
  );

  const setDocumentTitle = useDocumentTitle();
  useEffect(() => {
    setDocumentTitle("Petflix | Explore");
  }, []);

  return (
    <main
      className="main explore-main py-3 px-1"
      style={{ minHeight: "100vh" }}
    >
      {videosError || categoriesError ? (
        <h3 className="text-center mx-auto px-3 error-color">
          Videos could not be loaded. Try again after sometime.
        </h3>
      ) : videosLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <div className="flex-col flex-align-start flex-justify-start py-1 px-3 gap-2">
          <div className="filters-sort-container flex-col flex-align-start flex-justify-start gap-2 w-full">
            <CategoryFiltersList />
            <SortingOptionsList />
          </div>
          {filteredSortedVideos?.length ? (
            <h3>
              {filteredSortedVideos?.length > 1
                ? "Showing Videos "
                : "Showing Video "}
              :
              <span className="color-primary h2 font-bold mx-1">
                {filteredSortedVideos?.length}
              </span>
            </h3>
          ) : null}
          <VideosList videos={filteredSortedVideos} />
        </div>
      )}
    </main>
  );
};

export { ExplorePage };
