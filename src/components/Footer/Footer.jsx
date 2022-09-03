import "./footer.css";

const Footer = () => {
  return (
    <footer class="p-2 w-full h-fit flex-col flex-justify-center flex-align-center gap-1">
      <p class="h3 w-fit">
        Made with
        <span>
          <i class="fa-solid fa-heart color-tertiary mx-1"></i>
        </span>
        by
        <a
          class="btn btn-link-animated-1 mx-1 font-xbold"
          href="https://rishbitsnbytes.netlify.app/"
        >
          {" "}
          <span class="color-tertiary">Rishabh</span>
        </a>
      </p>
      <div>
        <a class="mx-2" href="https://github.com/rishbitsnbytes">
          <span class="text-xxl font-bold">
            <i class="fa-brands fa-github btn btn-icon"></i>
          </span>
        </a>
        <a class="mx-2" href="https://twitter.com/rishbitsnbytes">
          <span class="text-xxl font-bold">
            <i class="fa-brands fa-twitter btn btn-icon"></i>
          </span>
        </a>
        <a class="mx-2" href="https://www.linkedin.com/in/rishrathore/">
          <span class="text-xxl font-bold">
            <i class="fa-brands fa-linkedin btn btn-icon"></i>
          </span>
        </a>
      </div>
      <p>
        <span>
          <i class="fa-regular fa-copyright"></i>
        </span>
        2022 - rishbitsnbytes
      </p>
    </footer>
  );
};

export { Footer };
