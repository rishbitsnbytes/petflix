const videosActionTypes = {
  INIT_VIDEOS_SUCCESS: "INIT_VIDEOS_SUCCESS",
  INIT_VIDEOS_ERROR: "INIT_VIDEOS_ERROR",
  SET_LOADER: "SET_LOADER",
  SET_SORTING_OPTION: "SET_SORTING_OPTION",
  SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
};

const videosReducerFunction = (prevVideosState, { type, payload }) => {
  switch (type) {
    case videosActionTypes.INIT_VIDEOS_SUCCESS:
      return {
        ...prevVideosState,
        videos: payload.videos,
        videosError: null,
        videosLoading: false,
      };

    case videosActionTypes.INIT_VIDEOS_ERROR:
      return {
        ...prevVideosState,
        videosError: "Videos could not load. Please try again later.",
        videosLoading: false,
      };

    case videosActionTypes.SET_LOADER:
      return {
        ...prevVideosState,
        videosLoading: payload.videosLoading,
      };

    case videosActionTypes.SET_SORTING_OPTION:
      return {
        ...prevVideosState,
        videosSortOption: payload.videosSortOption,
      };

    case videosActionTypes.SET_SEARCH_TEXT:
      return {
        ...prevVideosState,
        videosSearchText: payload.videosSearchText,
      };

    default:
      throw new Error("Unknown action type.");
  }
};

export { videosReducerFunction };
