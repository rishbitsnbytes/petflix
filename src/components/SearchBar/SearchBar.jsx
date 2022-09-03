import "./search-bar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-row flex-justify-between flex-align-center flex-gap-1 w-30-pc">
      <form className="search-bar flex-row flex-justify-between flex-align-center flex-gap-1 px-1 py-0-5 rounded-md w-full">
        <button className="btn btn-icon">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <input
          className="search-bar-input text-sm"
          type="search"
          placeholder="Type to search"
        />
      </form>
    </div>
  );
};

export { SearchBar };
