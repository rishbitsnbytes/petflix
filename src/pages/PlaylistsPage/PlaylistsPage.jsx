import { Loader, PlaylistsList } from "components";
import { useUserData } from "contexts";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "custom-hooks";
import PlaylistPortal from "PlaylistPortal";

const PlaylistsPage = () => {
  const {
    playlists,
    userDataLoading,
    userDataError: { playlistsError },
  } = useUserData();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const setDocumentTitle = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Petflix | Playlists");
  }, []);

  const handleCreatePlaylistClicked = (e) => {
    e.stopPropagation();
    setShowPlaylistModal(true);
  };

  return (
    <>
      {showPlaylistModal ? (
        <PlaylistPortal
          video={null}
          setShowPlaylistModal={setShowPlaylistModal}
        />
      ) : null}
      <main
        className="playlists-main flex-col flex-align-center flex-justify-start h-full w-full p-3"
        style={{ minHeight: "100vh" }}
      >
        {playlistsError ? (
          <h3 className="text-center mx-auto px-3 color-error my-3">
            Playlists videos could not be loaded. Please try again later.
          </h3>
        ) : userDataLoading ? (
          <Loader />
        ) : (
          <div className="flex-col flex-align-center flex-justify-start w-full h-full py-1 gap-2">
            <h1 className="h1 color-primary">Your Playlists</h1>

            <button
              onClick={handleCreatePlaylistClicked}
              className="btn btn-primary font-bold px-2 py-1 rounded-md align-self-end"
            >
              Create Playlist
              <span className="mx-0-5">
                <i className="fa-solid fa-circle-plus fa-lg"></i>
              </span>
            </button>
            {playlists?.length ? (
              <PlaylistsList />
            ) : (
              <div className="py-3 w-full flex-col flex-align-center flex-justify-start gap-2">
                <h5 className="h2 text-center mx-auto px-3">
                  There are no playlists. Explore videos to create and add
                  videso to playlists!
                </h5>
                <Link
                  to="/explore"
                  className="btn btn-primary mx-auto mt-2 text-md py-1 px-2 rounded-md text-center"
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
    </>
  );
};

export { PlaylistsPage };
