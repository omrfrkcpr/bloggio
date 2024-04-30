import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastWarnNotify = (msg: string) => {
  toast.warn(msg, {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const toastSuccessNotify = (msg: string) => {
  toast.success(msg, {
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const toastErrorNotify = (msg: string) => {
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
