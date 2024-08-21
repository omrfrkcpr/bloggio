/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchFail,
  resetContactForm,
} from "../features/contactSlice";
import { RootState } from "../app/store";
import { axiosWithPublic } from "./useAxios";
import toastNotify from "../helpers/toastNotify";

const useFeedback = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => state.contact);

  const sendFeedback = async () => {
    dispatch(fetchStart());
    console.log("Sending feedback:", form); // Log to check form data

    try {
      const { data } = await axiosWithPublic.post("users/feedback", form);
      toastNotify("info", data.message);
    } catch (error: any) {
      // console.log("Error: ", error);
      dispatch(fetchFail());
      toastNotify(
        "error",
        error?.response?.data?.message || "An error occurred"
      );
    } finally {
      dispatch(resetContactForm());
    }
  };

  return { sendFeedback };
};

export default useFeedback;
