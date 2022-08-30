import "./footer.css";

const Footer = () => {
  return (
    <footer className="p-2 w-full h-fit flex-col flex-justify-center flex-align-center gap-1">
      <p className="h3 w-fit">
        Made with
        <span>
          <i className="fa-solid fa-heart color-tertiary mx-1"></i>
        </span>
        by
        <a
          className="btn btn-link-animated-1 mx-1 font-xbold"
          href="https://rishbitsnbytes.netlify.app/"
        >
          {" "}
          <span className="color-tertiary">Rishabh</span>
        </a>
      </p>
      <div>
        <a className="mx-2" href="https://github.com/rishbitsnbytes">
          <span className="text-xxl font-bold">
            <i className="fa-brands fa-github btn btn-icon"></i>
          </span>
        </a>
        <a className="mx-2" href="https://twitter.com/rishbitsnbytes">
          <span className="text-xxl font-bold">
            <i className="fa-brands fa-twitter btn btn-icon"></i>
          </span>
        </a>
        <a className="mx-2" href="https://www.linkedin.com/in/rishrathore/">
          <span className="text-xxl font-bold">
            <i className="fa-brands fa-linkedin btn btn-icon"></i>
          </span>
        </a>
      </div>
      <p>
        <span>
          <i className="fa-regular fa-copyright"></i>
        </span>
        2022 - rishbitsnbytes
      </p>
    </footer>
  );
};

export { Footer };
