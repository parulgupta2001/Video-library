import axios from "axios";
import { toast } from "react-toastify";

const getHistory = async (token, dataDispatch) => {
  try {
    const response = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

const addToHistory = async (video, token, dataDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "HISTORY", payload: response.data.history });
  } catch (err) {
    console.log(err);
  }
};

const deleteFromHistory = async (id, token, dataDispatch) => {
  try {
    const response = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
    toast.success(`Video removed from history`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

const deleteAllHistory = async (token, dataDispatch) => {
  try {
    const response = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: response.data.history });
    toast.success(` All videos removed from history`);
  } catch (err) {
    toast.error(`Error. Please try again later.`);
  }
};

export { getHistory, addToHistory, deleteFromHistory, deleteAllHistory };
