import React from "react";

import { VideoCard, Loader } from "components";
import { useInfiniteScroll } from "custom-hooks";

const VideosList = ({ videos, page }) => {
  const { pageNumber, loading, lastElementReference, hasMoreVideos } =
    useInfiniteScroll(videos);

  const videosToDisply = videos?.slice(0, pageNumber * 10);

  const showLoader = () =>
    videosToDisply?.length &&
    hasMoreVideos &&
    loading &&
    videosToDisply?.length !== videos?.length;

  const videosMapping = videosToDisply.map((video) => (
    <VideoCard key={video._id} video={video} page={page} />
  ));

  return (
    <section className="videos-list-container grid grid-col-autofit-w-25 w-full gap-2">
      {!videosToDisply?.length ? (
        <h4 className="h4">No videos found</h4>
      ) : (
        <>
          {videosMapping}
          <div className="infinite-scroll-loader" ref={lastElementReference}>
            {showLoader() ? (
              <Loader loadingMessage="Fetching Videos..." />
            ) : null}
          </div>
        </>
      )}
    </section>
  );
};

export { VideosList };
