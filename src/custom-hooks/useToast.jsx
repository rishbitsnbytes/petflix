import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (
    toastText = "Operation Successfull",
    toastTheme = "success"
  ) => {
    const notify = () => {
      toast[toastTheme](toastText, {
        theme: "colored",
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    notify();
  };

  return { showToast };
};

export { useToast };
