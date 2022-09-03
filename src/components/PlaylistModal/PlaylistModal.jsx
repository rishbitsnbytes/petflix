import React, { useEffect, useRef, useState } from "react";

import "./playlist-modal.css";
import { useAuth, useTheme, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import { postNewPlayList } from "services";
import { PlaylistOption } from "./PlaylistOption";
import { useOutsideClick } from "custom-hooks/useOutsideClick";

const PlaylistModal = ({ video, setShowPlaylistModal }) => {
  const { theme } = useTheme();
  const { authToken } = useAuth();
  const { userDataDispatch, playlists, userDataLoading } = useUserData();
  const { showToast } = useToast();

  const [playlistName, setPlaylistName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

  const playlistModalReference = useRef(null);
  const playlistInputReference = useRef(null);
  const isVideoEmpty = !video || !Object.keys(video).length;

  useEffect(() => {
    if (playlistInputReference.current) {
      playlistInputReference.current.focus();
    }
  }, [playlists?.length]);

  const handlePlaylistNameChange = (e) => {
    setErrorMessage(null);
    setPlaylistName(e.target.value);
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName || !playlistName.trim()) {
      return setErrorMessage("Playlist name cannot be empty!");
    }

    setIsOnGoingNetworkCall(true);

    try {
      const {
        data: { playlists },
      } = await postNewPlayList(authToken, {
        title: playlistName,
        videos: isVideoEmpty ? [] : [{ ...video }],
      });
      userDataDispatch({ type: "SET_PLAYLISTS", payload: { playlists } });
      setPlaylistName("");
      if (isVideoEmpty) {
        showToast("Created new playlist.", "success");
      } else showToast("Added video to new playlist.", "success");
    } catch (error) {
      if (isVideoEmpty) {
        showToast("Could not create playlist.", "error");
      } else
        showToast(
          "Could not add video to new playlist. Please try again later.",
          "error"
        );
    }
    setIsOnGoingNetworkCall(false);
  };

  const buttonDisabled =
    userDataLoading || isOnGoingNetworkCall ? "btn-disabled" : "";

  useOutsideClick(playlistModalReference, () => setShowPlaylistModal(false));

  return (
    <main
      className={`
      modal-wrapper fixed h-full w-full flex-col flex-justify-center flex-align-center`}
    >
      <div
        className="playlist-management-container py-1 px-2 flex-col flex-align-center flex-justify-start gap-1 rounded-md"
        ref={playlistModalReference}
      >
        <button
          className={`btn btn-icon btn-close-modal ${buttonDisabled}`}
          type="button"
          disabled={userDataLoading || isOnGoingNetworkCall}
          onClick={(e) => setShowPlaylistModal(false)}
        >
          <i className="fa-regular fa-circle-xmark fa-xl"></i>
        </button>
        <form className="playlist-form w-full gap-1 py-0-5 flex-col flex-align-start flex-justify-center">
          <h6 className="h4 color-primary underline font-bold py-1">
            Create new playlist
          </h6>
          <div className="form-group flex-row flex-align-center flex-justify-between w-full px-2 gap-1">
            <input
              type="text"
              className="input-playlist-name p-0-75 w-90-pc h-full rounded-md"
              id="input-playlist-name"
              name="playlist-name"
              placeholder="Enter Playlist Name"
              autoComplete="off"
              onChange={handlePlaylistNameChange}
              value={playlistName}
              disabled={userDataLoading || isOnGoingNetworkCall}
              ref={playlistInputReference}
            />
            <button
              type="submit"
              className={`btn btn-icon ${buttonDisabled}`}
              onClick={handleCreatePlaylist}
              disabled={userDataLoading || isOnGoingNetworkCall}
            >
              <i className="fa-solid fa-circle-plus fa-2xl"></i>
            </button>
          </div>
          {errorMessage ? (
            <p className="error-color text-md color-error py-0-5">
              {errorMessage}
            </p>
          ) : null}
        </form>
        <div className="playlist-options-container py-1 flex-col flex-align-start flex-justify-center w-full">
          <h6 className="h4 color-primary underline font-bold py-1">
            {isVideoEmpty ? "Playlists" : "Add to an existing playlist"}
          </h6>
          <div className="flex-col flex-align-start flex-justify-center gap-0-5 px-2">
            {playlists.length === 0
              ? "No playlist yet. Create some!"
              : playlists.map((playlist) => (
                  <PlaylistOption
                    key={playlist._id}
                    video={video}
                    playlist={playlist}
                  />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export { PlaylistModal };
