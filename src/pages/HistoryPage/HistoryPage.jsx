import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "pages/ExplorePage/explore.css";
import { useAuth, useUserData } from "contexts";
import { Loader, VideosList } from "components";
import { clearVideosFromHistoryService } from "services";
import { useToast } from "custom-hooks/useToast";
import { useDocumentTitle } from "custom-hooks";

const HistoryPage = () => {
  const {
    userDataLoading,
    userDataError: { historyError },
    history,
    userDataDispatch,
  } = useUserData();

  const { authToken } = useAuth();
  const { showToast } = useToast();

  const setDocumentTitle = useDocumentTitle();
  useEffect(() => {
    setDocumentTitle("Petflix | History");
  }, []);

  const handleClearHistory = async (event) => {
    userDataDispatch({
      type: "SET_LOADER",
      payload: { loading: true },
    });

    try {
      const {
        data: { history },
      } = await clearVideosFromHistoryService(authToken);
      userDataDispatch({ type: "SET_HISTORY", payload: { history } });
      showToast("Successfully deleted your watch history.", "success");
    } catch (error) {
      showToast("Failed to clear your watch history.", "error");
    }

    userDataDispatch({
      type: "SET_LOADER",
      payload: { loading: false },
    });
  };

  const buttonDisabled = userDataLoading ? "btn-disabled" : "";

  return (
    <main className="main">
      {historyError ? (
        <h5 className="text-center mx-auto px-3 color-error my-3">
          Videos in your history could not be loaded. Try again after sometime.
        </h5>
      ) : userDataLoading ? (
        <Loader />
      ) : (
        <div className="container flex-col flex-align-center flex-justify-start p-5 gap-2 w-full h-full">
          <h1 className="h1 color-primary">Your History</h1>
          {history?.length ? (
            <>
              <button
                onClick={handleClearHistory}
                className={`btn btn-primary font-bold px-2 py-1 rounded-md align-self-end ${buttonDisabled}`}
              >
                Clear History
                <span className="mx-0-5">
                  <i className="fa-solid fa-broom fa-lg"></i>
                </span>
              </button>
              <VideosList videos={history} />
            </>
          ) : (
            <div className="py-3 w-full flex-col flex-align-center flex-justify-start gap-2">
              <h5 className="h2 text-center mx-auto px-3 info-color">
                There are no videos in your history. Explore and watch videos to
                see them here!
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
  );
};

export { HistoryPage };
