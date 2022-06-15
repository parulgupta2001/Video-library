import axios from "axios";

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
    console.log(token)
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export { getLiked, addToLiked, deleteFromLiked };