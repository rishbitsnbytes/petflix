import React, { useState } from "react";

import { useAuth, useUserData } from "contexts";
import { deleteVideoFromPlaylistService, postVideoToPlaylist } from "services";
import { useToast } from "custom-hooks/useToast";

const PlaylistOption = ({ video, playlist }) => {
  const { userDataDispatch, userDataLoading } = useUserData();
  const { showToast } = useToast();
  const { authToken } = useAuth();

  const isVideoEmpty = !video || !Object.keys(video).length;
  const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

  const isVideoInPlaylist =
    !isVideoEmpty &&
    playlist.videos.find((playlistVideo) => playlistVideo._id === video._id) ===
      undefined
      ? false
      : true;

  const handleChangePlaylist = async (e) => {
    setIsOnGoingNetworkCall(true);
    try {
      const {
        data: { playlist: updatedPlaylist },
      } = isVideoInPlaylist
        ? await deleteVideoFromPlaylistService(
            authToken,
            playlist._id,
            video._id
          )
        : await postVideoToPlaylist(authToken, playlist._id, video);
      userDataDispatch({
        type: "UPDATE_PLAYLISTS",
        payload: { playlist: updatedPlaylist },
      });
      showToast(
        isVideoInPlaylist
          ? "Video removed from playlist."
          : "Video added to playlist.",
        "success"
      );
    } catch (error) {
      showToast(
        isVideoInPlaylist
          ? "Failed to remove video playlist."
          : "Failed to add video to playlist.",
        "error"
      );
    }
    setIsOnGoingNetworkCall(false);
  };

  return (
    <div className="playlist-option flex-row flex-align-center flex-justify-center gap-1">
      <label
        key={playlist._id}
        className="flex-row flex-align-center flex-justify-center btn pointer"
      >
        {isVideoEmpty ? null : (
          <input
            className="pointer"
            type="checkbox"
            name={`playlist-${playlist.title}`}
            id={playlist._id}
            checked={isVideoInPlaylist}
            onChange={handleChangePlaylist}
            disabled={userDataLoading || isOnGoingNetworkCall}
          />
        )}
        <span className="text-lg font-bold mx-1">{playlist.title}</span>
      </label>
    </div>
  );
};

export { PlaylistOption };
