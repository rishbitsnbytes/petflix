import { useAuth, useUserData } from "contexts";
import dummyImage from "assets/others/dummy-image.png";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useToast } from "custom-hooks/useToast";
import { deletePlaylistService } from "services";
import { useState } from "react";

const PlaylistsList = () => {
  const { userDataDispatch, playlists, categoriesLoading } = useUserData();
  const { showToast } = useToast();
  const { authToken } = useAuth();

  const buttonDisabled = categoriesLoading ? "btn-disabled" : "";

  const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

  const playlistsMapping = playlists.map((playlist) => {
    const cardImage = playlist.videos[0]
      ? `https://i.ytimg.com/vi/${playlist.videos[0]._id}/mqdefault.jpg`
      : dummyImage;

    const handleDeletePlaylist = async (event) => {
      event.stopPropagation();
      event.preventDefault();
      const playlistId = playlist._id;
      setIsOnGoingNetworkCall(true);

      try {
        const {
          data: { playlists },
        } = await deletePlaylistService(authToken, playlistId);
        userDataDispatch({
          type: "SET_PLAYLISTS",
          payload: { playlists },
        });
        showToast("Playlist deleted successfully.", "success");
      } catch (error) {
        showToast("Failed to delete playlist.", "error");
        setIsOnGoingNetworkCall(false);
      }
    };

    return (
      <Link
        className={`playlist-card video-card flex-col flex-align-center flex-justify-between w-25 h-fit gap-1 relative rounded-md ${
          isOnGoingNetworkCall ? "link-disabled" : ""
        }`}
        key={playlist._id}
        to={`/playlists/${playlist._id}`}
      >
        <img
          src={cardImage}
          alt={`${playlist.title} Image`}
          className="rounded-md w-full h-15"
        />
        <h6 className="playlist-title h2 absolute color-tertiary">
          {playlist.title}
        </h6>
        <div className="playlist-details p-1 flex-row flex-align-center flex-justify-between w-full">
          <p className="h4 color-tertiary">
            <span className="h3 font-bold px-0-75">
              {playlist.videos.length > 99 ? "99+" : playlist.videos.length}
            </span>
            Videos
          </p>
          <button
            className={`btn btn-icon color-error ${buttonDisabled}`}
            onClick={handleDeletePlaylist}
            disabled={isOnGoingNetworkCall}
          >
            <i className="fa-solid fa-trash-can fa-lg"></i>
          </button>
        </div>
      </Link>
    );
  });

  return (
    <section className="videos-list-container grid w-full h-full gap-2">
      {playlistsMapping}
    </section>
  );
};

export { PlaylistsList };
