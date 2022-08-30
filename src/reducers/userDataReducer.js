const userDataActionTypes = {
  SET_LOADER: "SET_LOADER",
  SET_ERROR: "SET_ERROR",
  SET_WATCH_LATER: "SET_WATCH_LATER",
  SET_LIKES: "SET_LIKES",
  SET_PLAYLISTS: "SET_PLAYLISTS",
  UPDATE_PLAYLISTS: "UPDATE_PLAYLISTS",
  SET_HISTORY: "SET_HISTORY",
};

const userDataReducerFunction = (prevUserDataState, { type, payload }) => {
  switch (type) {
    case userDataActionTypes.SET_LOADER:
      return {
        ...prevUserDataState,
        userDataLoading: payload.loading,
      };

    case userDataActionTypes.SET_ERROR:
      return {
        ...prevUserDataState,
        userDataError: {
          ...prevUserDataState.userDataError,
          ...payload.error,
        },
        userDataLoading: payload.loading,
      };

    case userDataActionTypes.SET_WATCH_LATER:
      return {
        ...prevUserDataState,
        watchlater: [...payload.watchlater],
      };

    case userDataActionTypes.SET_LIKES:
      return {
        ...prevUserDataState,
        likes: [...payload.likes],
      };

    case userDataActionTypes.SET_PLAYLISTS:
      return {
        ...prevUserDataState,
        playlists: [...payload.playlists],
      };

    case userDataActionTypes.UPDATE_PLAYLISTS:
      return {
        ...prevUserDataState,
        playlists: prevUserDataState.playlists.map((prevPlaylist) =>
          prevPlaylist._id === payload.playlist._id
            ? { ...payload.playlist }
            : { ...prevPlaylist }
        ),
      };

    case userDataActionTypes.SET_HISTORY:
      return {
        ...prevUserDataState,
        history: [...payload.history],
      };

    default:
      throw new Error("Unknown action type.");
  }
};

export { userDataReducerFunction };
