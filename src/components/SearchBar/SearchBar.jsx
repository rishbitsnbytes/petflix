import "./search-bar.css";
import { useVideos } from "contexts";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ searchText, setSearchText }) => {
  const { videosDispatch } = useVideos();
  const navigateToExplore = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const location = useLocation();

  const debounce = (callback, delay = 800) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const fetchSearchedVideos = (searchText) => {
    videosDispatch({
      type: "SET_SEARCH_TEXT",
      payload: { videosSearchText: searchText },
    });
  };

  const debouncedFetchSearchVideos = useCallback(
    debounce(fetchSearchedVideos, 800),
    []
  );

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    if (location.pathName !== "/explore") {
      navigate("/explore");
    }
    debouncedFetchSearchVideos(event.target.value);
  };

  return (
    <div className="flex-row flex-justify-between flex-align-center flex-gap-1 w-30-pc">
      <form
        className="search-bar flex-row flex-justify-between flex-align-center flex-gap-1 px-1 py-0-5 rounded-md w-full"
        onSubmit={navigateToExplore}
      >
        <button className="btn btn-icon" type="submit">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <input
          type="search"
          id="input-search"
          className="search-bar-input text-sm"
          placeholder="Type to search"
          onChange={handleSearchTextChange}
          value={searchText}
          required
        />
      </form>
    </div>
  );
};

export { SearchBar };
