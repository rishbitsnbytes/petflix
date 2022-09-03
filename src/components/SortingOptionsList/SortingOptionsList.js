import React, { useRef, useState } from "react";

import { useVideos } from "contexts";
import { useOutsideClick } from "custom-hooks";

const SortingOptionsList = () => {
  const { videosSortOption, videosDispatch } = useVideos();

  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const sortingOptionsRef = useRef(null);

  const handleShowSortingOptionsChange = (event) =>
    setShowSortingOptions((prevShowSortingOptions) => !prevShowSortingOptions);

  const handleSortingOptionChange = (option) =>
    videosDispatch({
      type: "SET_SORTING_OPTION",
      payload: { videosSortOption: option },
    });

  useOutsideClick(sortingOptionsRef, () => setShowSortingOptions(false));

  return (
    <div className="sorting-options-container flex-row flex-align-center flex-justify-between flex-wrap w-full relative">
      <button
        className="btn btn-link-animated-2 h3 rounded-md px-2 py-0-5"
        onClick={handleShowSortingOptionsChange}
        ref={sortingOptionsRef}
      >
        Sort
        <span className="ml-1">
          <i className="fa-solid fa-sort"></i>
        </span>
      </button>
      {videosSortOption ? (
        <button
          className="btn btn-secondary rounded-md px-2 py-0-5"
          onClick={(e) => handleSortingOptionChange(null)}
        >
          Clear Sort
          <span className="ml-1">
            <i className="fa-solid fa-broom"></i>
          </span>
        </button>
      ) : null}
      <div
        className={`${
          showSortingOptions ? "show-sorting-options" : "hide-sorting-options"
        } sorting-options-list flex-col rounded-md`}
      >
        <button
          className={`${
            videosSortOption === "LATEST"
              ? "btn btn-secondary"
              : "btn btn-secondary"
          } py-1 px-2 rounded-md`}
          onClick={(e) => handleSortingOptionChange("LATEST")}
        >
          Latest upload date
        </button>
        <button
          className={`${
            videosSortOption === "OLDEST"
              ? "btn btn-secondary"
              : "btn btn-secondary"
          } py-1 px-2 rounded-md`}
          onClick={(e) => handleSortingOptionChange("OLDEST")}
        >
          Oldest upload date
        </button>
      </div>
    </div>
  );
};

export { SortingOptionsList };
