import React, { useEffect, useState } from "react";
import "pages/ExplorePage/explore.css";

import { useUserData } from "contexts";
import { Loader, VideosList } from "components";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "custom-hooks";

const LikesPage = () => {
  const {
    userDataLoading,
    userDataError: { likes: likesError },
    likes,
  } = useUserData();

  const setDocumentTitle = useDocumentTitle();
  useEffect(() => {
    setDocumentTitle("Petflix | Likes");
  }, []);

  const [isOnGoingNetworkCall, setIsOnGoingNetworkCall] = useState(false);

  return (
    <main className="main">
      {likesError ? (
        <h3 className="text-center mx-auto px-3 color-error my-3">
          Liked videos could not be loaded. Please try again later.
        </h3>
      ) : (userDataLoading || userDataLoading) && !isOnGoingNetworkCall ? (
        <Loader />
      ) : (
        <div className="container flex-col flex-align-center flex-justify-start p-5 gap-2 w-full h-full">
          <h1 className="h1 color-primary">Your Liked Videos</h1>

          {likes?.length ? (
            <VideosList
              videos={likes}
              setIsOnGoingNetworkCall={setIsOnGoingNetworkCall}
              page="likes"
            />
          ) : (
            <div className="py-3 w-full flex-col flex-align-center flex-justify-start gap-2">
              <h5 className="h2 text-center mx-auto px-3">
                No liked videos yet. Explore videos and like some!
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

export { LikesPage };
