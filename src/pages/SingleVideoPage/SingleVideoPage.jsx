import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Hyphenated from "react-hyphen";

import { useAuth, useUserData, useVideos } from "contexts";
import { Loader } from "components";
import {
  findVideoInList,
  getFormattedViews,
  likeVideoServiceCall,
  watchLaterServiceCall,
} from "utils";
import PlaylistPortal from "PlaylistPortal";
import { postVideoToHistoryService } from "services";
import { useDocumentTitle, useToast } from "custom-hooks";

const SingleVideoPage = () => {
  const { videosError, videosLoading, videos } = useVideos();
  const { watchlater, likes, userDataDispatch, userDataLoading } =
    useUserData();
  const { videoId } = useParams();
  const { isAuth, authToken } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const videoToBeDisplayed = videos?.find((video) => video._id === videoId);

  const videoCreatorWords = videoToBeDisplayed?.creator?.split(/\s|-/, 3);
  const videoCreatorAbbreviation = videoCreatorWords
    ?.map((word) => word[0].toUpperCase())
    .join("");

  const [isVideoInWatchLater, setIsVideoInWatchLater] = useState(
    findVideoInList(watchlater, videoToBeDisplayed) || []
  );
  const [isVideoInLikes, setIsVideoInLikes] = useState(
    findVideoInList(likes, videoToBeDisplayed) || []
  );
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const setDocumentTitle = useDocumentTitle();

  useEffect(() => {
    if (isAuth) {
      setIsVideoInWatchLater(findVideoInList(watchlater, videoToBeDisplayed));
      setIsVideoInLikes(findVideoInList(likes, videoToBeDisplayed));
    }
  }, [watchlater, likes]);

  useEffect(() => {
    if (videoToBeDisplayed) {
      postVideoToHistoryServiceCall();
      setDocumentTitle(`Petflix | ${videoToBeDisplayed?.title}`);
    }
  }, [videoToBeDisplayed]);

  const postVideoToHistoryServiceCall = async () => {
    if (isAuth) {
      userDataDispatch({
        type: "SET_LOADER",
        payload: { loading: true },
      });

      try {
        const {
          data: { history },
        } = await postVideoToHistoryService(authToken, videoToBeDisplayed);
        userDataDispatch({ type: "SET_HISTORY", payload: { history } });
      } catch (error) {
        showToast(
          "Some error occurred while updating history. Please try again later.",
          "error"
        );
      }

      userDataDispatch({
        type: "SET_LOADER",
        payload: { loading: false },
      });
    }
  };

  const handleWatchLaterChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuth) {
      showToast("Login to add the video to watch later.", "info");
      navigate("/login", {
        state: { from: `/explore/${videoId}` },
        replace: true,
      });
    } else {
      watchLaterServiceCall(
        showToast,
        userDataDispatch,
        isVideoInWatchLater,
        authToken,
        videoToBeDisplayed
      );
    }
  };

  const handleLikedVideoChange = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuth) {
      showToast("Login to add the video to likes.", "info");
      navigate("/login", {
        state: { from: `/explore/${videoId}` },
        replace: true,
      });
    } else {
      likeVideoServiceCall(
        showToast,
        userDataDispatch,
        isVideoInLikes,
        authToken,
        videoToBeDisplayed
      );
    }
  };

  const handleShowPlaylistModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      showToast("Login to add the video to a playlist.", "info");
      navigate("/login", {
        state: { from: `/explore/${videoId}` },
        replace: true,
      });
    } else setShowPlaylistModal(true);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const disabledButton = userDataLoading ? "btn-disabled" : "";

  const dateReleased = new Date(videoToBeDisplayed?.dateAdded)
    .toDateString()
    .substring(4)
    .split(" ", 4)
    .join(" ");

  return (
    <>
      {showPlaylistModal ? (
        <PlaylistPortal
          video={videoToBeDisplayed}
          setShowPlaylistModal={setShowPlaylistModal}
        />
      ) : null}
      <main className="main single-video-page p-5 w-full h-full">
        {videosLoading ? (
          <Loader />
        ) : videosError || !videoToBeDisplayed ? (
          <h5 className="text-center mx-auto px-3 color-error my-3">
            Fialed to load video. Please try again later.
          </h5>
        ) : (
          <div className="main-container rounded-md flex-col flex-align-center flex-justify-start p-3 w-full h-fit mx-auto">
            <div className="w-full h-full p-1">
              <div className="video-container rounded-md w-full">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="youtube-video flex-row flex-justify-center flex-align-center rounded-md"
                />
              </div>
              <div className="flex-col flex-align-center flex-justify-center w-full py-3 gap-3">
                <div className="flex-wrap flex-row flex-align-start flex-justify-between py-1 w-full">
                  <div className="flex-col flex-justify-start flex-align-start gap-2 w-60-pc">
                    <h5 className="h1 font-bold">{videoToBeDisplayed.title}</h5>
                    <div className="flex-row flex-align-start flex-justify-start gap-2">
                      <div
                        className="avatar-text w-5 h-5 rounded-full flex-row flex-justify-center flex-align-center"
                        role="img"
                      >
                        {videoCreatorAbbreviation}
                      </div>
                      <div className="flex-col video-creator-info flex-align-start">
                        <h6 className="h3">{videoToBeDisplayed?.creator}</h6>
                        <div className="flex-row flex-align-center flex-justify-start flex-wrap gap-1">
                          <div className="h4">
                            {getFormattedViews(videoToBeDisplayed?.views)}
                          </div>
                          <div>|</div>
                          <div className="h4">{dateReleased}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-row flex-align-center flex-justify-center flex-wrap gap-4">
                    <button
                      className={`btn btn-icon flex-col flex-align-center flex-justify-center gap-0-5 text-md ${disabledButton}`}
                      onClick={handleLikedVideoChange}
                    >
                      {isVideoInLikes ? (
                        <span>
                          <i className="fa-solid fa-thumbs-down fa-xl"></i>
                        </span>
                      ) : (
                        <span>
                          <i className="fa-solid fa-thumbs-up fa-xl"></i>
                        </span>
                      )}
                      <span className="">
                        {isVideoInLikes ? "Disike" : "Like"}
                      </span>
                    </button>
                    <button
                      className={`btn btn-icon flex-col flex-align-center flex-justify-center gap-0-5 text-md ${disabledButton}`}
                      onClick={handleShowPlaylistModal}
                    >
                      <span>
                        <i className="fa-solid fa-circle-plus fa-xl"></i>
                      </span>
                      <span className="">Add To Playlist</span>
                    </button>
                    <button
                      className={`btn btn-icon flex-col flex-align-center flex-justify-center gap-0-5 text-md ${disabledButton}`}
                      onClick={handleWatchLaterChange}
                    >
                      {isVideoInWatchLater ? (
                        <span>
                          <i className="fa-solid fa-clock fa-xl"></i>
                        </span>
                      ) : (
                        <span>
                          <i className="fa-regular fa-clock fa-xl"></i>
                        </span>
                      )}
                      <span className="">Watch Later</span>
                    </button>
                  </div>
                </div>
                <div className="text-md">{videoToBeDisplayed?.description}</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export { SingleVideoPage };
