import "./loader.css";
import petflixLogoDark from "assets/others/petflix-logo-dark-gif.gif";
import petflixLogoLight from "assets/others/petflix-logo-light-gif.gif";

const Loader = ({
  width = "10",
  height = "10",
  loadingMessage = "Loading...",
}) => {
  const getLoaderBodyDimension = (currentWidth, currentHeight) => {
    return {
      width: `${currentWidth}rem`,
      height: `${currentHeight}rem`,
    };
  };
  return (
    <div className="w-full h-full flex-col flex-justify-center flex-align-center text-center gap-2">
      <div
        className="center-body m-1 p-1 relative"
        style={getLoaderBodyDimension(width, height)}
      >
        <div className="flex-col flex-justify-center flex-align-center loader-circle">
          <img
            className="rounded-circle w-full h-full"
            src={petflixLogoDark}
            alt="Logo"
            width={50}
            height={50}
          />
          <span></span>
        </div>
      </div>
      <p className="h3 font-bold color-tertiary">{loadingMessage}</p>
    </div>
  );
};

export { Loader };
