import axios from "axios";
import { toast } from "react-toastify";

const getLiked = async (token, dataDispatch) => {
  try {
    const response = await axios.get("/api/user/likes", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "LIKED", payload: response.data.likes });
  } catch (err) {
    console.log(err);
  }
};

const addToLiked = async (video, token, dataDispatch) => {
  try {
    console.log(token);
    const response = await axios.post(
      "/api/user/likes",
      {
        video,
      },
      {
        headers: { authorization: token },
      }
    );
    dataDispatch({ type: "LIKED", payload: response.data.likes });
    toast.success(`Video added to liked`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

const deleteFromLiked = async (id, token, dataDispatch) => {
  try {
    const response = await axios.delete(`/api/user/likes/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "LIKED", payload: response.data.likes });
    toast.success(`Video removed from liked`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

export { getLiked, addToLiked, deleteFromLiked };
