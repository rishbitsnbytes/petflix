import React, { useEffect } from "react";

import { Loader, VideosList } from "components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserData } from "contexts";
import { useDocumentTitle } from "custom-hooks";

const PlaylistVideosPage = () => {
  const { playlistsId } = useParams();
  const navigate = useNavigate();

  const {
    playlists,
    userDataLoading,
    userDataError: { playlists: playlistError },
  } = useUserData();

  if (!playlists.find((playlist) => playlist._id === playlistsId))
    navigate("/playlists");

  const videos = playlists.find(
    (playlist) => playlist._id === playlistsId
  )?.videos;

  const playlistName = playlists.find(
    (playlist) => playlist._id === playlistsId
  )?.title;

  const setDocumentTitle = useDocumentTitle();
  useEffect(() => {
    setDocumentTitle("Petflix | Playlists");
  }, []);

  return (
    <main className="main">
      {playlistError ? (
        <h5 className="text-center mx-auto px-3 color-error">
          Playlist videos could not be loaded. Please try again later.
        </h5>
      ) : userDataLoading ? (
        <Loader />
      ) : (
        <div className="container flex-col flex-align-center flex-justify-start p-5 gap-3 w-full h-full">
          <h1 className="h1 color-primary">{playlistName}</h1>
          <div className="w-full">
            <Link
              to="/playlists"
              className="btn btn-primary mx-auto mt-2 px-2 py-1 text-md font-bold rounded-md align-self-start"
            >
              <span className="mx-0-5">
                <i className="fa-solid fa-caret-left fa-lg"></i>
              </span>
              Back to All Playlists
            </Link>
          </div>
          {videos?.length ? (
            <VideosList videos={videos} page="playlist" />
          ) : (
            <div className="py-3 w-full flex-col flex-align-center flex-justify-start gap-2">
              <h5 className="h2 text-center mx-auto px-3 info-color">
                No videos in this playlist. Explore now to add videos to your
                playlist!
              </h5>
              <Link
                to="/explore"
                className="btn btn-primary mx-auto mt-2 px-2 py-1 text-md font-bold rounded-md"
              >
                Explore now
                <span className="mx-0-5">
                  <i className="fa-solid fa-compass fa-lg"></i>
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export { PlaylistVideosPage };
