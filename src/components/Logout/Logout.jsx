import { logoutHandler } from "utils";
import { Loader } from "components";
import { useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Logout = ({ iconButton }) => {
  const { authState, authDispatch } = useAuth();
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async (event) => {
    setLoadingState(true);
    await logoutHandler(authState, authDispatch);
    showToast("Logged out!", "info");
    setLoadingState(false);
    navigate("/", { replace: true });
  };

  if (loadingState && !iconButton) {
    return (
      <div>
        <div className="w-full h-50">
          <Loader
            width="15"
            height="15"
            loadingMessage="Logging out, See you again soon..."
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {iconButton ? (
        <div>
          <button
            className="btn-icon-logout btn btn-icon"
            onClick={(event) => handleLogout(event)}
          >
            <i className="fa-solid fa-right-from-bracket fa-xl"></i>
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-primary p-1 rounded-full w-15"
            onClick={(event) => handleLogout(event)}
          >
            <span className="mr-1">
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export { Logout };
