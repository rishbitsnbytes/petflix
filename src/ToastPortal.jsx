import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";

const ToastPortal = () => {
  return ReactDOM.createPortal(
    <ToastContainer
      theme="light"
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      limit={3}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />,
    document.getElementById("toast-portal")
  );
};

export { ToastPortal };
