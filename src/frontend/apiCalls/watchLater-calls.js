import axios from "axios";
import { toast } from "react-toastify";

const getWatchLater = async (token, dataDispatch) => {
  try {
    const response = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "WATCH_LATER", payload: response.data.watchlater });
  } catch (err) {
    console.log(err);
  }
};

const addToWatchLater = async (video, token, dataDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "WATCH_LATER", payload: response.data.watchlater });
    toast.success(`Video added to watchlater`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

const deleteFromWatchLater = async (id, token, dataDispatch) => {
  try {
    const response = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "WATCH_LATER", payload: response.data.watchlater });
    toast.success(`Video removed from watchlater`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

export { getWatchLater, addToWatchLater, deleteFromWatchLater };
