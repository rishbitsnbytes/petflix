import "./header.css";
import carouselImg1 from "assets/others/petflix-carousel-1.png";
import carouselImg2 from "assets/others/petflix-carousel-2.png";
import carouselImg3 from "assets/others/petflix-carousel-3.png";
import carouselImg4 from "assets/others/petflix-carousel-4.png";
import carouselImg5 from "assets/others/petflix-carousel-5.png";
import { useState, useEffect } from "react";
import { Link, Navlink } from "react-router-dom";

const Header = () => {
  const carouselImgsData = [
    { imgSrc: carouselImg1, carouselText: "Training with Pets" },
    { imgSrc: carouselImg2, carouselText: "Grooming Pets" },
    { imgSrc: carouselImg3, carouselText: "Daily Routine with Pets" },
    { imgSrc: carouselImg4, carouselText: "Fun with Pets" },
    { imgSrc: carouselImg5, carouselText: "Playing with Pets" },
  ];

  const [currentImg, setCurrentImg] = useState(0);

  const getPreviousImg = () => {
    const previousImg =
      currentImg === 0 ? carouselImgsData.length - 1 : currentImg - 1;
    setCurrentImg(previousImg);
  };

  const getNextImg = () => {
    const nextImg =
      currentImg >= carouselImgsData.length - 1 ? 0 : currentImg + 1;
    setCurrentImg(nextImg);
  };

  useEffect(() => {
    const carouselInterval = setInterval(getNextImg, 3000);
    return () => clearInterval(carouselInterval);
  });

  /* Header Carousel */
  return (
    <header className="carousel-container w-full relative">
      <div className="carousel-inner my-1">
        {carouselImgsData.map(({ imgSrc, carouselText }, index) => {
          if (index === currentImg) {
            return (
              <div className="carousel-item w-full h-40" key={index}>
                <div className="carousel-overlay-text-container absolute flex-col flex-justify-center flex-align-center gap-2 w-fit">
                  <h1 className="color-primary h1">{carouselText}</h1>
                  <Link
                    to="/videos"
                    className="w-full btn btn-primary  h-full px-2 py-1 rounded-md"
                  >
                    Watch Now
                    <i className="ml-1 fa-regular fa-circle-play fa-lg"></i>
                  </Link>
                </div>
                <Link to="/videos" className="w-full h-full">
                  <img
                    className="w-full h-full rounded-md"
                    src={imgSrc}
                    alt="Pet Carousel Image"
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
      <div className="prev-btn absolute">
        <button
          className="btn rounded-circle btn-secondary px-1-5 py-1 flex flex-justify-center flex-align-center"
          onClick={getPreviousImg}
        >
          <span>
            <i className="fa-solid fa-angle-left fa-2xl" />
          </span>
        </button>
      </div>
      <div className="next-btn absolute">
        <button
          className="btn rounded-circle btn-secondary px-1-5 py-1 flex flex-justify-center flex-align-center"
          onClick={getNextImg}
        >
          <span>
            <i className="fa-solid fa-angle-right fa-2xl" />
          </span>
        </button>
      </div>
      <ol className="carousel-indicators absolute flex-row flex-justify-center flex-align-center gap-1 pointer">
        {carouselImgsData.map((image, index) => {
          if (index === currentImg) {
            return <li className="active" key={index} />;
          } else {
            return (
              <li
                onClick={() => {
                  setCurrentImg(index);
                }}
                key={index}
              />
            );
          }
        })}
      </ol>
    </header>
  );
};

export { Header };
