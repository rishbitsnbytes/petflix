import React, { useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Hyphenated from "react-hyphen";

import { useAuth, useUserData } from "contexts";
import { useToast } from "custom-hooks/useToast";
import {
  findVideoInList,
  getFormattedViews,
  likeVideoServiceCall,
  watchLaterServiceCall,
} from "utils";
import PlaylistPortal from "PlaylistPortal";
import {
  deleteVideoFromHistoryService,
  deleteVideoFromPlaylistService,
} from "services";
import { useOutsideClick } from "custom-hooks/useOutsideClick";

const VideoCard = ({ video, page }) => {
  const {
    _id: videoId,
    creator: videoCreator,
    title: videoTitle,
    views,
    dateAdded,
  } = video;

  const { isAuth, authToken } = useAuth();
  const { userDataDispatch, watchlater, userDataLoading, likes } =
    useUserData();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const { playlistsId } = useParams();

  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

  const isVideoInWatchLater = findVideoInList(watchlater, video);
  const isVideoInLikes = findVideoInList(likes, video);

  const videoOptionsReference = useRef(null);

  const videoCreatorWords = videoCreator.split(/\s|-/, 3);
  const videoCreatorAbbreviation = videoCreatorWords
    .map((word) => word[0].toUpperCase())
    .join("");

  const dateReleased = new Date(dateAdded)
    .toDateString()
    .substring(4)
    .split(" ", 4)
    .join(" ");

  const handleShowOptionsChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowVideoOptions((prevShowVideoOptions) => !prevShowVideoOptions);
  };

  const handleWatchLaterChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuth) {
      showToast("Login to add the video to watch later.", "info");
      navigate("/login", { state: { from: "/explore" }, replace: true });
    } else {
      setIsOnGoingNetworkCall(true);
      await watchLaterServiceCall(
        showToast,
        userDataDispatch,
        isVideoInWatchLater,
        authToken,
        video
      );
      setIsOnGoingNetworkCall(false);
    }
  };

  const handleLikedVideoChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuth) {
      showToast("Login to add the video to likes.", "info");
      navigate("/login", { state: { from: "/explore" }, replace: true });
    } else {
      setIsOnGoingNetworkCall(true);
      await likeVideoServiceCall(
        showToast,
        userDataDispatch,
        isVideoInLikes,
        authToken,
        video
      );
      setIsOnGoingNetworkCall(false);
    }
  };

  const handleShowPlaylistModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      showToast("Login to add the video to a playlist.", "info");
      navigate("/login", { state: { from: "/explore" }, replace: true });
    } else setShowPlaylistModal(true);
  };

  const handleDeleteVideoFromHistory = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOnGoingNetworkCall(true);

    try {
      const {
        data: { history },
      } = await deleteVideoFromHistoryService(authToken, videoId);
      userDataDispatch({ type: "SET_HISTORY", payload: { history } });
      showToast("Removed video from history.", "success");
    } catch (error) {
      showToast("Failed to remove video from history.", "error");
    }

    setIsOnGoingNetworkCall(false);
  };

  const handleDeleteVideoFromPlaylist = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsOnGoingNetworkCall(true);
    try {
      const {
        data: { playlist: updatedPlaylist },
      } = await deleteVideoFromPlaylistService(authToken, playlistsId, videoId);
      userDataDispatch({
        type: "UPDATE_PLAYLISTS",
        payload: { playlist: updatedPlaylist },
      });
      showToast("Video removed from playlist.", "success");
    } catch (error) {
      setIsOnGoingNetworkCall(false);
      showToast("Failed to remove video playlist.", "error");
    }
  };

  useOutsideClick(videoOptionsReference, () => setShowVideoOptions(false));

  return (
    <>
      {showPlaylistModal ? (
        <PlaylistPortal
          video={video}
          setShowPlaylistModal={setShowPlaylistModal}
        />
      ) : null}
      <NavLink
        to={`/explore/${videoId}`}
        className={`video-card flex-col flex-align-center flex-justify-between w-25 h-full gap-1 ${
          userDataLoading || isOnGoingNetworkCall ? "btn-disabled" : ""
        }`}
      >
        <div className="rounded-md w-full">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            alt={`${videoTitle} cover`}
            className="h-15 w-full rounded-md"
          />
        </div>
        <div className="details flex-row flex-align-center flex-justify-between py-1 px-1 gap-1 relative">
          <div
            className="avatar-text w-3 h-3 rounded-full flex-row flex-justify-center flex-align-center"
            role="img"
          >
            {videoCreatorAbbreviation}
          </div>
          <div className="flex-col flex-justify-center flex-align-center gap-0-5 w-50-pc">
            <h6
              className="h4 title text-truncate w-full align-self-center"
              lang="en"
            >
              {videoTitle}
            </h6>
            <div className="flex-row flex-align-center flex-justify-center flex-wrap gap-1">
              <div className="text-sm-2">{getFormattedViews(views)}</div>
              <div>|</div>
              <div className="text-sm-2">{dateReleased}</div>
            </div>
          </div>
          <div className="flex-row video-actions-container">
            {page === "playlist" ? (
              <button
                className="btn btn-icon p-1"
                onClick={handleDeleteVideoFromPlaylist}
              >
                <span className="color-error">
                  <i className="fa-solid fa-trash-can fa-lg"></i>
                </span>
              </button>
            ) : null}
            {location?.pathname === "/history" ? (
              <button
                className="btn btn-icon p-1"
                onClick={handleDeleteVideoFromHistory}
              >
                <span className="color-error">
                  <i className="fa-solid fa-trash-can fa-lg"></i>
                </span>
              </button>
            ) : null}
            <div className="video-options-icon btn">
              <button
                className="btn btn-icon p-1"
                onClick={handleShowOptionsChange}
              >
                <span>
                  <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                </span>
              </button>
            </div>
          </div>
          {showVideoOptions ? (
            <div
              className="video-options-list flex-col flex-align-center flex-justify-center rounded-md w-full"
              ref={videoOptionsReference}
            >
              <button
                className={`rounded-md btn btn-secondary py-1 px-2 ${
                  userDataLoading || isOnGoingNetworkCall ? "btn-disabled" : ""
                }`}
                disabled={userDataLoading || isOnGoingNetworkCall}
                onClick={handleWatchLaterChange}
              >
                {isVideoInWatchLater ? (
                  <span className="color-error flex-row flex-wrap flex-justify-center flex-align-center gap-1 ">
                    <i className="fa-solid fa-trash-can"></i>
                    Remove from watch later
                  </span>
                ) : (
                  <span className="flex-row flex-wrap flex-justify-center flex-align-center gap-1 ">
                    <i className="fa-regular fa-clock"></i>
                    Add to watch later
                  </span>
                )}
              </button>
              <button
                className={`rounded-md btn btn-secondary py-1 px-2 ${
                  userDataLoading || isOnGoingNetworkCall ? "btn-disabled" : ""
                }`}
                disabled={userDataLoading || isOnGoingNetworkCall}
                onClick={handleLikedVideoChange}
              >
                {isVideoInLikes ? (
                  <span className="color-error flex-row flex-wrap flex-justify-center flex-align-center gap-1 ">
                    <i className="fa-solid fa-trash-can"></i>
                    Remove from likes
                  </span>
                ) : (
                  <span className="flex-row flex-wrap flex-justify-center flex-align-center gap-1 ">
                    <i className="fa-regular fa-thumbs-up"></i>
                    Add to likes
                  </span>
                )}
              </button>
              <button
                className={`rounded-md btn btn-secondary py-1 px-2 ${
                  userDataLoading || isOnGoingNetworkCall ? "btn-disabled" : ""
                }`}
                disabled={userDataLoading || isOnGoingNetworkCall}
                onClick={handleShowPlaylistModal}
              >
                <span className="flex-row flex-wrap flex-justify-center flex-align-center gap-1 ">
                  <i className="fa-solid fa-circle-plus"></i>
                  Add to playlist
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </NavLink>
    </>
  );
};

export { VideoCard };
